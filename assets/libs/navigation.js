export class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.getElementById('hamburger');
        this.menu = document.getElementById('menu');
        this.navLinks = document.querySelectorAll('#menu a');
        this.isMenuClosing = false; // Flag para controlar el estado de cierre
        
        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupHamburgerMenu();
        this.setupNavLinks();
        this.setupResponsiveMenu();
    }

    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }

    setupHamburgerMenu() {
        this.hamburger.addEventListener('click', () => {
            if (this.menu.classList.contains('active') && !this.isMenuClosing) {
                this.closeMenu();
            } else if (!this.menu.classList.contains('active') && !this.isMenuClosing) {
                this.openMenu();
            }
        });
    }

    openMenu() {
        this.hamburger.classList.add('is-active');
        this.menu.classList.remove('closing');
        this.menu.classList.add('active');
    }

    closeMenu() {
        this.isMenuClosing = true;
        this.hamburger.classList.remove('is-active');
        this.menu.classList.add('closing');
        
        // Esperar a que termine la animación antes de ocultar el menú
        setTimeout(() => {
            this.menu.classList.remove('active', 'closing');
            this.isMenuClosing = false;
        }, 300); // 300ms coincide con la duración de la animación CSS
    }

    setupNavLinks() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const index = parseInt(link.getAttribute('data-index'));
                
                if (!isNaN(index)) {
                    // Disparar evento personalizado para el scroll controller
                    window.dispatchEvent(new CustomEvent('navigateToSection', {
                        detail: { index }
                    }));
                }
                
                // Cerrar el menú con animación al hacer clic en un enlace
                if (this.menu.classList.contains('active') && !this.isMenuClosing) {
                    this.closeMenu();
                }
            });
        });
    }

    setupResponsiveMenu() {
        const resetMenuOnResize = () => {
            if (window.innerWidth > 768) {
                this.menu.classList.remove('active', 'closing');
                this.hamburger.classList.remove('is-active');
                this.isMenuClosing = false;
            }
        };

        window.addEventListener('resize', resetMenuOnResize);
        window.addEventListener('load', resetMenuOnResize);
    }
}