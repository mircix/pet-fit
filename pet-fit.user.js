// ==UserScript==
// @name         PET Tool
// @description  Fits the Productivity Entry Tool (Power Apps) to a phone screen and skips the "Continue in browser" page.
// @version      1.1
// @match        https://apps.powerapps.com/*
// @run-at       document-end
// @noframes
// @updateURL    https://mircix.github.io/pet-fit/pet-fit.user.js
// @downloadURL  https://mircix.github.io/pet-fit/pet-fit.user.js
// ==/UserScript==

(function () {
  'use strict';

  // PET lays itself out to the window width. At phone width everything overlaps, so the page
  // is given a laptop-width layout (W) and zoomed out to fit the screen. Same code as the
  // PET Fit bookmark.
  var W = 1280;

  function deviceWidth() {
    var s = screen;
    var land = (s.orientation && /landscape/.test(s.orientation.type)) || Math.abs(window.orientation || 0) === 90;
    return land ? Math.max(s.width, s.height) : Math.min(s.width, s.height);
  }

  function content() {
    var z = Math.min(1, deviceWidth() / W).toFixed(3);
    return 'width=' + W + ', initial-scale=' + z + ', minimum-scale=' + z + ', maximum-scale=5, user-scalable=yes';
  }

  function apply() {
    if (location.pathname.indexOf('/play/') !== 0) return;
    var c = content();
    var ms = document.querySelectorAll('meta[name="viewport"]');
    if (!ms.length) {
      var m = document.createElement('meta');
      m.name = 'viewport';
      document.head.appendChild(m);
      ms = [m];
    }
    for (var i = 0; i < ms.length; i++) {
      if (ms[i].getAttribute('content') !== c) ms[i].setAttribute('content', c);
    }
  }

  // Power Apps sometimes shows an "Open the app / Continue in browser" screen on phones.
  // Tap "Continue in browser" once per visit, so PET opens without stopping there.
  function continueInBrowser() {
    if (location.pathname.indexOf('/mobile/redirect') !== 0) return;
    try {
      if (sessionStorage.getItem('petFitContinued') === location.href) return;
    } catch (e) {}
    var els = document.querySelectorAll('button, a, [role="button"], span, div');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.children.length === 0 && el.textContent.trim().toLowerCase() === 'continue in browser') {
        try { sessionStorage.setItem('petFitContinued', location.href); } catch (e) {}
        (el.closest('button, a, [role="button"]') || el).click();
        return;
      }
    }
  }

  // Keep the layout even if the app rewrites its viewport tag later.
  new MutationObserver(apply).observe(document.head, {
    childList: true, subtree: true, attributes: true, attributeFilter: ['content']
  });
  window.addEventListener('orientationchange', function () { setTimeout(apply, 300); });

  // Power Apps changes pages without full reloads, so check for a short while after load.
  var ticks = 0;
  var timer = setInterval(function () {
    apply();
    continueInBrowser();
    if (++ticks > 60) clearInterval(timer);
  }, 1000);
  apply();
  continueInBrowser();
  setTimeout(function () { window.dispatchEvent(new Event('resize')); }, 400);
})();
