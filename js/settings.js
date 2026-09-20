/* ============================================================
   PickAGig — settings.js
   Dedicated Settings page rendered as a grouped inset list: a
   sticky frosted header, uppercase section labels, and rows with
   tinted icons, inset hairline dividers and chevrons.
   Device-local preferences (radius, home area, language) work
   while signed out; notification toggles need a profile row.
   ============================================================ */

import { el, toast } from './ui-helpers.js';
import { t, lang } from './i18n.js';
import { state, RADIUS_CHOICES_KM, APP_VERSION } from './data.js';
import { setLang, navigate } from './main.js';
import { supabase } from './supabaseClient.js';
import { getCurrentUser, openAuthModal, signOut } from './auth.js';
import { onLocationPrefsChanged } from './map.js';
import { openLocationPicker } from './location-picker.js';
import {
  getRadiusKm, setRadiusKm, getHomeLocation, setHomeLocation,
  getUserLocation, locationIsKnown, requestUserLocation, shortLabel,
} from './geo.js';

const SETTINGS_CSS = `
.set-group{border:none;}
.set-summary{display:flex;align-items:center;justify-content:space-between;cursor:pointer;
  list-style:none;padding:2px 2px 8px;user-select:none;}
.set-summary::-webkit-details-marker{display:none;}
.set-summary::marker{content:'';}
.set-summary-chev{display:inline-flex;color:#9ca3af;transition:transform .18s ease;flex:0 0 auto;}
.set-group[open] .set-summary-chev{transform:rotate(90deg);}
.set-group:not([open]) .set-list{display:none;}
`;

function injectSettingsStyles() {
  if (document.getElementById('set-accordion-styles')) return;
  const style = document.createElement('style');
  style.id = 'set-accordion-styles';
  style.textContent = SETTINGS_CSS;
  document.head.appendChild(style);
}

const S = 'fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
const svg = (body) => `<svg width="17" height="17" viewBox="0 0 24 24" ${S} aria-hidden="true">${body}</svg>`;

const ICON = {
  pin:       svg('<path d="M20 10.2c0 5.9-8 11.8-8 11.8s-8-5.9-8-11.8a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.7"/>'),
  crosshair: svg('<circle cx="12" cy="12" r="7.4"/><line x1="12" y1="1.6" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22.4"/><line x1="1.6" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22.4" y2="12"/>'),
  locate:    svg('<polygon points="3.2 11 21.6 2.6 13.2 21 11.2 13 3.2 11"/>'),
  radius:    svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.2"/><line x1="14.3" y1="9.7" x2="18.4" y2="5.6"/>'),
  bell:      svg('<path d="M18 8.6a6 6 0 1 0-12 0c0 5.9-2 7.4-2 7.4h16s-2-1.5-2-7.4Z"/><path d="M13.7 19.8a2 2 0 0 1-3.4 0"/>'),
  globe:     svg('<circle cx="12" cy="12" r="9"/><path d="M3.2 12h17.6"/><path d="M12 3a14.5 14.5 0 0 1 0 18A14.5 14.5 0 0 1 12 3Z"/>'),
  data:      svg('<ellipse cx="12" cy="5.6" rx="7.4" ry="2.9"/><path d="M4.6 5.6v12.8c0 1.6 3.3 2.9 7.4 2.9s7.4-1.3 7.4-2.9V5.6"/><path d="M4.6 12c0 1.6 3.3 2.9 7.4 2.9s7.4-1.3 7.4-2.9"/>'),
  user:      svg('<circle cx="12" cy="8.1" r="3.7"/><path d="M4.8 20.4a7.2 7.2 0 0 1 14.4 0"/>'),
  info:      svg('<circle cx="12" cy="12" r="9"/><line x1="12" y1="11.2" x2="12" y2="16.4"/><line x1="12" y1="7.7" x2="12" y2="7.8"/>'),
  logout:    svg('<path d="M9.6 21H6.2A2.2 2.2 0 0 1 4 18.8V5.2A2.2 2.2 0 0 1 6.2 3h3.4"/><polyline points="16.2 16.4 20.6 12 16.2 7.6"/><line x1="20.6" y1="12" x2="9.8" y2="12"/>'),
  back:      '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  chevron:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9.5 5.5 16 12 9.5 18.5"/></svg>',
};

async function fetchProfileRow(userId) {
  const { data, error } = await supabase
    .from('profiles').select('*').eq('id', userId).maybeSingle();
  if (error) { console.error('settings fetchProfile error:', error); return null; }
  return data;
}

