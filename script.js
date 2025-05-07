// JavaScript for SphereLab website

// This file is currently empty but can be used for:
// - Adding animations
// - Handling form submissions
// - Creating interactive elements
// - Implementing a responsive menu for mobile
// - Loading dynamic content

document.addEventListener('DOMContentLoaded', function() {
    console.log('SphereLab website loaded successfully');
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.className = savedTheme;
    }
    
    // Handle theme toggle click
    themeToggle.addEventListener('click', () => {
        if (document.documentElement.classList.contains('light-mode')) {
            document.documentElement.classList.remove('light-mode');
            document.documentElement.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });
    
    // Simple animations for the welcome text and logo
    const welcomeText = document.querySelector('.welcome-text');
    const logoContainer = document.querySelector('.logo-container');
    
    // Add classes to trigger CSS animations
    setTimeout(() => {
        if (welcomeText) {
            welcomeText.style.opacity = '1';
            welcomeText.style.transform = 'translateY(0)';
        }
    }, 300);
    
    setTimeout(() => {
        if (logoContainer) {
            logoContainer.style.opacity = '1';
            logoContainer.style.transform = 'scale(1)';
        }
    }, 600);
    
    // Initialize logo position after its animation completes
    setTimeout(() => {
        if (logoContainer) {
            // Add the logo-animated class to change transition behavior
            logoContainer.classList.add('logo-animated');
            logoContainer.dataset.initialTransform = 'scale(1)';
        }
    }, 1200);
    
    // Background and logo parallax effect
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Move background shape - larger movement
        const shape = document.querySelector('.background-shape');
        if (shape) {
            shape.style.transform = `rotate(42deg) translate(${x * 30}px, ${y * 30}px)`;
        }
        
        // Move logo - smaller movement in opposite direction for enhanced depth effect
        if (logoContainer && logoContainer.dataset.initialTransform) {
            const initialTransform = logoContainer.dataset.initialTransform;
            logoContainer.style.transform = `${initialTransform} translate(${x * -15}px, ${y * -15}px)`;
        }
    });
}); 