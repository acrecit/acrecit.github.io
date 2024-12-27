// Smooth scroll for anchor links
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth' });
        });
    });
};

// Mobile menu toggle
const initMobileMenu = () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar-left');
    
    if (!menuToggle || !sidebar) {
        console.error('Mobile menu elements not found');
        return;
    }

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
        console.log('Toggle clicked', sidebar.classList.contains('active'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(target) && 
            target !== menuToggle) {
            sidebar.classList.remove('active');
        }
    });

    // Prevent clicks inside sidebar from closing it
    sidebar.addEventListener('click', (e) => {
        e.stopPropagation();
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing mobile menu');
    initSmoothScroll();
    initMobileMenu();
});