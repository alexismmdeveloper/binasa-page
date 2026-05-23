(function () {
  'use strict';

  const waModal = document.getElementById('whatsapp-modal');
  const phoneModal = document.getElementById('phone-modal');
  const menuToggle = document.getElementById('menu-toggle');
  const primaryNav = document.getElementById('primary-nav');
  const header = document.getElementById('site-header');

  function openModalEl(el) {
    if (!el) return;
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModalEl(el) {
    if (!el) return;
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.modal.is-open')) document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-modal]').forEach(function (el) {
    el.addEventListener('click', function () { openModalEl(waModal); });
  });
  document.querySelectorAll('[data-close-modal]').forEach(function (el) {
    el.addEventListener('click', function () { closeModalEl(waModal); });
  });

  document.querySelectorAll('[data-open-phone-modal]').forEach(function (el) {
    el.addEventListener('click', function () { openModalEl(phoneModal); });
  });
  document.querySelectorAll('[data-close-phone-modal]').forEach(function (el) {
    el.addEventListener('click', function () { closeModalEl(phoneModal); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (phoneModal && phoneModal.classList.contains('is-open')) closeModalEl(phoneModal);
    if (waModal && waModal.classList.contains('is-open')) closeModalEl(waModal);
  });

  document.querySelectorAll('.modal-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const phone = btn.getAttribute('data-wa');
      if (phone) window.open('https://wa.me/' + phone, '_blank', 'noopener');
    });
  });

  function closeMobileNav() {
    if (!primaryNav) return;
    primaryNav.classList.remove('is-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = primaryNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      const icon = menuToggle.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = isOpen ? 'close' : 'menu';
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      closeMobileNav();
      const offset = (header ? header.offsetHeight : 0) + 8;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  let lastY = window.scrollY;
  window.addEventListener('scroll', function () {
    if (!header) return;
    const y = window.scrollY;
    header.style.boxShadow = y > 8 ? '0 1px 0 rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)' : 'none';
    lastY = y;
  }, { passive: true });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) closeMobileNav();
  });
})();
