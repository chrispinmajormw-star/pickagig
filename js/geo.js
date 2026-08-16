/* ============================================================
   PickAGig — geo.js
   Gets the user's real location from the browser (falling back
   to central Blantyre if they decline or it's unavailable), and
   provides the shared haversine distance helper.
   ============================================================ */

import { state, BLANTYRE_CENTER } from './data.js';
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

// Call once at startup. Resolves once we either have a real
// position or have given up and fallen back to Blantyre.
export function requestUserLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      state.userLocation = { lat: BLANTYRE_CENTER[0], lng: BLANTYRE_CENTER[1], isFallback: true };
      resolve(state.userLocation);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        state.userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude, isFallback: false };
        resolve(state.userLocation);
      },
      () => {
        state.userLocation = { lat: BLANTYRE_CENTER[0], lng: BLANTYRE_CENTER[1], isFallback: true };
        toast('Could not get your location — showing gigs near Blantyre instead.');
        resolve(state.userLocation);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  });
}

export function getUserLocation() {
  return state.userLocation || { lat: BLANTYRE_CENTER[0], lng: BLANTYRE_CENTER[1], isFallback: true };
}
