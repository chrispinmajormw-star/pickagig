/* ============================================================
   PickAGig — app.js (Redesigned)
   ============================================================ */

// ─────────────────────────────────────────────────────────────
// SECTION 1 · i18n — Translation Strings
// ─────────────────────────────────────────────────────────────
const STRINGS = {
  EN: {
    tagline:             'Pick your next gig. Nearby.',
    searchPlaceholder:   'Search gigs, e.g. plumbing',
    withinRadius:        'Within 5km of Sunnyside, Blantyre',
    gigsNearYou:         'Gigs near you',
    mapLink:             'Map →',
    urgent:              'Urgent',
    applied:             'applied',
    pickThisGig:         'Pick this gig',
    applicationSent:     '✓ Application sent',
    noGigs:              'No gigs match your search.',
    peopleSingular:      'person needed',
    peoplePlural:        'people needed',
    postTitle:           'Post a Gig',
    gigTitleLabel:       'Gig title',
    categoryLabel:       'Category',
    locationLabel:       'Location',
    payLabel:            'Pay',
    detailsLabel:        'Details',
    publishBtn:          'Publish gig',
    gigPosted:           'Your gig has been posted!',
    noTitle:             'Add a gig title first.',
    profileTitle:        'Profile',
    nameLabel:           'Full name',
    phoneLabel:          'Phone number',
    skillsLabel:         'Your skills',
    areaLabel:           'Your area',
    saveBtn:             'Save profile',
    profileSaved:        'Profile saved!',
    profileRequired:     'Fill in your profile before applying.',
    settingsTitle:       'Settings',
    smsAlertsLbl:        'SMS Alerts (New Gigs)',
    pushAlertsLbl:       'Push Notifications',
    chatsTitle:          'Messages',
    chatsSub:            'Confirm the details before you travel',
    noChats:             'No active chats yet.',
    sendPlaceholder:     'Type a message…',
    sendBtn:             'Send',
    navGigs:             'Gigs',
    navMap:              'Map',
    navPost:             'Post',
    navChats:            'Chats',
    navProfile:          'Profile',
    mapTitle:            'Gig Map',
    mapSubtitle:         'Gigs within 5km · Tap a pin to view.',
    All:                 'All',
    Construction:        'Construction',
    Gardening:           'Gardening',
    Cleaning:            'Cleaning',
    Plumbing:            'Plumbing',
    Electrical:          'Electrical',
    Painting:            'Painting',
    Moving:              'Moving',
    'Farm Labour':       'Farm Labour',
    Catering:            'Catering',
    Domestic:            'Domestic',
    autoReply1:          'Thanks for your interest! We\'ll be in touch shortly.',
    autoReply2:          'Great — can you confirm your availability?',
    autoReply3:          'Please bring your own tools if you have them.',
    autoReply4:          'We\'ll send you the full address on the day.',
  },
  NY: {
    tagline:             'Sankhani ntchito yanu. Pafupi.',
    searchPlaceholder:   'Sakani ntchito, mwachitsanzo mapaipi',
    withinRadius:        'Mkati mwa 5km wa Sunnyside, Blantyre',
    gigsNearYou:         'Ntchito pafupi ndi inu',
    mapLink:             'Mapu →',
    urgent:              'Mwachangu',
    applied:             'apempho',
    pickThisGig:         'Sankhani ntchito iyi',
    applicationSent:     '✓ Pempho lapita',
    noGigs:              'Palibe ntchito yomwe ikugwirizana.',
    peopleSingular:      'munthu akufunika',
    peoplePlural:        'anthu akufunika',
    postTitle:           'Ikani Ntchito',
    gigTitleLabel:       'Dzina la ntchito',
    categoryLabel:       'Mtundu',
    locationLabel:       'Malo',
    payLabel:            'Ndalama',
    detailsLabel:        'Mfundo',
    publishBtn:          'Tumizirani ntchito',
    gigPosted:           'Ntchito yanu yatumiziridwa!',
    noTitle:             'Onjezerani dzina la ntchito kaye.',
    profileTitle:        'Mbiri',
    nameLabel:           'Dzina lonse',
    phoneLabel:          'Nambala ya foni',
    skillsLabel:         'Luso lanu',
    areaLabel:           'Dera lanu',
    saveBtn:             'Sungani mbiri',
    profileSaved:        'Mbiri yasungidwa!',
    profileRequired:     'Chonde mdzaze mbiri yanu musanapemphe ntchito.',
    settingsTitle:       'Zokonda',
    smsAlertsLbl:        'Mauthenga a SMS (Ntchito Zatsopano)',
    pushAlertsLbl:       'Zidziwitso za Push',
    chatsTitle:          'Mauthenga',
    chatsSub:            'Thibitsani zambiri musanayende',
    noChats:             'Palibe zokambirana.',
    sendPlaceholder:     'Lembani uthenga…',
    sendBtn:             'Tumizani',
    navGigs:             'Ntchito',
    navMap:              'Mapu',
    navPost:             'Ikani',
    navChats:            'Kukambirana',
    navProfile:          'Mbiri',
    mapTitle:            'Mapu a Ntchito',
    mapSubtitle:         'Ntchito mkati mwa 5km · Dotani chizindikiro.',
    All:                 'Zonse',
    Construction:        'Zimbutu',
    Gardening:           'Ulimi wa Munda',
    Cleaning:            'Kusakaniza',
    Plumbing:            'Mapaipi',
    Electrical:          'Magetsi',
    Painting:            'Kuphaka',
    Moving:              'Kuthuthumutsa',
    'Farm Labour':       'Ntchito ya Ulimi',
    Catering:            'Zokonzera Chakudya',
    Domestic:            'Ntchito ya Pakhomo',
    autoReply1:          'Zikomo chifukwa cha chidwi chanu!',
    autoReply2:          'Zabwino — mungathibitisire kuti muli nawo nthawi?',
    autoReply3:          'Chonde bweletsani zida zanu ngati mulina.',
    autoReply4:          'Tidzakutumizani adilesi yonse pa tsiku la ntchito.',
  }
};

