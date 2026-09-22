/* ============================================================
   Introduction to Programming — Network School
   Shared behaviour: copy buttons, install tabs, answer reveals
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  /* ---- Copy-to-clipboard buttons ---- */
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var block = btn.closest(".code-block");
      var codeEl = block.querySelector("pre code, pre");
      var text = codeEl.innerText;

      function showCopied() {
        var original = btn.innerHTML;
        btn.classList.add("copied");
        btn.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied';
        setTimeout(function () {
          btn.classList.remove("copied");
          btn.innerHTML = original;
        }, 1600);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showCopied, function () {
          fallbackCopy(text);
          showCopied();
        });
      } else {
        fallbackCopy(text);
        showCopied();
      }
    });
  });

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch (e) {
      /* no-op */
    }
    document.body.removeChild(ta);
  }

  /* ---- Install instruction tabs (macOS / Windows) ---- */
  document.querySelectorAll(".tabs").forEach(function (tabGroup) {
    var target = tabGroup.getAttribute("data-target");
    var panels = document.querySelectorAll('.tab-panel[data-group="' + target + '"]');
    tabGroup.querySelectorAll(".tab-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        tabGroup.querySelectorAll(".tab-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var which = btn.getAttribute("data-tab");
        panels.forEach(function (p) {
          p.classList.toggle("active", p.getAttribute("data-tab") === which);
        });
      });
    });
  });

  /* ---- Show Answer reveals ---- */
  document.querySelectorAll(".reveal-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var box = document.getElementById(btn.getAttribute("data-target"));
      if (!box) return;
      var showing = box.classList.toggle("shown");
      btn.textContent = showing ? "Hide Answer" : "Show Answer";
    });
  });
});
