// modules/scrollController.js - Maneja el scroll entre secciones
export class ScrollController {
    constructor() {
        this.wrapper = document.getElementById("scrollWrapper");
        this.sections = document.querySelectorAll(".item");
        this.totalSections = this.sections.length;
        this.currentSection = 0;
        this.isAnimating = false;
        this.startY = 0;
        
        this.init();
    }

    init() {
        this.setupWheelEvent();
        this.setupKeyboardEvents();
        this.setupTouchEvents();
        this.setupNavigationListener();
    }

    scrollToSection(index) {
        if (index < 0 || index >= this.totalSections) return;

        this.isAnimating = true;
        const translateY = -index * window.innerHeight;
        this.wrapper.style.transform = `translateY(${translateY}px)`;

        setTimeout(() => {
            this.isAnimating = false;
        }, 700);

        // Reanimar texto si existe
        const textElement = document.querySelector('.gradient-text');
        if (textElement) {
            // Disparar evento para reanimar el texto
            window.dispatchEvent(new CustomEvent('reanimateText'));
        }
    }

    setupWheelEvent() {
        window.addEventListener("wheel", (e) => {
            if (this.isAnimating) return;

            if (e.deltaY > 0) {
                if (this.currentSection < this.totalSections - 1) {
                    this.currentSection++;
                    this.scrollToSection(this.currentSection);
                }
            } else {
                if (this.currentSection > 0) {
                    this.currentSection--;
                    this.scrollToSection(this.currentSection);
                }
            }
        });
    }

    setupKeyboardEvents() {
        window.addEventListener("keydown", (e) => {
            if (this.isAnimating) return;

            if (e.key === "ArrowDown") {
                if (this.currentSection < this.totalSections - 1) {
                    this.currentSection++;
                    this.scrollToSection(this.currentSection);
                }
            } else if (e.key === "ArrowUp") {
                if (this.currentSection > 0) {
                    this.currentSection--;
                    this.scrollToSection(this.currentSection);
                }
            }
        });
    }

    setupTouchEvents() {
        window.addEventListener("touchstart", (e) => {
            this.startY = e.touches[0].clientY;
        });

        window.addEventListener("touchend", (e) => {
            if (this.isAnimating) return;
            
            const endY = e.changedTouches[0].clientY;
            const deltaY = this.startY - endY;

            if (deltaY > 30 && this.currentSection < this.totalSections - 1) {
                this.currentSection++;
                this.scrollToSection(this.currentSection);
            } else if (deltaY < -30 && this.currentSection > 0) {
                this.currentSection--;
                this.scrollToSection(this.currentSection);
            }
        });
    }

    setupNavigationListener() {
        window.addEventListener('navigateToSection', (e) => {
            const { index } = e.detail;
            this.currentSection = index;
            this.scrollToSection(index);
        });
    }
}