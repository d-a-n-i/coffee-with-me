(() => {
  const html = document.documentElement;
  html.classList.add("js");

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- Header shadow ---------- */
  const top = $(".top");
  const onScroll = () => {
    if (top) top.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  requestAnimationFrame(onScroll);
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuBtn = $(".menu-btn");
  const sheet = $("#mobile-nav");
  const setMenu = (open) => {
    if (!menuBtn || !sheet) return;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "סגירת תפריט" : "פתיחת תפריט");
    sheet.hidden = !open;
    document.body.classList.toggle("menu-open", open);
  };
  if (menuBtn && sheet) {
    menuBtn.addEventListener("click", () => setMenu(sheet.hidden));
    $$("a", sheet).forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !sheet.hidden) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    window.matchMedia("(min-width: 900px)").addEventListener("change", (e) => {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- Sticky CTA bar: hide while hero or contact is on screen ---------- */
  const bar = $(".cta-bar");
  const hero = $(".hero");
  const contact = $("#contact");
  if (bar && "IntersectionObserver" in window) {
    const visible = new Set();
    const update = () => bar.classList.toggle("is-hidden", visible.size > 0);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        update();
      },
      { threshold: 0.25 }
    );
    [hero, contact].filter(Boolean).forEach((el) => io.observe(el));
    bar.classList.add("is-hidden");
  }

  /* ---------- Gallery reveal ---------- */
  const imgs = $$(".gallery-grid img");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    imgs.forEach((img, i) => {
      img.style.transitionDelay = `${Math.min(i * 70, 350)}ms`;
      io.observe(img);
    });
  } else {
    imgs.forEach((img) => img.classList.add("is-in"));
  }

  /* ---------- Testimonial carousel dots (mobile) ---------- */
  const rail = $(".quotes");
  const dotsWrap = $(".quotes-dots");
  const cards = rail ? $$(".quote", rail) : [];
  if (rail && dotsWrap && cards.length > 1 && "IntersectionObserver" in window) {
    const dots = cards.map((card, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `המלצה ${i + 1}`);
      b.addEventListener("click", () =>
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
      );
      dotsWrap.appendChild(b);
      return b;
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target);
            dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
          }
        });
      },
      { root: rail, threshold: 0.6 }
    );
    cards.forEach((c) => io.observe(c));
  }

  /* ---------- Active nav link ---------- */
  const navLinks = $$(".nav a");
  const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  if (navLinks.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((a) =>
            a.toggleAttribute("aria-current", a.getAttribute("href") === `#${entry.target.id}`)
          );
          navLinks.forEach((a) => {
            if (a.hasAttribute("aria-current")) a.setAttribute("aria-current", "true");
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
  }

  /* ---------- Analytics: count every call / WhatsApp / SMS tap ---------- */
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    let method = null;
    if (href.startsWith("tel:")) method = "call";
    else if (href.startsWith("sms:")) method = "sms";
    else if (href.includes("wa.me/")) method = "whatsapp";
    else if (href.includes("instagram.com")) method = "instagram";
    if (!method || typeof window.gtag !== "function") return;
    const place = a.closest("[data-place]");
    window.gtag("event", "contact_click", {
      method,
      placement: place ? place.dataset.place : "page",
      link_text: (a.textContent || "").trim().slice(0, 60),
    });
  });
})();
