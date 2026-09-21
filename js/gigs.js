/* ============================================================
   PickAGig — gigs.js
   Gig list rendering, filtering, gig detail modal, applying,
   and posting — all backed by the real Supabase `gigs` and
   `gig_applications` tables.
   ============================================================ */

import { el, toast, openModal, closeModal } from './ui-helpers.js';
import { t, tCat, CAT_ICONS } from './i18n.js';
import { state, RADIUS_CHOICES_KM } from './data.js';
import { supabase } from './supabaseClient.js';
import { getCurrentUser, openAuthModal } from './auth.js';
import { refreshMapMarkers } from './map.js';
import { navigate } from './main.js';
import { createOrGetChat } from './chats.js';
import { openLocationPicker } from './location-picker.js';
import {
  distanceKm, getUserLocation, locationIsKnown, getRadiusKm,
  requestUserLocation, reverseGeocode, shortLabel,
} from './geo.js';

let appliedGigIds = new Set();

// Advanced filters (session-only, not persisted): sort order, an
// optional pay range, an urgent-only toggle, and an optional radius
// that overrides the saved Settings radius just for this browsing
// session. Reset in openAdvancedFilters().
state.filters = state.filters || {
  sort: 'distance',      // 'distance' | 'newest' | 'pay_high'
  payMin: '',
  payMax: '',
  urgentOnly: false,
  radiusOverride: null,  // km, or null to use the saved Settings radius
};

function filtersAreActive() {
  const f = state.filters;
  return f.sort !== 'distance' || f.payMin || f.payMax || f.urgentOnly || f.radiusOverride != null;
}

function updateFilterIconState() {
  const btn = document.getElementById('advFilterIcon');
  if (btn) btn.classList.toggle('filters-active', filtersAreActive());
}

