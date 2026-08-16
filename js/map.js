/* ============================================================
   PickAGig — map.js
   Leaflet map setup and gig marker rendering.
   ============================================================ */

import { el } from './ui-helpers.js';
import { state, RADIUS_KM } from './data.js';
import { getFilteredGigs, openGigDetail } from './gigs.js';
import { getUserLocation } from './geo.js';

export function initMap() {
  if (!window.L) return;
  const loc = getUserLocation();
  const center = [loc.lat, loc.lng];

  if (state.leafletMap) {
    state.leafletMap.invalidateSize();
    refreshMapMarkers();
    return;
  }
  state.leafletMap = L.map('map').setView(center, 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(state.leafletMap);
  L.circle(center, {
    radius: RADIUS_KM * 1000, color: '#f97316', fillColor: '#f97316', fillOpacity: 0.05, weight: 1.5,
  }).addTo(state.leafletMap);

  const youIcon = L.divIcon({
    className: '',
    html: `<div style="width:16px;height:16px;background:#2563eb;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.3);"></div>`,
    iconSize: [16, 16], iconAnchor: [8, 8],
  });
  L.marker(center, { icon: youIcon }).addTo(state.leafletMap).bindPopup(loc.isFallback ? 'Approximate location' : 'You are here');

  refreshMapMarkers();
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

    // Bind simple popup using elements
    const popupWrap = el('div', {style: 'min-width: 160px;'},
        el('strong', {text: gig.title, style: 'display:block;margin-bottom:4px;'}),
        el('button', {
            text: 'View Gig',
            style: 'width:100%;padding:6px;background:var(--orange);color:white;border:0;border-radius:6px;cursor:pointer;',
            onclick: () => {
                state.leafletMap.closePopup();
                openGigDetail(gig);
            }
        })
    );
    marker.bindPopup(popupWrap);
    state.mapMarkers.push(marker);
  });
}
