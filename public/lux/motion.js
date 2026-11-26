/* Shared motion layer: curtain, reveals, parallax, header, menu, storytelling, lightbox, accordions. */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Opening curtain: once per visit */
  function lift() { root.classList.add("ready"); }
  try {
    if (sessionStorage.getItem("lux-seen")) { root.classList.add("seen", "ready"); }
    else { sessionStorage.setItem("lux-seen", "1"); }
  } catch (e) {}
  if (reduce) { lift(); }
  else if (!root.classList.contains("ready")) {
    var go = function () { setTimeout(lift, 650); };
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(go); setTimeout(lift, 2200); } else { go(); }
  }

  /* Reveals */
  var targets = document.querySelectorAll("[data-rv],[data-mask],[data-line]");
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* Parallax + header hide on scroll */
  var pars = Array.prototype.slice.call(document.querySelectorAll("[data-par]"));
  var header = document.querySelector("header");
  var lastY = window.scrollY, ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (header && !root.classList.contains("menu-open")) {
      if (y > 420 && y > lastY + 4) header.classList.add("up");
      else if (y < lastY - 4 || y < 420) header.classList.remove("up");
    }
    lastY = y;
    if (!reduce) {
      var vh = window.innerHeight;
      pars.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var k = parseFloat(el.getAttribute("data-par")) || 0.1;
        var shift = (r.top + r.height / 2 - vh / 2) * -k;
        el.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0) scale(" + (1 + Math.abs(k) * 0.6).toFixed(3) + ")";
      });
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* Full-screen menu */
  function closeMenu() { root.classList.remove("menu-open"); }
  document.querySelectorAll("[data-menu-open]").forEach(function (b) {
    b.addEventListener("click", function () { root.classList.add("menu-open"); b.setAttribute("aria-expanded", "true"); var c = document.querySelector(".overlay .ov-close"); if (c) setTimeout(function () { c.focus(); }, 400); });
  });
  document.querySelectorAll("[data-menu-close], .overlay .ov-nav a").forEach(function (b) {
    b.addEventListener("click", function () { closeMenu(); document.querySelectorAll("[data-menu-open]").forEach(function (x) { x.setAttribute("aria-expanded", "false"); }); });
  });

  /* Sticky storytelling */
  document.querySelectorAll(".story").forEach(function (story) {
    var steps = story.querySelectorAll(".st");
    var figs = story.querySelectorAll(".story-media figure");
    var dots = story.querySelectorAll(".prog i");
    function activate(i) {
      steps.forEach(function (s, j) { s.classList.toggle("on", i === j); });
      figs.forEach(function (f, j) { f.classList.toggle("on", i === j); });
      dots.forEach(function (d, j) { d.classList.toggle("on", i === j); });
    }
    activate(0);
    if (!("IntersectionObserver" in window)) return;
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) activate(Array.prototype.indexOf.call(steps, e.target)); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    steps.forEach(function (s) { so.observe(s); });
  });

  /* Lightbox */
  var lb = document.createElement("div");
  lb.className = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
  var lbImg = document.createElement("img"); lbImg.alt = "";
  var lbClose = document.createElement("button"); lbClose.type = "button"; lbClose.className = "ov-close"; lbClose.innerHTML = "<b></b>";
  lbClose.setAttribute("aria-label", "Close");
  lb.append(lbImg, lbClose); document.body.append(lb);
  function closeLb() { lb.classList.remove("on"); }
  lb.addEventListener("click", closeLb);
  document.querySelectorAll("[data-zoom]").forEach(function (img) {
    img.addEventListener("click", function () { lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt; lb.classList.add("on"); });
  });

  /* Escape closes any layer */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeLb(); closeMenu(); var q = document.querySelector(".qv.on"); if (q) q.classList.remove("on"); }
  });

  /* Smooth accordions */
  document.querySelectorAll("details").forEach(function (d) {
    var s = d.querySelector("summary"), body = d.querySelector(".ans");
    if (!s || !body || reduce || !body.animate) return;
    s.addEventListener("click", function (e) {
      e.preventDefault();
      if (d.open) {
        var h = body.offsetHeight;
        body.animate([{ height: h + "px", opacity: 1 }, { height: "0px", opacity: 0 }], { duration: 450, easing: "cubic-bezier(.2,.65,.2,1)" }).onfinish = function () { d.open = false; };
      } else {
        d.open = true;
        var h2 = body.offsetHeight;
        body.animate([{ height: "0px", opacity: 0 }, { height: h2 + "px", opacity: 1 }], { duration: 550, easing: "cubic-bezier(.2,.65,.2,1)" });
      }
    });
  });
})();
