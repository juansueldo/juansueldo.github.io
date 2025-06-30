export class DecryptAnimation {
    constructor(section, options = {}) {
        this.section = section;

        this.texts = options.texts || [
            "JavaScript      ", "PHP             ", "Laravel         ",
            "HTML            ", "CSS             ", "Angular         ",
            "GIT             ", "C#              ", ".NET            ",
            "Node.js         ", "MySQL           ", "Tailwind CSS    ",
            "Bootstrap       ", "Astro           ",
        ];

        this.charset = options.charset || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+=-";
        this.blockingSelectors = options.blockingSelectors || ['.text-white', '.text-black'];
        this.fixedPositions = options.fixedPositions || null; // Nuevo: lista fija
        this.fixedPositionsIndex = 0;
        this.initialText= options.initialText || 'Skills';
        this.interval = null;
        this.usedTexts = new Set();
        this.lastUsedText = null;
        this.activeRects = [];
        this.observer = null;

        this.skillsElement = null; // el div para "Skills"

        this.init();
    }

    init() {
        this.createSkillsElement();
        this.showSkills();

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio === 1) {
                    this.startTextLoop();
                    this.hideSkills();
                } else {
                    this.stop();
                    this.showSkills();
                    this.section.querySelectorAll('.animated-text').forEach(el => el.remove());
                    this.activeRects = [];
                }
            });
        }, {
            threshold: 1.0
        });

        this.observer.observe(this.section);
    }

    createSkillsElement() {
        this.skillsElement = document.createElement('div');
        this.skillsElement.className = `
            absolute inset-0 flex items-center justify-center 
            
            text-3xl font-mono text-black dark:text-white transition-opacity duration-500
        `;
        this.skillsElement.innerText =  this.initialText;
        this.section.appendChild(this.skillsElement);
    }

    showSkills() {
        if (this.skillsElement) {
            this.skillsElement.style.opacity = "1";
        }
    }

    hideSkills() {
        if (this.skillsElement) {
            this.skillsElement.style.opacity = "0";
        }
    }
    isOverlappingWithActiveRects(x, y, width, height) {
        const margin = 10;
        for (const rect of this.activeRects) {
            const rLeft = rect.x - margin;
            const rTop = rect.y - margin;
            const rRight = rect.x + rect.width + margin;
            const rBottom = rect.y + rect.height + margin;
            if (x < rRight && x + width > rLeft && y < rBottom && y + height > rTop) {
                return true;
            }
        }
        return false;
    }
    getValidPosition(width = 300, height = 50) {
        if (this.fixedPositions && this.fixedPositions.length > 0) {
            // Usar posiciones fijas sin preocuparse por colisiones
            const pos = this.fixedPositions[this.fixedPositionsIndex];
            this.fixedPositionsIndex = (this.fixedPositionsIndex + 1) % this.fixedPositions.length;
            return { x: pos.x, y: pos.y };
        }
        // fallback a la lógica original si no hay posiciones fijas
        return this.originalRandomPosition(width, height);
    }
    getRandomText() {
        if (this.usedTexts.size >= this.texts.length) {
            this.usedTexts.clear();
        }
        const available = this.texts.filter(t => !this.usedTexts.has(t) && t !== this.lastUsedText);
        const selected = available.length > 0
            ? available[Math.floor(Math.random() * available.length)]
            : this.texts[Math.floor(Math.random() * this.texts.length)];
        this.usedTexts.add(selected);
        this.lastUsedText = selected;
        return selected;
    }
