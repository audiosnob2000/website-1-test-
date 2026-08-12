(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Equalizer generator ──
     Builds the 32-bar strip at the bottom of the hero — purely decorative. */
  (function buildEqualizer() {
    const container = document.querySelector('.hero__eq');
    if (!container) return;

    const n = 32;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < n; i++) {
      const bar = document.createElement('div');
      const h = Math.round(22 + Math.abs(Math.sin(i * 0.7)) * 58 + (i % 5) * 4);
      bar.className = 'hero__eq-bar';
      bar.style.height = h + '%';
      if (!prefersReduced) {
        const dur = (1.1 + (i % 7) * 0.15).toFixed(2);
        const delay = ((i % 9) * 0.09).toFixed(2);
        bar.style.animation = `eqPulse ${dur}s ease-in-out infinite`;
        bar.style.animationDelay = delay + 's';
      }
      frag.appendChild(bar);
    }
    container.appendChild(frag);
  })();

  /* ── Headline word reveal ──
     Splits the hero H1 into words so each can fade/slide in staggered on load. */
  (function splitHeadline() {
    const el = document.getElementById('heroHeadline');
    if (!el) return;
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word;
      if (!prefersReduced) {
        span.style.animation = `wordIn 0.6s cubic-bezier(.16,1,.3,1) ${(0.1 + i * 0.06).toFixed(2)}s both`;
      }
      el.appendChild(span);
      el.appendChild(document.createTextNode(' '));
    });
  })();

  /* ── Scroll reveal ── */
  (function initReveal() {
    const els = document.querySelectorAll('.reveal-up');
    if (!els.length) return;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }

    const parents = new Set([...els].map(el => el.parentElement));
    parents.forEach(parent => {
      const siblings = [...parent.querySelectorAll('.reveal-up')];
      siblings.forEach((el, i) => { el.dataset.delay = i * 90; });
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -32px 0px' });

    els.forEach(el => io.observe(el));
  })();

  /* ── Count-up stats ── */
  (function initCounters() {
    const counters = document.querySelectorAll('.hero__stat-num');
    if (!counters.length) return;

    counters.forEach(el => {
      const target = parseInt(el.dataset.target, 10) || 0;
      const suffix = el.dataset.suffix || '';

      if (prefersReduced || !('IntersectionObserver' in window)) {
        el.textContent = target + suffix;
        return;
      }

      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const start = performance.now();
          const dur = 1200;
          function tick(now) {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  })();

  /* ── Hero spotlight (cursor-follow glow) ── */
  (function initSpotlight() {
    const hero = document.getElementById('hero');
    const spotlight = document.getElementById('heroSpotlight');
    if (!hero || !spotlight) return;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlight.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
      spotlight.style.opacity = '1';
    });
    hero.addEventListener('mouseleave', () => {
      spotlight.style.opacity = '0';
    });
  })();

  /* ── Magnetic buttons ── */
  (function initMagnetButtons() {
    const buttons = document.querySelectorAll('.js-magnet');
    if (!buttons.length || prefersReduced) return;

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0,0)';
      });
    });
  })();

  /* ── Scroll progress bar + orb parallax ──
     One batched, rAF-throttled scroll handler drives both. */
  (function initScrollFx() {
    const progress = document.getElementById('progress');
    const orb1 = document.getElementById('orb1');
    const orb2 = document.getElementById('orb2');
    if (!progress && !orb1 && !orb2) return;

    let ticking = false;
    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      if (progress) progress.style.width = pct + '%';

      if (!prefersReduced) {
        const y = doc.scrollTop;
        if (orb1) orb1.style.transform = `translateY(${y * 0.12}px)`;
        if (orb2) orb2.style.transform = `translateY(${-y * 0.08}px)`;
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });

    update();
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
