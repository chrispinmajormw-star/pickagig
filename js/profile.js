/* ============================================================
   PickAGig — profile.js
   Renders the profile page using the logged-in user's real
   Supabase `profiles` row. Editable fields save straight back
   to the database. History and leaderboard sections remain
   demo content for now (not yet backed by real tables).
   ============================================================ */

import { el, toast } from './ui-helpers.js';
import { t, tCat, CAT_ICONS, lang } from './i18n.js';
import { WORKERS } from './data.js';
import { setLang } from './main.js';
import { supabase } from './supabaseClient.js';
import { getCurrentUser, openAuthModal } from './auth.js';
import { openRatingModal } from './gigs.js';

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

async function saveProfile(userId, patch) {
  const { error } = await supabase.from('profiles').update(patch).eq('id', userId);
  if (error) {
    toast('Could not save: ' + error.message);
    return false;
  }
  toast(t('profileSaved') || 'Profile saved!');
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

function buildPendingRatingsBox(pending) {
  if (!pending.length) return null;
  return el('div', { class: 'pf-card' },
    el('h3', { text: 'Rate your recent gigs' }),
    ...pending.map(p => el('div', { class: 'pf-hist-item' },
      el('div', {},
        el('div', { class: 'pf-hist-title', text: p.gigTitle }),
        el('div', { class: 'pf-hist-when', text: 'Hired by ' + p.posterName })
      ),
      el('button', {
        class: 'primary',
        text: 'Rate',
        onclick: () => openRatingModal(p.gigId, p.posterId, p.posterName, renderProfilePage)
      })
    ))
  );
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

function buildCredBox(userId, credentials) {
  const listItems = credentials.length
    ? credentials.map(c => el('li', { style: 'display:flex;justify-content:space-between;align-items:center;padding:4px 0;' },
        el('span', {
          text: '🛡️ ' + c.label,
          style: 'cursor:pointer;text-decoration:underline;',
          onclick: async () => {
            const url = await getCredentialSignedUrl(c.file_path);
            if (url) window.open(url, '_blank');
          }
        }),
        el('button', {
          text: '✕',
          style: 'border:0;background:none;color:#dc2626;cursor:pointer;font-size:14px;',
          onclick: async () => {
            if (!confirm('Remove this credential?')) return;
            await supabase.storage.from('credentials').remove([c.file_path]);
            await supabase.from('credentials').delete().eq('id', c.id);
            renderProfilePage();
          }
        })
      ))
    : [el('li', { text: 'No credentials added yet.' })];

  const labelInput = el('input', { type: 'text', placeholder: 'e.g. TEVETA Grade 1 Painter' });
  const fileInput  = el('input', { type: 'file', accept: '.pdf,.jpg,.jpeg,.png' });

  const uploadBtn = el('button', {
    class: 'pf-upload-btn',
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

  return el('div', { class: 'pf-card' },
    el('h3', { text: 'Credentials' }),
    el('ul', { class: 'pf-cred-list' }, ...listItems),
    el('div', { class: 'form', style: 'margin-top:10px;' },
      el('label', { text: 'Label' }, labelInput),
      el('label', { text: 'File (PDF, JPG, or PNG)' }, fileInput),
      uploadBtn
    )
  );
}

// TODO: replace with your real Airtel Money number
const AIRTEL_NUMBER = '099 000 0000';

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

function buildPremiumBox(user, profile, latestRequest) {
  const isPremium = profile.is_premium && profile.premium_expires_at && new Date(profile.premium_expires_at) > new Date();

  if (isPremium) {
    return el('div', { class: 'pf-premium' },
      el('div', { class: 'pf-prem-title', text: '👑 You’re Premium' }),
      el('p', { style: 'color:white;opacity:.9;font-size:13px;margin-top:6px;',
        text: 'Active until ' + new Date(profile.premium_expires_at).toLocaleDateString() })
    );
  }

  if (latestRequest && latestRequest.status === 'pending') {
    return el('div', { class: 'pf-premium' },
      el('div', { class: 'pf-prem-title', text: '⏳ Payment under review' }),
      el('p', { style: 'color:white;opacity:.9;font-size:13px;margin-top:6px;',
        text: 'Reference: ' + latestRequest.reference + '. We’ll activate Premium once it’s confirmed.' })
    );
  }

  const refInput = el('input', { type: 'text', placeholder: 'Transaction reference or the phone number you paid from' });
  const submitBtn = el('button', {
    class: 'pf-prem-btn',
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
    el('div', { style: 'background:rgba(255,255,255,.15);border-radius:10px;padding:10px;margin:10px 0;color:white;font-size:13px;' },
      el('div', { text: 'Send MK 1,500 via Airtel Money to:' }),
      el('div', { style: 'font-weight:800;font-size:16px;margin-top:4px;', text: AIRTEL_NUMBER })
    ),
    el('label', { style: 'color:white;display:block;margin-top:8px;' }, refInput),
    submitBtn
  );
}
function renderSignedOut(container) {
  container.appendChild(el('div', { class: 'pf-container' },
    el('div', { class: 'pf-card', style: 'text-align:center;' },
      el('h3', { text: 'Sign in to view your profile' }),
      el('p', { style: 'margin:10px 0;color:#666;', text: 'Create an account or sign in to manage your profile, skills, and settings.' }),
      el('button', { class: 'primary', text: 'Sign in', onclick: () => openAuthModal('signin') })
    )
  ));
}

export async function renderProfilePage() {
  const profileContainer = document.getElementById('pageProfile');
  if (!profileContainer) return;
  profileContainer.textContent = '';

  const user = getCurrentUser();
  if (!user) {
    renderSignedOut(profileContainer);
    return;
  }

  profileContainer.appendChild(el('div', { class: 'pf-card', text: 'Loading profile…' }));
  const [profile, credentials, history, pendingRatings, latestPaymentRequest] = await Promise.all([
    fetchProfile(user.id),
    fetchCredentials(user.id),
    fetchHistory(user.id),
    fetchPendingPosterRatings(user.id),
    fetchLatestPaymentRequest(user.id),
  ]);
  profileContainer.textContent = '';

  if (!profile) {
    profileContainer.appendChild(el('div', { class: 'pf-card' },
      el('p', { text: 'Could not load your profile.' }),
      el('button', { class: 'primary', text: 'Retry', onclick: renderProfilePage })
    ));
    return;
  }

  const initial = (profile.full_name || user.email || '?').charAt(0).toUpperCase();

  // ── Editable header fields ──────────────────────────────────
  const nameInput     = el('input', { type: 'text', value: profile.full_name || '', placeholder: t('nameLabel') || 'Full name' });
  const headlineInput = el('input', { type: 'text', value: profile.headline  || '', placeholder: 'Headline (e.g. Professional painter)' });
  const phoneInput    = el('input', { type: 'text', value: profile.phone     || '', placeholder: t('phoneLabel') || 'Phone number' });
  const locationInput = el('input', { type: 'text', value: profile.location || '', placeholder: t('areaLabel') || 'Your area' });

  const saveHeaderBtn = el('button', {
    class: 'primary', text: t('saveBtn') || 'Save profile',
    onclick: async () => {
      saveHeaderBtn.disabled = true;
      const ok = await saveProfile(user.id, {
        full_name: nameInput.value.trim(),
        headline:  headlineInput.value.trim(),
        phone:     phoneInput.value.trim(),
        location:  locationInput.value.trim(),
      });
      saveHeaderBtn.disabled = false;
      if (ok) renderProfilePage();
    }
  });

  const header = el('div', { class: 'pf-header' },
    el('div', { style: 'display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;' },
      el('h1', { style: 'font-size:22px; font-weight:800; margin:0;', text: t('profileTitle') || 'Profile' }),
      el('div', { class: 'panel-actions' },
        el('button', { class: 'lang-pill' + (lang==='EN'?' active':''), text: 'EN', onclick: () => setLang('EN') }),
        el('button', { class: 'lang-pill' + (lang==='NY'?' active':''), text: 'NY', onclick: () => setLang('NY') })
      )
    ),
    el('div', { class: 'pf-header-top' },
      el('div', { class: 'pf-avatar' }, initial),
      el('div', { class: 'pf-info', style: 'flex:1;' },
        el('label', { text: t('nameLabel') || 'Full name' }, nameInput),
        el('label', { text: 'Headline' }, headlineInput),
        el('label', { text: t('phoneLabel') || 'Phone number' }, phoneInput),
        el('label', { text: t('areaLabel') || 'Your area' }, locationInput),
        saveHeaderBtn
      )
    ),
    el('div', { class: 'pf-stats' },
      el('div', { class: 'pf-stat' }, el('div', { class: 'pf-stat-val', text: '★ ' + (profile.rating ?? 0) }), el('div', { class: 'pf-stat-lbl', text: t('rating') || 'Rating' })),
      el('div', { class: 'pf-stat' }, el('div', { class: 'pf-stat-val', text: profile.jobs_done ?? 0 }), el('div', { class: 'pf-stat-lbl', text: t('gigsDone') || 'Gigs Done' })),
      el('div', { class: 'pf-stat' }, el('div', { class: 'pf-stat-val', text: profile.rate_mk || '—' }), el('div', { class: 'pf-stat-lbl', text: 'Daily Rate' }))
    )
  );

  // ── Skills (each tap saves immediately) ─────────────────────
  const currentSkills = new Set(profile.skills || []);
  const skillsBox = el('div', { class: 'pf-card' },
    el('h3', { text: t('skillsLabel') || 'Skills' }),
    el('div', { class: 'pf-skills-list' },
      ...Object.keys(CAT_ICONS).slice(1).map(cat => {
        const pill = el('span', {
          class: 'pf-skill-pill' + (currentSkills.has(cat) ? ' active' : ''),
          onclick: async () => {
            if (currentSkills.has(cat)) currentSkills.delete(cat);
            else currentSkills.add(cat);
            pill.classList.toggle('active');
            await saveProfile(user.id, { skills: Array.from(currentSkills) });
          }
        }, CAT_ICONS[cat] + ' ' + tCat(cat));
        return pill;
      })
    )
  );

  const credBox = buildCredBox(user.id, credentials);

  // History and leaderboard stay as demo content — not yet backed
  // by real tables (would need a `completed_gigs` table etc.)
  const histBox = el('div', { class: 'pf-card' },
    el('h3', { text: 'History' }),
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
        : [el('p', { style: 'color:#666;font-size:13px;', text: 'No completed gigs yet.' })])
    )
  );

  const premiumBox = buildPremiumBox(user, profile, latestPaymentRequest);

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

  // ── Settings (each toggle saves immediately) ────────────────
  const smsToggle = el('input', { type: 'checkbox', checked: profile.sms_alerts });
  smsToggle.addEventListener('change', () => saveProfile(user.id, { sms_alerts: smsToggle.checked }));

  const dataSaverToggle = el('input', { type: 'checkbox', checked: profile.data_saver });
  dataSaverToggle.addEventListener('change', () => saveProfile(user.id, { data_saver: dataSaverToggle.checked }));

  const settingsBox = el('div', { class: 'pf-card' },
    el('h3', { text: 'Settings' }),
    el('label', { class: 'pf-toggle' },
      el('div', {}, el('strong', { text: 'SMS Alerts' }), el('div', { class: 'pf-toggle-hint', text: 'Get gig alerts by SMS when data is off' })),
      smsToggle
    ),
    el('label', { class: 'pf-toggle' },
      el('div', {}, el('strong', { text: 'Data Saver' }), el('div', { class: 'pf-toggle-hint', text: 'Cache gigs and sync later' })),
      dataSaverToggle
    )
  );

  const refBox = el('div', { class: 'pf-card' },
    el('h3', { text: 'Referrals' }),
    el('p', { class: 'pf-ref-p', text: '🎁 Refer a friend and earn MK 500 when they complete their first gig.' }),
    el('div', { class: 'pf-ref-box' },
      el('span', { class: 'pf-ref-code', text: (profile.full_name || 'PICKAGIG').toUpperCase().replace(/\s+/g, '').slice(0, 8) + '500' }),
      el('button', { class: 'pf-ref-btn', text: 'Share code', onclick: () => toast('Sharing coming soon.') })
    )
  );

  const pendingRatingsBox = buildPendingRatingsBox(pendingRatings);

  profileContainer.appendChild(el('div', { class: 'pf-container' },
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
