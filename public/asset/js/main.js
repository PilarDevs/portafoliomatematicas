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
    // Start loader immediately
    initLoader();

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

async function initLoader() {
    const loader = document.getElementById('loader');
    const pageContent = document.getElementById('page-content');
    
    if (!loader) return;

    // Check if intro has already been played in this session
    if (sessionStorage.getItem('introPlayed')) {
        loader.classList.add('hidden'); // Ensure it's hidden immediately
        loader.style.display = 'none';
        document.body.classList.remove('loading-active');
        if (pageContent) {
            document.body.classList.add('content-zoom-in');
            pageContent.classList.remove('opacity-0');
        }
        return;
    }

    const textToType = "PilarDevs...";
    const typingElement = document.getElementById('typing-text');
    
    if (!typingElement) return;

    // Wait a bit before starting
    await new Promise(resolve => setTimeout(resolve, 500));

    // Typing animation
    for (let i = 0; i <= textToType.length; i++) {
        typingElement.textContent = textToType.slice(0, i);
        // Random typing speed for realism
        const speed = 50 + Math.random() * 100;
        await new Promise(resolve => setTimeout(resolve, speed));
    }

    // Blink cursor at full text
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Deleting animation (backspace)
    for (let i = textToType.length; i >= 0; i--) {
        typingElement.textContent = textToType.slice(0, i);
        const speed = 30 + Math.random() * 50; // Faster deleting
        await new Promise(resolve => setTimeout(resolve, speed));
    }

    // Trigger Animations: Break into squares
    createShatterGrid(loader);
    
    // Zoom in content shortly after squares start moving
    setTimeout(() => {
        document.body.classList.add('content-zoom-in');
        if (pageContent) pageContent.classList.remove('opacity-0');
        document.body.classList.remove('loading-active');
    }, 100);
    
    // Mark as played
    sessionStorage.setItem('introPlayed', 'true');

    // Cleanup DOM after transition
    setTimeout(() => {
        loader.remove();
    }, 1200);
}

function createShatterGrid(loaderContainer) {
    // 1. Clear existing content of loader (text etc)
    loaderContainer.innerHTML = '';
    
    // 2. Remove the background color class to allow transparency
    loaderContainer.classList.remove('bg-gray-900');
    loaderContainer.style.backgroundColor = 'transparent';

    // 3. Create grid container
    const grid = document.createElement('div');
    grid.className = 'shatter-grid';
    
    // 4. Create cells (10x10 = 100 cells)
    const columns = 10;
    const rows = 10;
    
    for (let i = 0; i < columns * rows; i++) {
        const cell = document.createElement('div');
        cell.className = 'shatter-cell';
        
        // Calculate random explosion values
        // Smoother, less chaotic velocity
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 150; // Reduced speed/distance
        const tx = Math.cos(angle) * velocity + 'px';
        const ty = Math.sin(angle) * velocity + 'px';
        const rotation = (Math.random() - 0.5) * 90 + 'deg'; // Less spin (was 720)
        
        cell.style.setProperty('--tx', tx);
        cell.style.setProperty('--ty', ty);
        cell.style.setProperty('--r', rotation);
        
        // Add random slight delay for organic feel
        cell.style.animationDelay = Math.random() * 0.3 + 's';

        grid.appendChild(cell);
    }
    
    loaderContainer.appendChild(grid);

    // 5. Trigger animation on next frame to ensure DOM is ready
    requestAnimationFrame(() => {
        const cells = grid.querySelectorAll('.shatter-cell');
        cells.forEach(cell => {
            cell.classList.add('exploding');
        });
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
