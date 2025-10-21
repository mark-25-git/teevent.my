// ===================================
// TEEVENT CLICK TRACKING ANALYTICS
// Tracks button clicks and sends data to Google Apps Script
// ===================================

// Configuration
const ANALYTICS_CONFIG = {
    // Replace this with your deployed Google Apps Script Web App URL
    apiUrl: 'https://script.google.com/macros/s/AKfycbwfS3RKbB-yaLp2vRuzVFQZtanId0l7P5zrGPDVcOX94LB-79VJu-vnqoy8EsYEm1gmuA/exec',
    enabled: true, // Set to false to disable tracking
    debug: true    // Set to false in production to hide console logs (temporarily ON for testing)
};

/**
 * Send click data to Google Apps Script
 * @param {string} buttonName - Name/label of the button clicked
 * @param {string} detail - Additional details (optional)
 */
function trackClick(buttonName, detail = '') {
    // Skip if tracking is disabled
    if (!ANALYTICS_CONFIG.enabled) {
        return;
    }
    
    // Skip if API URL is not configured
    if (ANALYTICS_CONFIG.apiUrl.includes('YOUR_GOOGLE_APPS_SCRIPT')) {
        if (ANALYTICS_CONFIG.debug) {
            console.warn('Analytics tracking skipped: API URL not configured');
        }
        return;
    }
    
    // Prepare the data
    const data = {
        button: buttonName,
        detail: detail,
        timestamp: new Date().toISOString(),
        url: window.location.href
    };
    
    if (ANALYTICS_CONFIG.debug) {
        console.log('Tracking click:', data);
    }
    
    // Send data to Google Apps Script
    fetch(ANALYTICS_CONFIG.apiUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        if (ANALYTICS_CONFIG.debug) {
            console.log('Click tracked successfully:', buttonName);
        }
    })
    .catch(error => {
        if (ANALYTICS_CONFIG.debug) {
            console.error('Error tracking click:', error);
        }
    });
}

/**
 * Format configuration details from the calculator results
 * @returns {string} Comma-separated configuration details
 */
function getCalculatorDetails() {
    // Get all detail items from the results section
    const detailItems = document.querySelectorAll('#detailsList .detail-item');
    
    if (!detailItems || detailItems.length === 0) {
        return '';
    }
    
    // Extract label-value pairs and format as comma-separated string
    const details = Array.from(detailItems).map(item => {
        const label = item.querySelector('.detail-label')?.textContent.trim();
        const value = item.querySelector('.detail-value')?.textContent.trim();
        return `${label}: ${value}`;
    }).join(', ');
    
    return details;
}

/**
 * Initialize click tracking for footer links
 * This is called separately because footer is loaded asynchronously
 */
function initializeFooterTracking() {
    // Track Footer Social Links (excluding email - tracked separately)
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        // Skip email link - it's tracked separately with more detail
        if (link.id === 'emailLink') {
            return;
        }
        
        link.addEventListener('click', () => {
            const linkText = link.textContent.trim();
            trackClick(`Footer: ${linkText}`, '');
        });
    });
    
    const nonEmailLinksCount = Array.from(footerLinks).filter(link => link.id !== 'emailLink').length;
    if (ANALYTICS_CONFIG.debug && nonEmailLinksCount > 0) {
        console.log(`✓ ${nonEmailLinksCount} footer links tracking initialized`);
    }
    
    // Track Email Copy (footer) - with specific detail
    const emailLink = document.getElementById('emailLink');
    if (emailLink) {
        emailLink.addEventListener('click', () => {
            trackClick('Footer: Email (Copy)', 'team.teevent@gmail.com');
        });
        if (ANALYTICS_CONFIG.debug) {
            console.log('✓ Email copy tracking initialized');
        }
    }
}

/**
 * Initialize click tracking for all tracked buttons
 */
function initializeAnalytics() {
    if (ANALYTICS_CONFIG.debug) {
        console.log('Initializing Teevent Analytics...');
    }
    
    // Track "Try Now" button in hero section
    const tryNowBtn = document.getElementById('getQuoteBtn');
    if (tryNowBtn) {
        tryNowBtn.addEventListener('click', () => {
            trackClick('Try Now', '');
        });
        if (ANALYTICS_CONFIG.debug) {
            console.log('✓ Try Now button tracking initialized');
        }
    }
    
    // Track WhatsApp "Get a Quote" buttons (header, solutions, contact CTA)
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const buttonText = btn.textContent.trim();
            const location = getButtonLocation(btn);
            trackClick(`WhatsApp: ${buttonText}`, location);
        });
    });
    if (ANALYTICS_CONFIG.debug && whatsappButtons.length > 0) {
        console.log(`✓ ${whatsappButtons.length} WhatsApp buttons tracking initialized`);
    }
    
    // Note: Footer tracking is initialized separately after footer loads
    // See initializeFooterTracking() function
    
    // Note: Calculate Quote button tracking is handled separately
    // because it needs to capture the form data before submission
    // This is set up in the trackCalculateQuote() function called from quote-calculator.js
    
    if (ANALYTICS_CONFIG.debug) {
        console.log('Teevent Analytics initialized successfully');
        console.log('Waiting for footer to load for footer link tracking...');
    }
    
    // Wait for footer to load and then initialize footer tracking
    waitForFooter();
}

/**
 * Wait for footer to load and then initialize footer tracking
 */
function waitForFooter() {
    // Check if footer is already loaded
    const checkFooter = setInterval(() => {
        const footerLinks = document.querySelectorAll('.footer-link');
        if (footerLinks.length > 0) {
            clearInterval(checkFooter);
            initializeFooterTracking();
        }
    }, 100); // Check every 100ms
    
    // Stop checking after 5 seconds
    setTimeout(() => {
        clearInterval(checkFooter);
        if (ANALYTICS_CONFIG.debug) {
            const footerLinks = document.querySelectorAll('.footer-link');
            if (footerLinks.length === 0) {
                console.warn('Footer links not found after 5 seconds');
            }
        }
    }, 5000);
}

/**
 * Determine the location/context of a button on the page
 * @param {HTMLElement} element - The button element
 * @returns {string} Location identifier
 */
function getButtonLocation(element) {
    // Check if it's in the header
    if (element.closest('header')) {
        return 'Header';
    }
    // Check if it's in the hero section
    if (element.closest('.hero')) {
        return 'Hero';
    }
    // Check if it's in the solutions section
    if (element.closest('.solutions-section')) {
        return 'Solutions Section';
    }
    // Check if it's in a contact/CTA section
    if (element.closest('.contact-cta') || element.classList.contains('contact-cta')) {
        return 'Contact CTA';
    }
    // Check if it's in the calculator modal
    if (element.closest('.quote-calculator-modal')) {
        return 'Calculator Modal';
    }
    // Default
    return 'Page';
}

/**
 * Track Calculate Quote button click with configuration details
 * This function should be called from the calculator when results are generated
 */
function trackCalculateQuote() {
    const details = getCalculatorDetails();
    trackClick('Calculate Quote', details);
}

// Initialize analytics when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnalytics);
} else {
    initializeAnalytics();
}

