/* ===================================
   TEVENT - APPLE.COM INSPIRED JAVASCRIPT
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Load shared components first
    loadFooter().then(() => {
        // Initialize functions that depend on loaded components
        initializeSolutionModals();
        initializeEmailCopy();
    });
    
    // Initialize functions that don't depend on components
    initializeFadeAnimations();
    initializeSmoothScrolling();
    initializePerformanceOptimizations();
    initializeAccessibility();
    initializeReferralForm();
    checkReducedMotion();
    initializeMarketPrices();
    initializeProductForms();
    initializePriceSearch();
    initializePastEventsModal();
    initializeQuoteToggle();
});

/* ===================================
   COMPONENT LOADER
   =================================== */
async function loadFooter() {
    try {
        const response = await fetch('components/footer.html');
        const footerHTML = await response.text();
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = footerHTML;
        }
        return Promise.resolve(); // Return resolved promise to indicate completion
    } catch (error) {
        console.error('Error loading footer:', error);
        return Promise.resolve(); // Still resolve to allow other functions to run
    }
}

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
   PAST EVENTS MODAL WITH CAROUSEL
   =================================== */
function initializePastEventsModal() {
    const modal = document.getElementById('pastEventsModal');
    const modalClose = document.getElementById('pastEventsModalClose');
    const viewPastEventsBtn = document.querySelector('.view-past-events-btn');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.carousel-indicator');

    if (!modal || !modalClose || !viewPastEventsBtn) {
        // Modal elements not present on this page - this is expected
        return;
    }

    let currentSlide = 0;
    const totalSlides = carouselItems.length;

    // Open modal when button is clicked
    viewPastEventsBtn.addEventListener('click', openPastEventsModal);

    // Close modal when close button is clicked
    modalClose.addEventListener('click', closePastEventsModal);

    // Close modal when overlay is clicked
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-overlay')) {
            closePastEventsModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePastEventsModal();
        }
    });

    // Carousel navigation
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    }

    // Carousel indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                goToSlide(currentSlide - 1);
            } else if (e.key === 'ArrowRight') {
                goToSlide(currentSlide + 1);
            }
        }
    });

    // Auto-play carousel (optional - uncomment if desired)
    // let autoPlayInterval;
    // function startAutoPlay() {
    //     autoPlayInterval = setInterval(() => {
    //         goToSlide(currentSlide + 1);
    //     }, 5000);
    // }
    // function stopAutoPlay() {
    //     clearInterval(autoPlayInterval);
    // }

    function goToSlide(slideIndex) {
        // Handle wrap-around
        if (slideIndex >= totalSlides) {
            slideIndex = 0;
        } else if (slideIndex < 0) {
            slideIndex = totalSlides - 1;
        }

        // Update current slide
        currentSlide = slideIndex;

        // Update carousel items
        carouselItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentSlide);
        });

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function openPastEventsModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset to first slide
        goToSlide(0);

        // Focus management
        modalClose.focus();

        // Start auto-play if enabled
        // startAutoPlay();
    }

    function closePastEventsModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';

        // Stop auto-play if enabled
        // stopAutoPlay();
    }

    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    const carousel = document.querySelector('.past-events-carousel');
    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            handleSwipe();
        });

        function handleSwipe() {
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Only handle horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    goToSlide(currentSlide + 1);
                } else {
                    // Swipe right - previous slide
                    goToSlide(currentSlide - 1);
                }
            }
        }
    }
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
        // Modal elements not present on this page - this is expected
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
        // Email link not present on this page - this is expected
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
   REFERRAL FORM HANDLER
   =================================== */
function initializeReferralForm() {
    const startSharingBtns = document.querySelectorAll('.start-sharing-btn, #startSharingBtn');
    const applicationForm = document.getElementById('applicationForm');
    
    if (startSharingBtns.length === 0 || !applicationForm) {
        // Elements not present on this page - this is expected
        return;
    }
    
    startSharingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Show the form with smooth animation
            applicationForm.style.display = 'block';
            applicationForm.style.opacity = '0';
            applicationForm.style.transform = 'translateY(30px)';
            applicationForm.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            // Trigger animation
            setTimeout(() => {
                applicationForm.style.opacity = '1';
                applicationForm.style.transform = 'translateY(0)';
            }, 10);
            
            // Smooth scroll to form
            setTimeout(() => {
                applicationForm.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        });
    });
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
   MARKET PRICE SNAPSHOTS (CSV -> UI)
   =================================== */
