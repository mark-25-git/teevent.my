// ===================================
// QUOTE CALCULATOR - SERVERLESS VERSION
// ===================================

const CALCULATE_QUOTE_API = '/api/calculate-quote';

const ADD_ONS_DISPLAY = [
    { size: 'A6', price: 2.0, priceFormatted: 'RM2.00' },
    { size: 'A4', price: 4.5, priceFormatted: 'RM4.50' },
    { size: 'A3', price: 7.0, priceFormatted: 'RM7.00' },
];

const ADDON_IMAGE_MAP = {
    A6: ['a6-chest.webp', 'a6-sleeve.webp', 'a6-sleeve-name.webp', 'a6-back-name.webp'],
    A4: ['a4-front.webp', 'a4-front-1.webp'],
    A3: ['a3-front.webp', 'a3-back.webp'],
};

let selectedColorOption = null;
let quantity = 0;
let selectedAddOns = [];
let latestQuoteData = null;

async function requestQuoteFromServer(payload) {
    const response = await fetch(CALCULATE_QUOTE_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || 'Failed to calculate quote');
    }

    return response.json();
}

function generateAddOnsHTML() {
    const addonsList = document.getElementById('addonsList');
    if (!addonsList) return;

    addonsList.innerHTML = '';

    ADD_ONS_DISPLAY.forEach((addon, index) => {
        const images = (ADDON_IMAGE_MAP[addon.size] || []).map(
            (img) => `images/tshirt-add-on-option/${img}`,
        );
        const carouselId = `addon-carousel-${addon.size.toLowerCase()}-${index}`;

        const carouselHTML =
            images.length > 0
                ? `
                <div class="addon-image-carousel" id="${carouselId}">
                    ${images
                        .map(
                            (img, imgIndex) => `
                        <div class="addon-carousel-image ${imgIndex === 0 ? 'active' : ''}" data-image-index="${imgIndex}">
                            <img src="${img}" alt="Add-on ${addon.size} option ${imgIndex + 1}" loading="lazy">
                        </div>
                    `,
                        )
                        .join('')}
                </div>
            `
                : '';

        const addonHTML = `
            <div class="addon-item" data-size="${addon.size}" data-price="${addon.price.toFixed(2)}">
                ${carouselHTML}
                <div class="addon-info">
                    <span class="addon-label">Add logo ${addon.size}</span>
                    <span class="addon-price">${addon.priceFormatted} each</span>
                </div>
                <div class="addon-quantity-controls">
                    <button type="button" class="quantity-btn quantity-decrease" aria-label="Decrease quantity">−</button>
                    <input type="number" class="addon-quantity-input" value="0" min="0" max="999" data-size="${addon.size}">
                    <button type="button" class="quantity-btn quantity-increase" aria-label="Increase quantity">+</button>
                </div>
            </div>
        `;

        addonsList.innerHTML += addonHTML;
    });
}

function initAddOnCarousels() {
    const carousels = document.querySelectorAll('.addon-image-carousel');

    carousels.forEach((carousel) => {
        const images = carousel.querySelectorAll('.addon-carousel-image');
        if (images.length <= 1) return;

        let currentIndex = 0;
        const totalImages = images.length;

        function showNextImage() {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % totalImages;
            images[currentIndex].classList.add('active');
        }

        const intervalId = setInterval(showNextImage, 3000);
        carousel.dataset.intervalId = intervalId;
    });
}

