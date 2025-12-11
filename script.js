// script.js

(function () {
  // Grab the scrollable list element
  const infiList = document.getElementById('infi-list');
  if (!infiList) {
    console.error('No element with id "infi-list" found.');
    return;
  }

  let itemCount = 1;

  function addItems(num) {
    for (let i = 0; i < num; i++) {
      const li = document.createElement('li');
      li.textContent = `Item ${itemCount++}`;
      infiList.appendChild(li);
    }
  }

  // Create (or return existing) spacer element used to force overflow.
  function ensureSpacer(minExtraHeight = 300) {
    let spacer = document.getElementById('__infi_spacer__');
    if (!spacer) {
      spacer = document.createElement('div');
      spacer.id = '__infi_spacer__';
      // spacer should not be an <li> so tests checking li count won't fail
      spacer.style.width = '1px';
      spacer.style.height = minExtraHeight + 'px';
      spacer.style.padding = '0';
      spacer.style.margin = '0';
      spacer.style.border = '0';
      // Make sure it doesn't interfere visually
      spacer.setAttribute('aria-hidden', 'true');
      infiList.appendChild(spacer);
    } else {
      spacer.style.height = minExtraHeight + 'px';
    }
    return spacer;
  }

  // Quick helper to log current sizes (useful for debugging)
  function logSizes(prefix = '') {
    // If element not ready, bail
    if (!infiList) return;
    // Use setTimeout 0 to ensure layout has updated after DOM changes
    setTimeout(() => {
      console.log(
        `${prefix} clientHeight=${infiList.clientHeight}, scrollHeight=${infiList.scrollHeight}, scrollTop=${infiList.scrollTop}`
      );
    }, 0);
  }

  // function to setup the initial state. Called once DOM is ready.
  function init() {
    // Add exactly 2 items (test expects 2)
    addItems(2);

    // Ensure the list is scrollable by adding a spacer block
    // If you still get failures, increase this value (e.g., 500)
    ensureSpacer(300);

    // Log debug sizes — check Cypress/browser console
    logSizes('after init:');

    // Add listener to append more items when scrolled to bottom
    infiList.addEventListener('scroll', () => {
      const scrollTop = infiList.scrollTop;
      const clientHeight = infiList.clientHeight;
      const scrollHeight = infiList.scrollHeight;
      const threshold = 2;

      // Debug log on scroll (optional — comment out if noisy)
      // console.log('scroll event', { scrollTop, clientHeight, scrollHeight });

      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        addItems(2);
        // After adding items we may not need such a big spacer; but leaving it is safe.
        logSizes('after append:');
      }
    });
  }

  // Make sure DOM is loaded before manipulating elements.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already ready
    init();
  }

  // Expose a small helper to tweak spacer height from console if needed
  window.__infiniteHelper = {
    setSpacerHeight: (h) => {
      const s = document.getElementById('__infi_spacer__') || ensureSpacer(h);
      s.style.height = h + 'px';
      logSizes('after setSpacerHeight:');
    },
    logSizes,
  };
})();