async function initializeMarketPrices() {
    const root = document.getElementById('market-prices-root');
    if (!root) {
        console.log('Market prices root not found');
        return; // Not on suppliers page
    }

    try {
        console.log('Loading market prices...');
        const res = await fetch('info/tshirt_quotes.json');
        const data = await res.json();
        console.log('Loaded data:', data.length, 'entries');

        root.innerHTML = '';
        
        // Create vertical cards for each entry
        data.forEach(entry => {
            const card = document.createElement('div');
            card.className = 'price-snapshot-card-vertical';

            // Header Section (Product + Material)
            const header = document.createElement('div');
            header.className = 'price-card-header';
            
            const title = document.createElement('h3');
            title.className = 'price-card-title';
            title.textContent = entry.itemLabel;
            
            const materialBadge = document.createElement('div');
            materialBadge.className = 'material-badge';
            materialBadge.textContent = entry.material;
            
            header.appendChild(title);
            header.appendChild(materialBadge);

            // Design Specifications Section
            const specs = document.createElement('div');
            specs.className = 'price-card-specs';
            
            const specsTitle = document.createElement('div');
            specsTitle.className = 'specs-title';
            specsTitle.textContent = 'Design Specifications';
            
            const specsGrid = document.createElement('div');
            specsGrid.className = 'specs-grid';
            
            // Front Design
            const frontSpec = document.createElement('div');
            frontSpec.className = 'spec-item';
            frontSpec.innerHTML = `
                <span class="spec-label">Front</span>
                <span class="spec-value">${entry.frontDesignSize} (${entry.frontDesignColor}) - ${entry.frontDesignPrintingMethod}</span>
            `;
            
            // Back Design
            const backSpec = document.createElement('div');
            backSpec.className = 'spec-item';
            backSpec.innerHTML = `
                <span class="spec-label">Back</span>
                <span class="spec-value">${entry.backDesignSize} (${entry.backDesignColor}) - ${entry.backDesignPrintingMethod}</span>
            `;
            
            // Sleeve Design
            const sleeveSpec = document.createElement('div');
            sleeveSpec.className = 'spec-item';
            const sleeveValue = entry.sleeveDesignSize ? 
                `${entry.sleeveDesignSize} (${entry.sleeveDesignColor}) - ${entry.sleeveDesignPrintingMethod}` : 
                'No sleeve design';
            sleeveSpec.innerHTML = `
                <span class="spec-label">Sleeve</span>
                <span class="spec-value ${entry.sleeveDesignSize ? '' : 'empty'}">${sleeveValue}</span>
            `;
            
            specsGrid.appendChild(frontSpec);
            specsGrid.appendChild(backSpec);
            specsGrid.appendChild(sleeveSpec);
            
            specs.appendChild(specsTitle);
            specs.appendChild(specsGrid);

            // Price Section
            const price = document.createElement('div');
            price.className = 'price-card-price';
            
            // Parse price information
            const priceMatch = entry.priceLabel.match(/(\d+pcs?),\s*(RM\s*[\d.]+(?:\/\w+)?)/i);
            if (priceMatch) {
                const quantity = priceMatch[1];
                const priceValue = priceMatch[2];
                
                price.innerHTML = `
                    <div class="price-main">${priceValue} <span class="price-subtitle">based on ${quantity}</span></div>
                `;
            } else {
                // Fallback for non-standard price formats
                price.textContent = entry.priceLabel;
            }

            // Location Section
            const supplierInfo = document.createElement('div');
            supplierInfo.className = 'price-card-supplier';
            
            const location = document.createElement('div');
            location.className = 'supplier-location';
            location.innerHTML = `
                <i class="bi bi-geo-alt-fill location-icon"></i>
                <span>${entry.location}</span>
            `;
            
            supplierInfo.appendChild(location);

            // Contact Section
            const contact = document.createElement('div');
            contact.className = 'price-card-contact';
            
            const contactBtn = document.createElement('button');
            contactBtn.className = 'price-snapshot-contact-btn';
            contactBtn.type = 'button';
            contactBtn.innerHTML = `
                <i class="bi bi-telephone-fill contact-icon"></i>
                <span>${entry.contact}</span>
            `;
            contactBtn.addEventListener('click', () => copyToClipboard(entry.contact));
            
            contact.appendChild(contactBtn);

            // Append all sections to card
            card.appendChild(header);
            card.appendChild(specs);
            card.appendChild(price);
            card.appendChild(supplierInfo);
            card.appendChild(contact);

            root.appendChild(card);
        });
        
        console.log('Created', root.children.length, 'cards');
    } catch (e) {
        console.error('Failed to load market prices:', e);
        const fallback = document.createElement('p');
        fallback.className = 'section-subtitle';
        fallback.textContent = 'Pricing samples are unavailable right now.';
        root.appendChild(fallback);
    }
}