async function saveSetting(userId, patch) {
  const { error } = await supabase.from('profiles').update(patch).eq('id', userId);
  if (error) { toast('Could not save: ' + error.message); return false; }
  toast(t('settingsSaved'));
  return true;
}

// ── Row primitives ───────────────────────────────────────────

function ico(name, tone) {
  return el('span', { class: 'row-ico ' + tone, html: ICON[name] });
}

function rowText(title, hint) {
  return el('span', { class: 'row-text' },
    el('strong', { text: title }),
    hint ? el('span', { class: 'row-hint', text: hint }) : null
  );
}

function rowVal(text) {
  return text ? el('span', { class: 'row-val', text }) : null;
}

function chevron() {
  return el('span', { class: 'row-chev', html: ICON.chevron });
}

function staticRow({ icon, tone, title, hint, value }) {
  return el('div', { class: 'row' }, ico(icon, tone), rowText(title, hint), rowVal(value));
}

function actionRow({ icon, tone, title, hint, value, onclick }) {
  return el('button', { class: 'row row-tap', type: 'button', onclick },
    ico(icon, tone), rowText(title, hint), rowVal(value), chevron()
  );
}

function toggleRow({ icon, tone, title, hint, checked, onChange }) {
  const input = el('input', { type: 'checkbox', class: 'sw-input' });
  input.checked = !!checked;
  input.addEventListener('change', () => onChange(input.checked));
  return el('label', { class: 'row row-tap' },
    ico(icon, tone), rowText(title, hint),
    el('span', { class: 'sw' }, input, el('span', { class: 'sw-knob' }))
  );
}

function dangerRow({ icon, title, onclick }) {
  return el('button', { class: 'row row-tap row-danger', type: 'button', onclick },
    ico(icon, 't-red'), el('span', { class: 'row-text center' }, el('strong', { text: title }))
  );
}

// A row whose content stacks: a label line above a full-width control.
// `line` is an array of nodes so callers can pass icon + text together;
// omit it for rows with no icon (their divider is not inset).
function stackedRow(line, control) {
  const hasLine = !!(line && line.length);
  return el('div', { class: 'row row-stack' + (hasLine ? '' : ' row-plain') },
    hasLine ? el('div', { class: 'row-line' }, ...line) : null,
    control
  );
}

