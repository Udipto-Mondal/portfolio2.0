// ============================================================
// PORTFOLIO APP — Navigation, Theme, and Dynamic Rendering
// ============================================================

let currentPage = "home";
let isDark = true;

const specialtyIcons = {
  fullstack: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  ai:        `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 0 6h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1 0-6h1V6a4 4 0 0 1 4-4z"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/></svg>`,
  database:  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  default:   `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
};

const skillCategoryIcons = {
  language: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  ai:       `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 0 6h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1 0-6h1V6a4 4 0 0 1 4-4z"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/></svg>`,
  tool:     `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  web:      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  database: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  cloud:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
  default:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
};

function getSkillIcon(categoryName) {
  const name = categoryName.toLowerCase();
  if (name.includes("language")) return skillCategoryIcons.language;
  if (name.includes("ai") || name.includes("ml") || name.includes("data")) return skillCategoryIcons.ai;
  if (name.includes("tool") || name.includes("dev")) return skillCategoryIcons.tool;
  if (name.includes("web") || name.includes("framework")) return skillCategoryIcons.web;
  if (name.includes("database") || name.includes("db")) return skillCategoryIcons.database;
  if (name.includes("cloud") || name.includes("devops")) return skillCategoryIcons.cloud;
  return skillCategoryIcons.default;
}

const projectIcons = [
  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
];

// — Initialize —
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  if (typeof portfolioData !== 'undefined') {
    renderAll();
  } else {
    console.error("portfolioData is missing. Make sure data.js is loaded before app.js");
  }
  navigate("home");
  initScrollEffect();
});

// ===================== THEME =====================
function toggleTheme() {
  isDark = !isDark;
  applyTheme();
  localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
}

function loadTheme() {
  const saved = localStorage.getItem("portfolio-theme");
  isDark = saved ? saved === "dark" : true;
  applyTheme();
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  const toggle = document.getElementById("themeToggle");
  if (toggle) toggle.textContent = isDark ? "☀️" : "🌙";
}

// ===================== NAVBAR SCROLL =====================
function initScrollEffect() {
  const nav = document.getElementById("navbar");
  const onScroll = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 10);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ===================== NAVIGATION =====================
function navigate(page) {
  currentPage = page;
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById("page-" + page);
  if (target) {
    target.classList.add("active");
    target.style.animation = "none";
    target.offsetHeight;
    target.style.animation = "";
  }
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("data-page") === page && !a.classList.contains("contact-btn")) {
      a.classList.add("active");
    }
  });
  document.getElementById("navLinks").classList.remove("open");
  document.getElementById("hamburger").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("open");
  document.getElementById("hamburger").classList.toggle("open");
}

// ===================== RENDER ALL =====================
function renderAll() {
  renderHome();
  renderAbout();
  renderEducation();
  renderExperience();
  renderAwards();
  renderProjects();
  renderSkills();
  renderContact();
}

function renderHome() {
  const d = portfolioData;
  document.getElementById("heroName").textContent    = d.name;
  document.getElementById("heroTitle").textContent   = d.title;
  document.getElementById("heroSummary").textContent = d.heroSummary;
  document.getElementById("profilePic").src          = d.profileImage;
  document.getElementById("footerName").textContent  = d.name;
  const iconKeys = ["fullstack", "ai", "database"];
  document.getElementById("specialtiesContainer").innerHTML = d.specialties
    .map((s, i) => `
      <div class="specialty-card">
        <div class="icon">${specialtyIcons[iconKeys[i]] || specialtyIcons.default}</div>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
      </div>`).join("");
}

function renderAbout() {
  const d = portfolioData;
  document.getElementById("aboutBio").innerHTML = d.aboutBio.map(p => `<p>${p}</p>`).join("");
  document.getElementById("statsGrid").innerHTML = d.stats.map(s => `
    <div class="stat-card">
      <span class="stat-value">${s.value}</span>
      <span class="stat-label">${s.label}</span>
    </div>`).join("");
  document.getElementById("interestsGrid").innerHTML = d.interests.map(i => `
    <div class="interest-card">
      <div class="icon">${i.icon}</div>
      <div class="label">${i.label}</div>
    </div>`).join("");
}

function renderEducation() {
  document.getElementById("educationTimeline").innerHTML = portfolioData.education.map(e => `
    <div class="timeline-item">
      <div class="timeline-card">
        <div class="timeline-date-pill">${e.year}</div>
        <h3>${e.degree}</h3>
        <div class="institution">${e.institution}</div>
        <span class="cgpa-badge">CGPA: ${e.cgpa}</span>
        <p>${e.description}</p>
        <ul class="achievements">
          ${e.achievements.map(a => `<li>${a}</li>`).join("")}
        </ul>
      </div>
    </div>`).join("");
}

function renderExperience() {
  const awards = [
    { svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`, title: "Rank 8 — Bangladesh", event: "Blockchain Olympiad Bangladesh", sub: "AI Category · Nominated, International Data Science Olympiad 2025, Hong Kong", year: "2025", category: "Blockchain / AI", color: "#10b981" },
    { svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`, title: "Participant", event: "ICPC Asia Dhaka Regional Contest", sub: "", year: "2023", category: "ICPC", color: "#3b82f6" },
    { svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H3V5h3M18 9h3V5h-3M12 17v4M8 21h8M7 3h10v8a5 5 0 0 1-10 0V3z"/></svg>`, title: "Winner", event: "Presidency Intra-University Programming Contest", sub: "Season 2", year: "2023", category: "Competitive Programming", color: "#f59e0b" },
    { svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H3V5h3M18 9h3V5h-3M12 17v4M8 21h8M7 3h10v8a5 5 0 0 1-10 0V3z"/></svg>`, title: "1st Runner-Up", event: "Presidency Intra-University Programming Contest", sub: "Season 1", year: "2022", category: "Competitive Programming", color: "#f59e0b" },
    { svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 0 6h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1 0-6h1V6a4 4 0 0 1 4-4z"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/></svg>`, title: "2nd Runner-Up", event: "AI Contest", sub: "Presidency University", year: "2024", category: "Artificial Intelligence", color: "#8b5cf6" }
  ];
  document.getElementById("experienceList").innerHTML = `
    <div class="awards-grid">
      ${awards.map((a, i) => `
        <div class="award-item">
          <div class="award-item-top">
            <div class="award-icon-box" style="--icon-color:${a.color};--icon-bg:${a.color}1a;">${a.svg}</div>
            <div class="award-meta">
              <span class="award-cat-pill" style="--pill-color:${a.color};--pill-bg:${a.color}18;">${a.category}</span>
              ${a.year ? `<span class="award-year-tag">${a.year}</span>` : ""}
            </div>
          </div>
          <h3 class="award-item-title">${a.title}</h3>
          <p class="award-item-event">${a.event}</p>
          ${a.sub ? `<p class="award-item-sub">${a.sub}</p>` : ""}
          <div class="award-item-num">${String(i + 1).padStart(2, "0")}</div>
        </div>`).join("")}
    </div>`;
}

