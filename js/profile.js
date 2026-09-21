/* ============================================================
   PickAGig — profile.js  (modernised)
   Opens with a hero: profile picture first, details underneath.
   Editing is hidden behind an "Edit profile" button so the page
   greets the user with information, not empty form fields.
   All layout classes (.pf-*) live in styles.css, in the app's
   own brand colours — nothing is styled at runtime here.
   ============================================================ */

import { el, toast } from './ui-helpers.js';
import { t, tCat, CAT_ICONS } from './i18n.js';
import { WORKERS } from './data.js';
import { navigate } from './main.js';
import { supabase } from './supabaseClient.js';
import { getCurrentUser, openAuthModal } from './auth.js';
import { openRatingModal } from './gigs.js';

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

export async function renderProfilePage() {
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
