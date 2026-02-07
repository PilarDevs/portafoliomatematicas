// Animation utilities
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .skill-item');
        animatedElements.forEach(el => observer.observe(el));
        initInteractiveBackgrounds();
        initBinaryRain();
    }, 500);
}

function initBinaryRain() {
    const heroSection = document.getElementById('home');
    const container = document.getElementById('binary-rain');
    
    if (!heroSection || !container) return;

    let throttle = false;

    heroSection.addEventListener('mousemove', (e) => {
        if (throttle) return;
        throttle = true;
        setTimeout(() => throttle = false, 50);

        // Create binary digit
        const digit = document.createElement('div');
        digit.className = 'binary-drop';
        digit.textContent = Math.random() > 0.5 ? '1' : '0';
        
        // Calculate position relative to the hero section
        const rect = heroSection.getBoundingClientRect();
        // Randomize position slightly around cursor
        const offsetX = (Math.random() - 0.5) * 40; // +/- 20px spread
        const x = e.clientX - rect.left + offsetX;
        const y = e.clientY - rect.top;

        digit.style.left = `${x}px`;
        digit.style.top = `${y}px`;
        
        // Random size (smaller as requested)
        const size = Math.random() * 8 + 10; // 10px to 18px
        digit.style.fontSize = `${size}px`;
        // Random duration for variety
        digit.style.animationDuration = `${Math.random() * 1 + 1}s`;

        container.appendChild(digit);

        // Remove after animation
        digit.addEventListener('animationend', () => {
            digit.remove();
        });
    });
}

function initInteractiveBackgrounds() {
    const backgrounds = document.querySelectorAll('.interactive-bg');

    if (backgrounds.length === 0) return;

    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        backgrounds.forEach(bg => {
            // Check visibility to optimize
            const rect = bg.parentElement.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;

            const moveX = (clientX - centerX) * 0.015; 
            const moveY = (clientY - centerY) * 0.015;

            bg.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        });
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Counter animation
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Parallax effect
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Text typing effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Reveal on scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('[data-reveal]');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
