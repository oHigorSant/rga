// PLACEHOLDER — substituir pelo número real de WhatsApp da RGA Industrial (formato: 55DDXXXXXXXXX, sem espaços/símbolos)
const WHATSAPP_NUMBER = '5500000000000';
const WHATSAPP_MESSAGE = 'Olá! Preciso de ajuda para encontrar uma peça/componente industrial.';
const WHATSAPP_FORM_MESSAGE = 'Olá! Acabei de enviar uma solicitação de orçamento pelo site da RGA Industrial.';

function setWhatsappLinks() {
  const link = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE);
  document.querySelectorAll('[data-whatsapp-link]').forEach(function (el) {
    el.setAttribute('href', link);
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.querySelector('.rga-mobile-toggle');
  const menu = document.querySelector('.rga-mobile-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// FAQ accordion
function initFaq() {
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) openItem.classList.remove('open');
      });
      item.classList.toggle('open', !isOpen);
    });
  });
}

// Dark mode toggle (persisted)
function initDarkMode() {
  const toggle = document.querySelector('.dark-toggle');
  if (!toggle) return;
  const saved = localStorage.getItem('rga-dark-mode');
  if (saved === '1') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggle.setAttribute('data-on', 'true');
  }
  toggle.addEventListener('click', function () {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      toggle.setAttribute('data-on', 'false');
      localStorage.setItem('rga-dark-mode', '0');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      toggle.setAttribute('data-on', 'true');
      localStorage.setItem('rga-dark-mode', '1');
    }
  });
}

// Contact form submit
function initForm() {
  const form = document.querySelector('.rga-form');
  const success = document.querySelector('.form-success');
  if (!form || !success) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.classList.add('hide');
    success.classList.add('show');
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_FORM_MESSAGE);
    setTimeout(function () {
      window.location.href = whatsappUrl;
    }, 1800);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  setWhatsappLinks();
  initMobileMenu();
  initFaq();
  initDarkMode();
  initForm();
});
