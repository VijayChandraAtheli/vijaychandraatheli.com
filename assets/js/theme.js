/* ==========================================================================
   VIJAY'S JOURNAL - JAVASCRIPT
   Dark mode toggle + Reading progress + Sticky header
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
       STICKY HEADER (Compact on Scroll)
       ========================================================================== */
    
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    const scrollThreshold = 100; // Pixels scrolled before header becomes sticky
    
    function handleStickyHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            // User has scrolled down past threshold
            header.classList.add('sticky');
        } else {
            // User is at the top
            header.classList.remove('sticky');
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', handleStickyHeader);
    
    // Check on page load
    window.addEventListener('load', handleStickyHeader);

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
    
    // Update on resize
    window.addEventListener('resize', updateProgressBar);

    /* ==========================================================================
       SMOOTH SCROLL TO TOP
       ========================================================================== */
    
    // Keyboard shortcut: Press 'T' to scroll to top
    document.addEventListener('keydown', function(e) {
        if (e.key === 't' || e.key === 'T') {
            // Don't trigger if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    /* ==========================================================================
       EXTERNAL LINKS
       ========================================================================== */
    
    document.addEventListener('DOMContentLoaded', function() {
        // Open external links in new tab
        const links = document.querySelectorAll('a[href^="http"]');
        
        links.forEach(link => {
            if (link.hostname === window.location.hostname) return;
            
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
    });

    /* ==========================================================================
       IMAGE LAZY LOADING
       ========================================================================== */
    
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    });

    /* ==========================================================================
       PRINT STYLES
       ========================================================================== */
    
    // Remove dark mode and sticky header when printing
    window.addEventListener('beforeprint', function() {
        document.body.classList.remove('dark-mode');
        if (header) header.classList.remove('sticky');
    });
    
    window.addEventListener('afterprint', function() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
        // Re-check sticky state after print
        handleStickyHeader();
    });

})();