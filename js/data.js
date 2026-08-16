/* ============================================================
   PickAGig — data.js
   Seed/demo data, localStorage persistence helpers, and the
   single shared app `state` object.
   ============================================================ */

export const BLANTYRE_CENTER = [-15.7861, 35.0058];
export const RADIUS_KM = 5;

export const SEED_GIGS = [
  {
    id: 1, cat: 'Plumbing',
    title: 'Toilet leaking - urgent plumber needed',
    place: 'Namiwawa, Blantyre', time: 'Today, 14:00', duration: '3 hours',
    pay: 'MK 20,000', payType: 'total', people: 1, applied: 3, km: 0.8,
    urgent: true, lat: -15.800, lng: 35.009,
    posterInitials: 'PM', posterName: 'Peter Mwale'
  },
  {
    id: 2, cat: 'Farm Labour',
    title: 'Need 2 people to clear a field tomorrow',
    place: 'Chilomoni, Blantyre', time: 'Tomorrow, 06:30', duration: '1 day',
    pay: 'MK 12,000', payType: 'per person', people: 2, applied: 5, km: 1.2,
    urgent: true, lat: -15.823, lng: 35.018,
    posterInitials: 'GB', posterName: 'Grace Banda'
  },
  {
    id: 3, cat: 'Gardening',
    title: 'Lawn mowing and hedge trimming',
    place: 'Sunnyside', time: 'Today, 15:30', duration: '3 hours',
    pay: 'MK 7,000', payType: 'total', people: 1, applied: 6, km: 1.9,
    urgent: false, lat: -15.786, lng: 35.006,
    posterInitials: 'ZT', posterName: 'Zikomo Traders'
  }
];

export const HISTORY = [
  { title: "Painted 2 bedrooms in Nyambadwe", pay: "MK 38,000", when: "Aug 2026", rating: 5 },
  { title: "Office cleaning, Ginnery Corner", pay: "MK 8,000", when: "Jul 2026", rating: 5 },
  { title: "Furniture moving, Zingwangwa", pay: "MK 10,000", when: "Jul 2026", rating: 4 },
];

export const WORKERS = [
  { id: 'w1', name: 'James M.', rating: 4.9, skills: ['Plumbing'] },
  { id: 'w2', name: 'Alice K.', rating: 4.8, skills: ['Cleaning'] },
  { id: 'w3', name: 'John B.', rating: 4.7, skills: ['Construction'] }
];

export const LS = {
  getGigs()    { return JSON.parse(localStorage.getItem('pg_gigs'))    ?? [...SEED_GIGS]; },
  setGigs(v)   { localStorage.setItem('pg_gigs',    JSON.stringify(v)); },
  getProfile() {
    return JSON.parse(localStorage.getItem('pg_profile')) ?? {
      name: 'Thoko Phiri', headline: 'Professional painter and cleaner',
      phone: '0991234567', location: 'Ndirande', rating: '4.8', jobsDone: 14, rateMK: 'MK 12,000/day',
      credentials: ['TEVETA Grade 1 Painter'], skills: ['Painting', 'Cleaning'],
      smsAlerts: true, pushAlerts: true, dataSaver: true
    };
  },
  setProfile(v){ localStorage.setItem('pg_profile', JSON.stringify(v)); },
  getChats()   { return JSON.parse(localStorage.getItem('pg_chats'))   ?? []; },
  setChats(v)  { localStorage.setItem('pg_chats',   JSON.stringify(v)); },
  getApplied() { return JSON.parse(localStorage.getItem('pg_applied')) ?? []; },
  setApplied(v){ localStorage.setItem('pg_applied', JSON.stringify(v)); },
};

// Shared, mutable app state. Import this same object anywhere it's
// needed and mutate its properties directly (don't reassign the
// whole object) so every module sees the same values.
export const state = {
  selectedCat: 'All',
  query:       '',
  page:        'gigs',
  leafletMap:  null,
  mapMarkers:  [],
  gigsCache:   [],    // gigs loaded from Supabase, transformed for the UI
  gigsLoaded:  false, // true once loadGigs() has fetched at least once
};
