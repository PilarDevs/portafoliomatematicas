import { activityLinks } from './activity_links.js';

// Module Loader for About Page
class ModuleLoader {
    constructor() {
        this.modules = [
            { id: 'navbar-module', path: './modules/navbar.html' },
            { id: 'about-module', path: './modules/about.html' },
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
    
    // Initialize components
    initNavbar();
    initScrollEffects();
    initScrollToTop();
    initAnimations();
    initAboutToggle();
    makeFriendlyUrl();
    applyActivityLinks();
});

function applyActivityLinks() {
    // Find all links in the navbar
    const links = document.querySelectorAll('.navbar a');
    
    links.forEach(link => {
        const text = link.textContent.trim();
        // Check if this link text exists in our config
        if (activityLinks[text]) {
            link.href = activityLinks[text];
            // Optional: Open in new tab if it's an external link
            if (activityLinks[text].startsWith('http')) {
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
        }
    });
}

function makeFriendlyUrl() {
    if (window.location.protocol !== 'file:') {
        const path = window.location.pathname;
        if (path.endsWith('.html') && path !== '/index.html') {
            const newPath = path.slice(0, -5);
            window.history.replaceState(null, '', newPath);
        }
    }
}
