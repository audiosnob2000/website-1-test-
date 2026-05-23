(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Waveform generator ──
     Builds a row of SVG bars in the hero background that simulate
     an audio waveform — purely decorative. */
  (function buildWaveform() {
    const container = document.querySelector('.hero__waveform');
    if (!container) return;

    const barCount = Math.floor(window.innerWidth / 8);
    const frag = document.createDocumentFragment();

    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('div');
      // Pseudo-random heights that look like a real waveform
      const seed = Math.sin(i * 0.4) * 0.5 + Math.sin(i * 0.13) * 0.3 + Math.random() * 0.2;
      const height = Math.max(4, Math.abs(seed) * 110);
      bar.style.cssText = `
        flex-shrink: 0;
        width: 3px;
        height: ${height}px;
        background: rgba(26,86,232,0.6);
        border-radius: 2px 2px 0 0;
      `;
      frag.appendChild(bar);
    }
    container.appendChild(frag);

    // Animate bars subtly if motion is OK
    if (!prefersReduced) {
      let t = 0;
      const bars = container.querySelectorAll('div');
      function animateWave() {
        t += 0.015;
        bars.forEach((bar, i) => {
          const wave = Math.sin(t + i * 0.3) * 0.25 + 0.75;
          bar.style.transform = `scaleY(${wave})`;
          bar.style.transformOrigin = 'bottom';
        });
        requestAnimationFrame(animateWave);
      }
      requestAnimationFrame(animateWave);
    }
  })();

  /* ── Scroll reveal ── */
  (function initReveal() {
    const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }

    // Stagger siblings in the same parent
    const parents = new Set([...els].map(el => el.parentElement));
    parents.forEach(parent => {
      const siblings = [...parent.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')];
      siblings.forEach((el, i) => { el.dataset.delay = i * 90; });
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

    els.forEach(el => io.observe(el));
  })();

  /* ── Nav: shadow on scroll + hide/show on scroll direction ── */
  (function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        nav.classList.toggle('scrolled', y > 10);

        if (!prefersReduced) {
          if (y > 120 && y > lastY) {
            nav.style.transform = 'translateY(-100%)';
            nav.style.transition = 'transform 0.3s cubic-bezier(0.4,0,0.2,1)';
          } else {
            nav.style.transform = '';
          }
        }

        lastY = Math.max(0, y);
        ticking = false;
      });
      ticking = true;
    }, { passive: true });
  })();

  /* ── Mobile nav ── */
  (function initMobileNav() {
    const toggle = document.querySelector('.nav__toggle');
    const menu   = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    function close() {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      menu.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    menu.querySelectorAll('.nav__mobile-link').forEach(link => {
      link.addEventListener('click', close);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) close();
    });
  })();

  /* ── Booking form: client-side validation + Formspree submission ── */
  (function initForm() {
    const form    = document.getElementById('bookingForm');
    const success = document.getElementById('formSuccess');
    if (!form) return;

    // Formspree endpoint — sign up at formspree.io and replace REPLACE_ME with your form ID
    const FORMSPREE_URL = 'https://formspree.io/f/mkoezpvb';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        field.classList.remove('form__input--error');
        if (!field.value.trim()) {
          field.classList.add('form__input--error');
          valid = false;
        }
      });

      if (!valid) {
        const first = form.querySelector('.form__input--error');
        if (first) first.focus();
        return;
      }

      const btn = form.querySelector('.form__submit');
      btn.disabled = true;
      btn.querySelector('.form__submit-text').textContent = 'Sending…';

      try {
        const response = await fetch(FORMSPREE_URL, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.style.opacity = '0';
          form.style.transition = 'opacity 0.3s';
          setTimeout(() => {
            form.hidden = true;
            if (success) success.hidden = false;
          }, 300);
        } else {
          btn.disabled = false;
          btn.querySelector('.form__submit-text').textContent = 'Send Inquiry';
          alert('Something went wrong. Please email us directly at JJsoundNY@gmail.com');
        }
      } catch {
        btn.disabled = false;
        btn.querySelector('.form__submit-text').textContent = 'Send Inquiry';
        alert('Something went wrong. Please email us directly at JJsoundNY@gmail.com');
      }
    });
  })();

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: prefersReduced ? 'instant' : 'smooth' });
    });
  });

})();
