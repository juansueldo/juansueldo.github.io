// modules/decryptAnimation.js

export class DecryptAnimation {
    constructor(section, options = {}) {
        this.section = section;

        // Opciones con valores por defecto
        this.texts = options.texts || [
            "JavaScript     ", "PHP            ", "Laravel        ",
            "HTML           ", "CSS            ", "Angular        ",
            "GIT            ", "C#             ", ".NET           ",
            "Node.js        ", "MySQL          "
        ];

        this.charset = options.charset || "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+=-";

        this.blockingSelectors = options.blockingSelectors || [
            '.container-section-home', '.navbar', '.animated-text'
        ];

        this.interval = null;
        this.usedTexts = new Set();
        this.lastUsedText = null;

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
                        el.classList.add('fade-out');
                        setTimeout(() => el.remove(), 800);
                    });
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

    isPositionBlocked(x, y, width = 300, height = 50) {
        for (const selector of this.blockingSelectors) {
            const elements = document.querySelectorAll(selector);

            for (const element of elements) {
                const rect = element.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;

                const margin = 20;
                const elementLeft = rect.left - margin;
                const elementTop = rect.top - margin;
                const elementRight = rect.right + margin;
                const elementBottom = rect.bottom + margin;

                if (
                    x < elementRight &&
                    x + width > elementLeft &&
                    y < elementBottom &&
                    y + height > elementTop
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    getValidPosition(width = 300, height = 50, maxAttempts = 50) {
        let attempts = 0;

        while (attempts < maxAttempts) {
            const x = Math.random() * (window.innerWidth - width);
            const y = Math.random() * (window.innerHeight - height);

            if (!this.isPositionBlocked(x, y, width, height)) {
                return { x, y };
            }

            attempts++;
        }

        const fallbackPositions = [
            { x: window.innerWidth - width - 50, y: window.innerHeight - height - 100 },
            { x: 50, y: window.innerHeight - height - 100 },
            { x: window.innerWidth - width - 50, y: 100 },
            { x: 50, y: 100 }
        ];

        for (const pos of fallbackPositions) {
            if (!this.isPositionBlocked(pos.x, pos.y, width, height)) {
                return pos;
            }
        }

        return {
            x: Math.random() * (window.innerWidth - width),
            y: Math.random() * (window.innerHeight - height)
        };
    }

    getRandomText() {
        if (this.usedTexts.size >= this.texts.length) {
            this.usedTexts.clear();
        }

        const availableTexts = this.texts.filter(
            text => !this.usedTexts.has(text) && text !== this.lastUsedText
        );

        if (availableTexts.length === 0) {
            const fallbackTexts = this.texts.filter(text => text !== this.lastUsedText);
            const selectedText = fallbackTexts.length > 0
                ? fallbackTexts[Math.floor(Math.random() * fallbackTexts.length)]
                : this.texts[0];
            this.lastUsedText = selectedText;
            return selectedText;
        }

        const selectedText = availableTexts[Math.floor(Math.random() * availableTexts.length)];
        this.usedTexts.add(selectedText);
        this.lastUsedText = selectedText;

        return selectedText;
    }

    showTextLoop() {
        const text = this.getRandomText();
        const textElement = document.createElement("div");
        textElement.className = "animated-text";

        const position = this.getValidPosition(300, 50);
        textElement.style.left = `${position.x}px`;
        textElement.style.top = `${position.y}px`;

        textElement.innerText = Array.from(text).map(() => this.randomChar()).join("");

        this.section.appendChild(textElement);

        setTimeout(() => {
            this.decryptTextStepByStep(text, textElement);
        }, 300);

        setTimeout(() => {
            if (textElement.parentNode) {
                textElement.remove();
            }
        }, 6000);
    }

    startTextLoop() {
        if (this.interval) return; // evita múltiples loops
        this.interval = setInterval(() => {
            this.showTextLoop();
        }, 2000);
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
        this.startTextLoop();
    }
}
