import ScrollReveal from "scrollreveal";

export function initScrollReveal() {
  const sr = ScrollReveal();

  sr.reveal(".reveal-left", {
    distance: "60px",
    origin: "left",
    opacity: 0,
    duration: 900,
    easing: "ease",
    interval: 120,
    reset: false,
  });

  sr.reveal(".reveal", {
    distance: "40px",
    duration: 800,
    easing: "ease",
    origin: "bottom",
    interval: 100,
    reset: false,
  });
}