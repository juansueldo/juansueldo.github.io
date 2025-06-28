export class Navigation {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.hamburger = document.getElementById('hamburger');
    this.menu = document.getElementById('mobileMenu');
    this.navLinks = this.menu.querySelectorAll('a');

    this.isOpen = false;

    this.init();
  }

  init() {
    this.setupScrollEffect();
    this.setupHamburger();
    this.setupNavLinks();
    this.setupResizeReset();
  }

  setupScrollEffect() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        this.navbar.classList.add('backdrop-blur-md', 'bg-opacity-90','scrolled');
      } else {
        this.navbar.classList.remove('backdrop-blur-md', 'bg-opacity-90','scrolled');
      }
    });
  }

  setupHamburger() {
    this.hamburger.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      this.toggleMenu();
    });
  }

  toggleMenu() {
    if (this.isOpen) {
      this.menu.classList.remove('hidden');
      this.menu.classList.add('flex');
      this.animateHamburger(true);
    } else {
      this.menu.classList.remove('flex');
      this.menu.classList.add('hidden');
      this.animateHamburger(false);
    }
  }


  animateHamburger(active) {
    const spans = this.hamburger.querySelectorAll('span');

    if (active) {
        spans[0].classList.add('rotate-45', 'translate-y-1', 'bg-black');
        spans[1].classList.add('opacity-0');
        spans[2].classList.add('-rotate-45', '-translate-y-2', 'bg-black');
    } else {
        spans[0].classList.remove('rotate-45', 'translate-y-1', 'bg-black');
        spans[1].classList.remove('opacity-0');
        spans[2].classList.remove('-rotate-45', '-translate-y-2', 'bg-black');
    }
    }


  setupNavLinks() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (this.isOpen) {
          this.isOpen = false;
          this.toggleMenu();
        }
      });
    });
  }

  setupResizeReset() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.isOpen = false;
        this.toggleMenu();
      }
    });
  }
}