const header = document.querySelector(".site-header");
const toggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
const year = document.getElementById("year");
const form = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

if (year) year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
});

toggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  toggle.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    toggle?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navItems = [...document.querySelectorAll(".nav-links a")];

const setActive = () => {
  const y = window.scrollY + 120;
  let current = "home";
  for (const section of sections) {
    if (y >= section.offsetTop) current = section.id;
  }
  const navMap = {
    capabilities: "transition",
  };
  const navId = navMap[current] || current;
  navItems.forEach((item) => {
    item.classList.toggle("is-active", item.getAttribute("href") === `#${navId}`);
  });
};

window.addEventListener("scroll", setActive);

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach((card) => {
      const tags = card.dataset.tags || "";
      const show = filter === "all" || tags.split(" ").includes(filter);
      card.classList.toggle("is-hidden", !show);
    });
  });
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
  if (formNote) formNote.hidden = false;
  window.location.href = `mailto:pray122001@gmail.com?subject=${subject}&body=${body}`;
});
