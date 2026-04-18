const header = document.querySelector(".site-header");
const nav = document.querySelector(".site-nav");
const navToggle = document.querySelector(".nav-toggle");
const toTop = document.querySelector(".to-top");

const handleScroll = () => {
  const offset = window.scrollY;
  header.classList.toggle("is-scrolled", offset > 40);
  toTop.classList.toggle("visible", offset > 450);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 },
);

document
  .querySelectorAll(".fade-up")
  .forEach((section) => observer.observe(section));

navToggle?.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  navToggle.classList.toggle("open");
  nav.classList.toggle("open");
});

toTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", handleScroll, { passive: true });

// Close mobile nav when a link is selected
nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      navToggle?.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (
    nav?.classList.contains("open") &&
    !nav.contains(target) &&
    !navToggle.contains(target)
  ) {
    nav.classList.remove("open");
    navToggle?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // stop redirect

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      alert("✅ Inquiry sent successfully! We'll get back to you soon.");
      form.reset();
    } else {
      alert("❌ Something went wrong. Try again.");
    }
  } catch (error) {
    alert("⚠️ Network error. Please try again.");
  }
});