randomChar() {
        return this.charset[Math.floor(Math.random() * this.charset.length)];
    }

    originalRandomPosition(width, height) {
        const sectionRect = this.section.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;
        const margin = 5;
        let attempts = 0, maxAttempts = 50;

        while (attempts < maxAttempts) {
            let x, y;
            if (isMobile) {
                x = margin + Math.random() * (sectionRect.width - width - margin * 2);
                y = margin + Math.random() * (sectionRect.height - height - margin * 2);
            } else {
                x = Math.random() * (sectionRect.width - width);
                y = margin + Math.random() * (sectionRect.height - height - margin * 2);
            }
            if (!this.isOverlappingWithActiveRects(x, y, width, height)) {
                return { x, y };
            }
            attempts++;
        }
        return { x: margin, y: margin };
    }

     decryptTextStepByStep(targetText, element) {
        let step = 0;
        const interval = setInterval(() => {
            step++;
            const revealed = targetText.substring(0, step);
            let randomPart = "";
            for (let i = step; i < targetText.length; i++) {
                randomPart += this.randomChar();
            }
            element.innerText = revealed + randomPart;
            if (step >= targetText.length) {
                clearInterval(interval);
                element.innerText = targetText;
            }
        }, 100);
    }

    showTextLoop() {
        const text = this.getRandomText();
        const textElement = document.createElement("div");
        const isMobile = window.innerWidth < 768;

        // Clases iniciales según el dispositivo
        const initialClasses = isMobile 
            ? 'opacity-0 translate-x-8 blur-md scale-95'
            : 'opacity-0 translate-y-8 blur-md scale-95';

        textElement.className = `
            text-black dark:text-white text-lg font-mono animated-text
            ${initialClasses}
            transition-all duration-[1500ms] pointer-events-none
        `.trim();

        textElement.style.position = "absolute";

        const targetPos = this.getValidPosition(300, 50);

        // Crear un ID único para este elemento
        const elementId = Date.now() + Math.random();
        textElement.dataset.elementId = elementId;

        if (isMobile) {
            // En mobile: aparece desde la derecha
            const sectionWidth = this.section.offsetWidth;
            textElement.style.left = `${sectionWidth}px`;
            textElement.style.top = `${targetPos.y}px`;
        } else {
            // En desktop: aparece desde abajo (lógica original)
            const sectionHeight = this.section.offsetHeight;
            textElement.style.left = `${targetPos.x}px`;
            textElement.style.top = `${sectionHeight}px`;
        }

        // Texto aleatorio enmascarado
        textElement.innerText = Array.from(text).map(() => this.randomChar()).join("");
        this.section.appendChild(textElement);

        // Registrar la posición objetivo con ID del elemento
        const rectData = { 
            x: targetPos.x, 
            y: targetPos.y, 
            width: 300, 
            height: 50, 
            elementId: elementId,
            element: textElement 
        };
        this.activeRects.push(rectData);

        // Fuerza el reflow para permitir animación
        void textElement.offsetWidth;

        // Anima a la posición final
        if (isMobile) {
            textElement.style.left = `${targetPos.x}px`;
            textElement.classList.remove("opacity-0", "translate-x-8", "blur-md", "scale-95");
            textElement.classList.add("opacity-100", "translate-x-0", "scale-100");
        } else {
            textElement.style.top = `${targetPos.y}px`;
            textElement.classList.remove("opacity-0", "translate-y-8", "blur-md", "scale-95");
            textElement.classList.add("opacity-100", "translate-y-0", "scale-100");
        }

        setTimeout(() => {
            this.decryptTextStepByStep(text, textElement);
        }, 300);

        setTimeout(() => {
            if (isMobile) {
                textElement.classList.add("opacity-0", "translate-x-8", "blur-md", "scale-95");
                textElement.classList.remove("opacity-100", "translate-x-0", "scale-100");
            } else {
                textElement.classList.add("opacity-0", "translate-y-8", "blur-md", "scale-95");
                textElement.classList.remove("opacity-100", "translate-y-0", "scale-100");
            }
            
            setTimeout(() => {
                if (textElement.parentNode) {
                    textElement.remove();
                    // Remover por ID del elemento para mayor precisión
                    this.activeRects = this.activeRects.filter(
                        rect => rect.elementId !== elementId
                    );
                }
            }, 1500);
        }, 10000);
    }
    startTextLoop() {
        if (this.interval) return;
        this.hideSkills();
        this.interval = setInterval(() => this.showTextLoop(), 1900);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}
