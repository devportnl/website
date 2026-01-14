/**
 * DevPort Scroll Reveal Animation
 * Triggers animations when elements scroll into view using Intersection Observer API
 */

(function() {
  'use strict';

  // Check if Intersection Observer is supported
  if (!('IntersectionObserver' in window)) {
    console.log('Intersection Observer not supported, skipping scroll reveals');
    return;
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Optional: unobserve after animation to save performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select elements to observe
  const elementsToObserve = document.querySelectorAll(
    '.card, .team-member, .feature-box, .service-item, .portfolio-item'
  );

  elementsToObserve.forEach(element => {
    element.classList.add('scroll-reveal');
    observer.observe(element);
  });
})();
