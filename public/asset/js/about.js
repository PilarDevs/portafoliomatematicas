// About Page - Toggle functionality
function initAboutToggle() {
    setTimeout(() => {
        const toggleBtns = document.querySelectorAll('.about-toggle-btn');
        const views = document.querySelectorAll('.about-view');

        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetView = btn.getAttribute('data-view');

                // Remove active class from all buttons
                toggleBtns.forEach(b => {
                    b.classList.remove('active');
                    b.classList.add('text-gray-500');
                    b.classList.remove('text-gray-200');
                });

                // Add active class to clicked button
                btn.classList.add('active');
                btn.classList.remove('text-gray-500');
                btn.classList.add('text-gray-200');

                // Hide all views
                views.forEach(view => {
                    view.classList.remove('active');
                });

                // Show target view
                const targetElement = document.getElementById(`${targetView}-view`);
                if (targetElement) {
                    targetElement.classList.add('active');
                }

                // Re-trigger animations
                setTimeout(() => {
                    if (targetView === 'personal') {
                        animatePersonalView();
                    } else {
                        animateGrupalView();
                    }
                }, 100);
            });
        });
    }, 500);
}

function animatePersonalView() {
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach((item, index) => {
        item.style.animation = 'none';
        setTimeout(() => {
            item.style.animation = `slideInLeft 0.6s ease forwards`;
        }, index * 200);
    });
}

function animateGrupalView() {
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card, index) => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = `fadeInUp 0.6s ease forwards`;
        }, index * 150);
    });

    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = `scaleIn 0.5s ease forwards`;
        }, (teamCards.length * 150) + (index * 100));
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAboutToggle);
} else {
    initAboutToggle();
}
