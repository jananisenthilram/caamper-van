(function () {
  var root = document.documentElement;
  root.classList.add("site-loading");

  function hideLoader() {
    window.setTimeout(function () {
      root.classList.remove("site-loading");
    }, 180);
  }

  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader, { once: true });
  }
})();
