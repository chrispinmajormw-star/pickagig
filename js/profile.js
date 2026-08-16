/* ============================================================
   PickAGig — profile.js
   Renders the profile page using the logged-in user's real
   Supabase `profiles` row. Editable fields save straight back
   to the database. History and leaderboard sections remain
   demo content for now (not yet backed by real tables).
   ============================================================ */

import { el, toast } from './ui-helpers.js';
import { t, tCat, CAT_ICONS, lang } from './i18n.js';
import { HISTORY, WORKERS } from './data.js';
import { setLang } from './main.js';
import { supabase } from './supabaseClient.js';
import { getCurrentUser, openAuthModal } from './auth.js';

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
  const profile = await fetchProfile(user.id);
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

  const credBox = el('div', { class: 'pf-card' },
    el('h3', { text: 'Credentials' }),
    el('ul', { class: 'pf-cred-list' },
      ...(profile.credentials && profile.credentials.length
        ? profile.credentials.map(c => el('li', { text: '🛡️ ' + c }))
        : [el('li', { text: 'No credentials added yet.' })])
    ),
    el('button', { class: 'pf-upload-btn', text: '+ Upload certificate or National ID', onclick: () => toast('Uploads coming soon.') })
  );

  // History and leaderboard stay as demo content — not yet backed
  // by real tables (would need a `completed_gigs` table etc.)
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
    el('button', { class: 'pf-prem-btn', text: 'Subscribe with Airtel Money', onclick: () => toast('Payments coming soon.') })
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

  profileContainer.appendChild(el('div', { class: 'pf-container' },
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
