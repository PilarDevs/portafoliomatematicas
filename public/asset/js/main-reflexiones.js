import { ReflexionesManager } from './reflexiones.js';
import { activityLinks } from './activity_links.js';

class ModuleLoader {
    constructor() {
        this.modules = [
            { id: 'navbar-module', path: './modules/navbar.html' },
            { id: 'reflexiones-module', path: './modules/reflexiones.html' },
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

// Global function needed for navbar (if used there)
window.handleWeekSelection = function(week) {
    console.log("Week selected:", week);
    // Logic if we want to filter reflexiones by week could go here
};

document.addEventListener('DOMContentLoaded', async () => {
    const loader = new ModuleLoader();
    await loader.loadAllModules();
    
    // Initialize components
    if (window.initNavbar) window.initNavbar();
    
    // Apply activity links
    applyActivityLinks();

    // Initialize Reflexiones logic
    new ReflexionesManager();
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
