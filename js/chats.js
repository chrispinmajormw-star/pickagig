/* ============================================================
   PickAGig — chats.js
   Real chat threads backed by Supabase `chats` and `messages`
   tables, with live message updates via Supabase Realtime.
   ============================================================ */

import { el, openModal, toast } from './ui-helpers.js';
import { t } from './i18n.js';
import { supabase } from './supabaseClient.js';
import { getCurrentUser, openAuthModal } from './auth.js';

let activeChannel = null;

// Creates a chat between a gig's poster and an applicant, or
// returns the existing one (one thread per gig+applicant pair).
export async function createOrGetChat(gigId, posterId, applicantId) {
  if (!posterId || posterId === applicantId) return null;

  const { data: existing, error: findErr } = await supabase
    .from('chats')
    .select('id')
    .eq('gig_id', gigId)
    .eq('user2_id', applicantId)
    .maybeSingle();

  if (findErr) { console.error('createOrGetChat find error:', findErr); return null; }
  if (existing) return existing.id;

  const { data: created, error: createErr } = await supabase
    .from('chats')
    .insert({ gig_id: gigId, user1_id: posterId, user2_id: applicantId })
    .select('id')
    .single();

  if (createErr) { console.error('createOrGetChat insert error:', createErr); return null; }
  return created.id;
}

async function fetchChatsWithPreview(userId) {
  const { data: chats, error } = await supabase
    .from('chats')
    .select('id, gig_id, user1_id, user2_id, created_at, gigs(title)')
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) { console.error('fetchChats error:', error); return []; }
  if (!chats.length) return [];

  const otherIds = [...new Set(chats.map(c => (c.user1_id === userId ? c.user2_id : c.user1_id)))];
  const { data: profiles } = await supabase.from('profiles').select('id, full_name').in('id', otherIds);
  const nameById = Object.fromEntries((profiles || []).map(p => [p.id, p.full_name]));

  const chatIds = chats.map(c => c.id);
  const { data: msgs } = await supabase
    .from('messages')
    .select('chat_id, content, created_at')
    .in('chat_id', chatIds)
    .order('created_at', { ascending: false });

  const lastByChat = {};
  (msgs || []).forEach(m => { if (!lastByChat[m.chat_id]) lastByChat[m.chat_id] = m; });

  return chats.map(c => {
    const otherId = c.user1_id === userId ? c.user2_id : c.user1_id;
    const otherName = nameById[otherId] || 'Unknown';
    return {
      id: c.id,
      gigTitle: c.gigs?.title || 'Gig',
      otherName,
      otherInitials: (otherName || '?').charAt(0).toUpperCase(),
      lastMessage: lastByChat[c.id]?.content || '',
    };
  });
}

export async function renderChatsList() {
  const chatsList = document.getElementById('chatsList');
  if (!chatsList) return;
  chatsList.textContent = '';

  const user = getCurrentUser();
  if (!user) {
    chatsList.appendChild(el('div', { class: 'chats-empty' },
      el('p', { text: 'Sign in to see your messages.' }),
      el('button', { class: 'primary', text: 'Sign in', onclick: () => openAuthModal('signin') })
    ));
    return;
  }

  chatsList.appendChild(el('div', { class: 'chats-empty', text: 'Loading…' }));
  const chats = await fetchChatsWithPreview(user.id);
  chatsList.textContent = '';

  if (chats.length === 0) {
    chatsList.appendChild(el('div', { class: 'chats-empty', text: t('noChats') }));
    return;
  }

  const list = el('div', { class: 'chat-list' });
  chats.forEach(chat => {
    list.appendChild(el('div', { class: 'chat-item', onclick: () => openChatThread(chat.id, chat.otherName) },
      el('div', { class: 'chat-avatar', text: chat.otherInitials }),
      el('div', { class: 'chat-item-middle' },
        el('div', { class: 'chat-name-row' },
          el('div', { class: 'chat-name', text: chat.otherName })
        ),
        el('div', { class: 'chat-preview', text: chat.lastMessage || chat.gigTitle })
      )
    ));
  });
  chatsList.appendChild(list);
}

export async function openChatThread(chatId, otherName) {
  const user = getCurrentUser();
  if (!user) { openAuthModal('signin'); return; }

  const threadEl = el('div', { class: 'chat-thread' });

  function addBubble(msg) {
    const cls = msg.sender_id === user.id ? 'bubble-wrap me' : 'bubble-wrap them';
    threadEl.appendChild(el('div', { class: cls }, el('div', { class: 'bubble', text: msg.content })));
    threadEl.scrollTop = threadEl.scrollHeight;
  }

  const { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });

  if (error) toast('Could not load messages: ' + error.message);
  else messages.forEach(addBubble);

  const msgInput = el('input', { type: 'text', placeholder: t('sendPlaceholder') });
  const sendMsg = async () => {
    const text = msgInput.value.trim();
    if (!text) return;
    msgInput.value = '';
    const { error: sendErr } = await supabase
      .from('messages')
      .insert({ chat_id: chatId, sender_id: user.id, content: text });
    if (sendErr) toast('Could not send: ' + sendErr.message);
  };
  msgInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });

  // Live updates: replaces any previous thread's subscription so we
  // only ever listen to the chat that's currently open.
  if (activeChannel) supabase.removeChannel(activeChannel);
  activeChannel = supabase
    .channel('chat-' + chatId)
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_id=eq.${chatId}` },
      (payload) => addBubble(payload.new)
    )
    .subscribe();

  openModal(el('div', {},
    el('h2', { text: otherName }),
    threadEl,
    el('div', { class: 'chat-input-row' },
      msgInput,
      el('button', { text: t('sendBtn'), onclick: sendMsg })
    )
  ));
}
