(() => {
  // js/supabaseClient.js
  var supabaseUrl = "https://gcrpoibvgfgnsqcitmof.supabase.co";
  var supabaseKey = "sb_publishable_nyGAPrUgP9ZYX-Z-8MI_sA_Z_gKzp5P";
  var supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  // js/i18n.js
  var STRINGS = {
    EN: {
      tagline: "Pick your next gig. Nearby.",
      searchPlaceholder: "Search gigs, e.g. plumbing",
      withinRadius: "Within {km}km of you",
      locationUnknown: "Tap to choose your area",
      gigsNearYou: "Gigs near you",
      mapLink: "Map \u2192",
      urgent: "Urgent",
      applied: "applied",
      pickThisGig: "Pick this gig",
      applicationSent: "\u2713 Application sent",
      noGigs: "No gigs match your search.",
      peopleSingular: "person needed",
      peoplePlural: "people needed",
      postTitle: "Post a Gig",
      gigTitleLabel: "Gig title",
      categoryLabel: "Category",
      locationLabel: "Location",
      payLabel: "Pay",
      timeLabel: "When",
      timeLabelPlaceholder: "e.g. Today, 2pm",
      timeLabelFallback: "Flexible time",
      durationLabel: "Duration",
      durationLabelPlaceholder: "e.g. 3 hours",
      durationLabelFallback: "Flexible",
      detailsLabel: "Details",
      publishBtn: "Publish gig",
      gigPosted: "Your gig has been posted!",
      noTitle: "Add a gig title first.",
      markCompleteBtn: "Mark gig as complete",
      cancelGigBtn: "Cancel this gig",
      cancelGigConfirm: "Cancel this gig? It will no longer be visible to workers.",
      gigCancelled: "Gig cancelled.",
      profileTitle: "Profile",
      nameLabel: "Full name",
      phoneLabel: "Phone number",
      skillsLabel: "Your skills",
      areaLabel: "Your area",
      saveBtn: "Save profile",
      profileSaved: "Profile saved!",
      profileRequired: "Fill in your profile before applying.",
      settingsTitle: "Settings",
      smsAlertsLbl: "SMS Alerts (New Gigs)",
      pushAlertsLbl: "Push Notifications",
      chatsTitle: "Messages",
      chatsSub: "Confirm the details before you travel",
      noChats: "No active chats yet.",
      sendPlaceholder: "Type a message\u2026",
      sendBtn: "Send",
      navGigs: "Gigs",
      navMap: "Map",
      navPost: "Post",
      navChats: "Chats",
      navProfile: "Profile",
      navBack: "Back",
      mapTitle: "Gig Map",
      mapSubtitle: "Gigs within {km}km \xB7 Tap a pin to view.",
      mapSubtitleUnknown: "Choose your area to see gigs nearby.",
      mapUseMyLocation: "Use my location",
      mapChooseArea: "Choose area",
      mapLocating: "Finding your location\u2026",
      mapLocated: "Map centred on your location.",
      mapNoGps: "Location unavailable \u2014 pick your area on the map.",
      mapAreaTitle: "Where are you looking for work?",
      mapAreaHint: "Search any city, or drag the pin to your exact spot.",
      mapNear: "Near {place}",
      settingsOpen: "Settings",
      settingsPageSub: "Notifications, location and account",
      settingsOther: "Other settings",
      settingsDarkMode: "Dark mode",
      settingsNotifications: "Notifications",
      settingsSmsHint: "Get gig alerts by SMS when data is off",
      settingsLocation: "Location & search radius",
      settingsRadius: "Search radius",
      settingsRadiusHint: "How far from you to look for gigs",
      settingsHomeArea: "Home area",
      settingsHomeAreaHint: "Used when location services are off",
      settingsHomeNone: "Not set \u2014 tap to choose",
      settingsCurrentPosition: "Current position",
      settingsPositionUnknown: "Location unavailable",
      settingsUseCurrent: "Use my current location",
      settingsLanguage: "Language",
      settingsData: "Data",
      dataSaverLbl: "Data Saver",
      settingsDataSaverHint: "Cache gigs and sync later",
      settingsAccount: "Account",
      settingsSignOut: "Sign out",
      settingsSignIn: "Sign in",
      settingsSignInHint: "Sign in to sync your profile and applications",
      settingsAbout: "About",
      settingsVersion: "Version",
      settingsSaved: "Saved",
      postPickSpot: "Pick exact spot on map",
      postSpotSet: "Location set \u2014 {place}",
      postUseMyLocation: "Use my location",
      postNeedSpot: "Choose where this gig is on the map.",
      noGigsInRadius: "No gigs within {km}km. Widen your search radius in Settings.",
      All: "All",
      Construction: "Construction",
      Gardening: "Gardening",
      Cleaning: "Cleaning",
      Plumbing: "Plumbing",
      Electrical: "Electrical",
      Painting: "Painting",
      Moving: "Moving",
      "Farm Labour": "Farm Labour",
      Catering: "Catering",
      Domestic: "Domestic",
      autoReply1: "Thanks for your interest! We'll be in touch shortly.",
      autoReply2: "Great \u2014 can you confirm your availability?",
      autoReply3: "Please bring your own tools if you have them.",
      autoReply4: "We'll send you the full address on the day."
    },
    NY: {
      tagline: "Sankhani ntchito yanu. Pafupi.",
      searchPlaceholder: "Sakani ntchito, mwachitsanzo mapaipi",
      withinRadius: "Mkati mwa {km}km kuchokera pamene muli",
      locationUnknown: "Dinani kuti musankhe dera lanu",
      gigsNearYou: "Ntchito pafupi ndi inu",
      mapLink: "Mapu \u2192",
      urgent: "Mwachangu",
      applied: "apempho",
      pickThisGig: "Sankhani ntchito iyi",
      applicationSent: "\u2713 Pempho lapita",
      noGigs: "Palibe ntchito yomwe ikugwirizana.",
      peopleSingular: "munthu akufunika",
      peoplePlural: "anthu akufunika",
      postTitle: "Ikani Ntchito",
      gigTitleLabel: "Dzina la ntchito",
      categoryLabel: "Mtundu",
      locationLabel: "Malo",
      payLabel: "Ndalama",
      timeLabel: "Nthawi",
      timeLabelPlaceholder: "mwachitsanzo, Lero, 2pm",
      timeLabelFallback: "Nthawi yosinthasintha",
      durationLabel: "Nthawi yogwira",
      durationLabelPlaceholder: "mwachitsanzo, maola 3",
      durationLabelFallback: "Yosinthasintha",
      detailsLabel: "Mfundo",
      publishBtn: "Tumizirani ntchito",
      gigPosted: "Ntchito yanu yatumiziridwa!",
      noTitle: "Onjezerani dzina la ntchito kaye.",
      markCompleteBtn: "Malizani ntchito",
      cancelGigBtn: "Letsani ntchito iyi",
      cancelGigConfirm: "Letsani ntchito iyi? Anthu sadzaionanso.",
      gigCancelled: "Ntchito yaletsedwa.",
      profileTitle: "Mbiri",
      nameLabel: "Dzina lonse",
      phoneLabel: "Nambala ya foni",
      skillsLabel: "Luso lanu",
      areaLabel: "Dera lanu",
      saveBtn: "Sungani mbiri",
      profileSaved: "Mbiri yasungidwa!",
      profileRequired: "Chonde mdzaze mbiri yanu musanapemphe ntchito.",
      settingsTitle: "Zokonda",
      smsAlertsLbl: "Mauthenga a SMS (Ntchito Zatsopano)",
      pushAlertsLbl: "Zidziwitso za Push",
      chatsTitle: "Mauthenga",
      chatsSub: "Thibitsani zambiri musanayende",
      noChats: "Palibe zokambirana.",
      sendPlaceholder: "Lembani uthenga\u2026",
      sendBtn: "Tumizani",
      navGigs: "Ntchito",
      navMap: "Mapu",
      navPost: "Ikani",
      navChats: "Kukambirana",
      navProfile: "Mbiri",
      navBack: "Bwerera",
      mapTitle: "Mapu a Ntchito",
      mapSubtitle: "Ntchito mkati mwa {km}km \xB7 Dotani chizindikiro.",
      mapSubtitleUnknown: "Sankhani dera lanu kuti muone ntchito zapafupi.",
      mapUseMyLocation: "Gwiritsani ntchito malo anga",
      mapChooseArea: "Sankhani dera",
      mapLocating: "Tikufufuza malo anu\u2026",
      mapLocated: "Mapu akuonetsa malo anu.",
      mapNoGps: "Malo sapezeka \u2014 sankhani dera lanu pa mapu.",
      mapAreaTitle: "Mukufuna ntchito kuti?",
      mapAreaHint: "Sakani mzinda uliwonse, kapena kokera chizindikiro.",
      mapNear: "Pafupi ndi {place}",
      settingsOpen: "Zokonda",
      settingsPageSub: "Zidziwitso, malo ndi akaunti",
      settingsOther: "Zina",
      settingsDarkMode: "Mdima (Dark mode)",
      settingsNotifications: "Zidziwitso",
      settingsSmsHint: "Landirani uthenga wa SMS ngati data ilibe",
      settingsLocation: "Malo ndi mtunda",
      settingsRadius: "Mtunda wosakira",
      settingsRadiusHint: "Kutalika bwanji kuyang'ana ntchito",
      settingsHomeArea: "Dera lanu",
      settingsHomeAreaHint: "Limagwiritsidwa ntchito ngati GPS ili yozimitsidwa",
      settingsHomeNone: "Palibe \u2014 dinani kuti musankhe",
      settingsCurrentPosition: "Malo aposachedwa",
      settingsPositionUnknown: "Malo sapezeka",
      settingsUseCurrent: "Gwiritsani ntchito malo anga aposachedwa",
      settingsLanguage: "Chinenero",
      settingsData: "Data",
      dataSaverLbl: "Kusunga Data",
      settingsDataSaverHint: "Sungani ntchito ndi kuzigwirizanitsa mtsogolo",
      settingsAccount: "Akaunti",
      settingsSignOut: "Tulukani",
      settingsSignIn: "Lowani",
      settingsSignInHint: "Lowani kuti musunge mbiri yanu",
      settingsAbout: "Za ife",
      settingsVersion: "Mtundu",
      settingsSaved: "Zasungidwa",
      postPickSpot: "Sankhani malo enieni pa mapu",
      postSpotSet: "Malo asankhidwa \u2014 {place}",
      postUseMyLocation: "Gwiritsani ntchito malo anga",
      postNeedSpot: "Sankhani malo a ntchito ili pa mapu.",
      noGigsInRadius: "Palibe ntchito mkati mwa {km}km. Wonjezerani mtunda mu Zokonda.",
      All: "Zonse",
      Construction: "Zimbutu",
      Gardening: "Ulimi wa Munda",
      Cleaning: "Kusakaniza",
      Plumbing: "Mapaipi",
      Electrical: "Magetsi",
      Painting: "Kuphaka",
      Moving: "Kuthuthumutsa",
      "Farm Labour": "Ntchito ya Ulimi",
      Catering: "Zokonzera Chakudya",
      Domestic: "Ntchito ya Pakhomo",
      autoReply1: "Zikomo chifukwa cha chidwi chanu!",
      autoReply2: "Zabwino \u2014 mungathibitisire kuti muli nawo nthawi?",
      autoReply3: "Chonde bweletsani zida zanu ngati mulina.",
      autoReply4: "Tidzakutumizani adilesi yonse pa tsiku la ntchito."
    }
  };
  var CAT_ICONS = {
    "All": "",
    "Construction": "\u26D1\uFE0F",
    "Gardening": "\u{1F331}",
    "Cleaning": "\u2728",
    "Plumbing": "\u{1F527}",
    "Electrical": "\u26A1",
    "Painting": "\u{1F3A8}",
    "Moving": "\u{1F4E6}",
    "Farm Labour": "\u{1F33E}",
    "Catering": "\u{1F372}",
    "Domestic": "\u{1F9F9}"
  };
  var lang = localStorage.getItem("pg_lang") || "EN";
  function setLangValue(l) {
    lang = l;
    localStorage.setItem("pg_lang", l);
  }
  function t(key, vars) {
    let s = STRINGS[lang]?.[key] ?? STRINGS.EN[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) s = s.split("{" + k + "}").join(v);
    }
    return s;
  }
  function tCat(cat) {
    return t(cat);
  }

  // js/data.js
  var DEFAULT_CENTER = [20, 0];
  var DEFAULT_ZOOM = 2;
  var KNOWN_ZOOM = 13;
  var DEFAULT_RADIUS_KM = 5;
  var RADIUS_CHOICES_KM = [2, 5, 10, 25, 50];
  var APP_VERSION = "1.1.0";
  var SEED_GIGS = [
    {
      id: 1,
      cat: "Plumbing",
      title: "Toilet leaking - urgent plumber needed",
      place: "Namiwawa, Blantyre",
      time: "Today, 14:00",
      duration: "3 hours",
      pay: "MK 20,000",
      payType: "total",
      people: 1,
      applied: 3,
      km: 0.8,
      urgent: true,
      lat: -15.8,
      lng: 35.009,
      posterInitials: "PM",
      posterName: "Peter Mwale"
    },
    {
      id: 2,
      cat: "Farm Labour",
      title: "Need 2 people to clear a field tomorrow",
      place: "Chilomoni, Blantyre",
      time: "Tomorrow, 06:30",
      duration: "1 day",
      pay: "MK 12,000",
      payType: "per person",
      people: 2,
      applied: 5,
      km: 1.2,
      urgent: true,
      lat: -15.823,
      lng: 35.018,
      posterInitials: "GB",
      posterName: "Grace Banda"
    },
    {
      id: 3,
      cat: "Gardening",
      title: "Lawn mowing and hedge trimming",
      place: "Sunnyside",
      time: "Today, 15:30",
      duration: "3 hours",
      pay: "MK 7,000",
      payType: "total",
      people: 1,
      applied: 6,
      km: 1.9,
      urgent: false,
      lat: -15.786,
      lng: 35.006,
      posterInitials: "ZT",
      posterName: "Zikomo Traders"
    }
  ];
  var WORKERS = [
    { id: "w1", name: "James M.", rating: 4.9, skills: ["Plumbing"] },
    { id: "w2", name: "Alice K.", rating: 4.8, skills: ["Cleaning"] },
    { id: "w3", name: "John B.", rating: 4.7, skills: ["Construction"] }
  ];
  var LS = {
    getGigs() {
      return JSON.parse(localStorage.getItem("pg_gigs")) ?? [...SEED_GIGS];
    },
    setGigs(v) {
      localStorage.setItem("pg_gigs", JSON.stringify(v));
    },
    getProfile() {
      return JSON.parse(localStorage.getItem("pg_profile")) ?? {
        name: "Thoko Phiri",
        headline: "Professional painter and cleaner",
        phone: "0991234567",
        location: "Ndirande",
        rating: "4.8",
        jobsDone: 14,
        rateMK: "MK 12,000/day",
        credentials: ["TEVETA Grade 1 Painter"],
        skills: ["Painting", "Cleaning"],
        smsAlerts: true,
        pushAlerts: true,
        dataSaver: true
      };
    },
    setProfile(v) {
      localStorage.setItem("pg_profile", JSON.stringify(v));
    },
    getChats() {
      return JSON.parse(localStorage.getItem("pg_chats")) ?? [];
    },
    setChats(v) {
      localStorage.setItem("pg_chats", JSON.stringify(v));
    },
    getApplied() {
      return JSON.parse(localStorage.getItem("pg_applied")) ?? [];
    },
    setApplied(v) {
      localStorage.setItem("pg_applied", JSON.stringify(v));
    },
    // Device-local preferences: search radius and the area the user
    // chose as "home" ({ lat, lng, label }). Lives on the device rather
    // than in Supabase so the app works before anyone signs in.
    getPrefs() {
      return JSON.parse(localStorage.getItem("pg_prefs")) ?? {
        radiusKm: DEFAULT_RADIUS_KM,
        home: null
      };
    },
    setPrefs(v) {
      localStorage.setItem("pg_prefs", JSON.stringify(v));
    }
  };
  var state = {
    selectedCat: "All",
    query: "",
    page: "gigs",
    leafletMap: null,
    mapMarkers: [],
    gigsCache: [],
    // gigs loaded from Supabase, transformed for the UI
    gigsLoaded: false,
    // true once loadGigs() has fetched at least once
    userLocation: null
    // { lat, lng, isFallback } once requestUserLocation() resolves
  };

  // js/ui-helpers.js
  function el(tag, props = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (v == null) continue;
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k === "html") node.innerHTML = v;
      else if (k === "style") node.style.cssText = v;
      else if (k === "value") node.value = v;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
    for (const child of children) {
      if (child == null) continue;
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    }
    return node;
  }
  function toast(msg) {
    const node = document.getElementById("toast");
    node.textContent = msg;
    node.classList.add("show");
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => node.classList.remove("show"), 2600);
  }
  function openModal(domNode) {
    const content = document.getElementById("modalContent");
    content.textContent = "";
    content.appendChild(domNode);
    document.getElementById("modal").classList.add("show");
  }
  function closeModal() {
    document.getElementById("modal").classList.remove("show");
  }

  // js/auth.js
  var currentUser = null;
  function getCurrentUser() {
    return currentUser;
  }
  async function initAuth(onChange) {
    const { data: { session } } = await supabase.auth.getSession();
    currentUser = session?.user ?? null;
    onChange(currentUser);
    supabase.auth.onAuthStateChange((_event, session2) => {
      currentUser = session2?.user ?? null;
      onChange(currentUser);
    });
  }
  async function signUp(email, password, fullName) {
    return supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });
  }
  async function signIn(email, password) {
    return supabase.auth.signInWithPassword({ email, password });
  }
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) toast(error.message);
  }
  function openAuthModal(mode = "signin") {
    const isSignUp = mode === "signup";
    const nameInput = isSignUp ? el("input", { type: "text", placeholder: "Full name", autocomplete: "name" }) : null;
    const emailInput = el("input", { type: "email", placeholder: "Email", autocomplete: "email" });
    const passwordInput = el("input", { type: "password", placeholder: "Password", autocomplete: isSignUp ? "new-password" : "current-password" });
    const errorBox = el("div", { class: "auth-error", style: "color:#dc2626;font-size:13px;margin-top:6px;display:none;" });
    const submitBtn = el("button", {
      class: "primary",
      text: isSignUp ? "Create account" : "Sign in",
      onclick: async () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        if (!email || !password) {
          errorBox.textContent = "Please fill in email and password.";
          errorBox.style.display = "block";
          return;
        }
        submitBtn.disabled = true;
        submitBtn.textContent = "Please wait\u2026";
        const { data, error } = isSignUp ? await signUp(email, password, nameInput.value.trim()) : await signIn(email, password);
        submitBtn.disabled = false;
        submitBtn.textContent = isSignUp ? "Create account" : "Sign in";
        if (error) {
          errorBox.textContent = error.message;
          errorBox.style.display = "block";
          return;
        }
        if (isSignUp && !data.session) {
          toast("Check your email to confirm your account.");
          closeModal();
          return;
        }
        toast(isSignUp ? "Account created!" : "Signed in!");
        closeModal();
      }
    });
    const switchLink = el("div", {
      style: "margin-top:14px;font-size:13px;text-align:center;color:#666;cursor:pointer;text-decoration:underline;",
      text: isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up",
      onclick: () => openAuthModal(isSignUp ? "signin" : "signup")
    });
    const form = el(
      "div",
      { class: "form" },
      isSignUp ? el("label", { text: "Full name" }, nameInput) : null,
      el("label", { text: "Email" }, emailInput),
      el("label", { text: "Password" }, passwordInput),
      errorBox,
      submitBtn,
      switchLink
    );
    openModal(el(
      "div",
      {},
      el("h2", { text: isSignUp ? "Create your account" : "Sign in to PickAGig" }),
      form
    ));
  }

  // js/geo.js
  function distanceKm(lat1, lng1, lat2, lng2) {
    if (lat1 == null || lng1 == null || lat2 == null || lng2 == null) return null;
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
  }
  function getRadiusKm() {
    const km = Number(LS.getPrefs().radiusKm);
    return Number.isFinite(km) && km > 0 ? km : DEFAULT_RADIUS_KM;
  }
  function setRadiusKm(km) {
    LS.setPrefs({ ...LS.getPrefs(), radiusKm: Number(km) });
  }
  function getHomeLocation() {
    return LS.getPrefs().home || null;
  }
  function setHomeLocation(home) {
    LS.setPrefs({ ...LS.getPrefs(), home });
  }
  function requestUserLocation() {
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
            unknown: false
          };
          resolve(state.userLocation);
        },
        () => {
          state.userLocation = fromHome();
          if (!state.userLocation.unknown) {
            toast("Using your saved area \u2014 turn on location for gig distances.");
          }
          resolve(state.userLocation);
        },
        { enableHighAccuracy: true, timeout: 8e3, maximumAge: 6e4 }
      );
    });
  }
  function fromHome() {
    const home = getHomeLocation();
    if (home) {
      return { lat: home.lat, lng: home.lng, label: home.label, isFallback: true, unknown: false };
    }
    return { lat: null, lng: null, label: null, isFallback: true, unknown: true };
  }
  function getUserLocation() {
    if (state.userLocation) return state.userLocation;
    state.userLocation = fromHome();
    return state.userLocation;
  }
  function locationIsKnown(loc = getUserLocation()) {
    return !loc.unknown && loc.lat != null && loc.lng != null;
  }
  var NOMINATIM = "https://nominatim.openstreetmap.org";
  var lastCall = 0;
  var chain = Promise.resolve();
  function throttledFetch(url) {
    const run = chain.then(async () => {
      const wait = Math.max(0, 1100 - (Date.now() - lastCall));
      if (wait) await new Promise((r) => setTimeout(r, wait));
      lastCall = Date.now();
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    });
    chain = run.catch(() => {
    });
    return run;
  }
  async function searchPlaces(query) {
    const q = (query || "").trim();
    if (q.length < 3) return [];
    try {
      const data = await throttledFetch(
        `${NOMINATIM}/search?format=jsonv2&limit=6&addressdetails=1&q=${encodeURIComponent(q)}`
      );
      return (data || []).filter((r) => r.lat != null && r.lon != null).map((r) => ({ label: r.display_name, lat: Number(r.lat), lng: Number(r.lon) }));
    } catch {
      return [];
    }
  }
  async function reverseGeocode(lat, lng) {
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
  function shortLabel(full) {
    if (!full) return "";
    const parts = full.split(",").map((s) => s.trim()).filter(Boolean);
    return parts.slice(0, 3).join(", ");
  }

  // js/location-picker.js
  var pickerSeq = 0;
  function pinIcon(colour = "#f97316") {
    return L.divIcon({
      className: "",
      html: `<div style="width:34px;height:34px;background:${colour};border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,.3);"></div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 34]
    });
  }
  function openLocationPicker(opts = {}) {
    const {
      title = "Choose location",
      hint = "Search for a place, or drag the pin to the exact spot.",
      initial = null,
      confirmLabel = "Confirm",
      onConfirm = () => {
      }
    } = opts;
    if (!window.L) {
      toast("The map is still loading \u2014 try again in a moment.");
      return;
    }
    const mapId = "pickMap" + ++pickerSeq;
    const known = locationIsKnown();
    const start = initial || (known ? getUserLocation() : null);
    let marker = null;
    const searchInput = el("input", {
      class: "picker-search",
      type: "search",
      autocomplete: "off",
      placeholder: "Search any city or area\u2026"
    });
    const results = el("div", { class: "picker-results" });
    const mapNode = el("div", { class: "picker-map", id: mapId });
    const chosenLabel = el("div", {
      class: "picker-chosen",
      text: start?.label || (start ? `${start.lat.toFixed(4)}, ${start.lng.toFixed(4)}` : "Drag the pin to choose")
    });
    const confirmBtn = el("button", {
      class: "primary",
      text: confirmLabel,
      onclick: async () => {
        const ll = marker.getLatLng();
        confirmBtn.disabled = true;
        confirmBtn.textContent = "Locating\u2026";
        const label = shortLabel(await reverseGeocode(ll.lat, ll.lng)) || `${ll.lat.toFixed(4)}, ${ll.lng.toFixed(4)}`;
        confirmBtn.disabled = false;
        confirmBtn.textContent = confirmLabel;
        closeModal();
        onConfirm({ lat: ll.lat, lng: ll.lng, label });
      }
    });
    let searchTimer = null;
    searchInput.addEventListener("input", () => {
      clearTimeout(searchTimer);
      const q = searchInput.value.trim();
      if (q.length < 3) {
        results.textContent = "";
        return;
      }
      searchTimer = setTimeout(async () => {
        const places = await searchPlaces(q);
        results.textContent = "";
        if (!places.length) {
          results.appendChild(el("div", { class: "picker-empty", text: "No matches \u2014 drag the pin instead." }));
          return;
        }
        places.forEach((p) => results.appendChild(el("button", {
          class: "picker-result",
          type: "button",
          onclick: () => {
            map.setView([p.lat, p.lng], KNOWN_ZOOM);
            marker.setLatLng([p.lat, p.lng]);
            chosenLabel.textContent = shortLabel(p.label);
            results.textContent = "";
            searchInput.value = "";
          }
        }, shortLabel(p.label))));
      }, 450);
    });
    openModal(el(
      "div",
      { class: "picker" },
      el("h2", { text: title }),
      el("p", { class: "picker-hint", text: hint }),
      searchInput,
      results,
      mapNode,
      chosenLabel,
      el(
        "div",
        { class: "picker-actions" },
        el("button", { class: "picker-cancel", type: "button", text: "Cancel", onclick: () => closeModal() }),
        confirmBtn
      )
    ));
    const center = start ? [start.lat, start.lng] : DEFAULT_CENTER;
    const map = L.map(mapId).setView(center, start ? KNOWN_ZOOM : DEFAULT_ZOOM);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "\xA9 OpenStreetMap contributors",
      maxZoom: 19
    }).addTo(map);
    marker = L.marker(center, { icon: pinIcon(), draggable: true }).addTo(map);
    marker.on("dragend", () => {
      const ll = marker.getLatLng();
      chosenLabel.textContent = `${ll.lat.toFixed(4)}, ${ll.lng.toFixed(4)}`;
    });
    map.on("click", (e) => {
      marker.setLatLng(e.latlng);
      chosenLabel.textContent = `${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`;
    });
    setTimeout(() => map.invalidateSize(), 150);
  }

  // js/map.js
  var youMarker = null;
  var radiusCircle = null;
  function initMap() {
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
    state.leafletMap = L.map("map").setView(
      known ? [loc.lat, loc.lng] : DEFAULT_CENTER,
      known ? KNOWN_ZOOM : DEFAULT_ZOOM
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "\xA9 OpenStreetMap contributors",
      maxZoom: 19
    }).addTo(state.leafletMap);
    updateLocationLayer();
    refreshMapMarkers();
  }
  function updateLocationLayer() {
    const map = state.leafletMap;
    if (!map) return;
    if (youMarker) {
      youMarker.remove();
      youMarker = null;
    }
    if (radiusCircle) {
      radiusCircle.remove();
      radiusCircle = null;
    }
    const loc = getUserLocation();
    if (!locationIsKnown(loc)) return;
    const center = [loc.lat, loc.lng];
    radiusCircle = L.circle(center, {
      radius: getRadiusKm() * 1e3,
      color: "#f97316",
      fillColor: "#f97316",
      fillOpacity: 0.05,
      weight: 1.5
    }).addTo(map);
    const youIcon = L.divIcon({
      className: "",
      html: `<div style="width:16px;height:16px;background:#2563eb;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.3);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
    youMarker = L.marker(center, { icon: youIcon }).addTo(map).bindPopup(loc.isFallback ? "Approximate location" : "You are here");
  }
  function placeLabel(loc) {
    return loc.label || `${loc.lat.toFixed(3)}, ${loc.lng.toFixed(3)}`;
  }
  function renderControls() {
    const bar = document.getElementById("mapControls");
    if (!bar) return;
    bar.textContent = "";
    const loc = getUserLocation();
    const known = locationIsKnown(loc);
    if (!known) {
      bar.appendChild(el(
        "div",
        { class: "map-prompt" },
        el("span", { text: t("mapSubtitleUnknown") }),
        el("button", { class: "primary map-prompt-btn", text: t("mapChooseArea"), onclick: chooseArea })
      ));
    }
    bar.appendChild(el(
      "div",
      { class: "map-ctl-row" },
      el(
        "button",
        { class: "map-ctl", type: "button", onclick: centerOnMyLocation },
        el("span", { class: "map-ctl-ico", text: "\u25CE" }),
        document.createTextNode(t("mapUseMyLocation"))
      ),
      el(
        "button",
        { class: "map-ctl", type: "button", onclick: chooseArea },
        el("span", { class: "map-ctl-ico", text: "\u2316" }),
        document.createTextNode(t("mapChooseArea"))
      ),
      known ? el("span", { class: "map-ctl-label", text: t("mapNear", { place: placeLabel(loc) }) }) : null
    ));
  }
  function updateMapSubtitle() {
    const sub = document.getElementById("panelPageSub");
    if (!sub) return;
    sub.textContent = locationIsKnown() ? t("mapSubtitle", { km: getRadiusKm() }) : t("mapSubtitleUnknown");
  }
  function onLocationPrefsChanged() {
    if (state.page === "map") {
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
    toast(t("mapLocating"));
    await requestUserLocation();
    const loc = getUserLocation();
    if (!locationIsKnown(loc)) {
      toast(t("mapNoGps"));
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
    toast(t("mapLocated"));
  }
  function chooseArea() {
    openLocationPicker({
      title: t("mapAreaTitle"),
      hint: t("mapAreaHint"),
      confirmLabel: t("mapChooseArea"),
      onConfirm: (picked) => {
        setHomeLocation(picked);
        state.userLocation = {
          lat: picked.lat,
          lng: picked.lng,
          label: picked.label,
          isFallback: true,
          unknown: false
        };
        if (state.leafletMap) state.leafletMap.setView([picked.lat, picked.lng], KNOWN_ZOOM);
        updateLocationLayer();
        refreshMapMarkers();
        renderControls();
        updateMapSubtitle();
        updateLocationText();
        renderGigs();
        toast(t("mapNear", { place: picked.label }));
      }
    });
  }
  function refreshMapMarkers() {
    if (!state.leafletMap) return;
    state.mapMarkers.forEach((m) => m.remove());
    state.mapMarkers = [];
    const gigs = getFilteredGigs();
    gigs.forEach((gig) => {
      if (!gig.lat || !gig.lng) return;
      const colour = gig.urgent ? "#f97316" : "#1a2550";
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:34px;height:34px;background:${colour};border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,.22);"></div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 34]
      });
      const marker = L.marker([gig.lat, gig.lng], { icon }).addTo(state.leafletMap);
      const popupWrap = el(
        "div",
        { style: "min-width: 160px;" },
        el("strong", { text: gig.title, style: "display:block;margin-bottom:4px;" }),
        el("button", {
          text: "View Gig",
          style: "width:100%;padding:6px;background:var(--orange);color:white;border:0;border-radius:6px;cursor:pointer;",
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

  // js/chats.js
  var activeChannel = null;
  async function createOrGetChat(gigId, posterId, applicantId) {
    if (!posterId || posterId === applicantId) return null;
    const { data: existing, error: findErr } = await supabase.from("chats").select("id").eq("gig_id", gigId).eq("user2_id", applicantId).maybeSingle();
    if (findErr) {
      console.error("createOrGetChat find error:", findErr);
      return null;
    }
    if (existing) return existing.id;
    const { data: created, error: createErr } = await supabase.from("chats").insert({ gig_id: gigId, user1_id: posterId, user2_id: applicantId }).select("id").single();
    if (createErr) {
      console.error("createOrGetChat insert error:", createErr);
      return null;
    }
    return created.id;
  }
  async function fetchChatsWithPreview(userId) {
    const { data: chats, error } = await supabase.from("chats").select("id, gig_id, user1_id, user2_id, created_at, gigs(title)").or(`user1_id.eq.${userId},user2_id.eq.${userId}`).order("created_at", { ascending: false });
    if (error) {
      console.error("fetchChats error:", error);
      return [];
    }
    if (!chats.length) return [];
    const otherIds = [...new Set(chats.map((c) => c.user1_id === userId ? c.user2_id : c.user1_id))];
    const { data: profiles } = await supabase.from("profiles").select("id, full_name").in("id", otherIds);
    const nameById = Object.fromEntries((profiles || []).map((p) => [p.id, p.full_name]));
    const chatIds = chats.map((c) => c.id);
    const { data: msgs } = await supabase.from("messages").select("chat_id, content, created_at").in("chat_id", chatIds).order("created_at", { ascending: false });
    const lastByChat = {};
    (msgs || []).forEach((m) => {
      if (!lastByChat[m.chat_id]) lastByChat[m.chat_id] = m;
    });
    return chats.map((c) => {
      const otherId = c.user1_id === userId ? c.user2_id : c.user1_id;
      const otherName = nameById[otherId] || "Unknown";
      return {
        id: c.id,
        gigTitle: c.gigs?.title || "Gig",
        otherName,
        otherInitials: (otherName || "?").charAt(0).toUpperCase(),
        lastMessage: lastByChat[c.id]?.content || ""
      };
    });
  }
  async function renderChatsList() {
    const chatsList = document.getElementById("chatsList");
    if (!chatsList) return;
    chatsList.textContent = "";
    const user = getCurrentUser();
    if (!user) {
      chatsList.appendChild(el(
        "div",
        { class: "chats-empty" },
        el("p", { text: "Sign in to see your messages." }),
        el("button", { class: "primary", text: "Sign in", onclick: () => openAuthModal("signin") })
      ));
      return;
    }
    chatsList.appendChild(el("div", { class: "chats-empty", text: "Loading\u2026" }));
    const chats = await fetchChatsWithPreview(user.id);
    chatsList.textContent = "";
    if (chats.length === 0) {
      chatsList.appendChild(el("div", { class: "chats-empty", text: t("noChats") }));
      return;
    }
    const list = el("div", { class: "chat-list" });
    chats.forEach((chat) => {
      list.appendChild(el(
        "div",
        { class: "chat-item", onclick: () => openChatThread(chat.id, chat.otherName) },
        el("div", { class: "chat-avatar", text: chat.otherInitials }),
        el(
          "div",
          { class: "chat-item-middle" },
          el(
            "div",
            { class: "chat-name-row" },
            el("div", { class: "chat-name", text: chat.otherName })
          ),
          el("div", { class: "chat-preview", text: chat.lastMessage || chat.gigTitle })
        )
      ));
    });
    chatsList.appendChild(list);
  }
  async function openChatThread(chatId, otherName) {
    const user = getCurrentUser();
    if (!user) {
      openAuthModal("signin");
      return;
    }
    const threadEl = el("div", { class: "chat-thread" });
    function addBubble(msg) {
      const cls = msg.sender_id === user.id ? "bubble-wrap me" : "bubble-wrap them";
      threadEl.appendChild(el("div", { class: cls }, el("div", { class: "bubble", text: msg.content })));
      threadEl.scrollTop = threadEl.scrollHeight;
    }
    const { data: messages, error } = await supabase.from("messages").select("*").eq("chat_id", chatId).order("created_at", { ascending: true });
    if (error) toast("Could not load messages: " + error.message);
    else messages.forEach(addBubble);
    const msgInput = el("input", { type: "text", placeholder: t("sendPlaceholder") });
    const sendMsg = async () => {
      const text = msgInput.value.trim();
      if (!text) return;
      msgInput.value = "";
      const { error: sendErr } = await supabase.from("messages").insert({ chat_id: chatId, sender_id: user.id, content: text });
      if (sendErr) toast("Could not send: " + sendErr.message);
    };
    msgInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMsg();
    });
    if (activeChannel) supabase.removeChannel(activeChannel);
    activeChannel = supabase.channel("chat-" + chatId).on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages", filter: `chat_id=eq.${chatId}` },
      (payload) => addBubble(payload.new)
    ).subscribe();
    openModal(el(
      "div",
      {},
      el("h2", { text: otherName }),
      threadEl,
      el(
        "div",
        { class: "chat-input-row" },
        msgInput,
        el("button", { text: t("sendBtn"), onclick: sendMsg })
      )
    ));
  }

  // js/gigs.js
  /* ============================================================
     PickAGig — gigs.js
     Gig list rendering, filtering, gig detail modal, applying,
     and posting — all backed by the real Supabase `gigs` and
     `gig_applications` tables.
     ============================================================ */


  let appliedGigIds = new Set();

  // Advanced filters (session-only, not persisted): sort order, an
  // optional pay range, an urgent-only toggle, and an optional radius
  // that overrides the saved Settings radius just for this browsing
  // session. Reset in openAdvancedFilters().
  state.filters = state.filters || {
    sort: 'distance',      // 'distance' | 'newest' | 'pay_high'
    payMin: '',
    payMax: '',
    urgentOnly: false,
    radiusOverride: null,  // km, or null to use the saved Settings radius
  };

  function filtersAreActive() {
    const f = state.filters;
    return f.sort !== 'distance' || f.payMin || f.payMax || f.urgentOnly || f.radiusOverride != null;
  }

  function updateFilterIconState() {
    const btn = document.getElementById('advFilterIcon');
    if (btn) btn.classList.toggle('filters-active', filtersAreActive());
  }

  // Pulls the first number out of a free-text pay string like
  // "MK 20,000" or "MK 5,000/day" — returns null for things like
  // "Negotiable" that have no number in them.
  function parsePayAmount(payStr) {
    if (!payStr) return null;
    const match = String(payStr).replace(/,/g, '').match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  }

  async function loadAppliedGigIds() {
    const user = getCurrentUser();
    if (!user) { appliedGigIds = new Set(); return; }
    const { data, error } = await supabase
      .from('gig_applications')
      .select('gig_id')
      .eq('applicant_id', user.id);
    if (!error && data) appliedGigIds = new Set(data.map(r => r.gig_id));
  }

  // Re-checks which gigs the current user has applied to (call after
  // sign-in/sign-out) and re-renders the gigs page if it's showing.
  async function refreshAppliedStatus() {
    await loadAppliedGigIds();
    if (state.page === 'gigs') renderGigs();
  }

  // Fetches gigs from Supabase into state.gigsCache. Cheap to call
  // repeatedly — skips the network round-trip unless `force` is set.
  async function loadGigs(force = false) {
    if (state.gigsLoaded && !force) return;

    const { data, error } = await supabase
      .from('gigs')
      .select('*, profiles(full_name)')
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    if (error) {
      toast('Could not load gigs: ' + error.message);
      state.gigsCache = [];
      return;
    }

    state.gigsCache = data.map(g => ({
      id: g.id,
      cat: g.category,
      title: g.title,
      place: g.place,
      time: g.time_label,
      duration: g.duration,
      pay: g.pay,
      payType: g.pay_type,
      people: g.people,
      applied: g.applied_count,
      urgent: g.urgent,
      lat: g.location_lat,
      lng: g.location_lng,
      posterId: g.poster_id,
      posterName: g.profiles?.full_name || 'Unknown',
      posterInitials: (g.profiles?.full_name || '?').charAt(0).toUpperCase(),
    }));

    state.gigsLoaded = true;
    await loadAppliedGigIds();
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

  // Filters by category, search text, the user's chosen radius, and
  // whatever's set in the Advanced Filters modal (sort order, pay
  // range, urgent-only, and an optional radius override). When no
  // location is known every gig is shown. Gigs with no coordinates
  // can't be ranged, so they are kept but sorted last.
  function getFilteredGigs() {
    const q = state.query.toLowerCase();
    const loc = getUserLocation();
    const known = locationIsKnown(loc);
    const radius = state.filters.radiusOverride ?? getRadiusKm();
    const { sort, urgentOnly } = state.filters;
    const payMin = parsePayAmount(state.filters.payMin);
    const payMax = parsePayAmount(state.filters.payMax);

    return state.gigsCache
      .map((g, idx) => ({
        g, idx,
        km: known ? distanceKm(loc.lat, loc.lng, g.lat, g.lng) : null,
        payAmount: parsePayAmount(g.pay),
      }))
      .filter(({ g, km, payAmount }) => {
        const catMatch    = state.selectedCat === 'All' || g.cat === state.selectedCat;
        const searchMatch = !q || (g.title + ' ' + g.cat + ' ' + g.place).toLowerCase().includes(q);
        const inRange      = !known || km == null || km <= radius;
        const urgentMatch   = !urgentOnly || g.urgent;
        const payMinMatch   = payMin == null || payAmount == null || payAmount >= payMin;
        const payMaxMatch   = payMax == null || payAmount == null || payAmount <= payMax;
        return catMatch && searchMatch && inRange && urgentMatch && payMinMatch && payMaxMatch;
      })
      .sort((a, b) => {
        if (sort === 'newest') return a.idx - b.idx; // gigsCache already arrives newest-first
        if (sort === 'pay_high') {
          if (a.payAmount == null && b.payAmount == null) return 0;
          if (a.payAmount == null) return 1;
          if (b.payAmount == null) return -1;
          return b.payAmount - a.payAmount;
        }
        // default: 'distance' — urgent first, then nearest
        const byUrgent = (b.g.urgent ? 1 : 0) - (a.g.urgent ? 1 : 0);
        if (byUrgent) return byUrgent;
        if (a.km == null && b.km == null) return 0;
        if (a.km == null) return 1;
        if (b.km == null) return -1;
        return a.km - b.km;
      })
      .map(({ g }) => g);
  }

  function buildSegmented(options, current, onPick) {
    const seg = el('div', { class: 'seg seg-fill', role: 'group' });
    options.forEach(o => {
      seg.appendChild(el('button', {
        class: 'seg-btn' + (o.value === current ? ' active' : ''),
        type: 'button', text: o.label,
        onclick: (ev) => {
          seg.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
          ev.currentTarget.classList.add('active');
          onPick(o.value);
        },
      }));
    });
    return seg;
  }

  function openAdvancedFilters() {
    const f = state.filters;
    let pickedSort = f.sort;
    let pickedRadius = f.radiusOverride;

    const sortSeg = buildSegmented(
      [
        { value: 'distance', label: 'Nearest' },
        { value: 'newest', label: 'Newest' },
        { value: 'pay_high', label: 'Highest pay' },
      ],
      f.sort,
      (v) => { pickedSort = v; }
    );

    const radiusSeg = buildSegmented(
      RADIUS_CHOICES_KM.map(km => ({ value: km, label: km + 'km' })),
      f.radiusOverride ?? getRadiusKm(),
      (v) => { pickedRadius = v; }
    );

    const payMinInput = el('input', { type: 'number', inputmode: 'numeric', placeholder: 'e.g. 5000', value: f.payMin || '' });
    const payMaxInput = el('input', { type: 'number', inputmode: 'numeric', placeholder: 'e.g. 50000', value: f.payMax || '' });

    const urgentToggleInput = el('input', { type: 'checkbox', class: 'sw-input' });
    urgentToggleInput.checked = f.urgentOnly;
    const urgentToggle = el('label', { class: 'row row-tap', style: 'padding:12px 0;' },
      el('span', { class: 'row-text' }, el('strong', { text: 'Urgent gigs only' })),
      el('span', { class: 'sw' }, urgentToggleInput, el('span', { class: 'sw-knob' }))
    );

    const applyBtn = el('button', {
      class: 'primary', type: 'button', text: 'Apply filters',
      onclick: () => {
        f.sort = pickedSort;
        f.radiusOverride = pickedRadius;
        f.payMin = payMinInput.value;
        f.payMax = payMaxInput.value;
        f.urgentOnly = urgentToggleInput.checked;
        closeModal();
        renderGigs();
        if (state.page === 'map') refreshMapMarkers();
        updateFilterIconState();
        toast('Filters applied.');
      }
    });

    const resetBtn = el('button', {
      type: 'button', text: 'Reset filters',
      style: 'background:none;border:0;color:var(--muted);font-size:13px;font-weight:700;cursor:pointer;width:100%;padding:10px;text-align:center;',
      onclick: () => {
        state.filters = { sort: 'distance', payMin: '', payMax: '', urgentOnly: false, radiusOverride: null };
        closeModal();
        renderGigs();
        if (state.page === 'map') refreshMapMarkers();
        updateFilterIconState();
      }
    });

    openModal(el('div', {},
      el('h2', { text: 'Filters', style: 'margin-bottom:16px;' }),
      el('div', { class: 'form' },
        el('label', { text: 'Sort by' }, sortSeg),
        el('label', { text: 'Search radius' }, radiusSeg),
        el('div', { class: 'form-row' },
          el('label', { text: 'Min pay (MK)' }, payMinInput),
          el('label', { text: 'Max pay (MK)' }, payMaxInput)
        )
      ),
      urgentToggle,
      el('div', { style: 'display:flex;flex-direction:column;gap:10px;margin-top:16px;' },
        applyBtn,
        resetBtn
      )
    ));
  }

  // ── Notifications ────────────────────────────────────────────
  // A lightweight activity feed built from data the app already has:
  // applicants on gigs you posted, and completed gigs where you (as
  // the worker) still owe the poster a rating. There's no separate
  // notifications table or push delivery yet — see the note in chat.

  async function fetchPendingWorkerRatings(userId) {
    const { data, error } = await supabase
      .from('gig_applications')
      .select('gig_id, gigs(id, title, poster_id, status, profiles(full_name))')
      .eq('applicant_id', userId)
      .eq('accepted', true);
    if (error) { console.error('fetchPendingWorkerRatings error:', error); return []; }

    const completed = (data || []).filter(r => r.gigs && r.gigs.status === 'completed');
    if (!completed.length) return [];

    const gigIds = completed.map(r => r.gig_id);
    const { data: myRatings } = await supabase
      .from('ratings')
      .select('gig_id')
      .eq('rater_id', userId)
      .in('gig_id', gigIds);
    const alreadyRated = new Set((myRatings || []).map(r => r.gig_id));

    return completed
      .filter(r => !alreadyRated.has(r.gig_id))
      .map(r => ({
        gigId: r.gig_id,
        gigTitle: r.gigs.title,
        posterId: r.gigs.poster_id,
        posterName: r.gigs.profiles?.full_name || 'Unknown',
      }));
  }

  async function openNotifications() {
    const user = getCurrentUser();
    if (!user) {
      openModal(el('div', {},
        el('h2', { text: 'Activity', style: 'margin-bottom:10px;' }),
        el('p', { style: 'color:var(--muted);font-size:14px;', text: 'Sign in to see applicants on your gigs and gigs you still need to rate.' })
      ));
      return;
    }

    openModal(el('div', {}, el('div', { class: 'set-loading', text: 'Loading…' })));

    const myOpenGigsWithApplicants = state.gigsCache.filter(g => g.posterId === user.id && g.applied > 0);
    const pendingRatings = await fetchPendingWorkerRatings(user.id);

    const applicantRows = myOpenGigsWithApplicants.map(g => el('button', {
      class: 'row row-tap', type: 'button',
      onclick: () => { closeModal(); openGigDetail(g); },
    },
      el('span', { class: 'row-text' },
        el('strong', { text: g.title }),
        el('span', { class: 'row-hint', text: g.applied + (g.applied === 1 ? ' applicant' : ' applicants') })
      )
    ));

    const ratingRows = pendingRatings.map(p => el('button', {
      class: 'row row-tap', type: 'button',
      onclick: () => { closeModal(); openRatingModal(p.gigId, p.posterId, p.posterName); },
    },
      el('span', { class: 'row-text' },
        el('strong', { text: 'Rate ' + p.posterName }),
        el('span', { class: 'row-hint', text: 'For "' + p.gigTitle + '"' })
      )
    ));

    const sections = [];
    if (applicantRows.length) {
      sections.push(el('h3', { style: 'font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);margin:14px 0 6px;', text: 'Applicants on your gigs' }));
      sections.push(el('div', { class: 'set-list' }, ...applicantRows));
    }
    if (ratingRows.length) {
      sections.push(el('h3', { style: 'font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);margin:14px 0 6px;', text: 'Gigs to rate' }));
      sections.push(el('div', { class: 'set-list' }, ...ratingRows));
    }
    if (!sections.length) {
      sections.push(el('p', { style: 'color:var(--muted);font-size:14px;', text: 'Nothing new right now.' }));
    }

    openModal(el('div', {},
      el('h2', { text: 'Activity' }),
      ...sections
    ));
  }

  function buildGigCard(gig) {
    const isApplied = appliedGigIds.has(gig.id);
    const peopleLabel = gig.people === 1 ? t('peopleSingular') : t('peoplePlural');
    const loc = getUserLocation();
    const km = distanceKm(loc.lat, loc.lng, gig.lat, gig.lng);

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
              document.createTextNode((km != null ? km + ' km · ' : '') + gig.place)
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

  async function fetchApplicants(gigId) {
    const { data, error } = await supabase
      .from('gig_applications')
      .select('applicant_id, profiles(full_name)')
      .eq('gig_id', gigId);
    if (error) { console.error('fetchApplicants error:', error); return []; }
    return data.map(r => ({ applicantId: r.applicant_id, name: r.profiles?.full_name || 'Unknown' }));
  }

  async function markGigComplete(gigId, applicantId) {
    const { error: acceptErr } = await supabase
      .from('gig_applications')
      .update({ accepted: true })
      .eq('gig_id', gigId)
      .eq('applicant_id', applicantId);
    if (acceptErr) { toast('Could not mark hire: ' + acceptErr.message); return false; }

    const { error: statusErr } = await supabase
      .from('gigs')
      .update({ status: 'completed' })
      .eq('id', gigId);
    if (statusErr) { toast('Could not complete gig: ' + statusErr.message); return false; }

    await loadGigs(true);
    renderGigs();
    return true;
  }

  function openRatingModal(gigId, workerId, workerName, onSuccess) {
    let selected = 0;
    const stars = [1, 2, 3, 4, 5].map(n => {
      const star = el('span', {
        text: '★',
        style: 'font-size:28px;cursor:pointer;color:#ccc;margin-right:4px;',
        onclick: () => {
          selected = n;
          stars.forEach((s, i) => { s.style.color = i < selected ? '#f97316' : '#ccc'; });
        }
      });
      return star;
    });

    const reviewInput = el('textarea', { placeholder: 'Optional review…' });
    const submitBtn = el('button', {
      class: 'primary', text: 'Submit rating',
      onclick: async () => {
        if (!selected) { toast('Pick a star rating first.'); return; }
        const user = getCurrentUser();
        submitBtn.disabled = true;
        const { error } = await supabase.from('ratings').insert({
          gig_id: gigId, rater_id: user.id, ratee_id: workerId,
          rating: selected, review: reviewInput.value.trim()
        });
        submitBtn.disabled = false;
        if (error) { toast('Could not submit rating: ' + error.message); return; }
        toast('Rating submitted!');
        closeModal();
        if (onSuccess) onSuccess();
      }
    });

    openModal(el('div', {},
      el('h2', { text: 'Rate ' + workerName }),
      el('div', { style: 'margin:12px 0;' }, ...stars),
      el('label', { text: 'Review' }, reviewInput),
      submitBtn
    ));
  }

  async function openCompleteGigModal(gig) {
    const applicants = await fetchApplicants(gig.id);
    if (!applicants.length) {
      toast('No applicants yet to mark as hired.');
      return;
    }
    const list = el('div', { class: 'form' },
      ...applicants.map(a => el('button', {
        class: 'primary',
        style: 'display:block;width:100%;margin-bottom:8px;',
        text: a.name,
        onclick: async () => {
          closeModal();
          const ok = await markGigComplete(gig.id, a.applicantId);
          if (ok) openRatingModal(gig.id, a.applicantId, a.name);
        }
      }))
    );
    openModal(el('div', {},
      el('h2', { text: 'Who did this gig?' }),
      el('p', { style: 'color:#666;font-size:13px;margin-bottom:10px;', text: 'Pick the person you hired to mark this gig complete and leave them a rating.' }),
      list
    ));
  }

  async function cancelGig(gigId) {
    const { error } = await supabase
      .from('gigs')
      .update({ status: 'cancelled' })
      .eq('id', gigId);
    if (error) { toast('Could not cancel gig: ' + error.message); return false; }
    await loadGigs(true);
    renderGigs();
    if (state.page === 'map') refreshMapMarkers();
    return true;
  }

  function openGigDetail(gig) {
    const user = getCurrentUser();
    const isOwner = user && gig.posterId === user.id;
    const isApplied = appliedGigIds.has(gig.id);
    const loc = getUserLocation();
    const km = distanceKm(loc.lat, loc.lng, gig.lat, gig.lng);

    const ownerActions = isOwner
      ? el('div', { class: 'detail-owner-actions' },
          el('button', { class: 'detail-apply', text: t('markCompleteBtn'), onclick: () => openCompleteGigModal(gig) }),
          el('button', {
            class: 'detail-cancel', type: 'button', text: t('cancelGigBtn'),
            onclick: () => {
              if (!confirm(t('cancelGigConfirm'))) return;
              cancelGig(gig.id).then(ok => { if (ok) { closeModal(); toast(t('gigCancelled')); } });
            }
          })
        )
      : el('button', {
          class: 'detail-apply' + (isApplied ? ' applied' : ''),
          text: isApplied ? t('applicationSent') : t('pickThisGig'),
          onclick: async function () {
            if (appliedGigIds.has(gig.id)) return;
            this.disabled = true;
            await applyToGig(gig);
            this.disabled = false;
            if (appliedGigIds.has(gig.id)) {
              this.classList.add('applied');
              this.textContent = t('applicationSent');
            }
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
        document.createTextNode('📍 ' + (km != null ? km + ' km · ' : '') + gig.place), el('br'),
        document.createTextNode('🕒 ' + gig.time + ' · ' + gig.duration), el('br'),
        document.createTextNode('👥 ' + gig.people + ' ' + (gig.people === 1 ? t('peopleSingular') : t('peoplePlural')) + ' · ' + gig.applied + ' ' + t('applied')), el('br'),
        document.createTextNode('👤 Posted by ' + gig.posterName)
      ),
      ownerActions
    ));
  }

  function renderGigs() {
    const grid  = document.getElementById('gigsGrid');
    const empty = document.getElementById('gigsEmpty');
    if (!grid) return;
    grid.textContent = '';
    updateFilterIconState();
    const list = getFilteredGigs();
    list.forEach(g => grid.appendChild(buildGigCard(g)));
    empty.style.display = list.length ? 'none' : 'block';
    // Distinguish "nothing is posted" from "nothing inside your radius"
    // so the user knows which control to adjust.
    const radiusBlocked = !list.length && state.gigsCache.length > 0 && !state.query
                       && state.selectedCat === 'All' && locationIsKnown();
    empty.textContent = radiusBlocked ? t('noGigsInRadius', { km: getRadiusKm() }) : t('noGigs');
  }

  async function applyToGig(gig) {
    const user = getCurrentUser();
    if (!user) {
      toast('Please sign in to apply for a gig.');
      openAuthModal('signin');
      return;
    }
    if (appliedGigIds.has(gig.id)) return;

    const { error } = await supabase
      .from('gig_applications')
      .insert({ gig_id: gig.id, applicant_id: user.id });

    if (error) {
      if (error.code === '23505') {
        // Unique constraint hit — they'd already applied, just sync state.
        appliedGigIds.add(gig.id);
      } else {
        toast('Could not apply: ' + error.message);
        return;
      }
    } else {
      appliedGigIds.add(gig.id);
      gig.applied = (gig.applied || 0) + 1;
    }

    // Creates (or reuses) a real Supabase chat thread with the gig's poster.
    await createOrGetChat(gig.id, gig.posterId, user.id);

    toast(t('applicationSent'));
    renderGigs();
  }

  // `prefill` carries the form values (and the chosen map pin) across
  // re-renders: opening the location picker replaces the sheet, so the
  // form is rebuilt afterwards with everything the poster had typed.
  function openPost(prefill = {}) {
    if (!getCurrentUser()) {
      toast('Please sign in to post a gig.');
      openAuthModal('signin');
      return;
    }

    const titleInput    = el('input', { id: 'pt', type: 'text', placeholder: t('gigTitleLabel'), value: prefill.title || '' });
    const catSelect     = el('select', { id: 'pc' });
    const placeInput    = el('input', { id: 'pp', type: 'text', placeholder: t('locationLabel'), value: prefill.place || '' });
    const payInput      = el('input', { id: 'pw', type: 'text', placeholder: t('payLabel'), value: prefill.pay || '' });
    const timeInput     = el('input', { id: 'ptm', type: 'text', placeholder: t('timeLabelPlaceholder'), value: prefill.time || '' });
    const durationInput = el('input', { id: 'pdur', type: 'text', placeholder: t('durationLabelPlaceholder'), value: prefill.duration || '' });
    const detailsInput  = el('textarea', { id: 'pd', placeholder: t('detailsLabel'), value: prefill.details || '' });

    Object.keys(CAT_ICONS).slice(1).forEach(cat => catSelect.appendChild(el('option', { value: cat, text: tCat(cat) })));
    if (prefill.cat) catSelect.value = prefill.cat;
    if (!catSelect.value && catSelect.options.length) catSelect.value = catSelect.options[0].value;

    const readForm = () => ({
      title:    titleInput.value,
      cat:      catSelect.value,
      place:    placeInput.value,
      pay:      payInput.value,
      time:     timeInput.value,
      duration: durationInput.value,
      details:  detailsInput.value,
    });

    const spot = prefill.spot || null;

    function pickSpot() {
      // Snapshot before the picker takes over the sheet.
      const snapshot = readForm();
      openLocationPicker({
        title: t('postPickSpot'),
        hint: t('mapAreaHint'),
        confirmLabel: t('postPickSpot'),
        initial: spot || undefined,
        onConfirm: (picked) => openPost({ ...snapshot, spot: picked }),
      });
    }

    async function useMyLocation() {
      toast(t('mapLocating'));
      await requestUserLocation();
      const loc = getUserLocation();
      if (!locationIsKnown(loc)) {
        toast(t('mapNoGps'));
        return;
      }
      // A raw GPS fix has no place name, so look one up for display.
      const label = loc.label || shortLabel(await reverseGeocode(loc.lat, loc.lng));
      openPost({ ...readForm(), spot: { lat: loc.lat, lng: loc.lng, label } });
    }

    // Never leave the status line blank: fall back to coordinates when
    // there is no place name (e.g. a GPS fix that failed to geocode).
    const spotLabel = spot
      ? (shortLabel(spot.label) || `${spot.lat.toFixed(4)}, ${spot.lng.toFixed(4)}`)
      : null;

    const spotStatus = el('div', {
      class: 'post-spot-status' + (spot ? ' set' : ''),
      text: spot ? t('postSpotSet', { place: spotLabel }) : t('postNeedSpot'),
    });

    const publishBtn = el('button', {
      class: 'primary', text: t('publishBtn'),
      onclick: () => publishGig(publishBtn, readForm, spot),
    });

    const form = el('div', { class: 'form' },
      el('label', { text: t('gigTitleLabel') }, titleInput),
      el('label', { text: t('categoryLabel') }, catSelect),
      el('label', { text: t('payLabel') }, payInput),
      el('div', { class: 'form-row' },
        el('label', { text: t('timeLabel') }, timeInput),
        el('label', { text: t('durationLabel') }, durationInput)
      ),
      el('label', { text: t('detailsLabel') }, detailsInput),
      el('div', { class: 'post-spot' },
        el('div', { class: 'post-spot-head', text: t('locationLabel') }),
        spotStatus,
        placeInput,
        el('div', { class: 'post-spot-btns' },
          el('button', { class: 'pf-upload-btn', type: 'button', text: t('postUseMyLocation'), onclick: useMyLocation }),
          el('button', { class: 'pf-upload-btn', type: 'button', text: t('postPickSpot'), onclick: pickSpot })
        )
      ),
      publishBtn
    );

    openModal(el('div', {},
      el('h2', { text: t('postTitle') }),
      form
    ));
  }

  async function publishGig(publishBtn, readForm, spot) {
    const user = getCurrentUser();
    if (!user) {
      toast('Please sign in to post a gig.');
      openAuthModal('signin');
      return;
    }

    const form  = readForm();
    const title = (form.title || '').trim();
    if (!title) { toast(t('noTitle')); return; }

    // The pin the poster chose wins; otherwise use their live GPS fix.
    // Never a hardcoded city — the gig has to appear where it is.
    const loc = spot || (locationIsKnown() ? getUserLocation() : null);
    if (!loc || loc.lat == null || loc.lng == null) { toast(t('postNeedSpot')); return; }

    publishBtn.disabled = true;
    publishBtn.textContent = 'Publishing…';

    let place = (form.place || '').trim();
    if (!place) {
      place = shortLabel(await reverseGeocode(loc.lat, loc.lng))
           || `${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`;
    }

    const { error } = await supabase.from('gigs').insert({
      poster_id:     user.id,
      category:      form.cat,
      title,
      place,
      time_label:    (form.time || '').trim() || t('timeLabelFallback'),
      duration:      (form.duration || '').trim() || t('durationLabelFallback'),
      pay:           (form.pay || '').trim() || 'Negotiable',
      pay_type:      'total',
      people:        1,
      urgent:        false,
      description:   (form.details || '').trim(),
      location_lat:  loc.lat,
      location_lng:  loc.lng,
    });

    publishBtn.disabled = false;
    publishBtn.textContent = t('publishBtn');

    if (error) {
      toast('Could not publish gig: ' + error.message);
      return;
    }

    closeModal();
    await loadGigs(true);
    renderGigs();
    if (state.page === 'map') refreshMapMarkers();
    toast(t('gigPosted'));
  }


  // js/profile.js
  /* ============================================================
     PickAGig — profile.js  (modernised)
     Opens with a hero: profile picture first, details underneath.
     Editing is hidden behind an "Edit profile" button so the page
     greets the user with information, not empty form fields.
     All layout classes (.pf-*) live in styles.css, in the app's
     own brand colours — nothing is styled at runtime here.
     ============================================================ */


  /* ── Data helpers (unchanged behaviour) ──────────────────── */

  async function fetchProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) {
      console.error('fetchProfile error:', error);
      return null;
    }
    return data;
  }

  async function saveProfile(userId, patch, silent) {
    const { error } = await supabase.from('profiles').update(patch).eq('id', userId);
    if (error) {
      toast('Could not save: ' + error.message);
      return false;
    }
    if (!silent) toast(t('profileSaved') || 'Profile saved!');
    return true;
  }

  async function fetchCredentials(userId) {
    const { data, error } = await supabase
      .from('credentials')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) { console.error('fetchCredentials error:', error); return []; }
    return data;
  }

  async function uploadCredentialFile(userId, file) {
    const path = `${userId}/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from('credentials').upload(path, file);
    if (error) throw error;
    return path;
  }

  async function getCredentialSignedUrl(path) {
    const { data, error } = await supabase.storage.from('credentials').createSignedUrl(path, 60);
    if (error) { toast('Could not open file: ' + error.message); return null; }
    return data.signedUrl;
  }

  async function uploadAvatar(userId, file) {
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const path = `${userId}/avatar_${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from('avatars').getPublicUrl(path);
    return data.publicUrl;
  }

  async function fetchPendingPosterRatings(userId) {
    const { data, error } = await supabase
      .from('gig_applications')
      .select('gig_id, gigs(id, title, poster_id, status, profiles(full_name))')
      .eq('applicant_id', userId)
      .eq('accepted', true);
    if (error) { console.error('fetchPendingPosterRatings error:', error); return []; }

    const completed = (data || []).filter(r => r.gigs && r.gigs.status === 'completed');
    if (!completed.length) return [];

    const gigIds = completed.map(r => r.gig_id);
    const { data: myRatings } = await supabase
      .from('ratings')
      .select('gig_id')
      .eq('rater_id', userId)
      .in('gig_id', gigIds);
    const alreadyRated = new Set((myRatings || []).map(r => r.gig_id));

    return completed
      .filter(r => !alreadyRated.has(r.gig_id))
      .map(r => ({
        gigId:      r.gig_id,
        gigTitle:   r.gigs.title,
        posterId:   r.gigs.poster_id,
        posterName: r.gigs.profiles?.full_name || 'Unknown',
      }));
  }

  async function fetchHistory(userId) {
    const { data, error } = await supabase
      .from('gig_applications')
      .select('gig_id, accepted, gigs(id, title, pay, created_at, status)')
      .eq('applicant_id', userId)
      .eq('accepted', true);
    if (error) { console.error('fetchHistory error:', error); return []; }

    const completed = (data || []).filter(r => r.gigs && r.gigs.status === 'completed');
    if (!completed.length) return [];

    const gigIds = completed.map(r => r.gig_id);
    const { data: ratings } = await supabase
      .from('ratings')
      .select('gig_id, rating')
      .in('gig_id', gigIds)
      .eq('ratee_id', userId);
    const ratingByGig = Object.fromEntries((ratings || []).map(r => [r.gig_id, r.rating]));

    return completed.map(r => ({
      title:  r.gigs.title,
      pay:    r.gigs.pay,
      when:   new Date(r.gigs.created_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
      rating: ratingByGig[r.gig_id] || null,
    }));
  }

  const AIRTEL_NUMBER = '099 000 0000'; // TODO: replace with your real Airtel Money number

  async function fetchLatestPaymentRequest(userId) {
    const { data, error } = await supabase
      .from('payment_requests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) { console.error('fetchLatestPaymentRequest error:', error); return null; }
    return data;
  }

  // Deletes the profile row and signs the user out. Note: this removes
  // their PickAGig profile data, but the underlying Supabase Auth user
  // record can only be fully removed with the service-role key from a
  // server-side function — see the note in the chat for details.
  async function deleteAccount(user) {
    const { error } = await supabase.from('profiles').delete().eq('id', user.id);
    if (error) { toast('Could not delete account: ' + error.message); return false; }
    await supabase.auth.signOut();
    return true;
  }

  /* ── Hero ────────────────────────────────────────────────── */

  function buildAvatar(user, profile) {
    const initial = (profile.full_name || user.email || '?').charAt(0).toUpperCase();

    const avatar = profile.avatar_url
      ? el('div', { class: 'pf-avatar' }, el('img', { src: profile.avatar_url, alt: profile.full_name || 'Profile picture' }))
      : el('div', { class: 'pf-avatar', text: initial });

    const fileInput = el('input', {
      type: 'file',
      accept: 'image/png,image/jpeg,image/webp',
      style: 'display:none;',
    });

    const camBtn = el('button', {
      class: 'pf-avatar-btn',
      type: 'button',
      title: 'Change profile picture',
      'aria-label': 'Change profile picture',
      text: '📷',
      onclick: () => fileInput.click(),
    });

    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) { toast('Please choose an image under 5MB.'); return; }
      camBtn.disabled = true;
      camBtn.textContent = '…';
      try {
        const url = await uploadAvatar(user.id, file);
        const ok = await saveProfile(user.id, { avatar_url: url }, true);
        if (ok) { toast('Profile picture updated!'); renderProfilePage(); return; }
      } catch (err) {
        toast('Upload failed: ' + err.message);
      }
      camBtn.disabled = false;
      camBtn.textContent = '📷';
    });

    return el('div', { class: 'pf-avatar-wrap' }, avatar, camBtn, fileInput);
  }

  function buildHero(user, profile, onEdit) {
    const isPremium = profile.is_premium && profile.premium_expires_at
      && new Date(profile.premium_expires_at) > new Date();

    const chips = [];
    if (isPremium) chips.push(el('span', { class: 'pf-chip gold', text: '👑 Premium' }));
    chips.push(profile.location
      ? el('span', { class: 'pf-chip', text: '📍 ' + profile.location })
      : el('span', { class: 'pf-chip muted', text: '📍 Add your area' }));
    chips.push(profile.phone
      ? el('span', { class: 'pf-chip', text: '📞 ' + profile.phone })
      : el('span', { class: 'pf-chip muted', text: '📞 Add your phone' }));

    return el('div', { class: 'pf-hero' },
      buildAvatar(user, profile),
      el('h2', { class: 'pf-name', text: profile.full_name || 'Add your name' }),
      el('p', { class: 'pf-headline', text: profile.headline || user.email || 'Add a headline, e.g. Professional painter' }),
      el('div', { class: 'pf-hero-meta' }, ...chips),
      el('button', { class: 'pf-edit-btn', type: 'button', text: 'Edit profile', onclick: onEdit })
    );
  }

  function buildStats(profile) {
    return el('div', { class: 'pf-stats' },
      el('div', { class: 'pf-stat' },
        el('div', { class: 'pf-stat-val', text: '★ ' + (profile.rating ?? 0) }),
        el('div', { class: 'pf-stat-lbl', text: 'Rating' })),
      el('div', { class: 'pf-stat' },
        el('div', { class: 'pf-stat-val', text: String(profile.jobs_done ?? 0) }),
        el('div', { class: 'pf-stat-lbl', text: 'Gigs done' })),
      el('div', { class: 'pf-stat' },
        el('div', { class: 'pf-stat-val', text: profile.rate_mk || '—' }),
        el('div', { class: 'pf-stat-lbl', text: 'Daily rate' }))
    );
  }

  const CHEVRON_SVG = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9.5 5.5 16 12 9.5 18.5"/></svg>';

  // Collapsible variant of a .pf-card: header (with h3) is always
  // visible and tappable, body opens/closes on click — mirrors the
  // same accordion pattern used on the Settings page.
  function collapsibleCard(titleText, ...bodyChildren) {
    return el('details', { class: 'pf-card pf-card-acc' },
      el('summary', { class: 'pf-card-summary' },
        el('h3', { text: titleText }),
        el('span', { class: 'pf-card-chev', html: CHEVRON_SVG })
      ),
      el('div', { class: 'pf-card-acc-body' }, ...bodyChildren)
    );
  }

  function field(labelText, input) {
    return el('label', {}, el('span', { text: labelText }), input);
  }

  function buildEditCard(user, profile, onCancel) {
    const nameInput     = el('input', { type: 'text', value: profile.full_name || '', placeholder: 'e.g. Chrispin Banda' });
    const headlineInput = el('input', { type: 'text', value: profile.headline || '', placeholder: 'e.g. Professional painter' });
    const phoneInput    = el('input', { type: 'tel',  value: profile.phone || '', placeholder: 'e.g. 0991 234 567' });
    const locationInput = el('input', { type: 'text', value: profile.location || '', placeholder: 'e.g. Area 25, Lilongwe' });

    const saveBtn = el('button', {
      class: 'primary', type: 'button', text: t('saveBtn') || 'Save profile',
      onclick: async () => {
        if (!nameInput.value.trim()) { toast('Please enter your full name.'); nameInput.focus(); return; }
        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving…';
        const ok = await saveProfile(user.id, {
          full_name: nameInput.value.trim(),
          headline:  headlineInput.value.trim(),
          phone:     phoneInput.value.trim(),
          location:  locationInput.value.trim(),
        });
        saveBtn.disabled = false;
        saveBtn.textContent = t('saveBtn') || 'Save profile';
        if (ok) renderProfilePage();
      }
    });

    return el('div', { class: 'pf-card' },
      el('h3', { text: 'Edit your details' }),
      el('div', { class: 'form' },
        field(t('nameLabel') || 'Full name', nameInput),
        field('Headline', headlineInput),
        field(t('phoneLabel') || 'Phone number', phoneInput),
        field(t('areaLabel') || 'Your area', locationInput)
      ),
      el('div', { class: 'pf-edit-actions' },
        el('button', { class: 'pf-cancel-btn', type: 'button', text: 'Cancel', onclick: onCancel }),
        saveBtn
      )
    );
  }

  /* ── Sections ────────────────────────────────────────────── */

  function buildPendingRatingsBox(pending) {
    if (!pending.length) return null;
    return el('div', { class: 'pf-card' },
      el('h3', { text: '⭐  Rate your recent gigs' }),
      ...pending.map(p => el('div', { class: 'pf-hist-item' },
        el('div', {},
          el('div', { class: 'pf-hist-title', text: p.gigTitle }),
          el('div', { class: 'pf-hist-when', text: 'Hired by ' + p.posterName })
        ),
        el('button', {
          class: 'pf-rate-btn', type: 'button', text: 'Rate',
          onclick: () => openRatingModal(p.gigId, p.posterId, p.posterName, renderProfilePage)
        })
      ))
    );
  }

  function buildSkillsBox(user, profile) {
    const currentSkills = new Set(profile.skills || []);
    return collapsibleCard('🛠  ' + (t('skillsLabel') || 'Your skills'),
      el('div', { class: 'pf-skills-list' },
        ...Object.keys(CAT_ICONS).slice(1).map(cat => {
          const pill = el('span', {
            class: 'pf-skill-pill' + (currentSkills.has(cat) ? ' active' : ''),
            onclick: async () => {
              if (currentSkills.has(cat)) currentSkills.delete(cat);
              else currentSkills.add(cat);
              pill.classList.toggle('active');
              await saveProfile(user.id, { skills: Array.from(currentSkills) }, true);
            }
          }, CAT_ICONS[cat] + ' ' + tCat(cat));
          return pill;
        })
      )
    );
  }

  function buildCredBox(userId, credentials) {
    const listItems = credentials.length
      ? credentials.map(c => el('li', { class: 'pf-cred-row' },
          el('button', {
            class: 'pf-cred-link', type: 'button', text: '🛡️ ' + c.label,
            onclick: async () => {
              const url = await getCredentialSignedUrl(c.file_path);
              if (url) window.open(url, '_blank');
            }
          }),
          el('button', {
            class: 'pf-cred-del', type: 'button', text: '✕', 'aria-label': 'Remove credential',
            onclick: async () => {
              if (!confirm('Remove this credential?')) return;
              await supabase.storage.from('credentials').remove([c.file_path]);
              await supabase.from('credentials').delete().eq('id', c.id);
              renderProfilePage();
            }
          })
        ))
      : [el('li', { class: 'pf-empty', text: 'No credentials added yet. Employers trust verified workers more.' })];

    const labelInput = el('input', { type: 'text', placeholder: 'e.g. TEVETA Grade 1 Painter' });
    const fileInput  = el('input', { type: 'file', accept: '.pdf,.jpg,.jpeg,.png' });

    const uploadBtn = el('button', {
      class: 'pf-upload-btn', type: 'button',
      text: '+ Upload certificate or National ID',
      onclick: async () => {
        const file = fileInput.files[0];
        const label = labelInput.value.trim();
        if (!file || !label) { toast('Add a label and choose a file first.'); return; }

        uploadBtn.disabled = true;
        uploadBtn.textContent = 'Uploading…';
        try {
          const path = await uploadCredentialFile(userId, file);
          const { error } = await supabase.from('credentials').insert({ user_id: userId, label, file_path: path });
          if (error) throw error;
          toast('Credential added!');
          renderProfilePage();
        } catch (err) {
          toast('Upload failed: ' + err.message);
          uploadBtn.disabled = false;
          uploadBtn.textContent = '+ Upload certificate or National ID';
        }
      }
    });

    return collapsibleCard('🛡️  Credentials',
      el('ul', { class: 'pf-cred-list' }, ...listItems),
      el('div', { class: 'form', style: 'margin-top:14px;' },
        field('Label', labelInput),
        field('File (PDF, JPG or PNG)', fileInput)
      ),
      uploadBtn
    );
  }

  function buildHistoryBox(history) {
    return collapsibleCard('📋  Work history',
      el('div', { class: 'pf-hist-list' },
        ...(history.length
          ? history.map(h => el('div', { class: 'pf-hist-item' },
              el('div', {},
                el('div', { class: 'pf-hist-title', text: h.title }),
                el('div', { class: 'pf-hist-when', text: h.when })
              ),
              el('div', { class: 'pf-hist-right' },
                el('div', { class: 'pf-hist-pay', text: h.pay }),
                el('div', { class: 'pf-hist-rating', text: h.rating ? '★ ' + h.rating + '.0' : 'Not rated yet' })
              )
            ))
          : [el('p', { class: 'pf-empty', text: 'No completed gigs yet. Your finished work will show up here.' })])
      )
    );
  }

  function buildPremiumBox(user, profile, latestRequest) {
    const isPremium = profile.is_premium && profile.premium_expires_at && new Date(profile.premium_expires_at) > new Date();

    if (isPremium) {
      return el('div', { class: 'pf-premium' },
        el('div', { class: 'pf-prem-title', text: '👑 You’re Premium' }),
        el('p', { style: 'color:#fff;opacity:.9;font-size:13px;margin-top:6px;',
          text: 'Active until ' + new Date(profile.premium_expires_at).toLocaleDateString() })
      );
    }

    if (latestRequest && latestRequest.status === 'pending') {
      return el('div', { class: 'pf-premium' },
        el('div', { class: 'pf-prem-title', text: '⏳ Payment under review' }),
        el('p', { style: 'color:#fff;opacity:.9;font-size:13px;margin-top:6px;',
          text: 'Reference: ' + latestRequest.reference + '. We’ll activate Premium once it’s confirmed.' })
      );
    }

    const refInput = el('input', {
      class: 'pf-prem-input', type: 'text',
      placeholder: 'Transaction reference or the phone number you paid from',
    });

    const submitBtn = el('button', {
      class: 'pf-prem-btn', type: 'button',
      text: "I've sent the payment",
      onclick: async () => {
        const reference = refInput.value.trim();
        if (!reference) { toast('Enter the transaction reference or phone number you paid from.'); return; }
        submitBtn.disabled = true;
        const { error } = await supabase.from('payment_requests').insert({ user_id: user.id, reference });
        submitBtn.disabled = false;
        if (error) { toast('Could not submit: ' + error.message); return; }
        toast('Submitted! Premium activates once your payment is confirmed.');
        renderProfilePage();
      }
    });

    return el('div', { class: 'pf-premium' },
      el('div', { class: 'pf-prem-title', text: '👑 Premium — MK 1,500 / week' }),
      el('ul', { class: 'pf-prem-list' },
        el('li', { text: '• Boosted profile at the top of employer searches' }),
        el('li', { text: '• Priority gig alerts by SMS, even offline' }),
        el('li', { text: '• Hand-picked high-paying gigs' }),
        el('li', { text: '• Lower transaction fee on escrow payouts' })
      ),
      el('div', { style: 'background:rgba(255,255,255,.14);border-radius:12px;padding:12px;margin:12px 0;color:#fff;font-size:13px;' },
        el('div', { text: 'Send MK 1,500 via Airtel Money to:' }),
        el('div', { style: 'font-weight:800;font-size:17px;margin-top:4px;letter-spacing:.03em;', text: AIRTEL_NUMBER })
      ),
      refInput,
      submitBtn
    );
  }

  function buildLeaderboardBox() {
    return collapsibleCard('🏆  Community leaderboard',
      el('div', { class: 'pf-lb-list' },
        ...WORKERS.map((w, i) => el('div', { class: 'pf-lb-item' },
          el('div', { class: 'pf-lb-rank' + (i === 0 ? ' top' : ''), text: String(i + 1) }),
          el('div', { class: 'pf-lb-name', text: w.name }),
          el('div', { class: 'pf-lb-meta', text: '★ ' + w.rating + ' · ' + tCat(w.skills[0]) })
        ))
      ),
      el('div', { class: 'pf-lb-footer', text: 'Top workers featured every week' })
    );
  }

  function buildRefBox(profile) {
    return collapsibleCard('🎁  Referrals',
      el('p', { class: 'pf-ref-p', text: 'Refer a friend and earn MK 500 when they complete their first gig.' }),
      el('div', { class: 'pf-ref-box' },
        el('span', { class: 'pf-ref-code', text: (profile.full_name || 'PICKAGIG').toUpperCase().replace(/\s+/g, '').slice(0, 8) + '500' }),
        el('button', { class: 'pf-ref-btn', type: 'button', text: 'Share code', onclick: () => toast('Sharing coming soon.') })
      )
    );
  }

  function gearButton() {
    return el('button', {
      class: 'pf-gear',
      type: 'button',
      'aria-label': t('settingsOpen'),
      title: t('settingsOpen'),
      onclick: () => navigate('settings'),
      html: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.36.39.66.72.86.2.12.44.18.68.18H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    });
  }

  function topBar() {
    return el('div', { class: 'pf-topbar' },
      el('h1', { text: t('profileTitle') || 'Profile' }),
      gearButton()
    );
  }

  function renderSignedOut(container) {
    container.appendChild(el('div', { class: 'pf-container' },
      topBar(),
      el('div', { class: 'pf-card', style: 'text-align:center;padding:30px 18px;' },
        el('div', { style: 'font-size:44px;line-height:1;', text: '👤' }),
        el('h3', { style: 'justify-content:center;margin-top:12px;', text: 'Sign in to view your profile' }),
        el('p', { style: 'margin:6px 0 18px;color:var(--muted);font-size:14px;line-height:1.5;',
          text: 'Create an account or sign in to manage your profile, skills and settings.' }),
        el('button', { class: 'primary', type: 'button', text: 'Sign in', onclick: () => openAuthModal('signin') }),
        el('button', {
          class: 'pf-cancel-btn', type: 'button', style: 'width:100%;margin-top:10px;',
          text: t('settingsTitle'), onclick: () => navigate('settings'),
        })
      )
    ));
  }

  function buildDeleteAccountRow(user) {
    return el('button', {
      class: 'pf-delete-account', type: 'button', text: 'Delete my account',
      onclick: async () => {
        if (!confirm('This permanently deletes your PickAGig profile and signs you out. This cannot be undone. Continue?')) return;
        const ok = await deleteAccount(user);
        if (ok) {
          toast('Your account has been deleted.');
          navigate('gigs');
        }
      }
    });
  }

  /* ── Entry point ─────────────────────────────────────────── */

  let editMode = false;

  async function renderProfilePage() {
    const profileContainer = document.getElementById('pageProfile');
    if (!profileContainer) return;
    profileContainer.textContent = '';

    const user = getCurrentUser();
    if (!user) {
      editMode = false;
      renderSignedOut(profileContainer);
      return;
    }

    profileContainer.appendChild(el('div', { class: 'pf-container' },
      topBar(),
      el('div', { class: 'pf-skeleton' })
    ));

    const [profile, credentials, history, pendingRatings, latestPaymentRequest] = await Promise.all([
      fetchProfile(user.id),
      fetchCredentials(user.id),
      fetchHistory(user.id),
      fetchPendingPosterRatings(user.id),
      fetchLatestPaymentRequest(user.id),
    ]);
    profileContainer.textContent = '';

    if (!profile) {
      profileContainer.appendChild(el('div', { class: 'pf-container' },
        topBar(),
        el('div', { class: 'pf-card', style: 'text-align:center;' },
          el('p', { style: 'color:var(--muted);font-size:14px;', text: 'Could not load your profile.' }),
          el('button', { class: 'primary', type: 'button', text: 'Retry', onclick: renderProfilePage })
        )
      ));
      return;
    }

    const rerender = () => renderProfilePage();
    const openEdit  = () => { editMode = true;  rerender(); };
    const closeEdit = () => { editMode = false; rerender(); };

    const children = [
      topBar(),
      buildHero(user, profile, openEdit),
      buildStats(profile),
    ];

    if (editMode) children.push(buildEditCard(user, profile, closeEdit));

    children.push(
      buildPendingRatingsBox(pendingRatings),
      buildSkillsBox(user, profile),
      buildCredBox(user.id, credentials),
      buildHistoryBox(history),
      buildPremiumBox(user, profile, latestPaymentRequest),
      buildLeaderboardBox(),
      buildRefBox(profile),
      buildDeleteAccountRow(user)
    );

    // editMode resets after a successful save (renderProfilePage re-runs).
    editMode = false;

    profileContainer.appendChild(el('div', { class: 'pf-container' }, ...children.filter(Boolean)));
  }


  // js/settings.js
  /* ============================================================
     PickAGig — settings.js
     Dedicated Settings page rendered as a grouped inset list: a
     sticky frosted header, uppercase section labels, and rows with
     tinted icons, inset hairline dividers and chevrons.
     Device-local preferences (radius, home area, language) work
     while signed out; notification toggles need a profile row.
     ============================================================ */


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
    moon:      svg('<path d="M20.4 14.7A8.5 8.5 0 1 1 9.3 3.6a7 7 0 0 0 11.1 11.1Z"/>'),
    back:      '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    chevron:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9.5 5.5 16 12 9.5 18.5"/></svg>',
  };

  // ── Theme (light / dark) ────────────────────────────────────
  // Persisted locally so it applies instantly on next load; the
  // inline script in index.html sets the attribute before first
  // paint so there's no flash of the wrong theme.
  const THEME_KEY = 'pg_theme';

  function getTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) { /* ignore */ }
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
  }

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
    return el('section', { class: 'set-group' },
      label ? el('h2', { class: 'set-label', text: label }) : null,
      el('div', { class: 'set-list' }, ...list)
    );
  }

  function profileSummaryRow(user, profile) {
    const initial = (profile?.full_name || user.email || '?').charAt(0).toUpperCase();
    const avatar = profile?.avatar_url
      ? el('div', { class: 'set-profile-avatar' }, el('img', { src: profile.avatar_url, alt: '' }))
      : el('div', { class: 'set-profile-avatar', text: initial });

    return el('section', { class: 'set-group' },
      el('div', { class: 'set-list' },
        el('button', {
          class: 'row row-tap set-profile-row', type: 'button',
          onclick: () => navigate('profile'),
        },
          avatar,
          el('span', { class: 'row-text' },
            el('strong', { text: profile?.full_name || t('settingsAccount') }),
            el('span', { class: 'row-hint', text: profile?.headline || user.email || '' })
          ),
          chevron()
        )
      )
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

  // ── Change password, Help & FAQ, Contact Us ─────────────────

  function openChangePassword() {
    const newPassInput = el('input', { type: 'password', placeholder: 'New password (min 6 characters)', autocomplete: 'new-password' });
    const confirmInput = el('input', { type: 'password', placeholder: 'Confirm new password', autocomplete: 'new-password' });

    const saveBtn = el('button', {
      class: 'primary', type: 'button', text: 'Update password',
      onclick: async () => {
        const pass = newPassInput.value;
        if (pass.length < 6) { toast('Password must be at least 6 characters.'); return; }
        if (pass !== confirmInput.value) { toast('Passwords don\u2019t match.'); return; }
        saveBtn.disabled = true;
        saveBtn.textContent = 'Updating\u2026';
        const { error } = await supabase.auth.updateUser({ password: pass });
        saveBtn.disabled = false;
        saveBtn.textContent = 'Update password';
        if (error) { toast('Could not update password: ' + error.message); return; }
        toast('Password updated.');
        closeModal();
      }
    });

    openModal(el('div', {},
      el('h2', { text: 'Change password', style: 'margin-bottom:14px;' }),
      el('div', { class: 'form' },
        el('label', { text: 'New password' }, newPassInput),
        el('label', { text: 'Confirm password' }, confirmInput)
      ),
      el('div', { style: 'margin-top:16px;' }, saveBtn)
    ));
  }

  const FAQ_ITEMS = [
    { q: 'How do I get paid for a gig?', a: 'Once the poster marks the gig complete, you agree on payment directly with them (cash or mobile money). PickAGig doesn\u2019t hold funds on your behalf yet.' },
    { q: 'How does Premium work?', a: 'Premium boosts your profile in employer searches and sends priority gig alerts. Pay via Airtel Money from the Profile page \u2014 activation happens once your payment is confirmed, usually within a day.' },
    { q: 'How are ratings calculated?', a: 'After a gig is marked complete, both sides can leave a star rating. Your average shows on your profile and helps you stand out to employers.' },
    { q: 'Can I edit or cancel a gig I posted?', a: 'You can cancel an open gig from its detail page. Editing isn\u2019t available yet \u2014 for now, cancel and repost with the changes.' },
    { q: 'Is my location shared with everyone?', a: 'Only your approximate area is used to match you with nearby gigs. Your exact location is never shown to other users.' },
  ];

  function openHelpFaq() {
    openModal(el('div', {},
      el('h2', { text: 'Help & FAQ', style: 'margin-bottom:10px;' }),
      el('div', { class: 'set-list' },
        ...FAQ_ITEMS.map(item => el('details', { class: 'faq-item' },
          el('summary', { class: 'faq-q', text: item.q }),
          el('p', { class: 'faq-a', text: item.a })
        ))
      )
    ));
  }

  function openContactUs() {
    openModal(el('div', {},
      el('h2', { text: 'Contact us', style: 'margin-bottom:10px;' }),
      el('p', { style: 'color:var(--muted);font-size:14px;margin-bottom:16px;', text: 'Reach the PickAGig team through any of these \u2014 we usually reply within a day.' }),
      el('div', { class: 'set-list' },
        el('a', { class: 'row row-tap', href: 'mailto:support@pickagig.mw' },
          ico('info', 't-navy'), rowText('Email', 'support@pickagig.mw'), chevron()
        ),
        el('a', { class: 'row row-tap', href: 'https://wa.me/265991234567', target: '_blank', rel: 'noopener' },
          ico('bell', 't-green'), rowText('WhatsApp', '+265 991 234 567'), chevron()
        )
      ),
      el('p', { style: 'color:var(--muted);font-size:11.5px;margin-top:12px;', text: 'Update these with your real support contacts.' })
    ));
  }

  // ── Page ─────────────────────────────────────────────────────

  async function renderSettingsPage() {
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

    // ── Other settings (location, notifications, appearance) ───
    const otherSettingsGroup = group(t('settingsOther') || 'Other settings',
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
      ),
      (user && profile)
        ? toggleRow({
            icon: 'bell', tone: 't-orange',
            title: t('smsAlertsLbl'),
            hint: t('settingsSmsHint'),
            checked: profile.sms_alerts,
            onChange: (on) => saveSetting(user.id, { sms_alerts: on }),
          })
        : null,
      toggleRow({
        icon: 'moon', tone: 't-navy',
        title: t('settingsDarkMode') || 'Dark mode',
        checked: getTheme() === 'dark',
        onChange: (on) => setTheme(on ? 'dark' : 'light'),
      })
    );

    const notSignedInGroup = !user
      ? group(t('settingsOther') || 'Other settings', signInBlock(t('settingsSignInHint')))
      : null;

    // ── More (language, data, account, support, about) ──────────
    const moreGroup = group(null,
      stackedRow(
        [ico('globe', 't-blue'), rowText(t('settingsLanguage'))],
        segmented(
          [{ value: 'EN', label: 'English' }, { value: 'NY', label: 'Chichewa' }],
          lang,
          setLang
        )
      ),
      (user && profile)
        ? toggleRow({
            icon: 'data', tone: 't-green',
            title: t('dataSaverLbl'),
            hint: t('settingsDataSaverHint'),
            checked: profile.data_saver,
            onChange: (on) => saveSetting(user.id, { data_saver: on }),
          })
        : null,
      user
        ? actionRow({ icon: 'user', tone: 't-navy', title: 'Change password', onclick: openChangePassword })
        : null,
      actionRow({ icon: 'info', tone: 't-blue', title: 'Help & FAQ', onclick: openHelpFaq }),
      actionRow({ icon: 'bell', tone: 't-green', title: 'Contact us', onclick: openContactUs }),
      staticRow({
        icon: 'info', tone: 't-navy',
        title: 'PickAGig',
        value: t('settingsVersion') + ' ' + APP_VERSION,
      }),
      user
        ? dangerRow({
            icon: 'logout', title: t('settingsSignOut'),
            onclick: () => { if (confirm('Sign out of PickAGig?')) signOut(); },
          })
        : null
    );

    container.appendChild(topbar);
    container.appendChild(el('div', { class: 'set-body' },
      el('p', { class: 'set-lead', text: t('settingsPageSub') }),
      (user && profile) ? profileSummaryRow(user, profile) : null,
      otherSettingsGroup,
      notSignedInGroup,
      moreGroup
    ));
  }


  // js/main.js
  function setLang(l) {
    setLangValue(l);
    init();
  }
  function renderAuthStatus(user) {
    const wrap = document.getElementById("authStatus");
    if (!wrap) return;
    wrap.textContent = "";
    if (user) {
      wrap.appendChild(el("button", {
        class: "lang-pill",
        text: (user.user_metadata?.full_name || user.email).split(" ")[0].split("@")[0],
        onclick: () => {
          if (confirm("Sign out of PickAGig?")) signOut();
        }
      }));
    } else {
      wrap.appendChild(el("button", {
        class: "lang-pill",
        text: "Sign in",
        onclick: () => openAuthModal("signin")
      }));
    }
  }
  function navigate(page) {
    if (page === "post") {
      openPost();
      return;
    }
    state.page = page;
    document.querySelectorAll(".nav").forEach((b) => b.classList.remove("active"));
    const activeBtn = document.querySelector(`.nav[data-page="${page}"]`);
    if (activeBtn) activeBtn.classList.add("active");
    const panel = document.getElementById("panel");
    const panelBrand = document.getElementById("panelBrand");
    const panelPageHeader = document.getElementById("panelPageHeader");
    const panelGigsBody = document.getElementById("panelGigsBody");
    const filtersBar = document.getElementById("filtersBar");
    const pageGigs = document.getElementById("pageGigs");
    const pageMap = document.getElementById("pageMap");
    const pageChats = document.getElementById("pageChats");
    const pageProfile = document.getElementById("pageProfile");
    const pageSettings = document.getElementById("pageSettings");
    panelBrand.style.display = "none";
    panelPageHeader.style.display = "none";
    panelGigsBody.style.display = "none";
    filtersBar.style.display = "none";
    pageGigs.style.display = "none";
    pageMap.style.display = "none";
    pageChats.style.display = "none";
    if (pageProfile) pageProfile.style.display = "none";
    if (pageSettings) pageSettings.style.display = "none";
    panel.style.display = "block";
    if (page === "gigs") {
      panelBrand.style.display = "block";
      panelGigsBody.style.display = "block";
      filtersBar.style.display = "flex";
      pageGigs.style.display = "block";
      renderFilters();
      renderGigs();
    } else if (page === "map") {
      panelPageHeader.style.display = "block";
      document.getElementById("panelPageTitle").textContent = t("mapTitle");
      updateMapSubtitle();
      pageMap.style.display = "block";
      setTimeout(initMap, 60);
    } else if (page === "chats") {
      panelPageHeader.style.display = "block";
      document.getElementById("panelPageTitle").textContent = t("chatsTitle");
      document.getElementById("panelPageSub").textContent = t("chatsSub");
      pageChats.style.display = "block";
      renderChatsList();
    } else if (page === "profile") {
      panel.style.display = "none";
      if (pageProfile) pageProfile.style.display = "block";
      renderProfilePage();
    } else if (page === "settings") {
      panel.style.display = "none";
      if (pageSettings) pageSettings.style.display = "block";
      renderSettingsPage();
    }
  }
  var PIN_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
  function updateLocationText() {
    const node = document.getElementById("locationText");
    if (!node) return;
    const known = locationIsKnown();
    node.innerHTML = PIN_SVG + (known ? t("withinRadius", { km: getRadiusKm() }) : t("locationUnknown"));
    node.classList.toggle("tap-to-set", !known);
    node.onclick = known ? null : () => navigate("settings");
  }
  async function init() {
    document.querySelectorAll(".lang-pill[data-lang]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    updateLocationText();
    document.getElementById("heroSubtitle").textContent = t("tagline");
    document.getElementById("searchInput").placeholder = t("searchPlaceholder");
    document.getElementById("gigsHeading").textContent = t("gigsNearYou");
    document.getElementById("mapLinkBtn").textContent = t("mapLink");
    document.querySelectorAll("[data-nav-label]").forEach((node) => {
      node.textContent = t(node.dataset.navLabel);
    });
    await requestUserLocation();
    await loadGigs();
    updateLocationText();
    renderAuthStatus(getCurrentUser());
    navigate(state.page === "post" ? "gigs" : state.page);
  }
  function onSearch(val) {
    state.query = val;
    renderGigs();
  }
  window.navigate = navigate;
  window.setLang = setLang;
  window.toast = toast;
  window.closeModal = closeModal;
  window.onSearch = onSearch;
  window.openAdvancedFilters = openAdvancedFilters;
  window.openNotifications = openNotifications;
  initAuth((user) => {
    renderAuthStatus(user);
    refreshAppliedStatus();
  });
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
