/* ============================================================
   PickAGig — gigs.js
   Gig list rendering, filtering, gig detail modal, applying,
   and posting — all backed by the real Supabase `gigs` and
   `gig_applications` tables.
   ============================================================ */

import { el, toast, openModal, closeModal } from './ui-helpers.js';
import { t, tCat, CAT_ICONS } from './i18n.js';
import { state, BLANTYRE_CENTER } from './data.js';
import { supabase } from './supabaseClient.js';
import { getCurrentUser, openAuthModal } from './auth.js';
import { refreshMapMarkers } from './map.js';
import { navigate } from './main.js';
import { createOrGetChat } from './chats.js';
import { distanceKm, getUserLocation } from './geo.js';

let appliedGigIds = new Set();

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

export function getFilteredGigs() {
  const q = state.query.toLowerCase();
  return state.gigsCache
    .filter(g => {
      const catMatch    = state.selectedCat === 'All' || g.cat === state.selectedCat;
      const searchMatch = !q || (g.title + ' ' + g.cat + ' ' + g.place).toLowerCase().includes(q);
      return catMatch && searchMatch;
    })
    .sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
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

export function openGigDetail(gig) {
  const user = getCurrentUser();
  const isOwner = user && gig.posterId === user.id;
  const isApplied = appliedGigIds.has(gig.id);
  const loc = getUserLocation();
  const km = distanceKm(loc.lat, loc.lng, gig.lat, gig.lng);

  const actionBtn = isOwner
    ? el('button', { class: 'detail-apply', text: 'Mark gig as complete', onclick: () => openCompleteGigModal(gig) })
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
    actionBtn
  ));
}

export function renderGigs() {
  const grid  = document.getElementById('gigsGrid');
  const empty = document.getElementById('gigsEmpty');
  if (!grid) return;
  grid.textContent = '';
  const list = getFilteredGigs();
  list.forEach(g => grid.appendChild(buildGigCard(g)));
  empty.style.display   = list.length ? 'none' : 'block';
  empty.textContent     = t('noGigs');
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

export function openPost() {
  if (!getCurrentUser()) {
    toast('Please sign in to post a gig.');
    openAuthModal('signin');
    return;
  }

  const titleInput   = el('input', { id: 'pt', type: 'text', placeholder: t('gigTitleLabel') });
  const catSelect    = el('select', { id: 'pc' });
  const placeInput   = el('input', { id: 'pp', type: 'text', placeholder: t('locationLabel') });
  const payInput     = el('input', { id: 'pw', type: 'text', placeholder: t('payLabel') });
  const detailsInput = el('textarea', { id: 'pd', placeholder: t('detailsLabel') });

  Object.keys(CAT_ICONS).slice(1).forEach(cat => catSelect.appendChild(el('option', { value: cat, text: tCat(cat) })));

  const publishBtn = el('button', { class: 'primary', text: t('publishBtn'), onclick: () => publishGig(publishBtn) });

  const form = el('div', { class: 'form' },
    el('label', { text: t('gigTitleLabel') }, titleInput),
    el('label', { text: t('categoryLabel') }, catSelect),
    el('label', { text: t('locationLabel') }, placeInput),
    el('label', { text: t('payLabel') }, payInput),
    el('label', { text: t('detailsLabel') }, detailsInput),
    publishBtn
  );

  openModal(el('div', {},
    el('h2', { text: t('postTitle') }),
    form
  ));
}

async function publishGig(publishBtn) {
  const user = getCurrentUser();
  if (!user) {
    toast('Please sign in to post a gig.');
    openAuthModal('signin');
    return;
  }

  const title = document.getElementById('pt')?.value.trim();
  if (!title) { toast(t('noTitle')); return; }

  publishBtn.disabled = true;
  publishBtn.textContent = 'Publishing…';

  const { error } = await supabase.from('gigs').insert({
    poster_id:     user.id,
    category:      document.getElementById('pc').value,
    title,
    place:         document.getElementById('pp').value.trim() || 'Blantyre',
    time_label:    'New gig',
    duration:      'Flexible',
    pay:           document.getElementById('pw').value.trim() || 'Negotiable',
    pay_type:      'total',
    people:        1,
    urgent:        false,
    description:   document.getElementById('pd')?.value.trim() || '',
    location_lat:  BLANTYRE_CENTER[0] + (Math.random() - 0.5) * 0.04,
    location_lng:  BLANTYRE_CENTER[1] + (Math.random() - 0.5) * 0.04,
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
  toast(t('gigPosted'));
}
