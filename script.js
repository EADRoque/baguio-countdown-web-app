(function () {
  "use strict";

  // Meetup starts 12:00 AM, September 18, 2026, Philippine Time (UTC+8).
  var TARGET = new Date("2026-09-18T00:00:00+08:00").getTime();

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tickCountdown() {
    var grid = document.getElementById("countdown-grid");
    var arrived = document.getElementById("countdown-arrived");
    if (!grid) return;

    var diff = TARGET - Date.now();

    if (diff <= 0) {
      grid.hidden = true;
      if (arrived) arrived.hidden = false;
      return;
    }

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    setCell("cd-days", days);
    setCell("cd-hours", pad(hours));
    setCell("cd-minutes", pad(minutes));
    setCell("cd-seconds", pad(seconds));
  }

  function setCell(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function initAccordions(toggleSelector, panelAttr) {
    document.querySelectorAll(toggleSelector).forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        var item = toggle.closest("[data-open]");
        if (!item) return;
        var isOpen = item.getAttribute("data-open") === "true";
        item.setAttribute("data-open", String(!isOpen));
        var panel = item.querySelector(panelAttr);
        if (panel) panel.hidden = isOpen;
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    tickCountdown();
    setInterval(tickCountdown, 1000);
    initAccordions(".day-toggle", ".day-panel");
    initAccordions(".faq-q", ".faq-a");
  });
})();
