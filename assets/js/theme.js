/* ==========================================================================
   VIJAY'S JOURNAL - PRODUCTION READY JAVASCRIPT
   Root cause fixes: proper placeholder, body class, measured height
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
       STICKY HEADER - PRODUCTION READY
       ========================================================================== */
    
    const header = document.querySelector('header');
    if (!header) return;
    
    const scrollThreshold = 100;
    let isSticky = false;
    let stickyTicking = false;
    
    // Create placeholder element ONCE
    const placeholder = document.createElement('div');
    placeholder.className = 'header-placeholder';
    header.parentNode.insertBefore(placeholder, header.nextSibling);
    
    function makeSticky() {
        if (isSticky) return;
        isSticky = true;
        
        // Measure CURRENT header height before it changes
        const currentHeight = header.getBoundingClientRect().height;
        
        // Set placeholder to current height
        placeholder.style.height = currentHeight + 'px';
        
        // Add sticky class to header AND body
        header.classList.add('sticky');
        document.body.classList.add('header-is-sticky');
    }
    
    function removeSticky() {
        if (!isSticky) return;
        isSticky = false;
        
        // Remove classes
        header.classList.remove('sticky');
        document.body.classList.remove('header-is-sticky');
        
        // Collapse placeholder (CSS transition handles smoothness)
        placeholder.style.height = '0px';
    }
    
    function handleStickyHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            makeSticky();
        } else {
            removeSticky();
        }
        
        stickyTicking = false;
    }
    
    function onStickyScroll() {
        if (!stickyTicking) {
            stickyTicking = true;
            requestAnimationFrame(handleStickyHeader);
        }
    }
    
    window.addEventListener('scroll', onStickyScroll, { passive: true });
    window.addEventListener('load', handleStickyHeader);
    
    // Handle resize - recalculate if needed
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (isSticky) {
                // Recalculate placeholder height if window resized while sticky
                const currentHeight = header.getBoundingClientRect().height;
                placeholder.style.height = currentHeight + 'px';
            }
        }, 150);
    });

    /* ==========================================================================
       READING PROGRESS BAR - OPTIMIZED
       ========================================================================== */
    
    let progressTicking = false;
    
    function updateProgressBar() {
        const progressBar = document.getElementById('progressBar');
        if (!progressBar) {
            progressTicking = false;
            return;
        }
        
        const docHeight = document.documentElement.scrollHeight;
        const windowHeight = document.documentElement.clientHeight;
        const scrollableHeight = docHeight - windowHeight;
        
        if (scrollableHeight <= 0) {
            progressBar.style.width = '100%';
            progressTicking = false;
            return;
        }
        
        const scrolled = (window.scrollY / scrollableHeight) * 100;
        progressBar.style.width = Math.min(Math.max(scrolled, 0), 100) + '%';
        
        progressTicking = false;
    }
    
    function onScrollProgress() {
        if (!progressTicking) {
            progressTicking = true;
            requestAnimationFrame(updateProgressBar);
        }
    }
    
    window.addEventListener('scroll', onScrollProgress, { passive: true });
    window.addEventListener('load', updateProgressBar);
    window.addEventListener('resize', () => {
        requestAnimationFrame(updateProgressBar);
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
        handleStickyHeader();
    });

})();