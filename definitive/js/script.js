
document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos los elementos necesarios
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    // Verificamos que los elementos existan antes de agregar eventos
    if (menuToggle && navLinks) {
        // Al hacer clic en el botón del menú
        menuToggle.addEventListener("click", () => {
            
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active"); // Alternar la clase para el botón
        });

        // Cerramos el menú al hacer clic en un enlace
        const navLinksItems = navLinks.querySelectorAll("a");
        navLinksItems.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active"); // Asegurarse de desactivar el estado del botón
            });
        });
    }
});





document.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        // Agrega la clase 'scrolled' cuando se hace scroll hacia abajo
        header.classList.add('scrolled');
    } else {
        // Remueve la clase 'scrolled' cuando se vuelve al tope
        header.classList.remove('scrolled');
    }
});
