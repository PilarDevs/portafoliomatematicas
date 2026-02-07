// Portfolio filter functionality
function initPortfolioFilter() {
    setTimeout(() => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => {
                    b.classList.remove('active', 'bg-blue-600', 'text-white');
                    b.classList.add('bg-gray-200', 'text-gray-700');
                });

                // Add active class to clicked button
                btn.classList.add('active', 'bg-blue-600', 'text-white');
                btn.classList.remove('bg-gray-200', 'text-gray-700');

                // Get filter value
                const filterValue = btn.getAttribute('data-filter');

                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.classList.add('show');
                        item.classList.remove('hide');
                    } else {
                        item.style.display = 'none';
                        item.classList.add('hide');
                        item.classList.remove('show');
                    }
                });
            });
        });
    }, 500);
}
