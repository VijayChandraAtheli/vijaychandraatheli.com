/* ==========================================================================
   VIJAY'S JOURNAL - SIMPLIFIED JAVASCRIPT
   Clean sticky header, no progress bar - FIXED SCROLL JACKING
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
       STICKY HEADER - FIXED SCROLL JACKING BUG
       ========================================================================== */
    
    const header = document.querySelector('header');
    if (!header) return;
    
    const scrollThreshold = 100;
    let isSticky = false;
    let ticking = false;
    let initialHeaderHeight = 0;
    
    // Create placeholder element
    const placeholder = document.createElement('div');
    placeholder.className = 'header-placeholder';
    header.parentNode.insertBefore(placeholder, header.nextSibling);
    
    // Store initial header height on page load
    window.addEventListener('load', function() {
        initialHeaderHeight = header.getBoundingClientRect().height;
    });
    
    function makeSticky() {
        if (isSticky) return;
        isSticky = true;
        
        // Use stored initial height instead of calculating dynamically
        const expandedHeight = initialHeaderHeight || header.getBoundingClientRect().height;
        
        // Set placeholder height BEFORE adding sticky class to prevent jump
        placeholder.style.height = expandedHeight + 'px';
        
        header.classList.add('sticky');
        document.body.classList.add('header-is-sticky');
    }
    
    function removeSticky() {
        if (!isSticky) return;
        isSticky = false;
        
        header.classList.remove('sticky');
        document.body.classList.remove('header-is-sticky');
        
        // Remove placeholder height smoothly
        requestAnimationFrame(() => {
            placeholder.style.height = '0px';
        });
    }
    
    function handleSticky() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            makeSticky();
        } else {
            removeSticky();
        }
        
        ticking = false;
    }
    
    // Use passive listener and throttle to prevent scroll jacking
    let scrollTimeout;
    function onScroll() {
        if (!ticking) {
            // Clear any pending timeout
            clearTimeout(scrollTimeout);
            
            // Debounce scroll handling slightly
            scrollTimeout = setTimeout(() => {
                ticking = true;
                requestAnimationFrame(handleSticky);
            }, 10);
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial check after load
    window.addEventListener('load', function() {
        // Wait for layout to stabilize
        setTimeout(handleSticky, 100);
    });

    /* ==========================================================================
       SMOOTH SCROLL TO TOP
       ========================================================================== */
    
    document.addEventListener('keydown', function(e) {
        if ((e.key === 't' || e.key === 'T') && 
            e.target.tagName !== 'INPUT' && 
            e.target.tagName !== 'TEXTAREA' &&
            !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
        document.body.classList.remove('dark-mode', 'header-is-sticky');
        header.classList.remove('sticky');
        placeholder.style.height = '0px';
    });
    
    window.addEventListener('afterprint', function() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
        }
        handleSticky();
    });

})();