/* ==========================================================================
   VIJAY'S JOURNAL - ULTRA SMOOTH JAVASCRIPT
   Zero flicker solution
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
   STICKY HEADER - ULTRA SMOOTH
   ========================================================================== */

const header = document.querySelector('header');
if (!header) return;

const scrollThreshold = 100;
let isSticky = false;
let stickyTicking = false;
let isTransitioning = false;

// Create placeholder element
const placeholder = document.createElement('div');
placeholder.className = 'header-placeholder';
header.parentNode.insertBefore(placeholder, header.nextSibling);

function makeSticky() {
    if (isSticky) return;
    isSticky = true;
    isTransitioning = true;
    
    // Measure expanded header height
    const expandedHeight = header.getBoundingClientRect().height;
    placeholder.style.height = expandedHeight + 'px';
    
    // Apply sticky class
    header.classList.add('sticky');
    document.body.classList.add('header-is-sticky');
    
    // Measure compact height and animate placeholder
    requestAnimationFrame(() => {
        const stickyHeight = header.getBoundingClientRect().height;
        placeholder.style.height = stickyHeight + 'px';
        
        // Mark transition complete and force progress update
        setTimeout(() => {
            isTransitioning = false;
            updateProgressBar(); // ← ADD THIS LINE
        }, 350);
    });
}

function removeSticky() {
    if (!isSticky) return;
    isSticky = false;
    isTransitioning = true;
    
    // Keep current sticky height
    const stickyHeight = header.getBoundingClientRect().height;
    placeholder.style.height = stickyHeight + 'px';
    
    // Remove sticky class
    header.classList.remove('sticky');
    document.body.classList.remove('header-is-sticky');
    
    // Collapse placeholder
    requestAnimationFrame(() => {
        placeholder.style.height = '0px';
        
        // Mark transition complete and force progress update
        setTimeout(() => {
            isTransitioning = false;
            updateProgressBar(); // ← ADD THIS LINE
        }, 350);
    });
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

/* ==========================================================================
   READING PROGRESS BAR - ALWAYS ACCURATE
   ========================================================================== */

const progressBar = document.getElementById('progressBar');
let progressTicking = false;

function updateProgressBar() {
    if (!progressBar) {
        progressTicking = false;
        return;
    }
    
    // ALWAYS use live scroll values
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = document.documentElement.clientHeight;
    const scrollableHeight = docHeight - windowHeight;
    
    let progress = 0;
    
    if (scrollableHeight > 0) {
        progress = (scrollY / scrollableHeight) * 100;
    }
    
    // Clamp between 0-100
    const clampedProgress = Math.min(Math.max(progress, 0), 100);
    
    // Use transform (GPU-accelerated, no reflow)
    progressBar.style.transform = `scaleX(${clampedProgress / 100})`;
    
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
        isTransitioning = false;
        handleStickyHeader();
    });

})();