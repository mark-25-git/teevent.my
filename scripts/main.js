/* ===================================
   TEVENT - APPLE.COM INSPIRED JAVASCRIPT
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all fade-in animations
    initializeFadeAnimations();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize performance optimizations
    initializePerformanceOptimizations();
    
    // Initialize accessibility enhancements
    initializeAccessibility();
    
    // Initialize solution modals
    initializeSolutionModals();
    
    // Initialize email copy functionality
    initializeEmailCopy();
    
    // Check for reduced motion preference
    checkReducedMotion();
});

/* ===================================
   FADE-IN ANIMATIONS
   =================================== */
function initializeFadeAnimations() {
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

/* ===================================
   SMOOTH SCROLLING
   =================================== */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Skip if href is just "#" (no target)
            if (href === '#') {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ===================================
   PERFORMANCE OPTIMIZATION
   =================================== */
function initializePerformanceOptimizations() {
    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
        if (!isVisible) {
            // Pause animations when tab is not visible
            document.body.style.setProperty('--animation-play-state', 'paused');
        } else {
            // Resume animations when tab becomes visible
            document.body.style.setProperty('--animation-play-state', 'running');
        }
    });
}

/* ===================================
   ACCESSIBILITY ENHANCEMENTS
   =================================== */
function initializeAccessibility() {
    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Focus management
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const firstFocusableElement = document.querySelector(focusableElements);
    const focusableContent = document.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

/* ===================================
   SOLUTION MODALS
   =================================== */
function initializeSolutionModals() {
    const modal = document.getElementById('solutionModal');
    const modalClose = document.getElementById('modalClose');
    const solutionCards = document.querySelectorAll('.solution-card[data-solution]');
    const modalBodies = document.querySelectorAll('.modal-body');

    if (!modal || !modalClose) {
        console.error('Modal elements not found!');
        return;
    }

    // Open modal when solution card is clicked
    solutionCards.forEach(card => {
        card.addEventListener('click', () => {
            const solutionType = card.getAttribute('data-solution');
            openModal(solutionType);
        });
    });

    // Close modal when close button is clicked
    modalClose.addEventListener('click', closeModal);

    // Close modal when overlay is clicked
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function openModal(solutionType) {
        // Hide all modal bodies
        modalBodies.forEach(body => {
            body.classList.remove('active');
        });

        // Show the specific modal body
        const targetBody = document.querySelector(`.modal-body[data-solution="${solutionType}"]`);
        if (targetBody) {
            targetBody.classList.add('active');
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus management
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.focus();
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';

        // Hide all modal bodies
        modalBodies.forEach(body => {
            body.classList.remove('active');
        });
    }
}

/* ===================================
   EMAIL COPY FUNCTIONALITY
   =================================== */
function initializeEmailCopy() {
    const emailLink = document.getElementById('emailLink');
    const emailAddress = 'team.teevent@gmail.com';
    
    if (!emailLink) {
        console.error('Email link not found!');
        return;
    }
    
    // Remove focus outline
    emailLink.style.outline = 'none';
    emailLink.addEventListener('focus', function() {
        this.style.outline = 'none';
    });
    
    emailLink.addEventListener('click', async (e) => {
        e.preventDefault();
        
        try {
            // Copy email to clipboard
            await navigator.clipboard.writeText(emailAddress);
            
            // Show notification
            showEmailCopyNotification();
            
        } catch (err) {
            console.error('Failed to copy email: ', err);
            // Fallback for older browsers
            fallbackCopyTextToClipboard(emailAddress);
            showEmailCopyNotification();
        }
    });
}

function showEmailCopyNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'email-copy-notification';
    notification.textContent = 'Email copied';
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--color-white);
        color: var(--color-black);
        padding: 12px 24px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: opacity 0.3s ease;
        white-space: nowrap;
        max-width: 90vw;
        overflow: hidden;
        text-overflow: ellipsis;
    `;
    
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

/* ===================================
   UTILITY FUNCTIONS
   =================================== */

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/* ===================================
   ERROR HANDLING
   =================================== */
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Add error reporting logic here
});

/* ===================================
   REDUCED MOTION SUPPORT
   =================================== */
function checkReducedMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
        // Disable animations for users who prefer reduced motion
        const animatedElements = document.querySelectorAll('.fade-in');
        animatedElements.forEach(el => {
            el.style.transition = 'none';
        });
    }
}

/* ===================================
   INITIALIZATION
   =================================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Teevent Apple.com-inspired design system initialized');
});

/* ===================================
   EXPORT FOR MODULE USAGE
   =================================== */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init: () => console.log('Teevent Apple.com-inspired design system module loaded'),
        animations: { appearOnScroll, faders: document.querySelectorAll('.fade-in') }
    };
}
