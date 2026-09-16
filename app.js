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
      withinRadius: "Within 5km of you",
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
      detailsLabel: "Details",
      publishBtn: "Publish gig",
      gigPosted: "Your gig has been posted!",
      noTitle: "Add a gig title first.",
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
      mapTitle: "Gig Map",
      mapSubtitle: "Gigs within 5km \xB7 Tap a pin to view.",
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
      withinRadius: "Mkati mwa 5km kuchokera pamene muli",
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
      detailsLabel: "Mfundo",
      publishBtn: "Tumizirani ntchito",
      gigPosted: "Ntchito yanu yatumiziridwa!",
      noTitle: "Onjezerani dzina la ntchito kaye.",
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
      mapTitle: "Mapu a Ntchito",
      mapSubtitle: "Ntchito mkati mwa 5km \xB7 Dotani chizindikiro.",
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
  function t(key) {
    return STRINGS[lang]?.[key] ?? STRINGS.EN[key] ?? key;
  }
  function tCat(cat) {
    return t(cat);
  }

  // js/data.js
  var BLANTYRE_CENTER = [-15.7861, 35.0058];
  var RADIUS_KM = 5;
  var WORKERS = [
    { id: "w1", name: "James M.", rating: 4.9, skills: ["Plumbing"] },
    { id: "w2", name: "Alice K.", rating: 4.8, skills: ["Cleaning"] },
    { id: "w3", name: "John B.", rating: 4.7, skills: ["Construction"] }
  ];
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
  function requestUserLocation() {
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
          toast("Could not get your location \u2014 showing gigs near Blantyre instead.");
          resolve(state.userLocation);
        },
        { enableHighAccuracy: true, timeout: 8e3, maximumAge: 6e4 }
      );
    });
  }
  function getUserLocation() {
    return state.userLocation || { lat: BLANTYRE_CENTER[0], lng: BLANTYRE_CENTER[1], isFallback: true };
  }

  // js/map.js
  function initMap() {
    if (!window.L) return;
    const loc = getUserLocation();
    const center = [loc.lat, loc.lng];
    if (state.leafletMap) {
      state.leafletMap.invalidateSize();
      refreshMapMarkers();
      return;
    }
    state.leafletMap = L.map("map").setView(center, 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "\xA9 OpenStreetMap contributors",
      maxZoom: 18
    }).addTo(state.leafletMap);
    L.circle(center, {
      radius: RADIUS_KM * 1e3,
      color: "#f97316",
      fillColor: "#f97316",
      fillOpacity: 0.05,
      weight: 1.5
    }).addTo(state.leafletMap);
    const youIcon = L.divIcon({
      className: "",
      html: `<div style="width:16px;height:16px;background:#2563eb;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.3);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
    L.marker(center, { icon: youIcon }).addTo(state.leafletMap).bindPopup(loc.isFallback ? "Approximate location" : "You are here");
    refreshMapMarkers();
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
  var appliedGigIds = /* @__PURE__ */ new Set();
  async function loadAppliedGigIds() {
    const user = getCurrentUser();
    if (!user) {
      appliedGigIds = /* @__PURE__ */ new Set();
      return;
    }
    const { data, error } = await supabase.from("gig_applications").select("gig_id").eq("applicant_id", user.id);
    if (!error && data) appliedGigIds = new Set(data.map((r) => r.gig_id));
  }
  async function refreshAppliedStatus() {
    await loadAppliedGigIds();
    if (state.page === "gigs") renderGigs();
  }
  async function loadGigs(force = false) {
    if (state.gigsLoaded && !force) return;
    const { data, error } = await supabase.from("gigs").select("*, profiles(full_name)").eq("status", "open").order("created_at", { ascending: false });
    if (error) {
      toast("Could not load gigs: " + error.message);
      state.gigsCache = [];
      return;
    }
    state.gigsCache = data.map((g) => ({
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
      posterName: g.profiles?.full_name || "Unknown",
      posterInitials: (g.profiles?.full_name || "?").charAt(0).toUpperCase()
    }));
    state.gigsLoaded = true;
    await loadAppliedGigIds();
  }
  function renderFilters() {
    const wrap = document.getElementById("filtersBar");
    wrap.textContent = "";
    Object.keys(CAT_ICONS).forEach((cat) => {
      const icon = CAT_ICONS[cat];
      const btn = el(
        "button",
        {
          class: "filter" + (cat === state.selectedCat ? " active" : ""),
          onclick() {
            state.selectedCat = cat;
            renderFilters();
            renderGigs();
            if (state.page === "map") refreshMapMarkers();
          }
        },
        icon ? el("span", { class: "filter-emoji", text: icon }) : null,
        document.createTextNode(tCat(cat))
      );
      wrap.appendChild(btn);
    });
  }
  function getFilteredGigs() {
    const q = state.query.toLowerCase();
    return state.gigsCache.filter((g) => {
      const catMatch = state.selectedCat === "All" || g.cat === state.selectedCat;
      const searchMatch = !q || (g.title + " " + g.cat + " " + g.place).toLowerCase().includes(q);
      return catMatch && searchMatch;
    }).sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
  }
  function buildGigCard(gig) {
    const isApplied = appliedGigIds.has(gig.id);
    const peopleLabel = gig.people === 1 ? t("peopleSingular") : t("peoplePlural");
    const loc = getUserLocation();
    const km = distanceKm(loc.lat, loc.lng, gig.lat, gig.lng);
    return el(
      "article",
      {
        class: "gig-card",
        onclick: () => openGigDetail(gig)
      },
      el(
        "div",
        { class: "gig-body" },
        el("div", { class: "cat-icon", text: CAT_ICONS[gig.cat] || "\u{1F4BC}" }),
        el(
          "div",
          { class: "gig-info" },
          el(
            "div",
            { class: "gig-tag-row" },
            el("span", { class: "gig-cat-label", text: tCat(gig.cat) }),
            gig.urgent ? el(
              "span",
              { class: "urgent-badge" },
              el("span", { class: "urgent-dot" }),
              document.createTextNode(t("urgent"))
            ) : null
          ),
          el("h3", { class: "gig-title", text: gig.title }),
          el(
            "div",
            { class: "gig-meta" },
            el(
              "div",
              { class: "gig-meta-item" },
              el("svg", { html: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' }),
              document.createTextNode((km != null ? km + " km \xB7 " : "") + gig.place)
            ),
            el(
              "div",
              { class: "gig-meta-item" },
              el("svg", { html: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' }),
              document.createTextNode(gig.time + " \xB7 " + gig.duration)
            )
          )
        )
      ),
      el(
        "div",
        { class: "gig-footer" },
        el(
          "div",
          {},
          el("div", { class: "gig-pay-amount", text: gig.pay }),
          el("div", { class: "gig-pay-type", text: gig.payType || "total" })
        ),
        el(
          "div",
          { class: "gig-stats" },
          el(
            "div",
            { class: "gig-people" },
            el("svg", { html: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' }),
            document.createTextNode(gig.people + " " + peopleLabel)
          ),
          el("div", { class: "applied-badge", text: gig.applied + " " + t("applied") })
        )
      )
    );
  }
  async function fetchApplicants(gigId) {
    const { data, error } = await supabase.from("gig_applications").select("applicant_id, profiles(full_name)").eq("gig_id", gigId);
    if (error) {
      console.error("fetchApplicants error:", error);
      return [];
    }
    return data.map((r) => ({ applicantId: r.applicant_id, name: r.profiles?.full_name || "Unknown" }));
  }
  async function markGigComplete(gigId, applicantId) {
    const { error: acceptErr } = await supabase.from("gig_applications").update({ accepted: true }).eq("gig_id", gigId).eq("applicant_id", applicantId);
    if (acceptErr) {
      toast("Could not mark hire: " + acceptErr.message);
      return false;
    }
    const { error: statusErr } = await supabase.from("gigs").update({ status: "completed" }).eq("id", gigId);
    if (statusErr) {
      toast("Could not complete gig: " + statusErr.message);
      return false;
    }
    await loadGigs(true);
    renderGigs();
    return true;
  }
  function openRatingModal(gigId, workerId, workerName, onSuccess) {
    let selected = 0;
    const stars = [1, 2, 3, 4, 5].map((n) => {
      const star = el("span", {
        text: "\u2605",
        style: "font-size:28px;cursor:pointer;color:#ccc;margin-right:4px;",
        onclick: () => {
          selected = n;
          stars.forEach((s, i) => {
            s.style.color = i < selected ? "#f97316" : "#ccc";
          });
        }
      });
      return star;
    });
    const reviewInput = el("textarea", { placeholder: "Optional review\u2026" });
    const submitBtn = el("button", {
      class: "primary",
      text: "Submit rating",
      onclick: async () => {
        if (!selected) {
          toast("Pick a star rating first.");
          return;
        }
        const user = getCurrentUser();
        submitBtn.disabled = true;
        const { error } = await supabase.from("ratings").insert({
          gig_id: gigId,
          rater_id: user.id,
          ratee_id: workerId,
          rating: selected,
          review: reviewInput.value.trim()
        });
        submitBtn.disabled = false;
        if (error) {
          toast("Could not submit rating: " + error.message);
          return;
        }
        toast("Rating submitted!");
        closeModal();
        if (onSuccess) onSuccess();
      }
    });
    openModal(el(
      "div",
      {},
      el("h2", { text: "Rate " + workerName }),
      el("div", { style: "margin:12px 0;" }, ...stars),
      el("label", { text: "Review" }, reviewInput),
      submitBtn
    ));
  }
  async function openCompleteGigModal(gig) {
    const applicants = await fetchApplicants(gig.id);
    if (!applicants.length) {
      toast("No applicants yet to mark as hired.");
      return;
    }
    const list = el(
      "div",
      { class: "form" },
      ...applicants.map((a) => el("button", {
        class: "primary",
        style: "display:block;width:100%;margin-bottom:8px;",
        text: a.name,
        onclick: async () => {
          closeModal();
          const ok = await markGigComplete(gig.id, a.applicantId);
          if (ok) openRatingModal(gig.id, a.applicantId, a.name);
        }
      }))
    );
    openModal(el(
      "div",
      {},
      el("h2", { text: "Who did this gig?" }),
      el("p", { style: "color:#666;font-size:13px;margin-bottom:10px;", text: "Pick the person you hired to mark this gig complete and leave them a rating." }),
      list
    ));
  }
  function openGigDetail(gig) {
    const user = getCurrentUser();
    const isOwner = user && gig.posterId === user.id;
    const isApplied = appliedGigIds.has(gig.id);
    const loc = getUserLocation();
    const km = distanceKm(loc.lat, loc.lng, gig.lat, gig.lng);
    const actionBtn = isOwner ? el("button", { class: "detail-apply", text: "Mark gig as complete", onclick: () => openCompleteGigModal(gig) }) : el("button", {
      class: "detail-apply" + (isApplied ? " applied" : ""),
      text: isApplied ? t("applicationSent") : t("pickThisGig"),
      onclick: async function() {
        if (appliedGigIds.has(gig.id)) return;
        this.disabled = true;
        await applyToGig(gig);
        this.disabled = false;
        if (appliedGigIds.has(gig.id)) {
          this.classList.add("applied");
          this.textContent = t("applicationSent");
        }
      }
    });
    openModal(el(
      "div",
      {},
      el(
        "div",
        { style: "font-size:11px;font-weight:800;color:var(--orange);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;" },
        document.createTextNode(tCat(gig.cat) + (gig.urgent ? " \xB7 " + t("urgent") : ""))
      ),
      el("h2", { text: gig.title, style: "margin-bottom:15px;" }),
      el("div", { class: "detail-pay", text: gig.pay }),
      el("div", { class: "detail-pay-type", text: gig.payType || "total" }),
      el(
        "div",
        { class: "detail-meta" },
        document.createTextNode("\u{1F4CD} " + (km != null ? km + " km \xB7 " : "") + gig.place),
        el("br"),
        document.createTextNode("\u{1F552} " + gig.time + " \xB7 " + gig.duration),
        el("br"),
        document.createTextNode("\u{1F465} " + gig.people + " " + (gig.people === 1 ? t("peopleSingular") : t("peoplePlural")) + " \xB7 " + gig.applied + " " + t("applied")),
        el("br"),
        document.createTextNode("\u{1F464} Posted by " + gig.posterName)
      ),
      actionBtn
    ));
  }
  function renderGigs() {
    const grid = document.getElementById("gigsGrid");
    const empty = document.getElementById("gigsEmpty");
    if (!grid) return;
    grid.textContent = "";
    const list = getFilteredGigs();
    list.forEach((g) => grid.appendChild(buildGigCard(g)));
    empty.style.display = list.length ? "none" : "block";
    empty.textContent = t("noGigs");
  }
  async function applyToGig(gig) {
    const user = getCurrentUser();
    if (!user) {
      toast("Please sign in to apply for a gig.");
      openAuthModal("signin");
      return;
    }
    if (appliedGigIds.has(gig.id)) return;
    const { error } = await supabase.from("gig_applications").insert({ gig_id: gig.id, applicant_id: user.id });
    if (error) {
      if (error.code === "23505") {
        appliedGigIds.add(gig.id);
      } else {
        toast("Could not apply: " + error.message);
        return;
      }
    } else {
      appliedGigIds.add(gig.id);
      gig.applied = (gig.applied || 0) + 1;
    }
    await createOrGetChat(gig.id, gig.posterId, user.id);
    toast(t("applicationSent"));
    renderGigs();
  }
  function openPost() {
    if (!getCurrentUser()) {
      toast("Please sign in to post a gig.");
      openAuthModal("signin");
      return;
    }
    const titleInput = el("input", { id: "pt", type: "text", placeholder: t("gigTitleLabel") });
    const catSelect = el("select", { id: "pc" });
    const placeInput = el("input", { id: "pp", type: "text", placeholder: t("locationLabel") });
    const payInput = el("input", { id: "pw", type: "text", placeholder: t("payLabel") });
    const detailsInput = el("textarea", { id: "pd", placeholder: t("detailsLabel") });
    Object.keys(CAT_ICONS).slice(1).forEach((cat) => catSelect.appendChild(el("option", { value: cat, text: tCat(cat) })));
    const publishBtn = el("button", { class: "primary", text: t("publishBtn"), onclick: () => publishGig(publishBtn) });
    const form = el(
      "div",
      { class: "form" },
      el("label", { text: t("gigTitleLabel") }, titleInput),
      el("label", { text: t("categoryLabel") }, catSelect),
      el("label", { text: t("locationLabel") }, placeInput),
      el("label", { text: t("payLabel") }, payInput),
      el("label", { text: t("detailsLabel") }, detailsInput),
      publishBtn
    );
    openModal(el(
      "div",
      {},
      el("h2", { text: t("postTitle") }),
      form
    ));
  }
  async function publishGig(publishBtn) {
    const user = getCurrentUser();
    if (!user) {
      toast("Please sign in to post a gig.");
      openAuthModal("signin");
      return;
    }
    const title = document.getElementById("pt")?.value.trim();
    if (!title) {
      toast(t("noTitle"));
      return;
    }
    publishBtn.disabled = true;
    publishBtn.textContent = "Publishing\u2026";
    const { error } = await supabase.from("gigs").insert({
      poster_id: user.id,
      category: document.getElementById("pc").value,
      title,
      place: document.getElementById("pp").value.trim() || "Blantyre",
      time_label: "New gig",
      duration: "Flexible",
      pay: document.getElementById("pw").value.trim() || "Negotiable",
      pay_type: "total",
      people: 1,
      urgent: false,
      description: document.getElementById("pd")?.value.trim() || "",
      location_lat: BLANTYRE_CENTER[0] + (Math.random() - 0.5) * 0.04,
      location_lng: BLANTYRE_CENTER[1] + (Math.random() - 0.5) * 0.04
    });
    publishBtn.disabled = false;
    publishBtn.textContent = t("publishBtn");
    if (error) {
      toast("Could not publish gig: " + error.message);
      return;
    }
    closeModal();
    await loadGigs(true);
    renderGigs();
    toast(t("gigPosted"));
  }

  // js/profile.js
  async function fetchProfile(userId) {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (error) {
      console.error("fetchProfile error:", error);
      return null;
    }
    return data;
  }
  async function saveProfile(userId, patch) {
    const { error } = await supabase.from("profiles").update(patch).eq("id", userId);
    if (error) {
      toast("Could not save: " + error.message);
      return false;
    }
    toast(t("profileSaved") || "Profile saved!");
    return true;
  }
  async function fetchCredentials(userId) {
    const { data, error } = await supabase.from("credentials").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    if (error) {
      console.error("fetchCredentials error:", error);
      return [];
    }
    return data;
  }
  async function uploadCredentialFile(userId, file) {
    const path = `${userId}/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("credentials").upload(path, file);
    if (error) throw error;
    return path;
  }
  async function getCredentialSignedUrl(path) {
    const { data, error } = await supabase.storage.from("credentials").createSignedUrl(path, 60);
    if (error) {
      toast("Could not open file: " + error.message);
      return null;
    }
    return data.signedUrl;
  }
  async function fetchPendingPosterRatings(userId) {
    const { data, error } = await supabase.from("gig_applications").select("gig_id, gigs(id, title, poster_id, status, profiles(full_name))").eq("applicant_id", userId).eq("accepted", true);
    if (error) {
      console.error("fetchPendingPosterRatings error:", error);
      return [];
    }
    const completed = (data || []).filter((r) => r.gigs && r.gigs.status === "completed");
    if (!completed.length) return [];
    const gigIds = completed.map((r) => r.gig_id);
    const { data: myRatings } = await supabase.from("ratings").select("gig_id").eq("rater_id", userId).in("gig_id", gigIds);
    const alreadyRated = new Set((myRatings || []).map((r) => r.gig_id));
    return completed.filter((r) => !alreadyRated.has(r.gig_id)).map((r) => ({
      gigId: r.gig_id,
      gigTitle: r.gigs.title,
      posterId: r.gigs.poster_id,
      posterName: r.gigs.profiles?.full_name || "Unknown"
    }));
  }
  function buildPendingRatingsBox(pending) {
    if (!pending.length) return null;
    return el(
      "div",
      { class: "pf-card" },
      el("h3", { text: "Rate your recent gigs" }),
      ...pending.map((p) => el(
        "div",
        { class: "pf-hist-item" },
        el(
          "div",
          {},
          el("div", { class: "pf-hist-title", text: p.gigTitle }),
          el("div", { class: "pf-hist-when", text: "Hired by " + p.posterName })
        ),
        el("button", {
          class: "primary",
          text: "Rate",
          onclick: () => openRatingModal(p.gigId, p.posterId, p.posterName, renderProfilePage)
        })
      ))
    );
  }
  async function fetchHistory(userId) {
    const { data, error } = await supabase.from("gig_applications").select("gig_id, accepted, gigs(id, title, pay, created_at, status)").eq("applicant_id", userId).eq("accepted", true);
    if (error) {
      console.error("fetchHistory error:", error);
      return [];
    }
    const completed = (data || []).filter((r) => r.gigs && r.gigs.status === "completed");
    if (!completed.length) return [];
    const gigIds = completed.map((r) => r.gig_id);
    const { data: ratings } = await supabase.from("ratings").select("gig_id, rating").in("gig_id", gigIds).eq("ratee_id", userId);
    const ratingByGig = Object.fromEntries((ratings || []).map((r) => [r.gig_id, r.rating]));
    return completed.map((r) => ({
      title: r.gigs.title,
      pay: r.gigs.pay,
      when: new Date(r.gigs.created_at).toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
      rating: ratingByGig[r.gig_id] || null
    }));
  }
  function buildCredBox(userId, credentials) {
    const listItems = credentials.length ? credentials.map((c) => el(
      "li",
      { style: "display:flex;justify-content:space-between;align-items:center;padding:4px 0;" },
      el("span", {
        text: "\u{1F6E1}\uFE0F " + c.label,
        style: "cursor:pointer;text-decoration:underline;",
        onclick: async () => {
          const url = await getCredentialSignedUrl(c.file_path);
          if (url) window.open(url, "_blank");
        }
      }),
      el("button", {
        text: "\u2715",
        style: "border:0;background:none;color:#dc2626;cursor:pointer;font-size:14px;",
        onclick: async () => {
          if (!confirm("Remove this credential?")) return;
          await supabase.storage.from("credentials").remove([c.file_path]);
          await supabase.from("credentials").delete().eq("id", c.id);
          renderProfilePage();
        }
      })
    )) : [el("li", { text: "No credentials added yet." })];
    const fieldStyle = "display:block;width:100%;box-sizing:border-box;padding:9px 11px;margin-top:4px;border-radius:8px;border:1px solid #ddd;font-size:14px;";
    const labelStyle = "display:block;margin-bottom:12px;font-size:12px;font-weight:700;color:#444;";
    const labelInput = el("input", { type: "text", placeholder: "e.g. TEVETA Grade 1 Painter", style: fieldStyle });
    const fileInput = el("input", { type: "file", accept: ".pdf,.jpg,.jpeg,.png", style: "display:block;margin-top:4px;" });
    const uploadBtn = el("button", {
      class: "pf-upload-btn",
      text: "+ Upload certificate or National ID",
      onclick: async () => {
        const file = fileInput.files[0];
        const label = labelInput.value.trim();
        if (!file || !label) {
          toast("Add a label and choose a file first.");
          return;
        }
        uploadBtn.disabled = true;
        uploadBtn.textContent = "Uploading\u2026";
        try {
          const path = await uploadCredentialFile(userId, file);
          const { error } = await supabase.from("credentials").insert({ user_id: userId, label, file_path: path });
          if (error) throw error;
          toast("Credential added!");
          renderProfilePage();
        } catch (err) {
          toast("Upload failed: " + err.message);
          uploadBtn.disabled = false;
          uploadBtn.textContent = "+ Upload certificate or National ID";
        }
      }
    });
    return el(
      "div",
      { class: "pf-card" },
      el("h3", { text: "Credentials" }),
      el("ul", { class: "pf-cred-list" }, ...listItems),
      el(
        "div",
        { class: "form", style: "margin-top:10px;" },
        el("label", { style: labelStyle, text: "Label" }, labelInput),
        el("label", { style: labelStyle, text: "File (PDF, JPG, or PNG)" }, fileInput),
        uploadBtn
      )
    );
  }
  var AIRTEL_NUMBER = "099 000 0000";
  async function fetchLatestPaymentRequest(userId) {
    const { data, error } = await supabase.from("payment_requests").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (error) {
      console.error("fetchLatestPaymentRequest error:", error);
      return null;
    }
    return data;
  }
  function buildPremiumBox(user, profile, latestRequest) {
    const isPremium = profile.is_premium && profile.premium_expires_at && new Date(profile.premium_expires_at) > /* @__PURE__ */ new Date();
    if (isPremium) {
      return el(
        "div",
        { class: "pf-premium" },
        el("div", { class: "pf-prem-title", text: "\u{1F451} You\u2019re Premium" }),
        el("p", {
          style: "color:white;opacity:.9;font-size:13px;margin-top:6px;",
          text: "Active until " + new Date(profile.premium_expires_at).toLocaleDateString()
        })
      );
    }
    if (latestRequest && latestRequest.status === "pending") {
      return el(
        "div",
        { class: "pf-premium" },
        el("div", { class: "pf-prem-title", text: "\u23F3 Payment under review" }),
        el("p", {
          style: "color:white;opacity:.9;font-size:13px;margin-top:6px;",
          text: "Reference: " + latestRequest.reference + ". We\u2019ll activate Premium once it\u2019s confirmed."
        })
      );
    }
    const refInput = el("input", {
      type: "text",
      placeholder: "Transaction reference or the phone number you paid from",
      style: "display:block;width:100%;box-sizing:border-box;padding:9px 11px;border-radius:8px;border:1px solid rgba(255,255,255,.4);font-size:14px;background:rgba(255,255,255,.95);"
    });
    const submitBtn = el("button", {
      class: "pf-prem-btn",
      text: "I've sent the payment",
      onclick: async () => {
        const reference = refInput.value.trim();
        if (!reference) {
          toast("Enter the transaction reference or phone number you paid from.");
          return;
        }
        submitBtn.disabled = true;
        const { error } = await supabase.from("payment_requests").insert({ user_id: user.id, reference });
        submitBtn.disabled = false;
        if (error) {
          toast("Could not submit: " + error.message);
          return;
        }
        toast("Submitted! Premium activates once your payment is confirmed.");
        renderProfilePage();
      }
    });
    return el(
      "div",
      { class: "pf-premium" },
      el("div", { class: "pf-prem-title", text: "\u{1F451} Premium \u2014 MK 1,500 / week" }),
      el(
        "ul",
        { class: "pf-prem-list" },
        el("li", { text: "\u2022 Boosted profile at the top of employer searches" }),
        el("li", { text: "\u2022 Priority gig alerts by SMS, even offline" }),
        el("li", { text: "\u2022 Hand-picked high-paying gigs" }),
        el("li", { text: "\u2022 Lower transaction fee on escrow payouts" })
      ),
      el(
        "div",
        { style: "background:rgba(255,255,255,.15);border-radius:10px;padding:10px;margin:10px 0;color:white;font-size:13px;" },
        el("div", { text: "Send MK 1,500 via Airtel Money to:" }),
        el("div", { style: "font-weight:800;font-size:16px;margin-top:4px;", text: AIRTEL_NUMBER })
      ),
      el("label", { style: "color:white;display:block;margin-top:10px;margin-bottom:6px;font-size:12px;font-weight:700;" }, refInput),
      submitBtn
    );
  }
  function renderSignedOut(container) {
    container.appendChild(el(
      "div",
      { class: "pf-container" },
      el(
        "div",
        { class: "pf-card", style: "text-align:center;" },
        el("h3", { text: "Sign in to view your profile" }),
        el("p", { style: "margin:10px 0;color:#666;", text: "Create an account or sign in to manage your profile, skills, and settings." }),
        el("button", { class: "primary", text: "Sign in", onclick: () => openAuthModal("signin") })
      )
    ));
  }
  async function renderProfilePage() {
    const profileContainer = document.getElementById("pageProfile");
    if (!profileContainer) return;
    profileContainer.textContent = "";
    const user = getCurrentUser();
    if (!user) {
      renderSignedOut(profileContainer);
      return;
    }
    profileContainer.appendChild(el("div", { class: "pf-card", text: "Loading profile\u2026" }));
    const [profile, credentials, history, pendingRatings, latestPaymentRequest] = await Promise.all([
      fetchProfile(user.id),
      fetchCredentials(user.id),
      fetchHistory(user.id),
      fetchPendingPosterRatings(user.id),
      fetchLatestPaymentRequest(user.id)
    ]);
    profileContainer.textContent = "";
    if (!profile) {
      profileContainer.appendChild(el(
        "div",
        { class: "pf-card" },
        el("p", { text: "Could not load your profile." }),
        el("button", { class: "primary", text: "Retry", onclick: renderProfilePage })
      ));
      return;
    }
    const initial = (profile.full_name || user.email || "?").charAt(0).toUpperCase();
    const fieldStyle = "display:block;width:100%;box-sizing:border-box;padding:9px 11px;margin-top:4px;border-radius:8px;border:1px solid rgba(255,255,255,.4);font-size:14px;background:rgba(255,255,255,.95);";
    const labelStyle = "display:block;margin-bottom:12px;font-size:12px;font-weight:700;color:rgba(255,255,255,.85);";
    const nameInput = el("input", { type: "text", value: profile.full_name || "", placeholder: t("nameLabel") || "Full name", style: fieldStyle });
    const headlineInput = el("input", { type: "text", value: profile.headline || "", placeholder: "Headline (e.g. Professional painter)", style: fieldStyle });
    const phoneInput = el("input", { type: "text", value: profile.phone || "", placeholder: t("phoneLabel") || "Phone number", style: fieldStyle });
    const locationInput = el("input", { type: "text", value: profile.location || "", placeholder: t("areaLabel") || "Your area", style: fieldStyle });
    const saveHeaderBtn = el("button", {
      class: "primary",
      text: t("saveBtn") || "Save profile",
      onclick: async () => {
        saveHeaderBtn.disabled = true;
        const ok = await saveProfile(user.id, {
          full_name: nameInput.value.trim(),
          headline: headlineInput.value.trim(),
          phone: phoneInput.value.trim(),
          location: locationInput.value.trim()
        });
        saveHeaderBtn.disabled = false;
        if (ok) renderProfilePage();
      }
    });
    const header = el(
      "div",
      { class: "pf-header" },
      el(
        "div",
        { style: "display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;" },
        el("h1", { style: "font-size:22px; font-weight:800; margin:0;", text: t("profileTitle") || "Profile" }),
        el(
          "div",
          { class: "panel-actions" },
          el("button", { class: "lang-pill" + (lang === "EN" ? " active" : ""), text: "EN", onclick: () => setLang("EN") }),
          el("button", { class: "lang-pill" + (lang === "NY" ? " active" : ""), text: "NY", onclick: () => setLang("NY") })
        )
      ),
      el(
        "div",
        { class: "pf-header-top" },
        el("div", { class: "pf-avatar" }, initial),
        el(
          "div",
          { class: "pf-info", style: "flex:1;min-width:0;" },
          el("label", { style: labelStyle, text: t("nameLabel") || "Full name" }, nameInput),
          el("label", { style: labelStyle, text: "Headline" }, headlineInput),
          el("label", { style: labelStyle, text: t("phoneLabel") || "Phone number" }, phoneInput),
          el("label", { style: labelStyle, text: t("areaLabel") || "Your area" }, locationInput),
          saveHeaderBtn
        )
      ),
      el(
        "div",
        { class: "pf-stats" },
        el("div", { class: "pf-stat" }, el("div", { class: "pf-stat-val", text: "\u2605 " + (profile.rating ?? 0) }), el("div", { class: "pf-stat-lbl", text: "Rating" })),
        el("div", { class: "pf-stat" }, el("div", { class: "pf-stat-val", text: profile.jobs_done ?? 0 }), el("div", { class: "pf-stat-lbl", text: "Gigs Done" })),
        el("div", { class: "pf-stat" }, el("div", { class: "pf-stat-val", text: profile.rate_mk || "\u2014" }), el("div", { class: "pf-stat-lbl", text: "Daily Rate" }))
      )
    );
    const currentSkills = new Set(profile.skills || []);
    const skillsBox = el(
      "div",
      { class: "pf-card" },
      el("h3", { text: t("skillsLabel") || "Skills" }),
      el(
        "div",
        { class: "pf-skills-list" },
        ...Object.keys(CAT_ICONS).slice(1).map((cat) => {
          const pill = el("span", {
            class: "pf-skill-pill" + (currentSkills.has(cat) ? " active" : ""),
            onclick: async () => {
              if (currentSkills.has(cat)) currentSkills.delete(cat);
              else currentSkills.add(cat);
              pill.classList.toggle("active");
              await saveProfile(user.id, { skills: Array.from(currentSkills) });
            }
          }, CAT_ICONS[cat] + " " + tCat(cat));
          return pill;
        })
      )
    );
    const credBox = buildCredBox(user.id, credentials);
    const histBox = el(
      "div",
      { class: "pf-card" },
      el("h3", { text: "History" }),
      el(
        "div",
        { class: "pf-hist-list" },
        ...history.length ? history.map((h) => el(
          "div",
          { class: "pf-hist-item" },
          el(
            "div",
            {},
            el("div", { class: "pf-hist-title", text: h.title }),
            el("div", { class: "pf-hist-when", text: h.when })
          ),
          el(
            "div",
            { class: "pf-hist-right" },
            el("div", { class: "pf-hist-pay", text: h.pay }),
            el("div", { class: "pf-hist-rating", text: h.rating ? "\u2605 " + h.rating + ".0" : "Not rated yet" })
          )
        )) : [el("p", { style: "color:#666;font-size:13px;", text: "No completed gigs yet." })]
      )
    );
    const premiumBox = buildPremiumBox(user, profile, latestPaymentRequest);
    const leaderboardBox = el(
      "div",
      { class: "pf-card" },
      el("h3", { text: "Community leaderboard" }),
      el(
        "div",
        { class: "pf-lb-list" },
        ...WORKERS.map((w, i) => el(
          "div",
          { class: "pf-lb-item" },
          el("div", { class: "pf-lb-rank" + (i === 0 ? " top" : ""), text: i + 1 }),
          el("div", { class: "pf-lb-name", text: w.name }),
          el("div", { class: "pf-lb-meta", text: "\u2605 " + w.rating + " \xB7 " + tCat(w.skills[0]) })
        ))
      ),
      el("div", { class: "pf-lb-footer", text: "\u{1F3C6} Top workers featured every week" })
    );
    const smsToggle = el("input", { type: "checkbox", checked: profile.sms_alerts });
    smsToggle.addEventListener("change", () => saveProfile(user.id, { sms_alerts: smsToggle.checked }));
    const dataSaverToggle = el("input", { type: "checkbox", checked: profile.data_saver });
    dataSaverToggle.addEventListener("change", () => saveProfile(user.id, { data_saver: dataSaverToggle.checked }));
    const settingsBox = el(
      "div",
      { class: "pf-card" },
      el("h3", { text: "Settings" }),
      el(
        "label",
        { class: "pf-toggle" },
        el("div", {}, el("strong", { text: "SMS Alerts" }), el("div", { class: "pf-toggle-hint", text: "Get gig alerts by SMS when data is off" })),
        smsToggle
      ),
      el(
        "label",
        { class: "pf-toggle" },
        el("div", {}, el("strong", { text: "Data Saver" }), el("div", { class: "pf-toggle-hint", text: "Cache gigs and sync later" })),
        dataSaverToggle
      )
    );
    const refBox = el(
      "div",
      { class: "pf-card" },
      el("h3", { text: "Referrals" }),
      el("p", { class: "pf-ref-p", text: "\u{1F381} Refer a friend and earn MK 500 when they complete their first gig." }),
      el(
        "div",
        { class: "pf-ref-box" },
        el("span", { class: "pf-ref-code", text: (profile.full_name || "PICKAGIG").toUpperCase().replace(/\s+/g, "").slice(0, 8) + "500" }),
        el("button", { class: "pf-ref-btn", text: "Share code", onclick: () => toast("Sharing coming soon.") })
      )
    );
    const pendingRatingsBox = buildPendingRatingsBox(pendingRatings);
    profileContainer.appendChild(el(
      "div",
      { class: "pf-container" },
      header,
      pendingRatingsBox,
      skillsBox,
      credBox,
      histBox,
      premiumBox,
      leaderboardBox,
      settingsBox,
      refBox
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
    panelBrand.style.display = "none";
    panelPageHeader.style.display = "none";
    panelGigsBody.style.display = "none";
    filtersBar.style.display = "none";
    pageGigs.style.display = "none";
    pageMap.style.display = "none";
    pageChats.style.display = "none";
    if (pageProfile) pageProfile.style.display = "none";
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
      document.getElementById("panelPageSub").textContent = t("mapSubtitle");
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
    }
  }
  async function init() {
    document.querySelectorAll(".lang-pill[data-lang]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    document.getElementById("locationText").innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' + t("withinRadius");
    document.getElementById("heroSubtitle").textContent = t("tagline");
    document.getElementById("searchInput").placeholder = t("searchPlaceholder");
    document.getElementById("gigsHeading").textContent = t("gigsNearYou");
    document.getElementById("mapLinkBtn").textContent = t("mapLink");
    document.querySelectorAll("[data-nav-label]").forEach((node) => {
      node.textContent = t(node.dataset.navLabel);
    });
    await requestUserLocation();
    await loadGigs();
    renderAuthStatus(getCurrentUser());
    navigate(state.page === "post" || state.page === "profile" ? "gigs" : state.page);
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