function parseCsv(text) {
    // Simple CSV parser that handles quoted fields and commas
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length === 0) return [];
    const headers = splitCsvLine(lines[0]);
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        const values = splitCsvLine(lines[i]);
        const row = {};
        headers.forEach((h, idx) => { row[h] = values[idx] || ''; });
        rows.push(row);
    }
    return rows;
}

function splitCsvLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
            if (inQuotes && line[i + 1] === '"') { // escaped quote
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (ch === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += ch;
        }
    }
    result.push(current);
    return result.map(s => s.trim());
}

function groupBy(array, keyFn) {
    return array.reduce((acc, item) => {
        const key = keyFn(item);
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showTempToast('Copied contact');
    } catch (e) {
        fallbackCopyTextToClipboard(text);
        showTempToast('Copied contact');
    }
}

function showTempToast(message) {
    const el = document.createElement('div');
    el.className = 'temp-toast';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => { el.classList.add('visible'); }, 10);
    setTimeout(() => {
        el.classList.remove('visible');
        setTimeout(() => el.remove(), 300);
    }, 2000);
}

// Split a Price_label string into individual { tier, price } entries
function splitPriceTiers(priceLabel) {
    if (!priceLabel) return [];
    const normalized = priceLabel.replace(/\r/g, '\n').trim();
    // First, split by semicolons or newlines where a tier likely ends
    let segments = normalized
        .split(/;|\n+/)
        .map(s => s.trim())
        .filter(Boolean);

    // If we only got one segment and it seems to contain multiple tiers separated by ", <digit>"
    if (segments.length <= 1) {
        const alt = normalized.split(/,\s(?=\d)/).map(s => s.trim()).filter(Boolean);
        // Use alt only if it meaningfully increases segment count
        if (alt.length > segments.length) {
            segments = alt;
        }
    }

    const results = [];
    segments.forEach(seg => {
        if (!seg) return;
        // Try patterns: "100pcs = RM3.00/pc" or "30 - 49 pcs, RM 9.20/pc"
        let tier = '';
        let price = '';
        if (seg.includes('=')) {
            const [left, right] = seg.split('=');
            tier = (left || '').trim();
            price = (right || '').trim();
        } else if (seg.includes(',')) {
            // split on first comma only
            const firstComma = seg.indexOf(',');
            if (firstComma !== -1) {
                tier = seg.slice(0, firstComma).trim();
                price = seg.slice(firstComma + 1).trim();
            }
        } else {
            // Fallback: if no delimiter, treat entire segment as price
            price = seg.trim();
        }

        if (tier && price) {
            results.push({ tier, price });
        }
    });

    return results;
}

/* ===================================
   PRODUCT FORMS (SHOW/HIDE)
   =================================== */
function initializeProductForms() {
    const lookingForButtons = document.querySelectorAll('.looking-for-button');
    const continueButton = document.querySelector('.continue-button');
    const productForms = document.querySelectorAll('.product-form-container');
    
    // Check if we're on the suppliers page
    if (!lookingForButtons.length || !continueButton || !productForms.length) {
        return;
    }
    
    // Initially hide all forms and disable continue button
    productForms.forEach(form => {
        form.style.display = 'none';
    });
    continueButton.disabled = true;
    
    // Add click handlers to all looking-for buttons
    lookingForButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleButtonSelection(button);
            updateContinueButton();
        });
    });
    
    // Add continue button handler
    continueButton.addEventListener('click', () => {
        showSelectedForms();
    });
    
    function toggleButtonSelection(button) {
        button.classList.toggle('selected');
    }
    
    function updateContinueButton() {
        const selectedButtons = document.querySelectorAll('.looking-for-button.selected');
        continueButton.disabled = selectedButtons.length === 0;
    }
    
    function showSelectedForms() {
        const selectedButtons = document.querySelectorAll('.looking-for-button.selected');
        
        // Hide all forms first
        productForms.forEach(form => {
            form.style.display = 'none';
        });
        
        // Show forms for selected buttons
        selectedButtons.forEach(button => {
            const buttonText = button.textContent.toLowerCase();
            const targetForm = Array.from(productForms).find(form => {
                const title = form.querySelector('.product-form-title');
                return title && title.textContent.toLowerCase().includes(buttonText);
            });
            
            if (targetForm) {
                targetForm.style.display = 'block';
            }
        });
        
        // Smooth scroll to first visible form
        const firstVisibleForm = Array.from(productForms).find(form => 
            form.style.display === 'block'
        );
        
        if (firstVisibleForm) {
            firstVisibleForm.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }
}

