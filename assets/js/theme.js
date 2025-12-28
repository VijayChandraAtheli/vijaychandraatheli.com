/* ==========================================================================
   VIJAY'S JOURNAL - JAVASCRIPT
   Dark mode toggle + Reading progress bar
   ========================================================================== */

(function() {
    'use strict';

    /* ==========================================================================
       DARK MODE TOGGLE
       ========================================================================== */
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply theme on page load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon('dark');
    }
    
    // Toggle theme function
    window.toggleTheme = function() {
        const body = document.body;
        const isDark = body.classList.toggle('dark-mode');
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Update icon
        updateThemeIcon(isDark ? 'dark' : 'light');
    };
    
    // Update theme icon
    function updateThemeIcon(theme) {
        const icon = document.getElementById('themeIcon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    /* ==========================================================================
       READING PROGRESS BAR
       ========================================================================== */
    
    function updateProgressBar() {
        const progressBar = document.getElementById('progressBar');
        if (!progressBar) return;
        
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateProgressBar);
    
    // Update on page load
    window.addEventListener('load', updateProgressBar);
    
    // Update on resize (in case content height changes)
    window.addEventListener('resize', updateProgressBar);

    /* ==========================================================================
       SMOOTH SCROLL TO TOP (Optional enhancement)
       ========================================================================== */
    
    // Add keyboard shortcut: Press 'T' to scroll to top
    document.addEventListener('keydown', function(e) {
        if (e.key === 't' || e.key === 'T') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    /* ==========================================================================
       EXTERNAL LINKS (Open in new tab)
       ========================================================================== */
    
    document.addEventListener('DOMContentLoaded', function() {
        // Find all external links
        const links = document.querySelectorAll('a[href^="http"]');
        
        links.forEach(link => {
            // Skip if it's an internal link
            if (link.hostname === window.location.hostname) return;
            
            // Add target blank and rel attributes
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
    });

    /* ==========================================================================
       IMAGE LAZY LOADING FALLBACK
       ========================================================================== */
    
    // Add loading="lazy" to images that don't have it
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    });

    /* ==========================================================================
       PRINT STYLES TRIGGER
       ========================================================================== */
    
    // Remove dark mode when printing
    window.addEventListener('beforeprint', function() {
        document.body.classList.remove('dark-mode');
    });
    
    window.addEventListener('afterprint', function() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    });

})();