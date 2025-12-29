/* ==========================================================================
   VIJAY'S JOURNAL - JAVASCRIPT
   Fixed sticky header with no flickering + smooth scrolling
   ========================================================================== */

(function() {
    'use strict';

    /* ==========================================================================
       DARK MODE TOGGLE
       ========================================================================== */
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon('dark');
    }
    
    window.toggleTheme = function() {
        const body = document.body;
        const isDark = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark ? 'dark' : 'light');
    };
    
    function updateThemeIcon(theme) {
        const icon = document.getElementById('themeIcon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    /* ==========================================================================
       STICKY HEADER - SMOOTH IMPLEMENTATION
       ========================================================================== */
    
    const header = document.querySelector('header');
    if (!header) return; // Exit if no header found
    
    const scrollThreshold = 150; // Pixels before header becomes sticky
    let isSticky = false;
    let ticking = false;
    let headerPlaceholder = null;
    
    // Create placeholder element
    function createPlaceholder() {
        if (!headerPlaceholder) {
            headerPlaceholder = document.createElement('div');
            headerPlaceholder.className = 'header-placeholder';
            headerPlaceholder.style.display = 'none';
            header.parentNode.insertBefore(headerPlaceholder, header.nextSibling);
        }
    }
    
    // Handle sticky header with smooth transitions
    function handleStickyHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold && !isSticky) {
            // Make header sticky
            const headerHeight = header.offsetHeight;
            
            // Add placeholder to prevent jump
            createPlaceholder();
            headerPlaceholder.style.height = headerHeight + 'px';
            headerPlaceholder.style.display = 'block';
            
            // Add sticky class
            requestAnimationFrame(() => {
                header.classList.add('sticky');
                isSticky = true;
            });
            
        } else if (scrollTop <= scrollThreshold && isSticky) {
            // Remove sticky
            requestAnimationFrame(() => {
                header.classList.remove('sticky');
                isSticky = false;
                
                // Remove placeholder after transition
                setTimeout(() => {
                    if (headerPlaceholder) {
                        headerPlaceholder.style.display = 'none';
                    }
                }, 300); // Match CSS transition duration
            });
        }
        
        ticking = false;
    }
    
    // Debounced scroll handler using requestAnimationFrame
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(handleStickyHeader);
            ticking = true;
        }
    }
    
    // Listen for scroll
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Check on page load
    window.addEventListener('load', handleStickyHeader);

    /* ==========================================================================
       READING PROGRESS BAR
       ========================================================================== */
    
    let progressTicking = false;
    
    function updateProgressBar() {
        const progressBar = document.getElementById('progressBar');
        if (!progressBar) return;
        
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        
        progressBar.style.width = Math.min(scrolled, 100) + '%';
        progressTicking = false;
    }
    
    function onScrollProgress() {
        if (!progressTicking) {
            window.requestAnimationFrame(updateProgressBar);
            progressTicking = true;
        }
    }
    
    window.addEventListener('scroll', onScrollProgress, { passive: true });
    window.addEventListener('load', updateProgressBar);
    window.addEventListener('resize', updateProgressBar);

    /* ==========================================================================
       SMOOTH SCROLL TO TOP
       ========================================================================== */
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 't' || e.key === 'T') {
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
       PRINT HANDLING
       ========================================================================== */
    
    window.addEventListener('beforeprint', function() {
        document.body.classList.remove('dark-mode');
        if (header) header.classList.remove('sticky');
        if (headerPlaceholder) headerPlaceholder.style.display = 'none';
    });
    
    window.addEventListener('afterprint', function() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
        handleStickyHeader();
    });

})();