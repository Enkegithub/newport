const clockElement = document.querySelector("#live-clock");
const filterChips = document.querySelectorAll(".filter-chip");
const projectItems = document.querySelectorAll(".project-item");
const projectToggles = document.querySelectorAll(".project-toggle");
const projectList = document.querySelector("#project-list");
const educationPanel = document.querySelector("#education-panel");
const activityGrid = document.querySelector("#activity-grid");
const activityMonths = document.querySelector("#activity-months");
const activityNote = document.querySelector("#activity-note");
const themeToggle = document.querySelector("#theme-toggle");
const certificateWall = document.querySelector("#certificate-wall");
const certificateEmptyState = document.querySelector("#certificate-empty-state");
const certificateSectionToggle = document.querySelector("#certificate-section-toggle");
const certificateContent = document.querySelector("#certificate-content");
const certificateModal = document.querySelector("#certificate-modal");
const certificateModalClose = document.querySelector("#certificate-modal-close");
const certificateModalTitle = document.querySelector("#certificate-modal-title");
const certificateModalIssuer = document.querySelector("#certificate-modal-issuer");
const certificateModalDate = document.querySelector("#certificate-modal-date");
const certificateModalId = document.querySelector("#certificate-modal-id");
const certificateModalPreview = document.querySelector("#certificate-modal-preview");
const certificateModalDesc = document.querySelector("#certificate-modal-desc");
const certificateModalLink = document.querySelector("#certificate-modal-link");

function applyTheme(theme) {
  document.body.dataset.theme = theme;

  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
  }
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");
  const prefersDark =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));
}

function toggleTheme() {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", nextTheme);
  applyTheme(nextTheme);
}

function updateClock() {
  if (!clockElement) return;

  const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  clockElement.textContent = formatter.format(new Date());
}

function applyFilter(filter) {
  const showEducation = filter === "education";

  if (educationPanel) {
    educationPanel.hidden = !showEducation;
  }

  if (projectList) {
    projectList.hidden = showEducation;
  }

  if (showEducation) {
    return;
  }

  projectItems.forEach((item) => {
    const tags = (item.dataset.tags || "").split(" ");
    const shouldShow = filter === "all" || tags.includes(filter);
    item.classList.toggle("is-hidden", !shouldShow);
  });
}

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filterChips.forEach((button) => button.classList.remove("is-active"));
    chip.classList.add("is-active");
    applyFilter(chip.dataset.filter || "all");
  });
});

projectToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const project = toggle.closest(".project-item");
    if (!project) return;

    const isExpanded = project.dataset.expanded === "true";
    project.dataset.expanded = String(!isExpanded);
    toggle.setAttribute("aria-expanded", String(!isExpanded));
  });
});

