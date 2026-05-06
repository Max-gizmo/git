/**
 * MK Collectible Cars — Scroll Animations
 * Uses IntersectionObserver to trigger CSS animations as elements enter the viewport.
 * No external dependencies — pure CSS + JS.
 */
(function () {
  'use strict';

  var THRESHOLD = 0.12;
  var ROOT_MARGIN = '0px 0px -48px 0px';

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Once animated, stop observing to save resources
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: THRESHOLD,
    rootMargin: ROOT_MARGIN,
  });

  /**
   * Attach the observer to every element with .animate-on-scroll
   * that hasn't been animated yet.
   */
  function observeAll() {
    var elements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /**
   * For the React SPA (index.html) React renders elements dynamically.
   * We use a MutationObserver to catch newly-added nodes and observe them.
   */
  function watchDOM() {
    var mo = new MutationObserver(function (mutations) {
      var needsScan = false;
      mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length > 0) needsScan = true;
      });
      if (needsScan) observeAll();
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    observeAll();
    // Watch for React-rendered content
    watchDOM();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
