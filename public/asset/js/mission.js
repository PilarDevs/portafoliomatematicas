// Mission Section - Tab functionality
function initMissionTabs() {
    setTimeout(() => {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');

                // Remove active class from all buttons
                tabBtns.forEach(b => {
                    b.classList.remove('active', 'bg-gray-700', 'text-gray-200');
                    b.classList.add('text-gray-500');
                });

                // Add active class to clicked button
                btn.classList.add('active', 'bg-gray-700', 'text-gray-200');
                btn.classList.remove('text-gray-500');

                // Hide all tab contents
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });

                // Show target tab content
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }, 500);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMissionTabs);
} else {
    initMissionTabs();
}
