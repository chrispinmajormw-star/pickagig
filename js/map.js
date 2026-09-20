/* ============================================================
   PickAGig — map.js
   Leaflet map setup, location controls, and gig marker rendering.
   The map works anywhere: it centres on a real GPS fix, or on the
   area the user chose, and offers a picker when neither exists
   rather than defaulting to one city.
   ============================================================ */

import { el, toast } from './ui-helpers.js';
import { t } from './i18n.js';
import { state, DEFAULT_CENTER, DEFAULT_ZOOM, KNOWN_ZOOM } from './data.js';
import { getFilteredGigs, openGigDetail, renderGigs } from './gigs.js';
import {
  getUserLocation, locationIsKnown, needsAreaChoice, getRadiusKm,
  requestUserLocation, setHomeLocation,
} from './geo.js';
import { openLocationPicker } from './location-picker.js';
import { updateLocationText } from './main.js';

let youMarker = null;
let radiusCircle = null;

export function initMap() {
  if (!window.L) return;

  renderControls();
  updateMapSubtitle();

  if (state.leafletMap) {
    state.leafletMap.invalidateSize();
    updateLocationLayer();
    refreshMapMarkers();
    return;
  }

  const loc = getUserLocation();
  const known = locationIsKnown(loc);
  state.leafletMap = L.map('map').setView(
    known ? [loc.lat, loc.lng] : DEFAULT_CENTER,
    known ? KNOWN_ZOOM : DEFAULT_ZOOM
  );
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(state.leafletMap);

  updateLocationLayer();
  refreshMapMarkers();
}

// Redraws the "you are here" dot and the radius circle to match the
// current location and search radius. Both are skipped entirely when
// no location is known yet.
function updateLocationLayer() {
  const map = state.leafletMap;
  if (!map) return;

  if (youMarker)    { youMarker.remove();    youMarker = null; }
  if (radiusCircle) { radiusCircle.remove(); radiusCircle = null; }

  const loc = getUserLocation();
  if (!locationIsKnown(loc)) return;

  const center = [loc.lat, loc.lng];
  radiusCircle = L.circle(center, {
    radius: getRadiusKm() * 1000,
    color: '#f97316', fillColor: '#f97316', fillOpacity: 0.05, weight: 1.5,
  }).addTo(map);

  const youIcon = L.divIcon({
    className: '',
    html: `<div style="width:16px;height:16px;background:#2563eb;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.3);"></div>`,
    iconSize: [16, 16], iconAnchor: [8, 8],
  });
  youMarker = L.marker(center, { icon: youIcon }).addTo(map)
    .bindPopup(loc.isFallback ? 'Approximate location' : 'You are here');
}

function placeLabel(loc) {
  return loc.label || `${loc.lat.toFixed(3)}, ${loc.lng.toFixed(3)}`;
}

function renderControls() {
  const bar = document.getElementById('mapControls');
  if (!bar) return;
  bar.textContent = '';

  const loc = getUserLocation();
  const known = locationIsKnown(loc);

  if (!known) {
    bar.appendChild(el('div', { class: 'map-prompt' },
      el('span', { text: t('mapSubtitleUnknown') }),
      el('button', { class: 'primary map-prompt-btn', text: t('mapChooseArea'), onclick: chooseArea })
    ));
  }

  bar.appendChild(el('div', { class: 'map-ctl-row' },
    el('button', { class: 'map-ctl', type: 'button', onclick: centerOnMyLocation },
      el('span', { class: 'map-ctl-ico', text: '◎' }),
      document.createTextNode(t('mapUseMyLocation'))
    ),
    el('button', { class: 'map-ctl', type: 'button', onclick: chooseArea },
      el('span', { class: 'map-ctl-ico', text: '⌖' }),
      document.createTextNode(t('mapChooseArea'))
    ),
    known ? el('span', { class: 'map-ctl-label', text: t('mapNear', { place: placeLabel(loc) }) }) : null
  ));
}

export function updateMapSubtitle() {
  const sub = document.getElementById('panelPageSub');
  if (!sub) return;
  sub.textContent = locationIsKnown()
    ? t('mapSubtitle', { km: getRadiusKm() })
    : t('mapSubtitleUnknown');
}

// Called after the radius or home area changes elsewhere (Settings).
export function onLocationPrefsChanged() {
  if (state.page === 'map') {
    const loc = getUserLocation();
    if (state.leafletMap && locationIsKnown(loc)) {
      state.leafletMap.setView([loc.lat, loc.lng], KNOWN_ZOOM);
    }
    updateLocationLayer();
    refreshMapMarkers();
    renderControls();
    updateMapSubtitle();
  }
  updateLocationText();
  renderGigs();
}

async function centerOnMyLocation() {
  toast(t('mapLocating'));
  await requestUserLocation();
  const loc = getUserLocation();

  if (!locationIsKnown(loc)) {
    toast(t('mapNoGps'));
    chooseArea();
    return;
  }
  if (state.leafletMap) state.leafletMap.setView([loc.lat, loc.lng], KNOWN_ZOOM);
  updateLocationLayer();
  refreshMapMarkers();
  renderControls();
  updateMapSubtitle();
  updateLocationText();
  renderGigs();
  toast(t('mapLocated'));
}

function chooseArea() {
  openLocationPicker({
    title: t('mapAreaTitle'),
    hint: t('mapAreaHint'),
    confirmLabel: t('mapChooseArea'),
    onConfirm: (picked) => {
      setHomeLocation(picked);
      state.userLocation = {
        lat: picked.lat, lng: picked.lng, label: picked.label,
        isFallback: true, unknown: false,
      };
      if (state.leafletMap) state.leafletMap.setView([picked.lat, picked.lng], KNOWN_ZOOM);
      updateLocationLayer();
      refreshMapMarkers();
      renderControls();
      updateMapSubtitle();
      updateLocationText();
      renderGigs();
      toast(t('mapNear', { place: picked.label }));
    },
  });
}

export function refreshMapMarkers() {
  if (!state.leafletMap) return;
  state.mapMarkers.forEach(m => m.remove());
  state.mapMarkers = [];
  const gigs = getFilteredGigs();
  gigs.forEach(gig => {
    if (!gig.lat || !gig.lng) return;
    const colour = gig.urgent ? '#f97316' : '#1a2550';
    const icon = L.divIcon({
      className: '',
      html: `<div style="width:34px;height:34px;background:${colour};border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,.22);"></div>`,
      iconSize: [34, 34], iconAnchor: [17, 34],
    });
    const marker = L.marker([gig.lat, gig.lng], { icon }).addTo(state.leafletMap);

    const popupWrap = el('div', { style: 'min-width: 160px;' },
      el('strong', { text: gig.title, style: 'display:block;margin-bottom:4px;' }),
      el('button', {
        text: 'View Gig',
        style: 'width:100%;padding:6px;background:var(--orange);color:white;border:0;border-radius:6px;cursor:pointer;',
        onclick: () => {
          state.leafletMap.closePopup();
          openGigDetail(gig);
        },
      })
    );
    marker.bindPopup(popupWrap);
    state.mapMarkers.push(marker);
  });
}