function renderAwards() {
  const container = document.getElementById("awardsList");
  if (!container || !portfolioData.awards) return;
  container.innerHTML = portfolioData.awards.map((a, i) => `
    <div class="award-card">
      <div class="award-icon">${a.icon}</div>
      <div class="award-body">
        <div class="award-meta-row">
          <span class="award-category">${a.category}</span>
          ${a.year ? `<span class="award-year">${a.year}</span>` : ""}
        </div>
        <h3 class="award-title">${a.title}</h3>
        <p class="award-event">${a.event}${a.edition ? " — " + a.edition : ""}</p>
        ${a.extra ? `<p class="award-extra">${a.extra}</p>` : ""}
      </div>
      <div class="award-number">${String(i + 1).padStart(2, "0")}</div>
    </div>`).join("");
}

function renderProjects() {
  document.getElementById("projectsGrid").innerHTML = portfolioData.projects.map((p, i) => `
    <div class="project-card">
      <div class="project-card-icon">${projectIcons[i % projectIcons.length]}</div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <a href="${p.github}" target="_blank" class="project-link">View on GitHub →</a>
    </div>`).join("");
}

function renderSkills() {
  document.getElementById("skillsList").innerHTML = portfolioData.skills.map(s => `
    <div class="skill-block">
      <div class="skill-block-icon">${getSkillIcon(s.category)}</div>
      <div class="skill-block-header">
        <h3 style="color:${s.color}">${s.category}</h3>
        <span class="skill-count">${s.items.length} skills</span>
      </div>
      <div class="skill-pills">
        ${s.items.map(item => `<span class="skill-pill">${item}</span>`).join("")}
      </div>
    </div>`).join("");
}

function renderContact() {
  const d = portfolioData;
  document.getElementById("contactDetails").innerHTML = `
    <div class="contact-detail">
      <div class="contact-icon">✉️</div>
      <div><h4>Email</h4><p>${d.email}</p></div>
    </div>
    <div class="contact-detail">
      <div class="contact-icon">📱</div>
      <div><h4>Phone</h4><p>${d.phone}</p></div>
    </div>
    <div class="contact-detail">
      <div class="contact-icon">📍</div>
      <div><h4>Location</h4><p>${d.location}</p></div>
    </div>`;
  const footerSocials = document.getElementById("footerSocials");
  if (footerSocials) {
    footerSocials.innerHTML = `
      <a href="${d.socials.github}" target="_blank" class="footer-social-link">GitHub</a>
      <a href="${d.socials.linkedin}" target="_blank" class="footer-social-link">LinkedIn</a>`;
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector(".form-submit");
  const orig = btn.innerHTML;
  btn.innerHTML = `✓ Message Sent!`;
  btn.style.background = "#16a34a";
  btn.style.boxShadow  = "0 4px 20px rgba(22,163,74,0.35)";
  setTimeout(() => {
    btn.innerHTML = orig;
    btn.style.background = "";
    btn.style.boxShadow  = "";
    e.target.reset();
  }, 2800);
}