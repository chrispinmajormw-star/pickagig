/* ============================================================
   PickAGig — location-picker.js
   A reusable "choose a spot anywhere in the world" modal:
   place search (OpenStreetMap Nominatim) plus a draggable pin on
   a Leaflet map. Used both for picking a home area and for
   pinpointing where a gig happens.
   ============================================================ */

import { el, toast, openModal, closeModal } from './ui-helpers.js';
import { DEFAULT_CENTER, DEFAULT_ZOOM, KNOWN_ZOOM } from './data.js';
import { getUserLocation, locationIsKnown, searchPlaces, reverseGeocode, shortLabel } from './geo.js';

// Each picker gets a fresh container id: the previous Leaflet
// instance may not have been torn down (the sheet's × button just
// hides the modal), and reusing an id would throw
// "Map container is already initialized".
let pickerSeq = 0;

function pinIcon(colour = '#f97316') {
  return L.divIcon({
    className: '',
    html: `<div style="width:34px;height:34px;background:${colour};border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,.3);"></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
  });
}

export function openLocationPicker(opts = {}) {
  const {
    title        = 'Choose location',
    hint         = 'Search for a place, or drag the pin to the exact spot.',
    initial      = null,
    confirmLabel = 'Confirm',
    onConfirm    = () => {},
  } = opts;

  if (!window.L) {
    toast('The map is still loading — try again in a moment.');
    return;
  }

  const mapId = 'pickMap' + (++pickerSeq);
  const known = locationIsKnown();
  const start = initial || (known ? getUserLocation() : null);

  // Assigned once the sheet is on screen and Leaflet has a sized
  // container to work with (see the requestAnimationFrame below).
  let marker = null;

  const searchInput = el('input', {
    class: 'picker-search',
    type: 'search',
    autocomplete: 'off',
    placeholder: 'Search any city or area…',
  });
  const results = el('div', { class: 'picker-results' });
  const mapNode = el('div', { class: 'picker-map', id: mapId });
  const chosenLabel = el('div', {
    class: 'picker-chosen',
    text: start?.label || (start ? `${start.lat.toFixed(4)}, ${start.lng.toFixed(4)}` : 'Drag the pin to choose'),
  });

  const confirmBtn = el('button', {
    class: 'primary',
    text: confirmLabel,
    onclick: async () => {
      const ll = marker.getLatLng();
      confirmBtn.disabled = true;
      confirmBtn.textContent = 'Locating…';
      const label = shortLabel(await reverseGeocode(ll.lat, ll.lng))
                 || `${ll.lat.toFixed(4)}, ${ll.lng.toFixed(4)}`;
      confirmBtn.disabled = false;
      confirmBtn.textContent = confirmLabel;
      closeModal();
      onConfirm({ lat: ll.lat, lng: ll.lng, label });
    },
  });

  let searchTimer = null;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    const q = searchInput.value.trim();
    if (q.length < 3) { results.textContent = ''; return; }
    searchTimer = setTimeout(async () => {
      const places = await searchPlaces(q);
      results.textContent = '';
      if (!places.length) {
        results.appendChild(el('div', { class: 'picker-empty', text: 'No matches — drag the pin instead.' }));
        return;
      }
      places.forEach(p => results.appendChild(el('button', {
        class: 'picker-result',
        type: 'button',
        onclick: () => {
          map.setView([p.lat, p.lng], KNOWN_ZOOM);
          marker.setLatLng([p.lat, p.lng]);
          chosenLabel.textContent = shortLabel(p.label);
          results.textContent = '';
          searchInput.value = '';
        },
      }, shortLabel(p.label))));
    }, 450);
  });

  openModal(el('div', { class: 'picker' },
    el('h2', { text: title }),
    el('p', { class: 'picker-hint', text: hint }),
    searchInput,
    results,
    mapNode,
    chosenLabel,
    el('div', { class: 'picker-actions' },
      el('button', { class: 'picker-cancel', type: 'button', text: 'Cancel', onclick: () => closeModal() }),
      confirmBtn
    )
  ));

  // openModal() already applied `.show`, and .picker-map has a fixed
  // CSS height, so Leaflet can be built synchronously. Do NOT defer
  // this to requestAnimationFrame: rAF is paused in hidden tabs, so
  // the map would never appear. invalidateSize() afterwards picks up
  // the real dimensions once the sheet has finished laying out.
  const center = start ? [start.lat, start.lng] : DEFAULT_CENTER;
  const map = L.map(mapId).setView(center, start ? KNOWN_ZOOM : DEFAULT_ZOOM);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  marker = L.marker(center, { icon: pinIcon(), draggable: true }).addTo(map);
  marker.on('dragend', () => {
    const ll = marker.getLatLng();
    chosenLabel.textContent = `${ll.lat.toFixed(4)}, ${ll.lng.toFixed(4)}`;
  });
  map.on('click', (e) => {
    marker.setLatLng(e.latlng);
    chosenLabel.textContent = `${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`;
  });

  setTimeout(() => map.invalidateSize(), 150);
}