/* ===================================
   INITIALIZATION
   =================================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Teevent Apple.com-inspired design system initialized');
});

/* ===================================
   PRICE SEARCH FUNCTIONALITY
   =================================== */
let marketPriceData = [];
let searchSuggestions = [];

function initializePriceSearch() {
    const searchInput = document.getElementById('priceSearchInput');
    const searchDropdown = document.getElementById('searchDropdown');
    const searchSuggestionsEl = document.getElementById('searchSuggestions');
    
    if (!searchInput || !searchDropdown || !searchSuggestionsEl) {
        return; // Not on connect page
    }
    
    // Load market price data for search suggestions
    loadMarketPriceData();
    
    // Focus events
    searchInput.addEventListener('focus', () => {
        if (searchSuggestions.length > 0) {
            displaySuggestions(searchSuggestions.slice(0, 8), '');
            showDropdown();
        }
    });
    
    // Input events
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length > 0) {
            filterSuggestions(query);
        } else {
            hideDropdown();
        }
    });
    
    // Click outside to close
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
            hideDropdown();
        }
    });
    
    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
        const suggestions = searchDropdown.querySelectorAll('.search-suggestion');
        const selected = searchDropdown.querySelector('.search-suggestion.selected');
        
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (selected) {
                    selected.classList.remove('selected');
                    const next = selected.nextElementSibling;
                    if (next) {
                        next.classList.add('selected');
                    } else {
                        suggestions[0]?.classList.add('selected');
                    }
                } else {
                    suggestions[0]?.classList.add('selected');
                }
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                if (selected) {
                    selected.classList.remove('selected');
                    const prev = selected.previousElementSibling;
                    if (prev) {
                        prev.classList.add('selected');
                    } else {
                        suggestions[suggestions.length - 1]?.classList.add('selected');
                    }
                } else {
                    suggestions[suggestions.length - 1]?.classList.add('selected');
                }
                break;
                
            case 'Enter':
                e.preventDefault();
                if (selected) {
                    selectSuggestion(selected);
                }
                break;
                
            case 'Escape':
                hideDropdown();
                searchInput.blur();
                break;
        }
    });
}

async function loadMarketPriceData() {
    try {
        const res = await fetch('info/tshirt_quotes.json');
        const data = await res.json();
        
        // Process data for search suggestions
        marketPriceData = data.map(entry => ({
            supplier: entry.supplierName,
            item: entry.itemLabel,
            detail: `${entry.material} - ${entry.frontDesignSize} (${entry.frontDesignColor})`,
            price: entry.priceLabel,
            location: entry.location,
            contact: entry.contact,
            material: entry.material,
            frontDesign: entry.frontDesignSize,
            backDesign: entry.backDesignSize,
            sleeveDesign: entry.sleeveDesignSize,
            printingMethod: entry.frontDesignPrintingMethod
        }));
        
        // Generate search suggestions
        generateSearchSuggestions();
        
    } catch (e) {
        console.error('Failed to load market price data for search:', e);
    }
}

function generateSearchSuggestions() {
    searchSuggestions = [];
    
    // Add supplier suggestions
    const suppliers = [...new Set(marketPriceData.map(d => d.supplier))];
    suppliers.forEach(supplier => {
        searchSuggestions.push({
            type: 'supplier',
            title: supplier,
            details: `${marketPriceData.filter(d => d.supplier === supplier).length} products available`,
            searchText: supplier.toLowerCase()
        });
    });
    
    // Add product suggestions
    const products = [...new Set(marketPriceData.map(d => d.item))];
    products.forEach(product => {
        searchSuggestions.push({
            type: 'product',
            title: product,
            details: `${marketPriceData.filter(d => d.item === product).length} suppliers available`,
            searchText: product.toLowerCase()
        });
    });
    
    // Add location suggestions
    const locations = [...new Set(marketPriceData.map(d => d.location))];
    locations.forEach(location => {
        if (location && location.trim()) {
            searchSuggestions.push({
                type: 'location',
                title: location,
                details: `${marketPriceData.filter(d => d.location === location).length} suppliers`,
                searchText: location.toLowerCase()
            });
        }
    });
}

function filterSuggestions(query) {
    const filtered = searchSuggestions.filter(suggestion => 
        suggestion.searchText.includes(query) ||
        suggestion.title.toLowerCase().includes(query)
    );
    
    displaySuggestions(filtered, query);
}

