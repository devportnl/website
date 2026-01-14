/**
 * DevPort Theme Toggle - Dark/Light Mode
 * Handles theme switching with localStorage persistence and system preference detection
 */

(function() {
  'use strict';

  const THEME_KEY = 'devport-theme-preference';
  const DARK = 'dark';
  const LIGHT = 'light';

  /**
   * Get the initial theme based on:
   * 1. localStorage preference
   * 2. System color scheme preference
   * 3. Default to dark
   */
  function getInitialTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) {
      return stored;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return LIGHT;
    }

    return DARK;
  }

  /**
   * Apply theme to document
   */
  function applyTheme(theme) {
    if (theme === LIGHT) {
      document.documentElement.setAttribute('data-theme', LIGHT);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_KEY, theme);
    updateToggleButton(theme);
  }

  /**
   * Update toggle button icon and state
   */
  function updateToggleButton(theme) {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const icon = toggle.querySelector('i');
    if (!icon) return;

    if (theme === LIGHT) {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      toggle.setAttribute('aria-label', 'Switch to dark mode');
      toggle.title = 'Dark Mode';
    } else {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      toggle.setAttribute('aria-label', 'Switch to light mode');
      toggle.title = 'Light Mode';
    }
  }

  /**
   * Toggle theme between dark and light
   */
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || DARK;
    const next = current === DARK ? LIGHT : DARK;
    applyTheme(next);
  }

  /**
   * Initialize theme system
   */
  function init() {
    const theme = getInitialTheme();
    applyTheme(theme);

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      darkModeQuery.addEventListener('change', (e) => {
        const stored = localStorage.getItem(THEME_KEY);
        if (!stored) {
          // Only apply if user hasn't set explicit preference
          applyTheme(e.matches ? DARK : LIGHT);
        }
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
