// Theme switcher
const initTheme = () => {
    const themeToggle = document.createElement('button');
    themeToggle.classList.add('theme-toggle');
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDark = localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark);
    const setTheme = (dark) => {
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
        isDark = dark;
    };
    themeToggle.addEventListener('click', () => setTheme(!isDark));
    setTheme(isDark);
    document.querySelector('.nav-links')?.appendChild(themeToggle);
};
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
// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSmoothScroll();
});