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

        this.interval = null;
        this.usedTexts = new Set();
        this.lastUsedText = null;
        this.activeRects = [];
        this.observer = null;

        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio === 1) {
                    this.startTextLoop();
                } else {
                    this.stop();
                    this.section.querySelectorAll('.animated-text').forEach(el => {
                        const isMobile = window.innerWidth < 768;
                        if (isMobile) {
                            el.classList.add('opacity-0', 'translate-x-8', 'blur-md', 'scale-95');
                        } else {
                            el.classList.add('opacity-0', 'translate-y-8', 'blur-md', 'scale-95');
                        }
                        setTimeout(() => el.remove(), 500);
                    });
                    this.activeRects = [];
                }
            });
        }, {
            threshold: 1.0
        });

        this.observer.observe(this.section);
    }

    randomChar() {
        return this.charset[Math.floor(Math.random() * this.charset.length)];
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

    isOverlappingWithActiveRects(x, y, width, height) {
        const margin = 20; // Aumentamos el margen para mejor separación
        
        // Verificar contra elementos activos registrados
        for (const rect of this.activeRects) {
            const rLeft = rect.x - margin;
            const rTop = rect.y - margin;
            const rRight = rect.x + rect.width + margin;
            const rBottom = rect.y + rect.height + margin;
            if (x < rRight && x + width > rLeft && y < rBottom && y + height > rTop) {
                return true;
            }
        }
        
        // Verificar contra elementos DOM actualmente visibles
        const activeElements = this.section.querySelectorAll('.animated-text');
        for (const element of activeElements) {
            const elementRect = element.getBoundingClientRect();
            const sectionRect = this.section.getBoundingClientRect();
            
            // Convertir coordenadas absolutas a relativas del contenedor
            const elementX = elementRect.left - sectionRect.left;
            const elementY = elementRect.top - sectionRect.top;
            const elementWidth = elementRect.width;
            const elementHeight = elementRect.height;
            
            const eLeft = elementX - margin;
            const eTop = elementY - margin;
            const eRight = elementX + elementWidth + margin;
            const eBottom = elementY + elementHeight + margin;
            
            if (x < eRight && x + width > eLeft && y < eBottom && y + height > eTop) {
                return true;
            }
        }
        
        return false;
    }

    getValidPosition(width = 300, height = 50, maxAttempts = 50) {
        const sectionRect = this.section.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;
        const margin = 5;
        let attempts = 0;

        while (attempts < maxAttempts) {
            let x, y;
            
            if (isMobile) {
                // En mobile: posición vertical más controlada
                x = margin + Math.random() * (sectionRect.width - width - margin * 2);
                y = margin + Math.random() * (sectionRect.height - height - margin * 2);
            } else {
                // En desktop: mantener lógica original
                x = Math.random() * (sectionRect.width - width);
                y = margin + Math.random() * (sectionRect.height - height - margin * 2);
            }

            if (!this.isOverlappingWithActiveRects(x, y, width, height)) {
                return { x, y };
            }
            attempts++;
        }

        return {
            x: margin,
            y: margin
        };
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
        this.interval = setInterval(() => this.showTextLoop(), 2000);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    restart() {
        this.stop();
        this.usedTexts.clear();
        this.lastUsedText = null;
        this.activeRects = [];
        
        // Limpiar elementos DOM remanentes
        this.section.querySelectorAll('.animated-text').forEach(el => el.remove());
        
        this.startTextLoop();
    }
}