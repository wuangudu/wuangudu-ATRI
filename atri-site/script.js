/* =========================================================
   ATRI · 亚托莉 宣传页脚本
   ========================================================= */

(function () {
  "use strict";

  var body = document.body;
  var JOIN_URL = body.getAttribute("data-join-url") || "";

  /* ---------- 统一注入加群链接（保证所有按钮指向同一地址） ---------- */
  function applyJoinLinks() {
    if (!JOIN_URL) return;
    document.querySelectorAll(".join-link").forEach(function (el) {
      el.setAttribute("href", JOIN_URL);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }

  /* ---------- Toast ---------- */
  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 2200);
  }

  /* ---------- 复制加群链接 ---------- */
  function setupCopy() {
    var btn = document.getElementById("copyJoin");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var done = function () { toast("加群链接已复制，去 QQ 粘贴打开吧"); };
      var fail = function () { toast("复制失败，请手动搜索群号 1104148645"); };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(JOIN_URL).then(done).catch(fail);
      } else {
        try {
          var ta = document.createElement("textarea");
          ta.value = JOIN_URL;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          var ok = document.execCommand("copy");
          document.body.removeChild(ta);
          ok ? done() : fail();
        } catch (e) {
          fail();
        }
      }
    });
  }

  /* ---------- 海底气泡 ---------- */
  function spawnBubbles() {
    var layer = document.querySelector(".bubbles");
    if (!layer) return;
    var count = window.innerWidth < 720 ? 16 : 28;
    for (var i = 0; i < count; i++) {
      var b = document.createElement("span");
      b.className = "bubble";
      var size = 5 + Math.random() * 16;
      b.style.width = size + "px";
      b.style.height = size + "px";
      b.style.left = Math.random() * 100 + "%";
      b.style.animationDuration = 16 + Math.random() * 18 + "s";
      b.style.animationDelay = -Math.random() * 30 + "s";
      b.style.setProperty("--drift", (Math.random() * 90 - 45).toFixed(1) + "px");
      b.style.opacity = 0;
      layer.appendChild(b);
    }
  }

  /* ---------- 标题下方打字机 ---------- */
  function setupTypewriter() {
    var el = document.querySelector(".hero-tagline");
    if (!el) return;
    var phrases = [
      "「高性能ですから！」",
      "「主人，今天也辛苦了。」",
      "「亚托莉……会一直在的。」"
    ];
    var pi = 0;
    var ci = phrases[0].length;
    var deleting = false;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    el.textContent = phrases[0];

    if (reduce) {
      return;
    }

    function tick() {
      var word = phrases[pi];
      if (!deleting) {
        ci++;
        el.textContent = word.slice(0, ci);
        if (ci >= word.length) {
          deleting = true;
          setTimeout(tick, 2000);
          return;
        }
        setTimeout(tick, 70 + Math.random() * 60);
      } else {
        ci--;
        el.textContent = word.slice(0, ci);
        if (ci <= 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
          setTimeout(tick, 420);
          return;
        }
        setTimeout(tick, 32);
      }
      }
    // 先完整显示第一句，停一会儿再开始删/打
    deleting = true;
    setTimeout(tick, 2200);
  }

  /* ---------- 海底 / 海面 主题 ---------- */
  function setupTheme() {
    var root = document.documentElement;
    var btn = document.getElementById("themeToggle");
    var icon = btn ? btn.querySelector(".theme-icon") : null;
    var label = btn ? btn.querySelector(".theme-label") : null;
    var stored = null;
    try { stored = localStorage.getItem("atri-theme"); } catch (e) {}

    function apply(day) {
      root.classList.toggle("theme-day", day);
      root.classList.toggle("theme-sea", !day);
      if (icon) icon.textContent = day ? "☀" : "☾";
      if (label) label.textContent = day ? "海面" : "海底";
    }

    apply(stored === "day");

    if (btn) {
      btn.addEventListener("click", function () {
        var day = !root.classList.contains("theme-day");
        apply(day);
        try { localStorage.setItem("atri-theme", day ? "day" : "sea"); } catch (e) {}
      });
    }
  }

  /* ---------- 滚动渐显 ---------- */
  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
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
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 悬浮加群按钮 ---------- */
  function setupSticky() {
    var sticky = document.querySelector(".sticky-join");
    if (!sticky) return;
    function onScroll() {
      sticky.classList.toggle("show", window.scrollY > 520);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 启动 ---------- */
  function boot() {
    applyJoinLinks();
    setupCopy();
    spawnBubbles();
    setupTypewriter();
    setupTheme();
    setupReveal();
    setupSticky();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