async function submitQuoteToSheets(quoteData) {
    const apiUrl = 'https://script.google.com/macros/s/AKfycbwfS3RKbB-yaLp2vRuzVFQZtanId0l7P5zrGPDVcOX94LB-79VJu-vnqoy8EsYEm1gmuA/exec';

    let detailString = `Color Option: ${quoteData.colorOption}`;
    detailString += `, Quantity: ${quoteData.quantity} pieces`;

    if (quoteData.addOns.length > 0) {
        const addOnDetails = quoteData.addOns
            .map((addon) => {
                if (addon.quantity > 0) {
                    return `${addon.size} (${addon.quantity}x)`;
                }
                return null;
            })
            .filter((item) => item !== null);
        detailString +=
            addOnDetails.length > 0 ? `, Add-ons: ${addOnDetails.join(', ')}` : `, Add-ons: None`;
    } else {
        detailString += `, Add-ons: None`;
    }

    detailString += `, Base Price: RM ${quoteData.basePrice.toFixed(2)}`;

    if (quoteData.addOnsTotal > 0) {
        detailString += `, Add-ons Total: RM ${quoteData.addOnsTotal.toFixed(2)}`;
    }

    detailString += `, Per Piece: RM ${quoteData.perPiece.toFixed(2)}`;
    detailString += `, Grand Total: RM ${quoteData.grandTotal.toFixed(2)}`;

    const data = {
        button: 'Calculate Quote',
        detail: detailString,
        timestamp: new Date().toISOString(),
        url: window.location.href,
    };

    try {
        await fetch(apiUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log('Quote query submitted to Google Sheets:', detailString);
    } catch (error) {
        console.error('Error submitting quote query:', error);
    }
}

function renderAddOnsFromServerData(addOnBreakdown) {
    const addonsDetails = document.getElementById('addonsDetails');
    if (!addonsDetails) return;

    if (!addOnBreakdown || addOnBreakdown.length === 0) {
        addonsDetails.innerHTML = '';
        return;
    }

    const html = addOnBreakdown
        .map(
            (addOn) => `
                <div class="price-line price-line-sub">
                    <span class="price-label">${addOn.size} (${addOn.quantity}x):</span>
                    <span class="price-value">RM ${addOn.lineTotal.toFixed(2)}</span>
                </div>
            `,
        )
        .join('');

    addonsDetails.innerHTML = html;
}

async function updatePriceDisplay() {
    const priceDisplay = document.getElementById('priceDisplay');
    const totalDisplay = document.getElementById('totalDisplay');
    const priceDisplaySection = document.getElementById('priceDisplaySection');
    const whatsappSection = document.getElementById('whatsappSection');
    const validationMessage = document.getElementById('validationMessage');

    if (!priceDisplay || !totalDisplay || !priceDisplaySection) return;

    if (!selectedColorOption || !quantity || quantity === 0) {
        if (validationMessage) {
            if (!selectedColorOption && (!quantity || quantity === 0)) {
                validationMessage.textContent = 'Please select a color option and enter a quantity.';
            } else if (!selectedColorOption) {
                validationMessage.textContent = 'Please select a color option.';
            } else {
                validationMessage.textContent = 'Please enter a quantity.';
            }
            validationMessage.style.display = 'block';
            validationMessage.classList.add('show');
        }
        enableCalculateButton();
        return;
    }

    if (quantity < 50) {
        if (validationMessage) {
            validationMessage.textContent = 'Please enter a quantity of at least 50 pieces.';
            validationMessage.style.display = 'block';
            validationMessage.classList.add('show');
        }
        enableCalculateButton();
        return;
    }

    if (validationMessage) {
        validationMessage.style.display = 'none';
        validationMessage.classList.remove('show');
    }

    priceDisplaySection.style.display = 'block';

    try {
        const payload = {
            colorOption: selectedColorOption,
            quantity,
            addOns: selectedAddOns.filter((addon) => addon.quantity > 0),
        };

        disableCalculateButton(true);

        const result = await requestQuoteFromServer(payload);
        const data = result.data;
        latestQuoteData = data;

        priceDisplay.innerHTML = `
            <div class="price-breakdown">
                <div class="price-line">
                    <span class="price-label">Base Price:</span>
                    <span class="price-value">RM ${data.basePrice.toFixed(2)}</span>
        </div>
                ${data.addOnsTotal > 0 ? `
                    <div class="price-line">
                        <span class="price-label">Add-ons:</span>
                        <span class="price-value">+RM ${data.addOnsTotal.toFixed(2)}</span>
                </div>
                    <div id="addonsDetails"></div>
                ` : ''}
                <div class="price-line price-total">
                    <span class="price-label">Per Piece:</span>
                    <span class="price-value">RM ${data.perPiece.toFixed(2)}</span>
                </div>
            </div>
        `;

        const addonsDetails = document.getElementById('addonsDetails');
        if (addonsDetails) {
            renderAddOnsFromServerData(data.addOns);
        }

        totalDisplay.innerHTML = `
            <div class="grand-total">
                <span class="grand-total-label">Grand Total:</span>
                <span class="grand-total-value">RM ${data.grandTotal.toFixed(2)}</span>
                <div class="grand-total-quantity">for ${data.quantity} pieces</div>
            </div>
        `;

        if (whatsappSection) whatsappSection.style.display = 'block';

        setTimeout(() => {
            const isMobile = window.innerWidth <= 768;
            priceDisplaySection.scrollIntoView({
                behavior: 'smooth',
                block: isMobile ? 'center' : 'nearest',
            });
        }, 150);

        submitQuoteToSheets({
            colorOption: selectedColorOption === 'full-color' ? 'Full Color' : 'Black/White',
            quantity: data.quantity,
            addOns: data.addOns.map((addon) => ({
                size: addon.size,
                quantity: addon.quantity,
            })),
            basePrice: data.basePrice,
            addOnsTotal: data.addOnsTotal,
            perPiece: data.perPiece,
            grandTotal: data.grandTotal,
        });

        disableCalculateButton();
    } catch (error) {
        console.error('Quote calculation failed:', error);
        latestQuoteData = null;
        if (validationMessage) {
            validationMessage.textContent = error.message || 'Unable to calculate quote. Please try again later.';
            validationMessage.style.display = 'block';
            validationMessage.classList.add('show');
        }
        enableCalculateButton();
    }
}

function initColorSelection() {
    const colorButtons = document.querySelectorAll('.color-option-btn');
    colorButtons.forEach((btn) => {
        btn.addEventListener('click', function () {
            colorButtons.forEach((b) => b.classList.remove('active'));
            this.classList.add('active');
            selectedColorOption = this.getAttribute('data-color');
            hidePriceDisplay();
        });
    });
}

function initQuantityInput() {
    const quantityInput = document.getElementById('quantityInput');
    if (quantityInput) {
        quantityInput.addEventListener('input', function () {
            quantity = parseInt(this.value, 10) || 0;
            hidePriceDisplay();
            const contactMessage = document.getElementById('contactMessage');
            if (contactMessage) {
                contactMessage.style.display = quantity > 0 && quantity < 50 ? 'block' : 'none';
            }
        });
    }
}

function getClientAddon(price, size) {
    return { size, price: Number(price), quantity: 0 };
}

function initAddOns() {
    const addOnItems = document.querySelectorAll('.addon-item');

    addOnItems.forEach((item) => {
        const size = item.getAttribute('data-size');
        const price = parseFloat(item.getAttribute('data-price'));
        const quantityInput = item.querySelector('.addon-quantity-input');
        const decreaseBtn = item.querySelector('.quantity-decrease');
        const increaseBtn = item.querySelector('.quantity-increase');

        if (!selectedAddOns.find((a) => a.size === size)) {
            selectedAddOns.push({ size, price: Number(price), quantity: 0 });
        }

        function updateAddonState(qty) {
            if (qty > 0) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        }

        function updateAddonQuantity(qty) {
            const addon = selectedAddOns.find((a) => a.size === size);
            if (addon) {
                addon.quantity = qty;
            }
            updateAddonState(qty);
            hidePriceDisplay();
        }

        if (quantityInput) {
            quantityInput.addEventListener('input', function () {
                let qty = parseInt(this.value, 10) || 0;
                if (qty < 0) qty = 0;
                if (qty > 999) qty = 999;
                this.value = qty;
                updateAddonQuantity(qty);
            });

            quantityInput.addEventListener('blur', function () {
                if (this.value === '' || this.value < 0) {
                    this.value = 0;
                    updateAddonQuantity(0);
                }
            });
        }

        if (decreaseBtn) {
            let decreaseHandled = false;
            const executeDecrease = function () {
                let qty = parseInt(quantityInput.value, 10) || 0;
                if (qty > 0) {
                    qty--;
                    quantityInput.value = qty;
                    updateAddonQuantity(qty);
                }
            };

            decreaseBtn.addEventListener('touchend', function (e) {
                e.stopPropagation();
                if (decreaseHandled) {
                    e.preventDefault();
                    return;
                }
                decreaseHandled = true;
                setTimeout(() => {
                    decreaseHandled = false;
                }, 300);
                executeDecrease();
                this.blur();
                e.preventDefault();
            }, { passive: false });

            decreaseBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                if (!decreaseHandled) {
                    executeDecrease();
                    this.blur();
                }
            });
        }

        if (increaseBtn) {
            let increaseHandled = false;
            const executeIncrease = function () {
                let qty = parseInt(quantityInput.value, 10) || 0;
                if (qty < 999) {
                    qty++;
                    quantityInput.value = qty;
                    updateAddonQuantity(qty);
                }
            };

            increaseBtn.addEventListener('touchend', function (e) {
                e.stopPropagation();
                if (increaseHandled) {
                    e.preventDefault();
                    return;
                }
                increaseHandled = true;
                setTimeout(() => {
                    increaseHandled = false;
                }, 300);
                executeIncrease();
                this.blur();
                e.preventDefault();
            }, { passive: false });

            increaseBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                if (!increaseHandled) {
                    executeIncrease();
                    this.blur();
                }
            });
        }

        const addon = selectedAddOns.find((a) => a.size === size);
        if (addon && quantityInput) {
            quantityInput.value = addon.quantity || 0;
            updateAddonState(addon.quantity || 0);
        }
    });
}

