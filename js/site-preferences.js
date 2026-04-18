(function () {
  var THEME_KEY = "wandervans-theme";
  var DIR_KEY = "wandervans-dir";
  var root = document.documentElement;

  function readStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      // Ignore storage errors so page interactions still work.
    }
  }

  var storedDir = readStorage(DIR_KEY);
  if (storedDir === "rtl" || storedDir === "ltr") {
    root.setAttribute("dir", storedDir);
  } else if (!root.getAttribute("dir")) {
    root.setAttribute("dir", "ltr");
  }

  function applyThemeFromStorage() {
    if (!document.body) return;
    document.body.classList.toggle("dark", readStorage(THEME_KEY) === "dark");
  }

  function syncThemeStorage() {
    if (!document.body) return;
    writeStorage(THEME_KEY, document.body.classList.contains("dark") ? "dark" : "light");
  }

  function syncDirStorage() {
    writeStorage(DIR_KEY, root.getAttribute("dir") === "rtl" ? "rtl" : "ltr");
  }

  function initPreferenceSync() {
    applyThemeFromStorage();
    syncThemeStorage();
    syncDirStorage();

    if (document.body) {
      new MutationObserver(syncThemeStorage).observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
      });
    }

    new MutationObserver(syncDirStorage).observe(root, {
      attributes: true,
      attributeFilter: ["dir"]
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPreferenceSync);
  } else {
    initPreferenceSync();
  }
})();
