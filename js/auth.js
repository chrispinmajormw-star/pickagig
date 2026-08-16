/* ============================================================
   PickAGig — auth.js
   Supabase authentication: session tracking, sign up / sign in /
   sign out, and the sign-in/sign-up modal UI.
   ============================================================ */

import { supabase } from './supabaseClient.js';
import { el, openModal, closeModal, toast } from './ui-helpers.js';

let currentUser = null;

export function getCurrentUser() {
  return currentUser;
}

// Call once at startup. `onChange` fires immediately with the
// current session (or null), then again on every future login/logout.
export async function initAuth(onChange) {
  const { data: { session } } = await supabase.auth.getSession();
  currentUser = session?.user ?? null;
  onChange(currentUser);

  supabase.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user ?? null;
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

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) toast(error.message);
}

export function openAuthModal(mode = 'signin') {
  const isSignUp = mode === 'signup';

  const nameInput     = isSignUp ? el('input', { type: 'text', placeholder: 'Full name', autocomplete: 'name' }) : null;
  const emailInput    = el('input', { type: 'email', placeholder: 'Email', autocomplete: 'email' });
  const passwordInput = el('input', { type: 'password', placeholder: 'Password', autocomplete: isSignUp ? 'new-password' : 'current-password' });
  const errorBox      = el('div', { class: 'auth-error', style: 'color:#dc2626;font-size:13px;margin-top:6px;display:none;' });

  const submitBtn = el('button', {
    class: 'primary',
    text: isSignUp ? 'Create account' : 'Sign in',
    onclick: async () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      if (!email || !password) {
        errorBox.textContent = 'Please fill in email and password.';
        errorBox.style.display = 'block';
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = 'Please wait…';

      const { data, error } = isSignUp
        ? await signUp(email, password, nameInput.value.trim())
        : await signIn(email, password);

      submitBtn.disabled = false;
      submitBtn.textContent = isSignUp ? 'Create account' : 'Sign in';

      if (error) {
        errorBox.textContent = error.message;
        errorBox.style.display = 'block';
        return;
      }

      if (isSignUp && !data.session) {
        // Supabase project has "confirm email" turned on
        toast('Check your email to confirm your account.');
        closeModal();
        return;
      }

      toast(isSignUp ? 'Account created!' : 'Signed in!');
      closeModal();
    }
  });

  const switchLink = el('div', {
    style: 'margin-top:14px;font-size:13px;text-align:center;color:#666;cursor:pointer;text-decoration:underline;',
    text: isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up",
    onclick: () => openAuthModal(isSignUp ? 'signin' : 'signup')
  });

  const form = el('div', { class: 'form' },
    isSignUp ? el('label', { text: 'Full name' }, nameInput) : null,
    el('label', { text: 'Email' }, emailInput),
    el('label', { text: 'Password' }, passwordInput),
    errorBox,
    submitBtn,
    switchLink
  );

  openModal(el('div', {},
    el('h2', { text: isSignUp ? 'Create your account' : 'Sign in to PickAGig' }),
    form
  ));
}
