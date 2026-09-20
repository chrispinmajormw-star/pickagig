/* ============================================================
   PickAGig — geo.js
   Resolves where the user is, anywhere in the world:
     1. a real browser GPS fix,
     2. otherwise the home area they previously chose,
     3. otherwise nothing at all — the caller then offers the
        area picker rather than assuming a default city.
   Also owns the search-radius preference, the shared haversine
   helper, and the OpenStreetMap Nominatim geocoding wrappers.
   ============================================================ */

import { state, LS, DEFAULT_RADIUS_KM } from './data.js';
import { toast } from './ui-helpers.js';

export function distanceKm(lat1, lng1, lat2, lng2) {
  if (lat1 == null || lng1 == null || lat2 == null || lng2 == null) return null;
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
}

// ── Preferences (device-local) ───────────────────────────────

export function getRadiusKm() {
  const km = Number(LS.getPrefs().radiusKm);
  return Number.isFinite(km) && km > 0 ? km : DEFAULT_RADIUS_KM;
}

export function setRadiusKm(km) {
  LS.setPrefs({ ...LS.getPrefs(), radiusKm: Number(km) });
}

export function getHomeLocation() {
  return LS.getPrefs().home || null;
}

export function setHomeLocation(home) {
  LS.setPrefs({ ...LS.getPrefs(), home });
}

// ── Current position ─────────────────────────────────────────

// Call once at startup. Resolves with a real GPS fix when the user
// allows it; otherwise falls back to their saved home area.
export function requestUserLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      state.userLocation = fromHome();
      resolve(state.userLocation);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        state.userLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          isFallback: false,
          unknown: false,
        };
        resolve(state.userLocation);
      },
      () => {
        state.userLocation = fromHome();
        if (!state.userLocation.unknown) {
          toast('Using your saved area — turn on location for gig distances.');
        }
        resolve(state.userLocation);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  });
}

function fromHome() {
  const home = getHomeLocation();
  if (home) {
    return { lat: home.lat, lng: home.lng, label: home.label, isFallback: true, unknown: false };
  }
  // Nothing known at all. lat/lng stay null so distance helpers
  // return null and callers can offer the area picker.
  return { lat: null, lng: null, label: null, isFallback: true, unknown: true };
}

// Always returns an object. When `unknown` is true there is no
// position to work from and lat/lng are null.
export function getUserLocation() {
  if (state.userLocation) return state.userLocation;
  state.userLocation = fromHome();
  return state.userLocation;
}

export function locationIsKnown(loc = getUserLocation()) {
  return !loc.unknown && loc.lat != null && loc.lng != null;
}

// True when we have neither a GPS fix nor a saved area — the caller
// should offer the area picker instead of guessing a city.
export function needsAreaChoice() {
  return !locationIsKnown() && !getHomeLocation();
}

// ── Geocoding (OpenStreetMap Nominatim) ──────────────────────
// Nominatim asks for at most one request per second, so serialise
// calls through a queue. Every helper resolves rather than throws:
// geocoding is a convenience, and the map must still work offline.

const NOMINATIM = 'https://nominatim.openstreetmap.org';
let lastCall = 0;
let chain = Promise.resolve();

function throttledFetch(url) {
  const run = chain.then(async () => {
    const wait = Math.max(0, 1100 - (Date.now() - lastCall));
    if (wait) await new Promise(r => setTimeout(r, wait));
    lastCall = Date.now();
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  });
  // Keep the queue alive even when one request fails.
  chain = run.catch(() => {});
  return run;
}

// Returns [{ label, lat, lng }] for a free-text place query.
export async function searchPlaces(query) {
  const q = (query || '').trim();
  if (q.length < 3) return [];
  try {
    const data = await throttledFetch(
      `${NOMINATIM}/search?format=jsonv2&limit=6&addressdetails=1&q=${encodeURIComponent(q)}`
    );
    return (data || [])
      .filter(r => r.lat != null && r.lon != null)
      .map(r => ({ label: r.display_name, lat: Number(r.lat), lng: Number(r.lon) }));
  } catch {
    return [];
  }
}

// Returns a short human-readable label for a coordinate, or null.
export async function reverseGeocode(lat, lng) {
  if (lat == null || lng == null) return null;
  try {
    const data = await throttledFetch(
      `${NOMINATIM}/reverse?format=jsonv2&zoom=14&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}`
    );
    return data?.display_name || null;
  } catch {
    return null;
  }
}

// Trim a full Nominatim display_name down to something that fits a
// card: "Namiwawa, Blantyre, Malawi" rather than the whole address.
export function shortLabel(full) {
  if (!full) return '';
  const parts = full.split(',').map(s => s.trim()).filter(Boolean);
  return parts.slice(0, 3).join(', ');
}