// Pulls the first number out of a free-text pay string like
// "MK 20,000" or "MK 5,000/day" — returns null for things like
// "Negotiable" that have no number in them.
function parsePayAmount(payStr) {
  if (!payStr) return null;
  const match = String(payStr).replace(/,/g, '').match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

async function loadAppliedGigIds() {
  const user = getCurrentUser();
  if (!user) { appliedGigIds = new Set(); return; }
  const { data, error } = await supabase
    .from('gig_applications')
    .select('gig_id')
    .eq('applicant_id', user.id);
  if (!error && data) appliedGigIds = new Set(data.map(r => r.gig_id));
}

// Re-checks which gigs the current user has applied to (call after
// sign-in/sign-out) and re-renders the gigs page if it's showing.
export async function refreshAppliedStatus() {
  await loadAppliedGigIds();
  if (state.page === 'gigs') renderGigs();
}

// Fetches gigs from Supabase into state.gigsCache. Cheap to call
// repeatedly — skips the network round-trip unless `force` is set.
export async function loadGigs(force = false) {
  if (state.gigsLoaded && !force) return;

  const { data, error } = await supabase
    .from('gigs')
    .select('*, profiles(full_name)')
    .eq('status', 'open')
    .order('created_at', { ascending: false });

  if (error) {
    toast('Could not load gigs: ' + error.message);
    state.gigsCache = [];
    return;
  }

  state.gigsCache = data.map(g => ({
    id: g.id,
    cat: g.category,
    title: g.title,
    place: g.place,
    time: g.time_label,
    duration: g.duration,
    pay: g.pay,
    payType: g.pay_type,
    people: g.people,
    applied: g.applied_count,
    urgent: g.urgent,
    lat: g.location_lat,
    lng: g.location_lng,
    posterId: g.poster_id,
    posterName: g.profiles?.full_name || 'Unknown',
    posterInitials: (g.profiles?.full_name || '?').charAt(0).toUpperCase(),
  }));

  state.gigsLoaded = true;
  await loadAppliedGigIds();
}

export function renderFilters() {
  const wrap = document.getElementById('filtersBar');
  wrap.textContent = '';
  Object.keys(CAT_ICONS).forEach(cat => {
    const icon = CAT_ICONS[cat];
    const btn = el('button', {
      class: 'filter' + (cat === state.selectedCat ? ' active' : ''),
      onclick() {
        state.selectedCat = cat;
        renderFilters();
        renderGigs();
        if (state.page === 'map') refreshMapMarkers();
      },
    },
    icon ? el('span', { class: 'filter-emoji', text: icon }) : null,
    document.createTextNode(tCat(cat))
    );
    wrap.appendChild(btn);
  });
}

// Filters by category, search text, the user's chosen radius, and
// whatever's set in the Advanced Filters modal (sort order, pay
// range, urgent-only, and an optional radius override). When no
// location is known every gig is shown. Gigs with no coordinates
// can't be ranged, so they are kept but sorted last.
export function getFilteredGigs() {
  const q = state.query.toLowerCase();
  const loc = getUserLocation();
  const known = locationIsKnown(loc);
  const radius = state.filters.radiusOverride ?? getRadiusKm();
  const { sort, urgentOnly } = state.filters;
  const payMin = parsePayAmount(state.filters.payMin);
  const payMax = parsePayAmount(state.filters.payMax);

  return state.gigsCache
    .map((g, idx) => ({
      g, idx,
      km: known ? distanceKm(loc.lat, loc.lng, g.lat, g.lng) : null,
      payAmount: parsePayAmount(g.pay),
    }))
    .filter(({ g, km, payAmount }) => {
      const catMatch    = state.selectedCat === 'All' || g.cat === state.selectedCat;
      const searchMatch = !q || (g.title + ' ' + g.cat + ' ' + g.place).toLowerCase().includes(q);
      const inRange      = !known || km == null || km <= radius;
      const urgentMatch   = !urgentOnly || g.urgent;
      const payMinMatch   = payMin == null || payAmount == null || payAmount >= payMin;
      const payMaxMatch   = payMax == null || payAmount == null || payAmount <= payMax;
      return catMatch && searchMatch && inRange && urgentMatch && payMinMatch && payMaxMatch;
    })
    .sort((a, b) => {
      if (sort === 'newest') return a.idx - b.idx; // gigsCache already arrives newest-first
      if (sort === 'pay_high') {
        if (a.payAmount == null && b.payAmount == null) return 0;
        if (a.payAmount == null) return 1;
        if (b.payAmount == null) return -1;
        return b.payAmount - a.payAmount;
      }
      // default: 'distance' — urgent first, then nearest
      const byUrgent = (b.g.urgent ? 1 : 0) - (a.g.urgent ? 1 : 0);
      if (byUrgent) return byUrgent;
      if (a.km == null && b.km == null) return 0;
      if (a.km == null) return 1;
      if (b.km == null) return -1;
      return a.km - b.km;
    })
    .map(({ g }) => g);
}

function buildSegmented(options, current, onPick) {
  const seg = el('div', { class: 'seg seg-fill', role: 'group' });
  options.forEach(o => {
    seg.appendChild(el('button', {
      class: 'seg-btn' + (o.value === current ? ' active' : ''),
      type: 'button', text: o.label,
      onclick: (ev) => {
        seg.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
        ev.currentTarget.classList.add('active');
        onPick(o.value);
      },
    }));
  });
  return seg;
}

export function openAdvancedFilters() {
  const f = state.filters;
  let pickedSort = f.sort;
  let pickedRadius = f.radiusOverride;

  const sortSeg = buildSegmented(
    [
      { value: 'distance', label: 'Nearest' },
      { value: 'newest', label: 'Newest' },
      { value: 'pay_high', label: 'Highest pay' },
    ],
    f.sort,
    (v) => { pickedSort = v; }
  );

  const radiusSeg = buildSegmented(
    RADIUS_CHOICES_KM.map(km => ({ value: km, label: km + 'km' })),
    f.radiusOverride ?? getRadiusKm(),
    (v) => { pickedRadius = v; }
  );

  const payMinInput = el('input', { type: 'number', inputmode: 'numeric', placeholder: 'e.g. 5000', value: f.payMin || '' });
  const payMaxInput = el('input', { type: 'number', inputmode: 'numeric', placeholder: 'e.g. 50000', value: f.payMax || '' });

  const urgentToggleInput = el('input', { type: 'checkbox', class: 'sw-input' });
  urgentToggleInput.checked = f.urgentOnly;
  const urgentToggle = el('label', { class: 'row row-tap', style: 'padding:12px 0;' },
    el('span', { class: 'row-text' }, el('strong', { text: 'Urgent gigs only' })),
    el('span', { class: 'sw' }, urgentToggleInput, el('span', { class: 'sw-knob' }))
  );

  const applyBtn = el('button', {
    class: 'primary', type: 'button', text: 'Apply filters',
    onclick: () => {
      f.sort = pickedSort;
      f.radiusOverride = pickedRadius;
      f.payMin = payMinInput.value;
      f.payMax = payMaxInput.value;
      f.urgentOnly = urgentToggleInput.checked;
      closeModal();
      renderGigs();
      if (state.page === 'map') refreshMapMarkers();
      updateFilterIconState();
      toast('Filters applied.');
    }
  });

  const resetBtn = el('button', {
    type: 'button', text: 'Reset filters',
    style: 'background:none;border:0;color:var(--muted);font-size:13px;font-weight:700;cursor:pointer;width:100%;padding:10px;text-align:center;',
    onclick: () => {
      state.filters = { sort: 'distance', payMin: '', payMax: '', urgentOnly: false, radiusOverride: null };
      closeModal();
      renderGigs();
      if (state.page === 'map') refreshMapMarkers();
      updateFilterIconState();
    }
  });

  openModal(el('div', {},
    el('h2', { text: 'Filters', style: 'margin-bottom:16px;' }),
    el('div', { class: 'form' },
      el('label', { text: 'Sort by' }, sortSeg),
      el('label', { text: 'Search radius' }, radiusSeg),
      el('div', { class: 'form-row' },
        el('label', { text: 'Min pay (MK)' }, payMinInput),
        el('label', { text: 'Max pay (MK)' }, payMaxInput)
      )
    ),
    urgentToggle,
    el('div', { style: 'display:flex;flex-direction:column;gap:10px;margin-top:16px;' },
      applyBtn,
      resetBtn
    )
  ));
}

// ── Notifications ────────────────────────────────────────────
// A lightweight activity feed built from data the app already has:
// applicants on gigs you posted, and completed gigs where you (as
// the worker) still owe the poster a rating. There's no separate
// notifications table or push delivery yet — see the note in chat.

async function fetchPendingWorkerRatings(userId) {
  const { data, error } = await supabase
    .from('gig_applications')
    .select('gig_id, gigs(id, title, poster_id, status, profiles(full_name))')
    .eq('applicant_id', userId)
    .eq('accepted', true);
  if (error) { console.error('fetchPendingWorkerRatings error:', error); return []; }

  const completed = (data || []).filter(r => r.gigs && r.gigs.status === 'completed');
  if (!completed.length) return [];

  const gigIds = completed.map(r => r.gig_id);
  const { data: myRatings } = await supabase
    .from('ratings')
    .select('gig_id')
    .eq('rater_id', userId)
    .in('gig_id', gigIds);
  const alreadyRated = new Set((myRatings || []).map(r => r.gig_id));

  return completed
    .filter(r => !alreadyRated.has(r.gig_id))
    .map(r => ({
      gigId: r.gig_id,
      gigTitle: r.gigs.title,
      posterId: r.gigs.poster_id,
      posterName: r.gigs.profiles?.full_name || 'Unknown',
    }));
}

export async function openNotifications() {
  const user = getCurrentUser();
  if (!user) {
    openModal(el('div', {},
      el('h2', { text: 'Activity', style: 'margin-bottom:10px;' }),
      el('p', { style: 'color:var(--muted);font-size:14px;', text: 'Sign in to see applicants on your gigs and gigs you still need to rate.' })
    ));
    return;
  }

  openModal(el('div', {}, el('div', { class: 'set-loading', text: 'Loading…' })));

  const myOpenGigsWithApplicants = state.gigsCache.filter(g => g.posterId === user.id && g.applied > 0);
  const pendingRatings = await fetchPendingWorkerRatings(user.id);

  const applicantRows = myOpenGigsWithApplicants.map(g => el('button', {
    class: 'row row-tap', type: 'button',
    onclick: () => { closeModal(); openGigDetail(g); },
  },
    el('span', { class: 'row-text' },
      el('strong', { text: g.title }),
      el('span', { class: 'row-hint', text: g.applied + (g.applied === 1 ? ' applicant' : ' applicants') })
    )
  ));

  const ratingRows = pendingRatings.map(p => el('button', {
    class: 'row row-tap', type: 'button',
    onclick: () => { closeModal(); openRatingModal(p.gigId, p.posterId, p.posterName); },
  },
    el('span', { class: 'row-text' },
      el('strong', { text: 'Rate ' + p.posterName }),
      el('span', { class: 'row-hint', text: 'For "' + p.gigTitle + '"' })
    )
  ));

  const sections = [];
  if (applicantRows.length) {
    sections.push(el('h3', { style: 'font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);margin:14px 0 6px;', text: 'Applicants on your gigs' }));
    sections.push(el('div', { class: 'set-list' }, ...applicantRows));
  }
  if (ratingRows.length) {
    sections.push(el('h3', { style: 'font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);margin:14px 0 6px;', text: 'Gigs to rate' }));
    sections.push(el('div', { class: 'set-list' }, ...ratingRows));
  }
  if (!sections.length) {
    sections.push(el('p', { style: 'color:var(--muted);font-size:14px;', text: 'Nothing new right now.' }));
  }

  openModal(el('div', {},
    el('h2', { text: 'Activity' }),
    ...sections
  ));
}

function buildGigCard(gig) {
  const isApplied = appliedGigIds.has(gig.id);
  const peopleLabel = gig.people === 1 ? t('peopleSingular') : t('peoplePlural');
  const loc = getUserLocation();
  const km = distanceKm(loc.lat, loc.lng, gig.lat, gig.lng);

  return el('article', {
    class: 'gig-card',
    onclick: () => openGigDetail(gig)
  },
    el('div', { class: 'gig-body' },
      el('div', { class: 'cat-icon', text: CAT_ICONS[gig.cat] || '💼' }),
      el('div', { class: 'gig-info' },
        el('div', { class: 'gig-tag-row' },
          el('span', { class: 'gig-cat-label', text: tCat(gig.cat) }),
          gig.urgent ? el('span', { class: 'urgent-badge' },
            el('span', { class: 'urgent-dot' }),
            document.createTextNode(t('urgent'))
          ) : null
        ),
        el('h3', { class: 'gig-title', text: gig.title }),
        el('div', { class: 'gig-meta' },
          el('div', { class: 'gig-meta-item' },
            el('svg', { html: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' }),
            document.createTextNode((km != null ? km + ' km · ' : '') + gig.place)
          ),
          el('div', { class: 'gig-meta-item' },
            el('svg', { html: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' }),
            document.createTextNode(gig.time + ' · ' + gig.duration)
          )
        )
      )
    ),
    el('div', { class: 'gig-footer' },
      el('div', {},
        el('div', { class: 'gig-pay-amount', text: gig.pay }),
        el('div', { class: 'gig-pay-type', text: gig.payType || 'total' })
      ),
      el('div', { class: 'gig-stats' },
        el('div', { class: 'gig-people' },
          el('svg', { html: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' }),
            document.createTextNode(gig.people + ' ' + peopleLabel)
        ),
        el('div', { class: 'applied-badge', text: gig.applied + ' ' + t('applied') })
      )
    )
  );
}

async function fetchApplicants(gigId) {
  const { data, error } = await supabase
    .from('gig_applications')
    .select('applicant_id, profiles(full_name)')
    .eq('gig_id', gigId);
  if (error) { console.error('fetchApplicants error:', error); return []; }
  return data.map(r => ({ applicantId: r.applicant_id, name: r.profiles?.full_name || 'Unknown' }));
}

async function markGigComplete(gigId, applicantId) {
  const { error: acceptErr } = await supabase
    .from('gig_applications')
    .update({ accepted: true })
    .eq('gig_id', gigId)
    .eq('applicant_id', applicantId);
  if (acceptErr) { toast('Could not mark hire: ' + acceptErr.message); return false; }

  const { error: statusErr } = await supabase
    .from('gigs')
    .update({ status: 'completed' })
    .eq('id', gigId);
  if (statusErr) { toast('Could not complete gig: ' + statusErr.message); return false; }

  await loadGigs(true);
  renderGigs();
  return true;
}

export function openRatingModal(gigId, workerId, workerName, onSuccess) {
  let selected = 0;
  const stars = [1, 2, 3, 4, 5].map(n => {
    const star = el('span', {
      text: '★',
      style: 'font-size:28px;cursor:pointer;color:#ccc;margin-right:4px;',
      onclick: () => {
        selected = n;
        stars.forEach((s, i) => { s.style.color = i < selected ? '#f97316' : '#ccc'; });
      }
    });
    return star;
  });

  const reviewInput = el('textarea', { placeholder: 'Optional review…' });
  const submitBtn = el('button', {
    class: 'primary', text: 'Submit rating',
    onclick: async () => {
      if (!selected) { toast('Pick a star rating first.'); return; }
      const user = getCurrentUser();
      submitBtn.disabled = true;
      const { error } = await supabase.from('ratings').insert({
        gig_id: gigId, rater_id: user.id, ratee_id: workerId,
        rating: selected, review: reviewInput.value.trim()
      });
      submitBtn.disabled = false;
      if (error) { toast('Could not submit rating: ' + error.message); return; }
      toast('Rating submitted!');
      closeModal();
      if (onSuccess) onSuccess();
    }
  });

  openModal(el('div', {},
    el('h2', { text: 'Rate ' + workerName }),
    el('div', { style: 'margin:12px 0;' }, ...stars),
    el('label', { text: 'Review' }, reviewInput),
    submitBtn
  ));
}

async function openCompleteGigModal(gig) {
  const applicants = await fetchApplicants(gig.id);
  if (!applicants.length) {
    toast('No applicants yet to mark as hired.');
    return;
  }
  const list = el('div', { class: 'form' },
    ...applicants.map(a => el('button', {
      class: 'primary',
      style: 'display:block;width:100%;margin-bottom:8px;',
      text: a.name,
      onclick: async () => {
        closeModal();
        const ok = await markGigComplete(gig.id, a.applicantId);
        if (ok) openRatingModal(gig.id, a.applicantId, a.name);
      }
    }))
  );
  openModal(el('div', {},
    el('h2', { text: 'Who did this gig?' }),
    el('p', { style: 'color:#666;font-size:13px;margin-bottom:10px;', text: 'Pick the person you hired to mark this gig complete and leave them a rating.' }),
    list
  ));
}

async function cancelGig(gigId) {
  const { error } = await supabase
    .from('gigs')
    .update({ status: 'cancelled' })
    .eq('id', gigId);
  if (error) { toast('Could not cancel gig: ' + error.message); return false; }
  await loadGigs(true);
  renderGigs();
  if (state.page === 'map') refreshMapMarkers();
  return true;
}

export function openGigDetail(gig) {
  const user = getCurrentUser();
  const isOwner = user && gig.posterId === user.id;
  const isApplied = appliedGigIds.has(gig.id);
  const loc = getUserLocation();
  const km = distanceKm(loc.lat, loc.lng, gig.lat, gig.lng);

  const ownerActions = isOwner
    ? el('div', { class: 'detail-owner-actions' },
        el('button', { class: 'detail-apply', text: t('markCompleteBtn'), onclick: () => openCompleteGigModal(gig) }),
        el('button', {
          class: 'detail-cancel', type: 'button', text: t('cancelGigBtn'),
          onclick: () => {
            if (!confirm(t('cancelGigConfirm'))) return;
            cancelGig(gig.id).then(ok => { if (ok) { closeModal(); toast(t('gigCancelled')); } });
          }
        })
      )
    : el('button', {
        class: 'detail-apply' + (isApplied ? ' applied' : ''),
        text: isApplied ? t('applicationSent') : t('pickThisGig'),
        onclick: async function () {
          if (appliedGigIds.has(gig.id)) return;
          this.disabled = true;
          await applyToGig(gig);
          this.disabled = false;
          if (appliedGigIds.has(gig.id)) {
            this.classList.add('applied');
            this.textContent = t('applicationSent');
          }
        }
      });

  openModal(el('div', {},
    el('div', { style: 'font-size:11px;font-weight:800;color:var(--orange);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;' },
      document.createTextNode(tCat(gig.cat) + (gig.urgent ? ' · ' + t('urgent') : ''))
    ),
    el('h2', { text: gig.title, style: 'margin-bottom:15px;' }),
    el('div', { class: 'detail-pay', text: gig.pay }),
    el('div', { class: 'detail-pay-type', text: gig.payType || 'total' }),
    el('div', { class: 'detail-meta' },
      document.createTextNode('📍 ' + (km != null ? km + ' km · ' : '') + gig.place), el('br'),
      document.createTextNode('🕒 ' + gig.time + ' · ' + gig.duration), el('br'),
      document.createTextNode('👥 ' + gig.people + ' ' + (gig.people === 1 ? t('peopleSingular') : t('peoplePlural')) + ' · ' + gig.applied + ' ' + t('applied')), el('br'),
      document.createTextNode('👤 Posted by ' + gig.posterName)
    ),
    ownerActions
  ));
}

export function renderGigs() {
  const grid  = document.getElementById('gigsGrid');
  const empty = document.getElementById('gigsEmpty');
  if (!grid) return;
  grid.textContent = '';
  updateFilterIconState();
  const list = getFilteredGigs();
  list.forEach(g => grid.appendChild(buildGigCard(g)));
  empty.style.display = list.length ? 'none' : 'block';
  // Distinguish "nothing is posted" from "nothing inside your radius"
  // so the user knows which control to adjust.
  const radiusBlocked = !list.length && state.gigsCache.length > 0 && !state.query
                     && state.selectedCat === 'All' && locationIsKnown();
  empty.textContent = radiusBlocked ? t('noGigsInRadius', { km: getRadiusKm() }) : t('noGigs');
}

export async function applyToGig(gig) {
  const user = getCurrentUser();
  if (!user) {
    toast('Please sign in to apply for a gig.');
    openAuthModal('signin');
    return;
  }
  if (appliedGigIds.has(gig.id)) return;

  const { error } = await supabase
    .from('gig_applications')
    .insert({ gig_id: gig.id, applicant_id: user.id });

  if (error) {
    if (error.code === '23505') {
      // Unique constraint hit — they'd already applied, just sync state.
      appliedGigIds.add(gig.id);
    } else {
      toast('Could not apply: ' + error.message);
      return;
    }
  } else {
    appliedGigIds.add(gig.id);
    gig.applied = (gig.applied || 0) + 1;
  }

  // Creates (or reuses) a real Supabase chat thread with the gig's poster.
  await createOrGetChat(gig.id, gig.posterId, user.id);

  toast(t('applicationSent'));
  renderGigs();
}

// `prefill` carries the form values (and the chosen map pin) across
// re-renders: opening the location picker replaces the sheet, so the
// form is rebuilt afterwards with everything the poster had typed.
export function openPost(prefill = {}) {
  if (!getCurrentUser()) {
    toast('Please sign in to post a gig.');
    openAuthModal('signin');
    return;
  }

  const titleInput    = el('input', { id: 'pt', type: 'text', placeholder: t('gigTitleLabel'), value: prefill.title || '' });
  const catSelect     = el('select', { id: 'pc' });
  const placeInput    = el('input', { id: 'pp', type: 'text', placeholder: t('locationLabel'), value: prefill.place || '' });
  const payInput      = el('input', { id: 'pw', type: 'text', placeholder: t('payLabel'), value: prefill.pay || '' });
  const timeInput     = el('input', { id: 'ptm', type: 'text', placeholder: t('timeLabelPlaceholder'), value: prefill.time || '' });
  const durationInput = el('input', { id: 'pdur', type: 'text', placeholder: t('durationLabelPlaceholder'), value: prefill.duration || '' });
  const detailsInput  = el('textarea', { id: 'pd', placeholder: t('detailsLabel'), value: prefill.details || '' });

  Object.keys(CAT_ICONS).slice(1).forEach(cat => catSelect.appendChild(el('option', { value: cat, text: tCat(cat) })));
  if (prefill.cat) catSelect.value = prefill.cat;
  if (!catSelect.value && catSelect.options.length) catSelect.value = catSelect.options[0].value;

  const readForm = () => ({
    title:    titleInput.value,
    cat:      catSelect.value,
    place:    placeInput.value,
    pay:      payInput.value,
    time:     timeInput.value,
    duration: durationInput.value,
    details:  detailsInput.value,
  });

  const spot = prefill.spot || null;

  function pickSpot() {
    // Snapshot before the picker takes over the sheet.
    const snapshot = readForm();
    openLocationPicker({
      title: t('postPickSpot'),
      hint: t('mapAreaHint'),
      confirmLabel: t('postPickSpot'),
      initial: spot || undefined,
      onConfirm: (picked) => openPost({ ...snapshot, spot: picked }),
    });
  }

  async function useMyLocation() {
    toast(t('mapLocating'));
    await requestUserLocation();
    const loc = getUserLocation();
    if (!locationIsKnown(loc)) {
      toast(t('mapNoGps'));
      return;
    }
    // A raw GPS fix has no place name, so look one up for display.
    const label = loc.label || shortLabel(await reverseGeocode(loc.lat, loc.lng));
    openPost({ ...readForm(), spot: { lat: loc.lat, lng: loc.lng, label } });
  }

  // Never leave the status line blank: fall back to coordinates when
  // there is no place name (e.g. a GPS fix that failed to geocode).
  const spotLabel = spot
    ? (shortLabel(spot.label) || `${spot.lat.toFixed(4)}, ${spot.lng.toFixed(4)}`)
    : null;

  const spotStatus = el('div', {
    class: 'post-spot-status' + (spot ? ' set' : ''),
    text: spot ? t('postSpotSet', { place: spotLabel }) : t('postNeedSpot'),
  });

  const publishBtn = el('button', {
    class: 'primary', text: t('publishBtn'),
    onclick: () => publishGig(publishBtn, readForm, spot),
  });

  const form = el('div', { class: 'form' },
    el('label', { text: t('gigTitleLabel') }, titleInput),
    el('label', { text: t('categoryLabel') }, catSelect),
    el('label', { text: t('payLabel') }, payInput),
    el('div', { class: 'form-row' },
      el('label', { text: t('timeLabel') }, timeInput),
      el('label', { text: t('durationLabel') }, durationInput)
    ),
    el('label', { text: t('detailsLabel') }, detailsInput),
    el('div', { class: 'post-spot' },
      el('div', { class: 'post-spot-head', text: t('locationLabel') }),
      spotStatus,
      placeInput,
      el('div', { class: 'post-spot-btns' },
        el('button', { class: 'pf-upload-btn', type: 'button', text: t('postUseMyLocation'), onclick: useMyLocation }),
        el('button', { class: 'pf-upload-btn', type: 'button', text: t('postPickSpot'), onclick: pickSpot })
      )
    ),
    publishBtn
  );

  openModal(el('div', {},
    el('h2', { text: t('postTitle') }),
    form
  ));
}

async function publishGig(publishBtn, readForm, spot) {
  const user = getCurrentUser();
  if (!user) {
    toast('Please sign in to post a gig.');
    openAuthModal('signin');
    return;
  }

  const form  = readForm();
  const title = (form.title || '').trim();
  if (!title) { toast(t('noTitle')); return; }

  // The pin the poster chose wins; otherwise use their live GPS fix.
  // Never a hardcoded city — the gig has to appear where it is.
  const loc = spot || (locationIsKnown() ? getUserLocation() : null);
  if (!loc || loc.lat == null || loc.lng == null) { toast(t('postNeedSpot')); return; }

  publishBtn.disabled = true;
  publishBtn.textContent = 'Publishing…';

  let place = (form.place || '').trim();
  if (!place) {
    place = shortLabel(await reverseGeocode(loc.lat, loc.lng))
         || `${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`;
  }

  const { error } = await supabase.from('gigs').insert({
    poster_id:     user.id,
    category:      form.cat,
    title,
    place,
    time_label:    (form.time || '').trim() || t('timeLabelFallback'),
    duration:      (form.duration || '').trim() || t('durationLabelFallback'),
    pay:           (form.pay || '').trim() || 'Negotiable',
    pay_type:      'total',
    people:        1,
    urgent:        false,
    description:   (form.details || '').trim(),
    location_lat:  loc.lat,
    location_lng:  loc.lng,
  });

  publishBtn.disabled = false;
  publishBtn.textContent = t('publishBtn');

  if (error) {
    toast('Could not publish gig: ' + error.message);
    return;
  }

  closeModal();
  await loadGigs(true);
  renderGigs();
  if (state.page === 'map') refreshMapMarkers();
  toast(t('gigPosted'));
}