function displaySuggestions(suggestions, query) {
    const searchSuggestionsEl = document.getElementById('searchSuggestions');
    
    if (suggestions.length === 0) {
        searchSuggestionsEl.innerHTML = '<div class="no-suggestions">No matching results found</div>';
        showDropdown();
        return;
    }
    
    searchSuggestionsEl.innerHTML = suggestions.slice(0, 8).map(suggestion => {
        const highlightedTitle = highlightText(suggestion.title, query);
        const typeIcon = getTypeIcon(suggestion.type);
        
        return `
            <div class="search-suggestion" data-type="${suggestion.type}" data-title="${suggestion.title}">
                <div class="suggestion-content">
                    <div class="suggestion-title">${typeIcon} ${highlightedTitle}</div>
                    <div class="suggestion-details">${suggestion.details}</div>
                </div>
            </div>
        `;
    }).join('');
    
    // Add click handlers
    searchSuggestionsEl.querySelectorAll('.search-suggestion').forEach(suggestion => {
        suggestion.addEventListener('click', () => selectSuggestion(suggestion));
    });
    
    showDropdown();
}

function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="suggestion-highlight">$1</span>');
}

function getTypeIcon(type) {
    const icons = {
        supplier: '<i class="bi bi-building"></i>',
        product: '<i class="bi bi-box"></i>',
        location: '<i class="bi bi-geo-alt"></i>'
    };
    return icons[type] || '<i class="bi bi-search"></i>';
}

function selectSuggestion(suggestionEl) {
    const type = suggestionEl.dataset.type;
    const title = suggestionEl.dataset.title;
    
    // Update search input
    const searchInput = document.getElementById('priceSearchInput');
    searchInput.value = title;
    
    // Filter market prices based on selection
    filterMarketPrices(type, title);
    
    // Hide dropdown
    hideDropdown();
}

function filterMarketPrices(type, value) {
    const marketPricesRoot = document.getElementById('market-prices-root');
    if (!marketPricesRoot) return;
    
    // This would integrate with the existing market prices display
    // For now, we'll just show all prices but could filter based on selection
    console.log(`Filtering by ${type}: ${value}`);
}

function showDropdown() {
    const searchDropdown = document.getElementById('searchDropdown');
    if (searchDropdown) {
        searchDropdown.style.display = 'block';
    }
}

function hideDropdown() {
    const searchDropdown = document.getElementById('searchDropdown');
    if (searchDropdown) {
        searchDropdown.style.display = 'none';
    }
}

/* ===================================
   QUOTE CALCULATOR MODAL
   =================================== */
function initializeQuoteToggle() {
    const getQuoteBtn = document.getElementById('getQuoteBtn');
    const quoteCalculatorModal = document.getElementById('quoteCalculatorModal');
    const quoteModalClose = document.getElementById('quoteModalClose');
    const quoteModalOverlay = document.getElementById('quoteModalOverlay');
    const modeButtons = document.querySelectorAll('.quote-mode-btn');
    const presetMode = document.getElementById('presetMode');
    const customMode = document.getElementById('customMode');
    
    if (!getQuoteBtn || !quoteCalculatorModal) return;
    
    // Open modal when "Get Quote Now" is clicked
    getQuoteBtn.addEventListener('click', () => {
        quoteCalculatorModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
    
    // Close modal function
    const closeModal = () => {
        quoteCalculatorModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scroll
    };
    
    // Close modal on close button click
    if (quoteModalClose) {
        quoteModalClose.addEventListener('click', closeModal);
    }
    
    // Close modal on overlay click
    if (quoteModalOverlay) {
        quoteModalOverlay.addEventListener('click', closeModal);
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && quoteCalculatorModal.style.display === 'flex') {
            closeModal();
        }
    });
    
    // Handle mode selection
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            modeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const selectedMode = button.getAttribute('data-mode');
            
            // Update currentMode in quote-calculator.js
            if (typeof window.currentMode !== 'undefined') {
                window.currentMode = selectedMode;
            }
            
            // Switch between preset and custom modes
            if (selectedMode === 'preset') {
                if (presetMode) presetMode.classList.remove('hidden');
                if (customMode) customMode.classList.add('hidden');
            } else {
                if (presetMode) presetMode.classList.add('hidden');
                if (customMode) customMode.classList.remove('hidden');
            }
            
            // Hide results when switching modes
            const resultsSection = document.getElementById('resultsSection');
            if (resultsSection) {
                resultsSection.classList.remove('show');
            }
        });
    });
}

/* ===================================
   EXPORT FOR MODULE USAGE
   =================================== */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init: () => console.log('Teevent Apple.com-inspired design system module loaded'),
        animations: { appearOnScroll, faders: document.querySelectorAll('.fade-in') }
    };
}
