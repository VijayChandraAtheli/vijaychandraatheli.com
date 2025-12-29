/* ==========================================================================
   VIJAY'S JOURNAL - FIXED JAVASCRIPT
   Root cause fixes: timing, z-index, height measurement
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
       STICKY HEADER - ROOT CAUSE FIXED
       ========================================================================== */
    
    const header = document.querySelector('header');
    if (!header) return;
    
    const scrollThreshold = 120;
    let isSticky = false;
    let stickyTicking = false;
    const stickyHeaderHeight = 52; // Fixed compact header height in pixels
    
    // Create placeholder ONCE on page load
    const headerPlaceholder = document.createElement('div');
    headerPlaceholder.className = 'header-placeholder';
    headerPlaceholder.style.height = '0px';
    headerPlaceholder.style.transition = 'height 0.3s ease';
    header.parentNode.insertBefore(headerPlaceholder, header.nextSibling);
    
    function handleStickyHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold && !isSticky) {
            // Make header sticky
            isSticky = true;
            
            // Set placeholder to COMPACT header height (not full header!)
            headerPlaceholder.style.height = stickyHeaderHeight + 'px';
            
            // Add sticky class AFTER setting placeholder
            requestAnimationFrame(() => {
                header.classList.add('sticky');
            });
            
        } else if (scrollTop <= scrollThreshold && isSticky) {
            // Remove sticky
            isSticky = false;
            
            // Remove sticky class first
            header.classList.remove('sticky');
            
            // Then collapse placeholder after animation completes
            setTimeout(() => {
                headerPlaceholder.style.height = '0px';
            }, 350); // Slightly after animation (300ms) completes
        }
        
        stickyTicking = false;
    }
    
    function onStickyScroll() {
        if (!stickyTicking) {
            stickyTicking = true;
            window.requestAnimationFrame(handleStickyHeader);
        }
    }
    
    window.addEventListener('scroll', onStickyScroll, { passive: true });
    window.addEventListener('load', handleStickyHeader);

    /* ==========================================================================
       READING PROGRESS BAR - THROTTLED
       ========================================================================== */
    
    let progressTicking = false;
    let lastProgressUpdate = 0;
    const progressThrottle = 16; // ~60fps
    
    function updateProgressBar() {
        const now = Date.now();
        if (now - lastProgressUpdate < progressThrottle) {
            progressTicking = false;
            return;
        }
        
        const progressBar = document.getElementById('progressBar');
        if (!progressBar) {
            progressTicking = false;
            return;
        }
        
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        
        progressBar.style.width = Math.min(Math.max(scrolled, 0), 100) + '%';
        lastProgressUpdate = now;
        progressTicking = false;
    }
    
    function onScrollProgress() {
        if (!progressTicking) {
            progressTicking = true;
            window.requestAnimationFrame(updateProgressBar);
        }
    }
    
    window.addEventListener('scroll', onScrollProgress, { passive: true });
    window.addEventListener('load', updateProgressBar);
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateProgressBar, 150);
    });

    /* ==========================================================================
       SMOOTH SCROLL TO TOP
       ========================================================================== */
    
    document.addEventListener('keydown', function(e) {
        if ((e.key === 't' || e.key === 'T') && 
            e.target.tagName !== 'INPUT' && 
            e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
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
            if (link.hostname !== window.location.hostname) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
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
        const wasDark = document.body.classList.contains('dark-mode');
        document.body.classList.remove('dark-mode');
        header.classList.remove('sticky');
        headerPlaceholder.style.height = '0px';
        
        // Store state
        window._printState = { wasDark, wasSticky: isSticky };
    });
    
    window.addEventListener('afterprint', function() {
        if (window._printState && window._printState.wasDark) {
            document.body.classList.add('dark-mode');
        }
        handleStickyHeader();
    });

})();