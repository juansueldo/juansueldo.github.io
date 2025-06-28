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
                        el.classList.add('opacity-0', 'translate-y-8', 'blur-md', 'scale-95');
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

    getValidPosition(width = 300, height = 50, maxAttempts = 50) {
        const sectionRect = this.section.getBoundingClientRect();
        const verticalMargin = 5;
        let attempts = 0;
        while (attempts < maxAttempts) {
            const x = Math.random() * (sectionRect.width - width);
            const y = verticalMargin + Math.random() * (sectionRect.height - height - verticalMargin * 2);
            if (!this.isOverlappingWithActiveRects(x, y, width, height)) {
                return { x, y };
            }
            attempts++;
        }
        return {
            x: 50,
            y: verticalMargin
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

        // Clases iniciales: opacidad 0, blur, desplazado hacia abajo, escala menor
        textElement.className = `
            text-black dark:text-white text-lg font-mono animated-text
            opacity-0 translate-y-8 blur-md scale-95
            transition-all duration-[1500ms] pointer-events-none
        `.trim();

        textElement.style.position = "absolute";

        const targetPos = this.getValidPosition(300, 50);

        // Siempre aparecerán desde abajo (bottom del contenedor)
        const sectionHeight = this.section.offsetHeight;
        textElement.style.left = `${targetPos.x}px`;
        textElement.style.top = `${sectionHeight}px`;

        // Texto aleatorio enmascarado
        textElement.innerText = Array.from(text).map(() => this.randomChar()).join("");
        this.section.appendChild(textElement);

        this.activeRects.push({ x: targetPos.x, y: targetPos.y, width: 300, height: 50 });

        // Fuerza el reflow para permitir animación
        void textElement.offsetWidth;

        // Cambia top a la posición final y remueve clases de salida
        textElement.style.top = `${targetPos.y}px`;
        textElement.classList.remove("opacity-0", "translate-y-8", "blur-md", "scale-95");
        textElement.classList.add("opacity-100", "translate-y-0", "scale-100");

        setTimeout(() => {
            this.decryptTextStepByStep(text, textElement);
        }, 300);

        setTimeout(() => {
            textElement.classList.add("opacity-0", "translate-y-8", "blur-md", "scale-95");
            textElement.classList.remove("opacity-100", "translate-y-0", "scale-100");
            setTimeout(() => {
                if (textElement.parentNode) {
                    textElement.remove();
                    this.activeRects = this.activeRects.filter(
                        rect => !(rect.x === targetPos.x && rect.y === targetPos.y)
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
        this.startTextLoop();
    }
}