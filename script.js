/* FORMA Studio — Interactions */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Custom Cursor ── */
  const cursor = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor__dot');
  const cursorRing = document.querySelector('.cursor__ring');

  if (cursor && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
    });

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      cursorRing.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
      raf = requestAnimationFrame(animateCursor);
    }
    raf = requestAnimationFrame(animateCursor);

    const hoverTargets = document.querySelectorAll('a, button, [tabindex="0"]');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
    });
  }

  /* ── Hero Parallax (signature element) ──
     Each headline line moves at a different depth on mouse move,
     creating a layered 3-D feel. Intentionally subtle. */
  const heroLines = document.querySelectorAll('.hero__line[data-depth]');

  if (!prefersReduced && heroLines.length) {
    const hero = document.querySelector('.hero');
    let heroRect = hero.getBoundingClientRect();

    window.addEventListener('resize', () => {
      heroRect = hero.getBoundingClientRect();
    }, { passive: true });

    document.addEventListener('mousemove', (e) => {
      const cx = heroRect.left + heroRect.width  / 2;
      const cy = heroRect.top  + heroRect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      heroLines.forEach((line) => {
        const depth = parseFloat(line.dataset.depth) || 0.04;
        const tx = dx * depth;
        const ty = dy * depth;
        line.style.transform = `translate(${tx}px, ${ty}px)`;
      });
    });

    /* Reset on mouse leave */
    hero.addEventListener('mouseleave', () => {
      heroLines.forEach((line) => {
        line.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
        line.style.transform = '';
        setTimeout(() => (line.style.transition = ''), 650);
      });
    });
  }

  /* ── Scroll-triggered reveal ── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || 0;
            setTimeout(() => el.classList.add('visible'), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    /* Stagger siblings within the same parent */
    const parents = new Set();
    revealEls.forEach((el) => parents.add(el.parentElement));
    parents.forEach((parent) => {
      const children = [...parent.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')];
      children.forEach((child, i) => {
        child.dataset.delay = i * 80;
      });
    });

    revealEls.forEach((el) => io.observe(el));
  } else {
    /* Fallback: show everything */
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ── Mobile nav ── */
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.nav__mobile-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Nav: hide on scroll down, show on scroll up ── */
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const current = window.scrollY;
        if (current > 80) {
          nav.style.transform = current > lastScroll
            ? 'translateY(-100%)'
            : 'translateY(0)';
          nav.style.transition = 'transform 0.35s cubic-bezier(0.16,1,0.3,1)';
        } else {
          nav.style.transform = '';
        }
        lastScroll = Math.max(0, current);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ── Scroll-depth color accent ── */
  if (!prefersReduced) {
    const root = document.documentElement;

    window.addEventListener('scroll', () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      // Subtle: gold accent opacity intensifies as you scroll deeper
      const alpha = 0.04 + progress * 0.06;
      root.style.setProperty('--scroll-glow', `rgba(200,169,110,${alpha})`);
    }, { passive: true });
  }

  /* ── Work items: keyboard accessibility ── */
  document.querySelectorAll('.work__item[tabindex="0"]').forEach((item) => {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

})();
