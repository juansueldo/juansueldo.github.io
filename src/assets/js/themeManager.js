export class ThemeManager {
    constructor(options = {}) {
        // Configuración por defecto
        this.config = {
            themeToggleId: 'theme-toggle',
            themeDropdownId: 'theme-dropdown',
            langToggleId: 'lang-toggle',
            langDropdownId: 'lang-dropdown',
            themeButtonSelector: '[data-theme]',
            langButtonSelector: '[data-lang]',
            defaultTheme: 'system',
            defaultLang: 'es',
            storageKeys: {
                theme: 'theme',
                lang: 'language'
            },
            icons: {
                light: 'icon-light',
                dark: 'icon-dark',
                system: 'icon-system'
            },
            callbacks: {
                onThemeChange: null,
                onLanguageChange: null
            },
            ...options
        };

        this.elements = {};
        this.mediaQuery = null;
        this.isInitialized = false;

        // Auto-inicializar si el DOM está listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    /**
     * Inicializa la librería
     */
    init() {
        if (this.isInitialized) {
            console.warn('ThemeManager ya ha sido inicializado');
            return;
        }

        try {
            this.getElements();
            this.setupEventListeners();
            this.setupMediaQuery();
            this.applyStoredSettings();
            this.isInitialized = true;
            console.log('ThemeManager inicializado correctamente');
        } catch (error) {
            console.error('Error al inicializar ThemeManager:', error);
        }
    }

    /**
     * Obtiene las referencias de los elementos del DOM
     */
    getElements() {
        const requiredElements = [
            'themeToggleId',
            'themeDropdownId'
        ];

        requiredElements.forEach(key => {
            const elementId = this.config[key];
            const element = document.getElementById(elementId);
            if (!element) {
                throw new Error(`Elemento requerido no encontrado: ${elementId}`);
            }
            this.elements[key] = element;
        });

        // Elementos opcionales
        this.elements.langToggle = document.getElementById(this.config.langToggleId);
        this.elements.langDropdown = document.getElementById(this.config.langDropdownId);
        
        // Botones de tema y idioma
        this.elements.themeButtons = document.querySelectorAll(this.config.themeButtonSelector);
        this.elements.langButtons = document.querySelectorAll(this.config.langButtonSelector);

        // Iconos de tema
        this.elements.icons = {};
        Object.entries(this.config.icons).forEach(([theme, iconId]) => {
            this.elements.icons[theme] = document.getElementById(iconId);
        });
    }

    /**
     * Configura todos los event listeners
     */
    setupEventListeners() {
        // Toggle de tema - CORREGIDO: usar la referencia correcta del elemento
        this.elements.themeToggleId.addEventListener('click', (e) => this.handleThemeToggle(e));

        // Toggle de idioma (si existe)
        if (this.elements.langToggle) {
            this.elements.langToggle.addEventListener('click', (e) => this.handleLanguageToggle(e));
        }

        // Botones de tema
        this.elements.themeButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleThemeSelect(e));
        });

        // Botones de idioma
        this.elements.langButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleLanguageSelect(e));
        });

        // Click fuera para cerrar dropdowns
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Tecla Escape para cerrar dropdowns
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
            }
        });
    }

    /**
     * Configura el media query para detectar cambios en el tema del sistema
     */
    setupMediaQuery() {
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.mediaQuery.addEventListener('change', () => {
            if (this.getCurrentTheme() === 'system') {
                this.applyTheme('system');
            }
        });
    }

    /**
     * Aplica la configuración almacenada
     */
    applyStoredSettings() {
        const storedTheme = this.getCurrentTheme();
        const storedLang = this.getCurrentLanguage();
        
        this.applyTheme(storedTheme);
        if (this.elements.langButtons.length > 0) {
            this.applyLanguage(storedLang);
        }
    }

    /**
     * Maneja el click en el toggle de tema
     */
    handleThemeToggle(e) {
        e.stopPropagation();
        this.closeLanguageDropdown();
        this.toggleDropdown(this.elements.themeDropdownId);
    }

    /**
     * Maneja el click en el toggle de idioma
     */
    handleLanguageToggle(e) {
        e.stopPropagation();
        this.closeThemeDropdown();
        this.toggleDropdown(this.elements.langDropdown);
    }

    /**
     * Maneja la selección de tema
     */
    handleThemeSelect(e) {
        const theme = e.currentTarget.getAttribute('data-theme');
        if (theme) {
            this.setTheme(theme);
            this.closeThemeDropdown();
        }
    }

    /**
     * Maneja la selección de idioma
     */
    handleLanguageSelect(e) {
        const lang = e.currentTarget.getAttribute('data-lang');
        if (lang) {
            this.setLanguage(lang);
            this.closeLanguageDropdown();
        }
    }

    /**
     * Maneja clicks fuera de los dropdowns
     */
    handleOutsideClick(e) {
        if (!this.elements.themeDropdownId.contains(e.target) && 
            !this.elements.themeToggleId.contains(e.target)) {
            this.closeThemeDropdown();
        }

        if (this.elements.langDropdown && this.elements.langToggle &&
            !this.elements.langDropdown.contains(e.target) && 
            !this.elements.langToggle.contains(e.target)) {
            this.closeLanguageDropdown();
        }
    }

    /**
     * Obtiene el tema actual del localStorage
     */
    getCurrentTheme() {
        // CORREGIDO: Verificar si localStorage está disponible
        if (typeof localStorage === 'undefined') {
            return this.config.defaultTheme;
        }
        return localStorage.getItem(this.config.storageKeys.theme) || this.config.defaultTheme;
    }

    /**
     * Obtiene el idioma actual del localStorage
     */
    getCurrentLanguage() {
        // CORREGIDO: Verificar si localStorage está disponible
        if (typeof localStorage === 'undefined') {
            return this.config.defaultLang;
        }
        return localStorage.getItem(this.config.storageKeys.lang) || this.config.defaultLang;
    }

    /**
     * Establece y aplica un tema
     */
    setTheme(theme) {
        if (!['light', 'dark', 'system'].includes(theme)) {
            console.error(`Tema no válido: ${theme}`);
            return;
        }
        
        this.applyTheme(theme);
        
        // Ejecutar callback si existe
        if (typeof this.config.callbacks.onThemeChange === 'function') {
            this.config.callbacks.onThemeChange(theme);
        }
    }

    /**
     * Aplica el tema al documento
     */
    applyTheme(theme) {
        const html = document.documentElement;
        
        // CORREGIDO: Lógica simplificada y más clara
        if (theme === 'dark') {
            html.classList.add('dark');
        } else if (theme === 'light') {
            html.classList.remove('dark');
        } else if (theme === 'system') {
            // Verificar la preferencia del sistema
            const prefersDark = this.mediaQuery ? this.mediaQuery.matches : 
                               window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (prefersDark) {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
        }

        this.updateThemeIcons(theme);
        this.updateActiveThemeButton(theme);
        
        // CORREGIDO: Verificar si localStorage está disponible antes de usarlo
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.config.storageKeys.theme, theme);
        }
        
        console.log(`Tema aplicado: ${theme}, Clase dark: ${html.classList.contains('dark')}`);
    }

    /**
     * Actualiza los iconos de tema visibles
     */
    updateThemeIcons(theme) {
        // Ocultar todos los iconos
        Object.values(this.elements.icons).forEach(icon => {
            if (icon) icon.classList.add('hidden');
        });

        // Mostrar el icono del tema actual
        const currentIcon = this.elements.icons[theme];
        if (currentIcon) {
            currentIcon.classList.remove('hidden');
        }
    }

    /**
     * Actualiza el botón de tema activo
     */
    updateActiveThemeButton(theme) {
        this.elements.themeButtons.forEach(button => {
            const isActive = button.getAttribute('data-theme') === theme;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', isActive.toString());
        });
    }

    /**
     * Establece y aplica un idioma
     */
    setLanguage(lang) {
        this.applyLanguage(lang);
        
        // Ejecutar callback si existe
        if (typeof this.config.callbacks.onLanguageChange === 'function') {
            this.config.callbacks.onLanguageChange(lang);
        }
    }

    /**
     * Aplica el idioma
     */
    applyLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        this.updateActiveLanguageButton(lang);
        
        // CORREGIDO: Verificar si localStorage está disponible
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.config.storageKeys.lang, lang);
        }
    }

    /**
     * Actualiza el botón de idioma activo
     */
    updateActiveLanguageButton(lang) {
        this.elements.langButtons.forEach(button => {
            const isActive = button.getAttribute('data-lang') === lang;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', isActive.toString());
        });
    }

    /**
     * Alterna la visibilidad de un dropdown
     */
    toggleDropdown(dropdown) {
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }

    /**
     * Cierra el dropdown de tema
     */
    closeThemeDropdown() {
        this.elements.themeDropdownId.classList.add('hidden');
    }

    /**
     * Cierra el dropdown de idioma
     */
    closeLanguageDropdown() {
        if (this.elements.langDropdown) {
            this.elements.langDropdown.classList.add('hidden');
        }
    }

    /**
     * Cierra todos los dropdowns
     */
    closeAllDropdowns() {
        this.closeThemeDropdown();
        this.closeLanguageDropdown();
    }

    /**
     * Obtiene el estado actual
     */
    getState() {
        return {
            theme: this.getCurrentTheme(),
            language: this.getCurrentLanguage(),
            isInitialized: this.isInitialized,
            isDarkMode: document.documentElement.classList.contains('dark')
        };
    }

    /**
     * Actualiza la configuración
     */
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }

    /**
     * Destruye la instancia y limpia los event listeners
     */
    destroy() {
        // Remover event listeners
        if (this.mediaQuery) {
            this.mediaQuery.removeEventListener('change', this.setupMediaQuery);
        }

        // Limpiar referencias
        this.elements = {};
        this.mediaQuery = null;
        this.isInitialized = false;

        console.log('ThemeManager destruido');
    }

    /**
     * NUEVO: Método para forzar el tema claro (útil para debugging)
     */
    forceLight() {
        document.documentElement.classList.remove('dark');
        console.log('Forzado tema claro');
    }

    /**
     * NUEVO: Método para forzar el tema oscuro (útil para debugging)
     */
    forceDark() {
        document.documentElement.classList.add('dark');
        console.log('Forzado tema oscuro');
    }

    /**
     * Método estático para crear una instancia con configuración por defecto
     */
    static create(options = {}) {
        return new ThemeManager(options);
    }
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
    window.ThemeManager = ThemeManager;
}