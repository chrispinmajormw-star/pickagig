/* ============================================================
   PickAGig — settings.js
   Dedicated Settings page: notifications, location and search
   radius, language, data and account — grouped into cards with
   real toggle switches instead of raw checkboxes.
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

// ── Small presentational pieces ──────────────────────────────

function switchRow({ title, hint, checked, onChange }) {
  const input = el('input', { type: 'checkbox', class: 'sw-input' });
  input.checked = !!checked;
  input.addEventListener('change', () => onChange(input.checked));
  return el('label', { class: 'sw-row' },
    el('div', { class: 'sw-text' },
      el('strong', { text: title }),
      hint ? el('div', { class: 'sw-hint', text: hint }) : null
    ),
    el('span', { class: 'sw' }, input, el('span', { class: 'sw-knob' }))
  );
}

function infoRow(title, valueText, hint) {
  return el('div', { class: 'set-row' },
    el('div', { class: 'sw-text' },
      el('strong', { text: title }),
      valueText ? el('div', { class: 'set-value', text: valueText }) : null,
      hint ? el('div', { class: 'sw-hint', text: hint }) : null
    )
  );
}

function card(title, ...children) {
  return el('section', { class: 'set-card' },
    el('h3', { class: 'set-card-title', text: title }),
    ...children.filter(Boolean)
  );
}

function currentPositionText() {
  const loc = getUserLocation();
  if (!locationIsKnown(loc)) return t('settingsPositionUnknown');
  const where = loc.label ? shortLabel(loc.label) : `${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`;
  return (loc.isFallback ? '≈ ' : '● ') + where;
}

// ── Page ─────────────────────────────────────────────────────

export async function renderSettingsPage() {
  const container = document.getElementById('pageSettings');
  if (!container) return;
  container.textContent = '';

  const user = getCurrentUser();
  container.appendChild(el('div', { class: 'set-loading', text: 'Loading…' }));

  const profile = user ? await fetchProfileRow(user.id) : null;
  container.textContent = '';

  // Header with a way back to the profile page.
  const header = el('div', { class: 'set-header' },
    el('button', {
      class: 'set-back', type: 'button', 'aria-label': t('navBack'),
      onclick: () => navigate('profile'),
      html: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    }),
    el('div', {},
      el('h1', { text: t('settingsTitle') }),
      el('p', { class: 'set-sub', text: t('settingsPageSub') })
    )
  );

  // ── Location & radius ──────────────────────────────────────
  const radiusRow = el('div', { class: 'seg' },
    ...RADIUS_CHOICES_KM.map(km => el('button', {
      class: 'seg-btn' + (km === getRadiusKm() ? ' active' : ''),
      type: 'button', text: km + 'km',
      onclick: () => { setRadiusKm(km); onLocationPrefsChanged(); renderSettingsPage(); },
    }))
  );

  const home = getHomeLocation();

  const locationCard = card(t('settingsLocation'),
    el('div', { class: 'set-row' },
      el('div', { class: 'sw-text' },
        el('strong', { text: t('settingsRadius') }),
        el('div', { class: 'sw-hint', text: t('settingsRadiusHint') })
      ),
      radiusRow
    ),
    infoRow(t('settingsCurrentPosition'), currentPositionText()),
    el('div', { class: 'set-actions' },
      el('button', {
        class: 'set-btn', type: 'button', text: t('settingsUseCurrent'),
        onclick: async (ev) => {
          ev.target.disabled = true;
          toast(t('mapLocating'));
          await requestUserLocation();
          ev.target.disabled = false;
          if (!locationIsKnown()) { toast(t('mapNoGps')); return; }
          onLocationPrefsChanged();
          renderSettingsPage();
          toast(t('mapLocated'));
        },
      }),
      el('button', {
        class: 'set-btn', type: 'button', text: t('mapChooseArea'),
        onclick: () => openLocationPicker({
          title: t('mapAreaTitle'),
          hint: t('mapAreaHint'),
          confirmLabel: t('mapChooseArea'),
          initial: home || undefined,
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
        }),
      })
    ),
    infoRow(t('settingsHomeArea'), home ? shortLabel(home.label) : t('settingsHomeNone'), t('settingsHomeAreaHint'))
  );

  // ── Language ───────────────────────────────────────────────
  const languageCard = card(t('settingsLanguage'),
    el('div', { class: 'seg' },
      ...['EN', 'NY'].map(code => el('button', {
        class: 'seg-btn' + (lang === code ? ' active' : ''),
        type: 'button',
        text: code === 'EN' ? 'English' : 'Chichewa',
        onclick: () => setLang(code),
      }))
    )
  );

  // ── Notifications & data (need a profile row) ──────────────
  let notificationsCard;
  let dataCard;

  if (user && profile) {
    notificationsCard = card(t('settingsNotifications'),
      switchRow({
        title: t('smsAlertsLbl'),
        hint: t('settingsSmsHint'),
        checked: profile.sms_alerts,
        onChange: (on) => saveSetting(user.id, { sms_alerts: on }),
      })
    );
    dataCard = card(t('settingsData'),
      switchRow({
        title: t('dataSaverLbl'),
        hint: t('settingsDataSaverHint'),
        checked: profile.data_saver,
        onChange: (on) => saveSetting(user.id, { data_saver: on }),
      })
    );
  } else {
    notificationsCard = card(t('settingsNotifications'),
      el('p', { class: 'set-hint-p', text: t('settingsSignInHint') }),
      el('button', { class: 'primary', text: t('settingsSignIn'), onclick: () => openAuthModal('signin') })
    );
  }

  // ── Account ────────────────────────────────────────────────
  const accountCard = card(t('settingsAccount'),
    user
      ? el('div', {},
          infoRow(user.email || t('settingsAccount'), profile?.full_name || ''),
          el('div', { class: 'set-actions' },
            el('button', {
              class: 'set-btn danger', type: 'button', text: t('settingsSignOut'),
              onclick: () => { if (confirm('Sign out of PickAGig?')) signOut(); },
            })
          )
        )
      : el('button', { class: 'primary', text: t('settingsSignIn'), onclick: () => openAuthModal('signin') })
  );

  const aboutCard = card(t('settingsAbout'),
    infoRow('PickAGig', t('settingsVersion') + ' ' + APP_VERSION)
  );

  container.appendChild(el('div', { class: 'set-container' },
    header,
    locationCard,
    notificationsCard,
    languageCard,
    dataCard,
    accountCard,
    aboutCard
  ));
}
