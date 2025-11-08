/**
 * Contact Form Handler
 * Handles form submission via FormSubmit.co with client-side validation
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactForm);
    } else {
        initContactForm();
    }

    function initContactForm() {
        const form = document.getElementById('contactForm');
        const contactInput = document.getElementById('contactInput');
        const submitBtn = document.getElementById('contactSubmitBtn');
        const messageDiv = document.getElementById('contactFormMessage');

        if (!form || !contactInput || !submitBtn || !messageDiv) {
            console.warn('Contact form elements not found');
            return;
        }

        // Form submission handler
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validate contact input
            const contactValue = contactInput.value.trim();
            if (!contactValue) {
                showMessage('Please enter your email or WhatsApp number', 'error');
                return;
            }

            // Basic validation for email or phone number
            if (!isValidContact(contactValue)) {
                showMessage('Please enter a valid email address or WhatsApp number', 'error');
                return;
            }

            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            try {
                // Submit form using FormSubmit.co
                const formData = new FormData(form);
                
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showMessage('Thank you! We\'ll get back to you soon.', 'success');
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showMessage('Something went wrong. Please try again or contact us directly.', 'error');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit';
            }
        });

        // Input validation on blur
        contactInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !isValidContact(value)) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '';
            }
        });

        // Clear error styling on input
        contactInput.addEventListener('input', function() {
            this.style.borderColor = '';
            hideMessage();
        });
    }

    /**
     * Validates if the input is a valid email or WhatsApp number
     * @param {string} value - The contact value to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    function isValidContact(value) {
        // Email regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Phone number pattern (allows various formats)
        // Accepts: +60123456789, 60123456789, 0123456789, 012-3456789, etc.
        const phonePattern = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
        
        return emailPattern.test(value) || phonePattern.test(value);
    }

    /**
     * Shows a message to the user
     * @param {string} message - The message to display
     * @param {string} type - The message type ('success' or 'error')
     */
    function showMessage(message, type) {
        const messageDiv = document.getElementById('contactFormMessage');
        if (!messageDiv) return;

        messageDiv.textContent = message;
        messageDiv.className = `contact-form-message ${type}`;
        messageDiv.style.display = 'block';

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                hideMessage();
            }, 5000);
        }
    }

    /**
     * Hides the message div
     */
    function hideMessage() {
        const messageDiv = document.getElementById('contactFormMessage');
        if (!messageDiv) return;

        messageDiv.style.display = 'none';
        messageDiv.textContent = '';
        messageDiv.className = 'contact-form-message';
    }

})();