function segmented(options, current, onPick) {
  const seg = el('div', { class: 'seg seg-fill', role: 'group' });
  options.forEach(o => {
    seg.appendChild(el('button', {
      class: 'seg-btn' + (o.value === current ? ' active' : ''),
      type: 'button', text: o.label, 'aria-pressed': o.value === current ? 'true' : 'false',
      onclick: (ev) => {
        seg.querySelectorAll('.seg-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        ev.currentTarget.classList.add('active');
        ev.currentTarget.setAttribute('aria-pressed', 'true');
        onPick(o.value);
      },
    }));
  });
  return seg;
}

function group(label, ...rows) {
  const list = rows.filter(Boolean);
  if (!list.length) return null;
  return el('details', { class: 'set-group' },
    el('summary', { class: 'set-summary' },
      el('span', { class: 'set-label', text: label }),
      el('span', { class: 'set-summary-chev', html: ICON.chevron })
    ),
    el('div', { class: 'set-list' }, ...list)
  );
}

function signInBlock(hint) {
  return stackedRow(null, el('div', { class: 'set-signin' },
    el('p', { class: 'set-hint-p', text: hint }),
    el('button', { class: 'primary', type: 'button', text: t('settingsSignIn'), onclick: () => openAuthModal('signin') })
  ));
}

function currentPositionText() {
  const loc = getUserLocation();
  if (!locationIsKnown(loc)) return t('settingsPositionUnknown');
  return loc.label
    ? shortLabel(loc.label)
    : `${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`;
}

// ── Page ─────────────────────────────────────────────────────

export async function renderSettingsPage() {
  injectSettingsStyles();
  const container = document.getElementById('pageSettings');
  if (!container) return;
  container.textContent = '';

  const user = getCurrentUser();
  container.appendChild(el('div', { class: 'set-loading', text: 'Loading…' }));

  const profile = user ? await fetchProfileRow(user.id) : null;
  container.textContent = '';

  function chooseArea() {
    openLocationPicker({
      title: t('mapAreaTitle'),
      hint: t('mapAreaHint'),
      confirmLabel: t('mapChooseArea'),
      initial: getHomeLocation() || undefined,
      onConfirm: (picked) => {
        setHomeLocation(picked);
        // Adopt it as the working position too, so the change is
        // visible immediately even with location services off.
        state.userLocation = {
          lat: picked.lat, lng: picked.lng, label: picked.label,
          isFallback: true, unknown: false,
        };
        onLocationPrefsChanged();
        renderSettingsPage();
        toast(t('mapNear', { place: shortLabel(picked.label) }));
      },
    });
  }

  async function useMyPosition(ev) {
    const btn = ev.currentTarget;
    btn.disabled = true;
    btn.classList.add('is-busy');
    toast(t('mapLocating'));
    await requestUserLocation();
    if (!locationIsKnown()) {
      btn.disabled = false;
      btn.classList.remove('is-busy');
      toast(t('mapNoGps'));
      return;
    }
    onLocationPrefsChanged();
    renderSettingsPage();
    toast(t('mapLocated'));
  }

  const topbar = el('header', { class: 'set-topbar' },
    el('button', {
      class: 'set-back', type: 'button',
      'aria-label': t('navBack'), title: t('navBack'),
      onclick: () => navigate('profile'), html: ICON.back,
    }),
    el('h1', { class: 'set-title', text: t('settingsTitle') })
  );

  const home = getHomeLocation();

  // ── Location & radius ──────────────────────────────────────
  const locationGroup = group(t('settingsLocation'),
    actionRow({
      icon: 'pin', tone: 't-orange',
      title: t('settingsHomeArea'),
      hint: t('settingsHomeAreaHint'),
      value: home ? shortLabel(home.label) : t('settingsHomeNone'),
      onclick: chooseArea,
    }),
    staticRow({
      icon: 'crosshair', tone: 't-blue',
      title: t('settingsCurrentPosition'),
      value: currentPositionText(),
    }),
    actionRow({
      icon: 'locate', tone: 't-green',
      title: t('settingsUseCurrent'),
      onclick: useMyPosition,
    }),
    stackedRow(
      [ico('radius', 't-purple'), rowText(t('settingsRadius'), t('settingsRadiusHint'))],
      segmented(
        RADIUS_CHOICES_KM.map(km => ({ value: km, label: km + 'km' })),
        getRadiusKm(),
        (km) => { setRadiusKm(km); onLocationPrefsChanged(); }
      )
    )
  );

  // ── Notifications ──────────────────────────────────────────
  const notificationsGroup = group(t('settingsNotifications'),
    user && profile
      ? toggleRow({
          icon: 'bell', tone: 't-orange',
          title: t('smsAlertsLbl'),
          hint: t('settingsSmsHint'),
          checked: profile.sms_alerts,
          onChange: (on) => saveSetting(user.id, { sms_alerts: on }),
        })
      : signInBlock(t('settingsSignInHint'))
  );

  // ── Language ───────────────────────────────────────────────
  const languageGroup = group(t('settingsLanguage'),
    stackedRow(null, segmented(
      [{ value: 'EN', label: 'English' }, { value: 'NY', label: 'Chichewa' }],
      lang,
      setLang
    ))
  );

  // ── Data (needs a profile row) ─────────────────────────────
  const dataGroup = user && profile
    ? group(t('settingsData'),
        toggleRow({
          icon: 'data', tone: 't-green',
          title: t('dataSaverLbl'),
          hint: t('settingsDataSaverHint'),
          checked: profile.data_saver,
          onChange: (on) => saveSetting(user.id, { data_saver: on }),
        })
      )
    : null;

  // ── Account ────────────────────────────────────────────────
  const accountGroup = group(t('settingsAccount'),
    user
      ? staticRow({
          icon: 'user', tone: 't-navy',
          title: profile?.full_name || t('settingsAccount'),
          value: user.email || '',
        })
      : signInBlock(t('settingsSignInHint')),
    user
      ? dangerRow({
          icon: 'logout', title: t('settingsSignOut'),
          onclick: () => { if (confirm('Sign out of PickAGig?')) signOut(); },
        })
      : null
  );

  const aboutGroup = group(t('settingsAbout'),
    staticRow({
      icon: 'info', tone: 't-navy',
      title: 'PickAGig',
      value: t('settingsVersion') + ' ' + APP_VERSION,
    })
  );

  container.appendChild(topbar);
  container.appendChild(el('div', { class: 'set-body' },
    el('p', { class: 'set-lead', text: t('settingsPageSub') }),
    locationGroup,
    notificationsGroup,
    languageGroup,
    dataGroup,
    accountGroup,
    aboutGroup
  ));
}
