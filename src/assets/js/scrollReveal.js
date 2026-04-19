import ScrollReveal from "scrollreveal";

// Revela los elementos con la clase .reveal-left animando de izquierda a derecha
ScrollReveal().reveal('.reveal-left', {
  distance: '60px',
  origin: 'left',
  opacity: 0,
  duration: 900,
  easing: 'ease',
  interval: 120,
  reset: false // Cambia a true si quieres que se repita
});
