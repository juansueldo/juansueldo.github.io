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
        this.fixedPositions = options.fixedPositions || null;
        this.fixedPositionsIndex = 0;
        this.initialText = options.initialText || 'Skills';
        
        // Nueva opción para la dirección del decrypt
        // Opciones: 'left-to-right', 'right-to-left', 'center-out', 'random'
        this.decryptDirection = options.decryptDirection || 'random';
        
        // Nueva opción para la dirección de aparición en mobile
        // Opciones: 'from-right', 'from-left', 'from-top', 'from-bottom'
        this.mobileAnimationDirection = options.mobileAnimationDirection || 'from-bottom';
        
        // Nueva opción para la dirección de aparición en desktop
        // Opciones: 'from-right', 'from-left', 'from-top', 'from-bottom'
        this.desktopAnimationDirection = options.desktopAnimationDirection || 'from-bottom';
        
        this.interval = null;
        this.currentTextIndex = 0;
        this.activeRects = [];
        this.observer = null;
        this.skillsElement = null;

        this.init();
    }

    init() {
        this.createSkillsElement();
        this.showSkills();

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio === 1) {
                    setTimeout(() => {
                        this.startTextLoop();
                        this.hideSkills();
                    }, 50);
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
            text-3xl font-mono text-black dark:text-white transition-opacity duration-700
        `;
        this.skillsElement.innerText = this.initialText;
        this.section.appendChild(this.skillsElement);
    }

    showSkills() {
        if (this.skillsElement) {
            this.skillsElement.style.opacity = "1";
        }
    }

    hideSkills() {
        if (this.skillsElement) {
            this.skillsElement.style.transition = "opacity 1000ms ease-out";
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
    randomChar() {
        return this.charset[Math.floor(Math.random() * this.charset.length)];
    }
    getValidPosition(width = 300, height = 50) {
        if (this.fixedPositions && this.fixedPositions.length > 0) {
            const pos = this.fixedPositions[this.fixedPositionsIndex];
            this.fixedPositionsIndex = (this.fixedPositionsIndex + 1) % this.fixedPositions.length;
            return { x: pos.x, y: pos.y };
        }
        return this.originalRandomPosition(width, height);
    }

    getNextText() {
        const text = this.texts[this.currentTextIndex];
        this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        return text;
    }

    // Función para obtener clases CSS y posición inicial según dirección mobile
    getAnimationConfig(targetPos, sectionWidth, sectionHeight, isMobile = false) {
        const direction = isMobile ? this.mobileAnimationDirection : this.desktopAnimationDirection;
        
        switch (direction) {
            case 'from-right':
                return {
                    initialClasses: 'opacity-0 translate-x-8 blur-md scale-95',
                    finalClasses: 'opacity-100 translate-x-0 scale-100',
                    initialPosition: { left: `${sectionWidth}px`, top: `${targetPos.y}px` },
                    finalPosition: { left: `${targetPos.x}px` },
                    removeClasses: ['opacity-0', 'translate-x-8', 'blur-md', 'scale-95'],
                    addClasses: ['opacity-100', 'translate-x-0', 'scale-100'],
                    exitClasses: ['opacity-0', 'translate-x-8', 'blur-md', 'scale-95'],
                    exitRemoveClasses: ['opacity-100', 'translate-x-0', 'scale-100']
                };
                
            case 'from-left':
                return {
                    initialClasses: 'opacity-0 -translate-x-8 blur-md scale-95',
                    finalClasses: 'opacity-100 translate-x-0 scale-100',
                    initialPosition: { left: `-300px`, top: `${targetPos.y}px` },
                    finalPosition: { left: `${targetPos.x}px` },
                    removeClasses: ['opacity-0', '-translate-x-8', 'blur-md', 'scale-95'],
                    addClasses: ['opacity-100', 'translate-x-0', 'scale-100'],
                    exitClasses: ['opacity-0', '-translate-x-8', 'blur-md', 'scale-95'],
                    exitRemoveClasses: ['opacity-100', 'translate-x-0', 'scale-100']
                };
                
            case 'from-top':
                return {
                    initialClasses: 'opacity-0 -translate-y-8 blur-md scale-95',
                    finalClasses: 'opacity-100 translate-y-0 scale-100',
                    initialPosition: { left: `${targetPos.x}px`, top: `-50px` },
                    finalPosition: { top: `${targetPos.y}px` },
                    removeClasses: ['opacity-0', '-translate-y-8', 'blur-md', 'scale-95'],
                    addClasses: ['opacity-100', 'translate-y-0', 'scale-100'],
                    exitClasses: ['opacity-0', '-translate-y-8', 'blur-md', 'scale-95'],
                    exitRemoveClasses: ['opacity-100', 'translate-y-0', 'scale-100']
                };
                
            case 'from-bottom':
                return {
                    initialClasses: 'opacity-0 translate-y-8 blur-md scale-95',
                    finalClasses: 'opacity-100 translate-y-0 scale-100',
                    initialPosition: { left: `${targetPos.x}px`, top: `${sectionHeight}px` },
                    finalPosition: { top: `${targetPos.y}px` },
                    removeClasses: ['opacity-0', 'translate-y-8', 'blur-md', 'scale-95'],
                    addClasses: ['opacity-100', 'translate-y-0', 'scale-100'],
                    exitClasses: ['opacity-0', 'translate-y-8', 'blur-md', 'scale-95'],
                    exitRemoveClasses: ['opacity-100', 'translate-y-0', 'scale-100']
                };
                
            default:
                // fallback a from-bottom
                return this.getAnimationConfig(targetPos, sectionWidth, sectionHeight, isMobile);
        }
    }

    originalRandomPosition(width, height) {
        const sectionRect = this.section.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;
        const margin = 5;
        let attempts = 0, maxAttempts = 100; // Aumentamos los intentos

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
        
        // Si no encontramos posición libre, usamos una posición basada en el número de elementos activos
        const fallbackPositions = this.generateFallbackPositions(width, height, isMobile);
        const positionIndex = this.activeRects.length % fallbackPositions.length;
        return fallbackPositions[positionIndex];
    }

    // Genera posiciones de respaldo para evitar solapamientos
    generateFallbackPositions(width, height, isMobile) {
        const sectionRect = this.section.getBoundingClientRect();
        const margin = 10;
        const positions = [];
        
        if (isMobile) {
            // Para mobile: distribución en cuadrícula 2x3
            const cols = 2;
            const rows = 3;
            const cellWidth = (sectionRect.width - margin * 2) / cols;
            const cellHeight = (sectionRect.height - margin * 2) / rows;
            
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    positions.push({
                        x: margin + col * cellWidth + (cellWidth - width) / 2,
                        y: margin + row * cellHeight + (cellHeight - height) / 2
                    });
                }
            }
        } else {
            // Para desktop: distribución en cuadrícula 3x2
            const cols = 3;
            const rows = 2;
            const cellWidth = (sectionRect.width - margin * 2) / cols;
            const cellHeight = (sectionRect.height - margin * 2) / rows;
            
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    positions.push({
                        x: margin + col * cellWidth + (cellWidth - width) / 2,
                        y: margin + row * cellHeight + (cellHeight - height) / 2
                    });
                }
            }
        }
        
        return positions;
    }

    // Función mejorada para decrypt con diferentes direcciones
    decryptTextStepByStep(targetText, element) {
        const direction = this.decryptDirection;
        let revealOrder = [];
        
        // Determinar el orden de revelado según la dirección
        switch (direction) {
            case 'left-to-right':
                revealOrder = Array.from({ length: targetText.length }, (_, i) => i);
                break;
                
            case 'right-to-left':
                revealOrder = Array.from({ length: targetText.length }, (_, i) => targetText.length - 1 - i);
                break;
                
            case 'center-out':
                const center = Math.floor(targetText.length / 2);
                revealOrder = [center];
                for (let i = 1; i <= center; i++) {
                    if (center - i >= 0) revealOrder.push(center - i);
                    if (center + i < targetText.length) revealOrder.push(center + i);
                }
                break;
                
            case 'random':
                revealOrder = Array.from({ length: targetText.length }, (_, i) => i);
                // Mezclar aleatoriamente usando Fisher-Yates
                for (let i = revealOrder.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [revealOrder[i], revealOrder[j]] = [revealOrder[j], revealOrder[i]];
                }
                break;
                
            default:
                revealOrder = Array.from({ length: targetText.length }, (_, i) => i);
        }

        let currentText = Array.from(targetText).map(() => this.randomChar());
        let step = 0;
        
        const interval = setInterval(() => {
            if (step < revealOrder.length) {
                const indexToReveal = revealOrder[step];
                currentText[indexToReveal] = targetText[indexToReveal];
                
                // Actualizar caracteres no revelados con nuevos caracteres aleatorios
                for (let i = 0; i < currentText.length; i++) {
                    if (!revealOrder.slice(0, step + 1).includes(i)) {
                        currentText[i] = this.randomChar();
                    }
                }
                
                element.innerText = currentText.join('');
                step++;
            } else {
                clearInterval(interval);
                element.innerText = targetText;
            }
        }, 100);
    }

    showTextLoop() {
        const text = this.getNextText();
        const textElement = document.createElement("div");
        const isMobile = window.innerWidth < 768;

        // Obtener posición objetivo primero
        const targetPos = this.getValidPosition(300, 50);
        const sectionWidth = this.section.offsetWidth;
        const sectionHeight = this.section.offsetHeight;
        
        // Obtener configuración de animación
        const config = this.getAnimationConfig(targetPos, sectionWidth, sectionHeight, isMobile);

        textElement.className = `
            text-black dark:text-white text-lg font-mono animated-text
            ${config.initialClasses}
            transition-all duration-[1500ms] pointer-events-none
        `.trim();

        textElement.style.position = "absolute";

        const elementId = Date.now() + Math.random();
        textElement.dataset.elementId = elementId;

        // Aplicar posición inicial según configuración
        textElement.style.left = config.initialPosition.left;
        textElement.style.top = config.initialPosition.top;

        textElement.innerText = Array.from(text).map(() => this.randomChar()).join("");
        this.section.appendChild(textElement);

        const rectData = { 
            x: targetPos.x, 
            y: targetPos.y, 
            width: 300, 
            height: 50, 
            elementId: elementId,
            element: textElement 
        };
        this.activeRects.push(rectData);

        void textElement.offsetWidth;

        // Animar a la posición final
        if (config.finalPosition.left !== undefined) {
            textElement.style.left = config.finalPosition.left;
        }
        if (config.finalPosition.top !== undefined) {
            textElement.style.top = config.finalPosition.top;
        }
        
        textElement.classList.remove(...config.removeClasses);
        textElement.classList.add(...config.addClasses);

        setTimeout(() => {
            this.decryptTextStepByStep(text, textElement);
        }, 300);

        setTimeout(() => {
            textElement.classList.add(...config.exitClasses);
            textElement.classList.remove(...config.exitRemoveClasses);
            
            setTimeout(() => {
                if (textElement.parentNode) {
                    textElement.remove();
                    this.activeRects = this.activeRects.filter(
                        rect => rect.elementId !== elementId
                    );
                }
            }, 2000);
        }, 10000);
    }

    startTextLoop() {
        if (this.interval) return;
        clearInterval(this.interval);
        this.interval = null;
    
        setTimeout(() => {
            this.showTextLoop();
            this.interval = setInterval(() => this.showTextLoop(), 2000);
        }, 100);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    // Método para cambiar la dirección dinámicamente
    setDecryptDirection(direction) {
        const validDirections = ['left-to-right', 'right-to-left', 'center-out', 'random'];
        if (validDirections.includes(direction)) {
            this.decryptDirection = direction;
        } else {
            console.warn(`Dirección inválida: ${direction}. Usa: ${validDirections.join(', ')}`);
        }
    }

    // Método para cambiar la dirección de animación mobile dinámicamente
    setMobileAnimationDirection(direction) {
        const validDirections = ['from-right', 'from-left', 'from-top', 'from-bottom'];
        if (validDirections.includes(direction)) {
            this.mobileAnimationDirection = direction;
        } else {
            console.warn(`Dirección mobile inválida: ${direction}. Usa: ${validDirections.join(', ')}`);
        }
    }

    // Método para cambiar la dirección de animación desktop dinámicamente
    setDesktopAnimationDirection(direction) {
        const validDirections = ['from-right', 'from-left', 'from-top', 'from-bottom'];
        if (validDirections.includes(direction)) {
            this.desktopAnimationDirection = direction;
        } else {
            console.warn(`Dirección desktop inválida: ${direction}. Usa: ${validDirections.join(', ')}`);
        }
    }
}
