/* ============================================================
   PickAGig — main.js
   Entry point: page routing/navigation, app init, and wiring
   up the functions that index.html calls directly via inline
   onclick/oninput attributes (those need to live on `window`
   since ES module scope is NOT global scope).
   ============================================================ */

import './supabaseClient.js'; // establishes the Supabase connection on load
import { t, lang, setLangValue } from './i18n.js';
import { state } from './data.js';
import { el, toast, closeModal } from './ui-helpers.js';
import { renderFilters, renderGigs, openPost, loadGigs, refreshAppliedStatus } from './gigs.js';
import { initMap } from './map.js';
import { renderChatsList } from './chats.js';
import { renderProfilePage } from './profile.js';
import { initAuth, getCurrentUser, openAuthModal, signOut } from './auth.js';

export function setLang(l) {
  setLangValue(l);
  init();
}

function renderAuthStatus(user) {
  const wrap = document.getElementById('authStatus');
  if (!wrap) return;
  wrap.textContent = '';
  if (user) {
    wrap.appendChild(el('button', {
      class: 'lang-pill',
      text: (user.user_metadata?.full_name || user.email).split(' ')[0].split('@')[0],
      onclick: () => {
        if (confirm('Sign out of PickAGig?')) signOut();
      }
    }));
  } else {
    wrap.appendChild(el('button', {
      class: 'lang-pill',
      text: 'Sign in',
      onclick: () => openAuthModal('signin')
    }));
  }
}

export function navigate(page) {
  if (page === 'post') {
    openPost();
    return;
  }

  state.page = page;

  document.querySelectorAll('.nav').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.nav[data-page="${page}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  const panel = document.getElementById('panel');
  const panelBrand = document.getElementById('panelBrand');
  const panelPageHeader = document.getElementById('panelPageHeader');
  const panelGigsBody = document.getElementById('panelGigsBody');
  const filtersBar = document.getElementById('filtersBar');
  const pageGigs = document.getElementById('pageGigs');
  const pageMap = document.getElementById('pageMap');
  const pageChats = document.getElementById('pageChats');
  const pageProfile = document.getElementById('pageProfile');

  panelBrand.style.display = 'none';
  panelPageHeader.style.display = 'none';
  panelGigsBody.style.display = 'none';
  filtersBar.style.display = 'none';
  pageGigs.style.display = 'none';
  pageMap.style.display = 'none';
  pageChats.style.display = 'none';
  if (pageProfile) pageProfile.style.display = 'none';
  panel.style.display = 'block';

  if (page === 'gigs') {
    panelBrand.style.display = 'block';
    panelGigsBody.style.display = 'block';
    filtersBar.style.display = 'flex';
    pageGigs.style.display = 'block';
    renderFilters();
    renderGigs();
  } else if (page === 'map') {
    panelPageHeader.style.display = 'block';
    document.getElementById('panelPageTitle').textContent = t('mapTitle');
    document.getElementById('panelPageSub').textContent = t('mapSubtitle');
    pageMap.style.display = 'block';
    setTimeout(initMap, 60);
  } else if (page === 'chats') {
    panelPageHeader.style.display = 'block';
    document.getElementById('panelPageTitle').textContent = t('chatsTitle');
    document.getElementById('panelPageSub').textContent = t('chatsSub');
    pageChats.style.display = 'block';
    renderChatsList();
  } else if (page === 'profile') {
    panel.style.display = 'none';
    if (pageProfile) pageProfile.style.display = 'block';
    renderProfilePage();
  }
}

export async function init() {
  document.querySelectorAll('.lang-pill[data-lang]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.getElementById('locationText').innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' + t('withinRadius');
  document.getElementById('heroSubtitle').textContent = t('tagline');
  document.getElementById('searchInput').placeholder = t('searchPlaceholder');
  document.getElementById('gigsHeading').textContent = t('gigsNearYou');
  document.getElementById('mapLinkBtn').textContent = t('mapLink');

  document.querySelectorAll('[data-nav-label]').forEach(node => {
    node.textContent = t(node.dataset.navLabel);
  });

  await loadGigs();
  renderAuthStatus(getCurrentUser());
  navigate(state.page === 'post' || state.page === 'profile' ? 'gigs' : state.page);
}

export function onSearch(val) {
  state.query = val;
  renderGigs();
}

// ── Expose to window ──────────────────────────────────────────
// index.html calls these directly via inline onclick="..." /
// oninput="..." attributes, so they must exist on the global
// window object (module-scoped functions are NOT global).
window.navigate   = navigate;
window.setLang    = setLang;
window.toast      = toast;
window.closeModal = closeModal;
window.onSearch   = onSearch;

initAuth((user) => {
  renderAuthStatus(user);
  refreshAppliedStatus();
});

window.addEventListener('DOMContentLoaded', init);
