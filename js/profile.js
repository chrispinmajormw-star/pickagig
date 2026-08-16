/* ============================================================
   PickAGig — profile.js
   Renders the full profile page (stats, skills, credentials,
   history, premium upsell, leaderboard, settings, referrals).
   ============================================================ */

import { el } from './ui-helpers.js';
import { t, tCat, CAT_ICONS, lang } from './i18n.js';
import { LS, HISTORY, WORKERS } from './data.js';
import { setLang } from './main.js';

export function renderProfilePage() {
  const profile = LS.getProfile();
  const initial = (profile.name || '?').charAt(0).toUpperCase();

  const profileContainer = document.getElementById('pageProfile');
  if (!profileContainer) return;
  profileContainer.textContent = '';

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
