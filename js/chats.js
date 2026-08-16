/* ============================================================
   PickAGig — chats.js
   Chat list rendering and the individual message thread modal.
   ============================================================ */

import { el, openModal } from './ui-helpers.js';
import { t } from './i18n.js';
import { LS } from './data.js';

export function renderChatsList() {
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

export function openChatThread(gigId) {
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