const CAT_ICONS = {
  'All': '',
  'Construction': '⛑️',
  'Gardening': '🌱',
  'Cleaning': '✨',
  'Plumbing': '🔧',
  'Electrical': '⚡',
  'Painting': '🎨',
  'Moving': '📦',
  'Farm Labour': '🌾',
  'Catering': '🍲',
  'Domestic': '🧹'
};

const BLANTYRE_CENTER = [-15.7861, 35.0058];
const RADIUS_KM = 5;

const SEED_GIGS = [
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

const HISTORY = [
  { title: "Painted 2 bedrooms in Nyambadwe", pay: "MK 38,000", when: "Aug 2026", rating: 5 },
  { title: "Office cleaning, Ginnery Corner", pay: "MK 8,000", when: "Jul 2026", rating: 5 },
  { title: "Furniture moving, Zingwangwa", pay: "MK 10,000", when: "Jul 2026", rating: 4 },
];

const WORKERS = [
  { id: 'w1', name: 'James M.', rating: 4.9, skills: ['Plumbing'] },
  { id: 'w2', name: 'Alice K.', rating: 4.8, skills: ['Cleaning'] },
  { id: 'w3', name: 'John B.', rating: 4.7, skills: ['Construction'] }
];

const LS = {
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

let lang  = localStorage.getItem('pg_lang') || 'EN';
let state = {
  selectedCat: 'All',
  query:       '',
  page:        'gigs',
  leafletMap:  null,
  mapMarkers:  [],
};

function t(key) { return STRINGS[lang]?.[key] ?? STRINGS.EN[key] ?? key; }
function tCat(cat) { return t(cat); }

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null) continue;
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'style') node.style.cssText = v;
    else if (k === 'value') node.value = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  for (const child of children) {
    if (child == null) continue;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

function toast(msg) {
  const node = document.getElementById('toast');
  node.textContent = msg;
  node.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => node.classList.remove('show'), 2600);
}

