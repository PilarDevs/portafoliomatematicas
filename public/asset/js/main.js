// Module Loader
class ModuleLoader {
    constructor() {
        this.modules = [
            { id: 'navbar-module', path: './modules/navbar.html' },
            { id: 'hero-module', path: './modules/hero.html' },
            { id: 'mission-module', path: './modules/mission.html' },
            { id: 'footer-module', path: './modules/footer.html' }
        ];
    }

    async loadModule(containerId, modulePath) {
        try {
            const response = await fetch(modulePath);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;
            }
        } catch (error) {
            console.error(`Error loading module ${modulePath}:`, error);
        }
    }

    async loadAllModules() {
        const promises = this.modules.map(module => 
            this.loadModule(module.id, module.path)
        );
        await Promise.all(promises);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const loader = new ModuleLoader();
    await loader.loadAllModules();
    
    // Initialize all components after modules are loaded
    initNavbar();
    initScrollEffects();
    initMissionTabs();
    initScrollToTop();
    initAnimations();
    makeFriendlyUrl();
});

function makeFriendlyUrl() {
    if (window.location.protocol !== 'file:') {
        const path = window.location.pathname;
        if (path.endsWith('.html') && path !== '/index.html') {
            const newPath = path.slice(0, -5);
            window.history.replaceState(null, '', newPath);
        }
    }
}