function initCalculator() {
    generateAddOnsHTML();
    initAddOnCarousels();

    initColorSelection();
    initQuantityInput();
    initAddOns();

    const calculateBtn = document.getElementById('calculateQuoteBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function () {
            updatePriceDisplay();
        });
    }

    const whatsappBtn = document.getElementById('whatsappQuoteBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function () {
            const message = generateWhatsAppMessage();
            window.open(`https://wa.me/60137482481?text=${message}`, '_blank');
        });
    }
}

function enableCalculateButton() {
    const calculateBtn = document.getElementById('calculateQuoteBtn');
    if (calculateBtn) {
        calculateBtn.disabled = false;
        calculateBtn.classList.remove('disabled');
        calculateBtn.textContent = 'Calculate Quote';
    }
}

function disableCalculateButton(isLoading = false) {
    const calculateBtn = document.getElementById('calculateQuoteBtn');
    if (calculateBtn) {
        calculateBtn.disabled = true;
        calculateBtn.classList.add('disabled');
        calculateBtn.textContent = isLoading ? 'Calculating…' : 'Calculated';
    }
}

function hidePriceDisplay() {
    const priceDisplaySection = document.getElementById('priceDisplaySection');
    const whatsappSection = document.getElementById('whatsappSection');
    const validationMessage = document.getElementById('validationMessage');
    if (priceDisplaySection) priceDisplaySection.style.display = 'none';
    if (whatsappSection) whatsappSection.style.display = 'none';
    if (validationMessage) validationMessage.classList.remove('show');
    enableCalculateButton();
    latestQuoteData = null;
}

function generateWhatsAppMessage() {
    if (!latestQuoteData) {
        return encodeURIComponent('Hi Teevent! I\'d like to get a quote. Please share more details.');
    }

    let message = 'Hi Teevent! I\'d like to get a quote for t-shirts.\n\n';
    message += `Configuration: ${selectedColorOption === 'full-color' ? 'Full Color (DTF)' : 'Black/White (Silkscreen)'}\n`;
    message += `Quantity: ${latestQuoteData.quantity} pieces\n`;

    const activeAddOns = latestQuoteData.addOns || [];
    if (activeAddOns.length > 0) {
        message += `Add-ons: ${activeAddOns
            .map((a) => `Logo ${a.size} (${a.quantity}x @ RM${a.unitPrice.toFixed(2)})`)
            .join(', ')}\n`;
    }

    message += `\nEstimated Price: RM ${latestQuoteData.perPiece.toFixed(2)} per piece\n`;
    message += `Total: RM ${latestQuoteData.grandTotal.toFixed(2)}\n\n`;
    message += 'Please confirm pricing and provide more information.';

    return encodeURIComponent(message);
}

document.addEventListener('DOMContentLoaded', function () {
    initCalculator();
});

window.updatePriceDisplay = updatePriceDisplay;