function openModal(domNode) {
  const content = document.getElementById('modalContent');
  content.textContent = '';
  content.appendChild(domNode);
  document.getElementById('modal').classList.add('show');
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
}

function renderFilters() {
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

function getFilteredGigs() {
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

function openGigDetail(gig) {
  const isApplied = LS.getApplied().includes(gig.id);
  const btn = el('button', {
    class: 'detail-apply' + (isApplied ? ' applied' : ''),
    text: isApplied ? t('applicationSent') : t('pickThisGig'),
    onclick: () => {
      if (isApplied) return;
      const profile = LS.getProfile();
      if (!profile.name) {
        toast(t('profileRequired'));
        openProfile();
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

function renderGigs() {
  const grid  = document.getElementById('gigsGrid');
  const empty = document.getElementById('gigsEmpty');
  if (!grid) return;
  grid.textContent = '';
  const list = getFilteredGigs();
  list.forEach(g => grid.appendChild(buildGigCard(g)));
  empty.style.display   = list.length ? 'none' : 'block';
  empty.textContent     = t('noGigs');
}

function applyToGig(gig) {
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

function openPost() {
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

function publishGig() {
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

function initMap() {
  if (!window.L) return;
  if (state.leafletMap) {
    state.leafletMap.invalidateSize();
    refreshMapMarkers();
    return;
  }
  state.leafletMap = L.map('map').setView(BLANTYRE_CENTER, 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(state.leafletMap);
  L.circle(BLANTYRE_CENTER, {
    radius: RADIUS_KM * 1000, color: '#f97316', fillColor: '#f97316', fillOpacity: 0.05, weight: 1.5,
  }).addTo(state.leafletMap);
  refreshMapMarkers();
}

function refreshMapMarkers() {
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

function renderChatsList() {
  const chats = LS.getChats();
  const chatsList = document.getElementById('chatsList');
  if (!chatsList) return;
  chatsList.textContent = '';
  if (chats.length === 0) {
    chatsList.appendChild(el('div', { class: 'chats-empty', text: t('noChats') }));
    return;
  }
  const list = el('div', { class: 'chat-list' });
  chats.forEach(chat => {
    const lastMsg = chat.messages[chat.messages.length - 1];
    
    list.appendChild(el('div', { class: 'chat-item', onclick: () => openChatThread(chat.gigId) },
      el('div', { class: 'chat-avatar', text: chat.posterInitials }),
      el('div', { class: 'chat-item-middle' },
        el('div', { class: 'chat-name-row' },
          el('div', { class: 'chat-name', text: chat.posterName }),
          el('div', { class: 'chat-verified', html: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'})
        ),
        el('div', { class: 'chat-preview', text: lastMsg?.text ?? '' })
      ),
      el('div', { class: 'chat-item-right' },
        el('div', { class: 'chat-time', text: '12:41' }), // Mock time
        chat.messages.length > 1 ? el('div', { class: 'unread-badge', text: chat.messages.length - 1 }) : null
      )
    ));
  });
  chatsList.appendChild(list);
}

function openChatThread(gigId) {
  const chat = LS.getChats().find(c => c.gigId === gigId);
  if (!chat) return;

  const threadEl = el('div', { class: 'chat-thread' });
  const renderMessages = () => {
    threadEl.textContent = '';
    const fresh = LS.getChats().find(c => c.gigId === gigId);
    fresh.messages.forEach(msg => {
      const cls = msg.sender === 'me' ? 'bubble-wrap me' : 'bubble-wrap them';
      threadEl.appendChild(el('div', { class: cls },
        el('div', { class: 'bubble', text: msg.text })
      ));
    });
    threadEl.scrollTop = threadEl.scrollHeight;
  };

  renderMessages();
  const msgInput = el('input', { type: 'text', placeholder: t('sendPlaceholder') });
  const sendMsg = () => {
    const text = msgInput.value.trim();
    if (!text) return;
    const chats = LS.getChats();
    const c = chats.find(x => x.gigId === gigId);
    c.messages.push({ sender: 'me', text, ts: Date.now() });
    LS.setChats(chats);
    msgInput.value = '';
    renderMessages();
    setTimeout(() => {
      const chats2 = LS.getChats();
      const c2 = chats2.find(x => x.gigId === gigId);
      c2.messages.push({ sender: 'them', text: 'Okay.', ts: Date.now() });
      LS.setChats(chats2);
      renderMessages();
    }, 1500);
  };
  msgInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });

  openModal(el('div', {},
    el('h2', { text: chat.posterName }),
    threadEl,
    el('div', { class: 'chat-input-row' },
      msgInput,
      el('button', { text: t('sendBtn'), onclick: sendMsg })
    )
  ));
}

function openProfile() {
  const profile = LS.getProfile();
  const initial = (profile.name || '?').charAt(0).toUpperCase();

  const header = el('div', { class: 'pf-header' },
    el('div', { class: 'pf-header-top' },
      el('div', { class: 'pf-avatar' }, initial),
      el('div', { class: 'pf-info' },
        el('div', { class: 'pf-name-row' },
          el('span', { class: 'pf-name', text: profile.name }),
          el('span', { class: 'pf-verified', html: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' })
        ),
        el('div', { class: 'pf-headline', text: profile.headline || '' }),
        el('div', { class: 'pf-meta' },
          el('span', { text: '📍 ' + (profile.location || '') }),
          el('span', { text: '📞 ' + (profile.phone || '') })
        )
      )
    ),
    el('div', { class: 'pf-stats' },
      el('div', { class: 'pf-stat' }, el('div', { class: 'pf-stat-val', text: '★ ' + profile.rating }), el('div', { class: 'pf-stat-lbl', text: t('rating') || 'Rating' })),
      el('div', { class: 'pf-stat' }, el('div', { class: 'pf-stat-val', text: profile.jobsDone }), el('div', { class: 'pf-stat-lbl', text: t('gigsDone') || 'Gigs Done' })),
      el('div', { class: 'pf-stat' }, el('div', { class: 'pf-stat-val', text: profile.rateMK }), el('div', { class: 'pf-stat-lbl', text: 'Daily Rate' }))
    )
  );

  const skillsBox = el('div', { class: 'pf-card' },
    el('h3', { text: t('skillsLabel') || 'Skills' }),
    el('div', { class: 'pf-skills-list' },
      ...Object.keys(CAT_ICONS).slice(1).map(cat => {
        const has = profile.skills.includes(cat);
        return el('span', { class: 'pf-skill-pill' + (has ? ' active' : ''), onclick: function() { this.classList.toggle('active'); } }, CAT_ICONS[cat] + ' ' + tCat(cat));
      })
    )
  );

  const credBox = el('div', { class: 'pf-card' },
    el('h3', { text: 'Credentials' }),
    el('ul', { class: 'pf-cred-list' },
      ...profile.credentials.map(c => el('li', { text: '🛡️ ' + c }))
    ),
    el('button', { class: 'pf-upload-btn', text: '+ Upload certificate or National ID' })
  );

  const histBox = el('div', { class: 'pf-card' },
    el('h3', { text: 'History' }),
    el('div', { class: 'pf-hist-list' },
      ...HISTORY.map(h => el('div', { class: 'pf-hist-item' },
        el('div', {},
          el('div', { class: 'pf-hist-title', text: h.title }),
          el('div', { class: 'pf-hist-when', text: h.when })
        ),
        el('div', { class: 'pf-hist-right' },
          el('div', { class: 'pf-hist-pay', text: h.pay }),
          el('div', { class: 'pf-hist-rating', text: '★ ' + h.rating + '.0' })
        )
      ))
    )
  );

  const premiumBox = el('div', { class: 'pf-premium' },
    el('div', { class: 'pf-prem-title', text: '👑 Premium — MK 1,500 / week' }),
    el('ul', { class: 'pf-prem-list' },
      el('li', { text: '• Boosted profile at the top of employer searches' }),
      el('li', { text: '• Priority gig alerts by SMS, even offline' }),
      el('li', { text: '• Hand-picked high-paying gigs' }),
      el('li', { text: '• Lower transaction fee on escrow payouts' })
    ),
    el('button', { class: 'pf-prem-btn', text: 'Subscribe with Airtel Money' })
  );

  const leaderboardBox = el('div', { class: 'pf-card' },
    el('h3', { text: 'Community leaderboard' }),
    el('div', { class: 'pf-lb-list' },
      ...WORKERS.map((w, i) => el('div', { class: 'pf-lb-item' },
        el('div', { class: 'pf-lb-rank' + (i === 0 ? ' top' : ''), text: i + 1 }),
        el('div', { class: 'pf-lb-name', text: w.name }),
        el('div', { class: 'pf-lb-meta', text: '★ ' + w.rating + ' · ' + tCat(w.skills[0]) })
      ))
    ),
    el('div', { class: 'pf-lb-footer', text: '🏆 Top workers featured every week' })
  );

  const settingsBox = el('div', { class: 'pf-card' },
    el('h3', { text: 'Settings' }),
    el('label', { class: 'pf-toggle' },
      el('div', {}, el('strong', { text: 'SMS Alerts' }), el('div', { class: 'pf-toggle-hint', text: 'Get gig alerts by SMS when data is off' })),
      el('input', { type: 'checkbox', checked: profile.smsAlerts })
    ),
    el('label', { class: 'pf-toggle' },
      el('div', {}, el('strong', { text: 'Data Saver' }), el('div', { class: 'pf-toggle-hint', text: 'Cache gigs and sync later' })),
      el('input', { type: 'checkbox', checked: profile.dataSaver })
    )
  );

  const refBox = el('div', { class: 'pf-card' },
    el('h3', { text: 'Referrals' }),
    el('p', { class: 'pf-ref-p', text: '🎁 Refer a friend and earn MK 500 when they complete their first gig.' }),
    el('div', { class: 'pf-ref-box' },
      el('span', { class: 'pf-ref-code', text: 'THOKO500' }),
      el('button', { class: 'pf-ref-btn', text: 'Share code' })
    )
  );

  openModal(el('div', { class: 'pf-container' },
    header,
    skillsBox,
    credBox,
    histBox,
    premiumBox,
    leaderboardBox,
    settingsBox,
    refBox
  ));
}

function setLang(l) {
  lang = l;
  localStorage.setItem('pg_lang', l);
  init();
}

function navigate(page) {
  if (page === 'post') {
    openPost();
    return;
  }
  if (page === 'profile') {
    openProfile();
    return;
  }

  state.page = page;

  document.querySelectorAll('.nav').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.nav[data-page="${page}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  const panelBrand = document.getElementById('panelBrand');
  const panelPageHeader = document.getElementById('panelPageHeader');
  const panelGigsBody = document.getElementById('panelGigsBody');
  const filtersBar = document.getElementById('filtersBar');
  const pageGigs = document.getElementById('pageGigs');
  const pageMap = document.getElementById('pageMap');
  const pageChats = document.getElementById('pageChats');

  panelBrand.style.display = 'none';
  panelPageHeader.style.display = 'none';
  panelGigsBody.style.display = 'none';
  filtersBar.style.display = 'none';
  pageGigs.style.display = 'none';
  pageMap.style.display = 'none';
  pageChats.style.display = 'none';

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
  }
}

function init() {
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

  navigate(state.page === 'post' || state.page === 'profile' ? 'gigs' : state.page);
}

function onSearch(val) {
  state.query = val;
  renderGigs();
}

window.addEventListener('DOMContentLoaded', init);
