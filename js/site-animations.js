(function () {
  var root = document.documentElement;
  var revealSelectors = [
    ".login-image-content",
    ".login-logo",
    ".login-form-box",
    ".explore-left",
    ".explore-center",
    ".explore-right",
    ".dest-card",
    ".search-content",
    ".search-box",
    ".package-card",
    ".feature-box",
    ".family-content",
    ".family-stat-card",
    ".family-feature",
    ".route-left",
    ".route-right",
    ".product-card",
    ".van-header",
    ".van-grid > *",
    ".gallery-header",
    ".gallery-masonry .g-item",
    ".review-card",
    ".cta-form-left",
    ".cta-form-right",
    ".camper-info-card",
    ".camper-card",
    ".cf-left",
    ".cf-card",
    ".cb-header",
    ".cb-card",
    ".testi-left",
    ".testi-right",
    ".route-card",
    ".packing-header",
    ".packing-card",
    ".avail-left",
    ".avail-form",
    ".rt-avail-left",
    ".rt-calendar",
    ".rt-avail-perk",
    ".why-header",
    ".why-card",
    ".faq-header",
    ".faq-item",
    ".itin-header",
    ".itin-step",
    ".story-image",
    ".story-content",
    ".mv-card",
    ".choose-left",
    ".choose-item",
    ".team-card",
    ".stat-box",
    ".about-cta-content",
    ".trip-builder-intro",
    ".trip-builder-panel",
    ".route-suggest-header",
    ".rs-card",
    ".experience-header",
    ".exp-card",
    ".trip-summary-header",
    ".trip-summary-panel",
    ".book-form-card",
    ".book-summary-card",
    ".book-benefit-card",
    ".book-step-card",
    ".contact-quick-card",
    ".contact-map-copy",
    ".contact-map-frame-wrap",
    ".contact-copy-card",
    ".contact-form-card",
    ".contact-visit-card",
    ".footer-col",
    ".footer-brand"
  ];

  function getRevealItems() {
    var seen = new Set();
    var items = [];

    revealSelectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (element) {
        if (seen.has(element)) return;
        if (element.closest(".menu")) return;
        seen.add(element);
        items.push(element);
      });
    });

    return items;
  }

  function markVisible(items) {
    items.forEach(function (item) {
      item.classList.add("reveal-item", "reveal-visible");
    });
  }

  function setupRevealAnimations() {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var items = getRevealItems();

    if (!items.length) return;

    root.classList.add("site-motion");

    items.forEach(function (item, index) {
      item.classList.add("reveal-item");
      item.style.setProperty("--reveal-delay", String((index % 4) * 90) + "ms");
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      markVisible(items);
      return;
    }

    root.classList.add("js-reveal");

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.14,
      rootMargin: "0px 0px -10% 0px"
    });

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupRevealAnimations);
  } else {
    setupRevealAnimations();
  }
})();
