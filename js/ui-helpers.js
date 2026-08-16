/* ============================================================
   PickAGig — ui-helpers.js
   Small generic DOM helpers used across every page/module.
   ============================================================ */

export function el(tag, props = {}, ...children) {
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

export function toast(msg) {
  const node = document.getElementById('toast');
  node.textContent = msg;
  node.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => node.classList.remove('show'), 2600);
}

export function openModal(domNode) {
  const content = document.getElementById('modalContent');
  content.textContent = '';
  content.appendChild(domNode);
  document.getElementById('modal').classList.add('show');
}

export function closeModal() {
  document.getElementById('modal').classList.remove('show');
}
