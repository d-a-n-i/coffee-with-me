(() => {
  const imgs = document.querySelectorAll(".gallery-rail img");
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
      { threshold: 0.2 }
    );
    imgs.forEach((img, i) => {
      img.style.transitionDelay = `${Math.min(i * 80, 400)}ms`;
      io.observe(img);
    });
  } else {
    imgs.forEach((img) => img.classList.add("is-in"));
  }

  const top = document.querySelector(".top");
  const onScroll = () => {
    if (!top) return;
    top.style.boxShadow =
      window.scrollY > 12 ? "0 8px 24px rgba(28,20,16,0.08)" : "none";
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
