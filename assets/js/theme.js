/* ==========================================================================
   VIJAY'S JOURNAL - SIMPLIFIED JAVASCRIPT
   Clean sticky header, no progress bar
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
       STICKY HEADER - CLEAN & SMOOTH
       ========================================================================== */
    
    const header = document.querySelector('header');
    if (!header) return;
    
    const scrollThreshold = 100;
    let isSticky = false;
    let ticking = false;
    
    // Create placeholder element
    const placeholder = document.createElement('div');
    placeholder.className = 'header-placeholder';
    header.parentNode.insertBefore(placeholder, header.nextSibling);
    
    function makeSticky() {
        if (isSticky) return;
        isSticky = true;
        
        const expandedHeight = header.getBoundingClientRect().height;
        placeholder.style.height = expandedHeight + 'px';
        
        header.classList.add('sticky');
        document.body.classList.add('header-is-sticky');
        
        requestAnimationFrame(() => {
            const stickyHeight = header.getBoundingClientRect().height;
            placeholder.style.height = stickyHeight + 'px';
        });
    }
    
    function removeSticky() {
        if (!isSticky) return;
        isSticky = false;
        
        const stickyHeight = header.getBoundingClientRect().height;
        placeholder.style.height = stickyHeight + 'px';
        
        header.classList.remove('sticky');
        document.body.classList.remove('header-is-sticky');
        
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
    
    function onScroll() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(handleSticky);
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', handleSticky);

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