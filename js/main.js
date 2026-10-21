(function () {
  "use strict";

  var cfg = window.NAVAKALPAA_SITE || {};
  var DEFAULT_NAME = "NAVAKALPAA TECH LLP";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- configuration: names, domain, contact email ---- */
  function applyConfig() {
    var map = {
      name: cfg.name,
      "short-name": cfg.shortName,
      tagline: cfg.tagline,
      domain: cfg.domain,
    };
    document.querySelectorAll("[data-site]").forEach(function (el) {
      var key = el.getAttribute("data-site");
      if (key === "email") return;
      if (map[key]) el.textContent = map[key];
    });

    if (cfg.name && cfg.name !== DEFAULT_NAME) {
      document.title = document.title.split(DEFAULT_NAME).join(cfg.name);
      document.querySelectorAll('meta[name="description"], meta[property^="og:"], meta[name^="twitter:"]').forEach(function (m) {
        var c = m.getAttribute("content");
        if (c && c.indexOf(DEFAULT_NAME) !== -1) m.setAttribute("content", c.split(DEFAULT_NAME).join(cfg.name));
      });
    }

    var email = (cfg.contactEmail || "").trim();
    var hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    var href = hasEmail ? "mailto:" + email + "?subject=" + encodeURIComponent(cfg.mailSubject || "") : "";

    document.querySelectorAll("[data-if-email]").forEach(function (el) { el.hidden = !hasEmail; });
    document.querySelectorAll("[data-if-no-email]").forEach(function (el) { el.hidden = hasEmail; });
    if (hasEmail) {
      document.querySelectorAll('[data-site="email"]').forEach(function (el) { el.textContent = email; });
      document.querySelectorAll("[data-mailto]").forEach(function (el) { el.setAttribute("href", href); });
    }

    var copy = document.querySelector("[data-copy-email]");
    var status = document.querySelector("[data-copy-status]");
    if (copy && hasEmail) {
      copy.addEventListener("click", function () {
        function done(ok) {
          if (status) status.textContent = ok ? "Email address copied." : "Copy did not work. Please select the address and copy it.";
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(function () { done(true); }, function () { done(false); });
        } else {
          done(false);
        }
      });
    }

    var year = document.querySelector("[data-year]");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ---- mobile navigation ---- */
  function setupNav() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    var panel = document.getElementById("site-menu");
    if (!header || !toggle || !panel) return;
    var mq = window.matchMedia("(max-width: 860px)");

    function setOpen(open, returnFocus) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      panel.classList.toggle("is-open", open);
      header.classList.toggle("menu-open", open);
      if (!open && returnFocus) toggle.focus();
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setOpen(false, true);
    });

    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") === "true" && !header.contains(e.target)) setOpen(false);
    });

    function onChange() { if (!mq.matches) setOpen(false); }
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- reveal on scroll ---- */
  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
    window.setTimeout(function () {
      items.forEach(function (el) { el.classList.add("in"); });
    }, 4000);
  }

  /* ---- pause decorative animation while the tab is hidden ---- */
  function setupVisibility() {
    document.addEventListener("visibilitychange", function () {
      document.documentElement.classList.toggle("is-paused", document.hidden);
    });
  }

  applyConfig();
  setupNav();
  setupReveal();
  setupVisibility();
})();
