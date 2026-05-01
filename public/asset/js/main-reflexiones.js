import { ReflexionesManager } from './reflexiones.js';
import { activityLinks, GROUP_NAME } from './activity_links.js';

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
    applyGroupName();

    // Initialize Reflexiones logic
    new ReflexionesManager();
});

function applyGroupName() {
    document.querySelectorAll('[data-group-name]').forEach(el => {
        el.textContent = GROUP_NAME;
    });
}

window.openDespedida = function() {
    const modal = document.getElementById('despedida-modal');
    if (!modal) return;
    // Move to <body> so fixed positioning is always viewport-relative
    if (modal.parentElement !== document.body) {
        document.body.appendChild(modal);
    }
    modal.classList.remove('hidden');

    const titulo = document.getElementById('despedida-titulo');
    const body   = document.getElementById('despedida-body');
    if (!titulo) return;

    if (body) { body.style.opacity = '0'; body.style.transition = ''; }

    const fullText = titulo.dataset.text || 'Para Nuestro Profesor';
    titulo.textContent = '';
    titulo.style.borderRight = '2px solid #f472b6';

    let i = 0;
    const iv = setInterval(() => {
        titulo.textContent += fullText[i++];
        if (i >= fullText.length) {
            clearInterval(iv);
            setTimeout(() => { titulo.style.borderRight = 'none'; }, 600);
            if (body) {
                setTimeout(() => {
                    body.style.transition = 'opacity 1.2s ease';
                    body.style.opacity = '1';
                }, 400);
            }
        }
    }, 70);
};

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
