/* ============================================================
   PickAGig — gigs.js
   Gig list rendering, filtering, gig detail modal, applying,
   and the "post a gig" flow.
   ============================================================ */

import { el, toast, openModal, closeModal } from './ui-helpers.js';
import { t, tCat, CAT_ICONS } from './i18n.js';
import { LS, state, BLANTYRE_CENTER } from './data.js';
import { refreshMapMarkers } from './map.js';
import { navigate } from './main.js';
import { getCurrentUser, openAuthModal } from './auth.js';

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
  const gigs = LS.getGigs();
  const q    = state.query.toLowerCase();
  return gigs
    .filter(g => {
      const catMatch    = state.selectedCat === 'All' || g.cat === state.selectedCat;
      const searchMatch = !q || (g.title + ' ' + g.cat + ' ' + g.place).toLowerCase().includes(q);
      return catMatch && searchMatch;
    })
    .sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
}

function buildGigCard(gig) {
  const isApplied = LS.getApplied().includes(gig.id);
  const peopleLabel = gig.people === 1 ? t('peopleSingular') : t('peoplePlural');

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
            document.createTextNode(gig.km + ' km · ' + gig.place)
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

export function openGigDetail(gig) {
  const isApplied = LS.getApplied().includes(gig.id);
  const btn = el('button', {
    class: 'detail-apply' + (isApplied ? ' applied' : ''),
    text: isApplied ? t('applicationSent') : t('pickThisGig'),
    onclick: () => {
      if (isApplied) return;
      if (!getCurrentUser()) {
        toast('Please sign in to apply for a gig.');
        openAuthModal('signin');
        return;
      }
      const profile = LS.getProfile();
      if (!profile.name) {
        toast(t('profileRequired'));
        navigate('profile'); // NOTE: original code called an undefined openProfile() here — fixed to use navigate('profile')
        return;
      }
      applyToGig(gig);
      btn.classList.add('applied');
      btn.textContent = t('applicationSent');
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
      document.createTextNode('📍 ' + gig.km + ' km · ' + gig.place), el('br'),
      document.createTextNode('🕒 ' + gig.time + ' · ' + gig.duration), el('br'),
      document.createTextNode('👥 ' + gig.people + ' ' + (gig.people === 1 ? t('peopleSingular') : t('peoplePlural')) + ' · ' + gig.applied + ' ' + t('applied'))
    ),
    btn
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

export function applyToGig(gig) {
  const applied = LS.getApplied();
  if (!applied.includes(gig.id)) {
    applied.push(gig.id);
    LS.setApplied(applied);
  }
  const gigs  = LS.getGigs();
  const found = gigs.find(g => g.id === gig.id);
  if (found) { found.applied++; LS.setGigs(gigs); }

  const chats = LS.getChats();
  if (!chats.find(c => c.gigId === gig.id)) {
    chats.push({
      gigId:    gig.id,
      gigTitle: gig.title,
      gigCat:   gig.cat,
      posterInitials: gig.posterInitials || 'X',
      posterName: gig.posterName || 'Unknown',
      messages: [{ sender: 'them', text: t('autoReply1'), ts: Date.now() }],
    });
    LS.setChats(chats);
  }
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

  const form = el('div', { class: 'form' },
    el('label', { text: t('gigTitleLabel') }, titleInput),
    el('label', { text: t('categoryLabel') }, catSelect),
    el('label', { text: t('locationLabel') }, placeInput),
    el('label', { text: t('payLabel') }, payInput),
    el('label', { text: t('detailsLabel') }, detailsInput),
    el('button', { class: 'primary', text: t('publishBtn'), onclick: publishGig })
  );

  openModal(el('div', {},
    el('h2', { text: t('postTitle') }),
    form
  ));
}

export function publishGig() {
  const title = document.getElementById('pt')?.value.trim();
  if (!title) { toast(t('noTitle')); return; }

  const gigs = LS.getGigs();
  gigs.unshift({
    id:       'u_' + Date.now(),
    cat:      document.getElementById('pc').value,
    title,
    place:    document.getElementById('pp').value.trim() || 'Blantyre',
    time:     'New gig',
    duration: 'Flexible',
    pay:      document.getElementById('pw').value.trim() || 'Negotiable',
    payType:  'total',
    people:   1,
    applied:  0,
    km:       0,
    lat:      BLANTYRE_CENTER[0] + (Math.random() - 0.5) * 0.04,
    lng:      BLANTYRE_CENTER[1] + (Math.random() - 0.5) * 0.04,
    posterInitials: 'ME',
    posterName: LS.getProfile().name || 'Me'
  });
  LS.setGigs(gigs);
  closeModal();
  renderGigs();
  toast(t('gigPosted'));
}