function formatCertificateTitle(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildCertificateCard(certificate) {
  const article = document.createElement("article");
  article.className = "certificate-card";

  const button = document.createElement("button");
  button.className = "certificate-open";
  button.type = "button";

  const poster = document.createElement("div");
  poster.className = `certificate-poster ${
    certificate.kind === "image" ? "certificate-poster--image" : "certificate-poster--pdf"
  }`;

  if (certificate.kind === "image") {
    const image = document.createElement("img");
    image.src = certificate.src;
    image.alt = certificate.title;
    image.loading = "lazy";
    poster.appendChild(image);
  } else {
    const chip = document.createElement("span");
    chip.className = "poster-chip";
    chip.textContent = "PDF";

    const title = document.createElement("h3");
    title.textContent = certificate.title;

    const note = document.createElement("p");
    note.textContent = "Portable Document Format";

    poster.classList.add("poster-medium");
    poster.append(chip, title, note);
  }

  const meta = document.createElement("div");
  meta.className = "certificate-meta";

  const name = document.createElement("p");
  name.className = "certificate-name";
  name.textContent = certificate.title;

  const note = document.createElement("p");
  note.className = "certificate-note";
  note.textContent = certificate.filename;

  meta.append(name, note);
  button.append(poster, meta);

  button.addEventListener("click", () => openCertificateModal(certificate));
  article.appendChild(button);

  return article;
}

function openCertificateModal(certificate) {
  if (!certificateModal) return;

  certificateModalTitle.textContent = certificate.title;
  certificateModalIssuer.textContent = certificate.kind === "pdf" ? "Document Certificate" : "Image Certificate";
  certificateModalDate.textContent = `Type: ${certificate.extension.toUpperCase()}`;
  certificateModalId.textContent = `File: ${certificate.filename}`;
  // certificateModalDesc.textContent = "Previewing the original file from your certificate folder.";
  certificateModalLink.href = certificate.src;

  if (certificateModalPreview) {
    certificateModalPreview.innerHTML = "";

    if (certificate.kind === "image") {
      const image = document.createElement("img");
      image.src = certificate.src;
      image.alt = certificate.title;
      certificateModalPreview.appendChild(image);
    } else {
      const frame = document.createElement("iframe");
      frame.src = certificate.src;
      frame.title = certificate.title;
      certificateModalPreview.appendChild(frame);
    }
  }

  if (typeof certificateModal.showModal === "function") {
    certificateModal.showModal();
  }
}

async function loadCertificates() {
  if (!certificateWall) return;

  try {
    const certificates = Array.isArray(window.CERTIFICATES) ? window.CERTIFICATES : [];
    certificateWall.innerHTML = "";

    if (certificates.length === 0) {
      certificateEmptyState?.classList.add("is-visible");
      return;
    }

    certificateEmptyState?.classList.remove("is-visible");

    certificates.forEach((certificate) => {
      const normalizedCertificate = {
        ...certificate,
        title: certificate.title || formatCertificateTitle(certificate.filename || "Certificate"),
      };

      certificateWall.appendChild(buildCertificateCard(normalizedCertificate));
    });
  } catch (error) {
    certificateEmptyState?.classList.add("is-visible");
  }
}

function toggleCertificateSection() {
  if (!certificateSectionToggle || !certificateContent) return;

  const isExpanded = certificateSectionToggle.getAttribute("aria-expanded") === "true";
  const nextExpanded = !isExpanded;

  certificateSectionToggle.setAttribute("aria-expanded", String(nextExpanded));
  certificateSectionToggle.textContent = nextExpanded ? "Hide +" : "Show +";
  certificateSectionToggle.classList.toggle("is-collapsed", !nextExpanded);
  certificateContent.hidden = !nextExpanded;
}

function seededValue(index) {
  const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function buildActivityGraph() {
  if (!activityGrid || !activityMonths) return;

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  activityMonths.innerHTML = '<span></span>';
  monthNames.forEach((month) => {
    const label = document.createElement("span");
    label.textContent = month;
    activityMonths.appendChild(label);
  });

  activityGrid.innerHTML = "";

  let totalCommits = 0;
  const weeks = 26;
  const days = 7;

  for (let week = 0; week < weeks; week += 1) {
    for (let day = 0; day < days; day += 1) {
      const index = week * days + day;
      const random = seededValue(index + 11);
      let level = 0;

      if (random > 0.88) {
        level = 4;
      } else if (random > 0.72) {
        level = 3;
      } else if (random > 0.5) {
        level = 2;
      } else if (random > 0.3) {
        level = 1;
      }

      totalCommits += level === 0 ? 0 : level * 2 + 1;

      const cell = document.createElement("span");
      cell.className = `activity-cell level-${level}`;
      cell.title = `${level === 0 ? "No commits" : `${level * 2 + 1} commits`} in this block`;
      activityGrid.appendChild(cell);
    }
  }

  if (activityNote) {
    activityNote.textContent = `${totalCommits} contributions visualized across the recent coding cycle.`;
  }
}

if (certificateModalClose && certificateModal) {
  certificateModalClose.addEventListener("click", () => {
    certificateModal.close();
  });

  certificateModal.addEventListener("click", (event) => {
    if (event.target === certificateModal) {
      certificateModal.close();
    }
  });
}

if (certificateSectionToggle && certificateContent) {
  certificateSectionToggle.addEventListener("click", toggleCertificateSection);
}

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

initializeTheme();
updateClock();
buildActivityGraph();
loadCertificates();
setInterval(updateClock, 1000);
