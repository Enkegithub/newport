(function () {
  function applyTheme(theme) {
    document.body.dataset.theme = theme;

    var themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
    }
  }

  function initializeTheme() {
    var savedTheme = window.localStorage.getItem("portfolio-theme");
    var prefersDark =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    applyTheme(savedTheme || (prefersDark ? "dark" : "light"));
  }

  function toggleTheme() {
    var nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("portfolio-theme", nextTheme);
    applyTheme(nextTheme);
  }

  function updateClock() {
    var clock = document.getElementById("live-clock");
    if (!clock) return;

    try {
      var formatter = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      clock.textContent = formatter.format(new Date());
    } catch (error) {
      // Keep the placeholder if the formatter fails.
    }
  }

  function applyFilter(filter) {
    var educationPanel = document.getElementById("education-panel");
    var projectList = document.getElementById("project-list");
    var projectItems = document.querySelectorAll(".project-item");
    var showEducation = filter === "education";

    if (educationPanel) {
      educationPanel.hidden = !showEducation;
    }

    if (projectList) {
      projectList.hidden = showEducation;
    }

    if (showEducation) {
      return;
    }

    projectItems.forEach(function (item) {
      var tags = (item.getAttribute("data-tags") || "").split(" ");
      var shouldShow =
        (filter === "all" && tags.indexOf("research") === -1) ||
        (filter !== "all" && tags.indexOf(filter) !== -1);
      item.classList.toggle("is-hidden", !shouldShow);
    });
  }

  function initializeFilters() {
    var filterChips = document.querySelectorAll(".filter-chip");

    filterChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        filterChips.forEach(function (button) {
          button.classList.remove("is-active");
        });

        chip.classList.add("is-active");
        applyFilter(chip.getAttribute("data-filter") || "all");
      });
    });

    applyFilter("all");
  }

  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  initializeTheme();
  initializeFilters();
  updateClock();
  window.setInterval(updateClock, 1000);
})();
