/**
 * Scroll-reveal animations for cards and list items.
 * Uses IntersectionObserver for performance — no layout blocking.
 */
(function () {
  'use strict';

  const SELECTORS = '.skill-card, .work-card, .writing-item, .contact-box, .bookmark-item';
  const BASE_DELAY = 80; // ms stagger between sibling cards

  function initReveal() {
    const elements = document.querySelectorAll(SELECTORS);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const siblings = Array.from(el.parentElement.children).filter(function (c) {
            return c.matches(SELECTORS);
          });
          const index = siblings.indexOf(el);
          const delay = index * BASE_DELAY;

          el.style.animationDelay = delay + 'ms';
          el.classList.add('card-reveal');

          observer.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(function (el) {
      // Keep invisible until observed (only if JS runs)
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
})();
