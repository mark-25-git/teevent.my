// ===================================
// QUOTE CALCULATOR
// T-Shirt Pricing Calculator with Similarity Matching Algorithm
// ===================================

// Reference data - Historical orders for similarity matching
const referenceData = [
    {"material":"microfiber","printingMethod":"sublimation","frontArea":46,"backArea":1247.4,"leftSleeveArea":0,"rightSleeveArea":0,"frontColors":5,"backColors":5,"leftSleeveColors":0,"rightSleeveColors":0,"totalArea":1293.4,"maxColorComplexity":5,"numLocations":2,"customNames":true,"customNamesQty":52,"quantity":52,"actualPrice":28,"notes":"Full color sublimation"},
    {"material":"microfiber","printingMethod":"silkscreen","frontArea":623.7,"backArea":1247.4,"leftSleeveArea":40,"rightSleeveArea":0,"frontColors":5,"backColors":5,"leftSleeveColors":1,"rightSleeveColors":0,"totalArea":1911.1,"maxColorComplexity":5,"numLocations":3,"customNames":true,"customNamesQty":35,"quantity":100,"actualPrice":24,"notes":"Silkscreen CMYK, high quantity"},
    {"material":"microfiber","printingMethod":"dtf","frontArea":49,"backArea":1247.4,"leftSleeveArea":0,"rightSleeveArea":42,"frontColors":5,"backColors":5,"leftSleeveColors":0,"rightSleeveColors":5,"totalArea":1338.4,"maxColorComplexity":5,"numLocations":3,"customNames":true,"customNamesQty":44,"quantity":68,"actualPrice":22,"notes":"DTF full color multiple locations"},
    {"material":"microfiber","printingMethod":"dtf","frontArea":40,"backArea":1247.4,"leftSleeveArea":45,"rightSleeveArea":0,"frontColors":5,"backColors":5,"leftSleeveColors":1,"rightSleeveColors":0,"totalArea":1332.4,"maxColorComplexity":5,"numLocations":3,"customNames":true,"customNamesQty":36,"quantity":97,"actualPrice":25,"notes":"DTF with custom names"},
    {"material":"cotton","printingMethod":"dtf","frontArea":110.25,"backArea":1247.4,"leftSleeveArea":10,"rightSleeveArea":0,"frontColors":5,"backColors":1,"leftSleeveColors":2,"rightSleeveColors":0,"totalArea":1367.65,"maxColorComplexity":5,"numLocations":3,"customNames":false,"customNamesQty":0,"quantity":80,"actualPrice":22.5,"notes":"Cotton DTF"},
    {"material":"cotton","printingMethod":"dtf","frontArea":100,"backArea":1247.4,"leftSleeveArea":0,"rightSleeveArea":0,"frontColors":5,"backColors":1,"leftSleeveColors":0,"rightSleeveColors":0,"totalArea":1347.4,"maxColorComplexity":5,"numLocations":2,"customNames":false,"customNamesQty":0,"quantity":16,"actualPrice":28,"notes":"Small quantity"},
    {"material":"cotton","printingMethod":"dtf","frontArea":100,"backArea":1247.4,"leftSleeveArea":20,"rightSleeveArea":0,"frontColors":5,"backColors":1,"leftSleeveColors":1,"rightSleeveColors":0,"totalArea":1367.4,"maxColorComplexity":5,"numLocations":3,"customNames":false,"customNamesQty":0,"quantity":16,"actualPrice":28,"notes":"Small quantity with sleeves"},
    {"material":"cotton","printingMethod":"dtf","frontArea":60,"backArea":1247.4,"leftSleeveArea":0,"rightSleeveArea":0,"frontColors":1,"backColors":1,"leftSleeveColors":0,"rightSleeveColors":0,"totalArea":1307.4,"maxColorComplexity":1,"numLocations":2,"customNames":false,"customNamesQty":0,"quantity":7,"actualPrice":28,"notes":"Very small quantity"},
    {"material":"cotton","printingMethod":"dtf","frontArea":50,"backArea":1247.4,"leftSleeveArea":0,"rightSleeveArea":0,"frontColors":5,"backColors":5,"leftSleeveColors":0,"rightSleeveColors":0,"totalArea":1297.4,"maxColorComplexity":5,"numLocations":2,"customNames":false,"customNamesQty":0,"quantity":40,"actualPrice":23,"notes":"Full color DTF moderate quantity"}
];

// Preset packages configuration
const presets = {
    classic: {
        name: 'The Classic',
        material: 'cotton',
        frontArea: 100,
        backArea: 1247.4,
        leftSleeveArea: 0,
        rightSleeveArea: 0,
        frontColors: 5,
        backColors: 5,
        leftSleeveColors: 0,
        rightSleeveColors: 0
    },
    premium: {
        name: 'The Statement',
        material: 'cotton',
        frontArea: 100,
        backArea: 1247.4,
        leftSleeveArea: 25,
        rightSleeveArea: 25,
        frontColors: 5,
        backColors: 5,
        leftSleeveColors: 3,
        rightSleeveColors: 3
    },
    simple: {
        name: 'The Essential',
        material: 'cotton',
        frontArea: 49,
        backArea: 1247.4,
        leftSleeveArea: 0,
        rightSleeveArea: 0,
        frontColors: 3,
        backColors: 3,
        leftSleeveColors: 0,
        rightSleeveColors: 0
    }
};

// State variables
let selectedPresetKey = 'classic';
let currentMode = 'preset';

// Make currentMode accessible globally
window.currentMode = currentMode;

// Preset selection
function selectPreset(presetKey) {
    selectedPresetKey = presetKey;
    document.querySelectorAll('.preset-card').forEach(card => card.classList.remove('selected'));
    document.querySelector(`[data-preset="${presetKey}"]`).classList.add('selected');
}

// Toggle buttons initialization
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.toggle-option-btn').forEach(button => {
        button.addEventListener('click', function() {
            const group = this.getAttribute('data-group');
            document.querySelectorAll(`[data-group="${group}"]`).forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Auto-select first preset
    selectPreset('classic');
});

// Get selected value from button group
function getSelectedValue(group) {
    const activeButton = document.querySelector(`[data-group="${group}"].active`);
    return activeButton ? activeButton.getAttribute('data-value') : null;
}

// Set size quick select
function setSize(location, width, height) {
    document.getElementById(`${location}Width`).value = width;
    document.getElementById(`${location}Height`).value = height;
    
    if (width === 0 && height === 0) {
        const colorGroup = `${location}Color`;
        document.querySelectorAll(`[data-group="${colorGroup}"]`).forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-value') === '0') {
                btn.classList.add('active');
            }
        });
    }
}

// Similarity calculation algorithm
function calculateSimilarity(userSpec, refOrder) {
    let score = 0;
    
    const baseWeights = {
        quantity: 30,
        totalArea: 25,
        numLocations: 22,
        maxColorComplexity: 17,
        customNames: 5,
        material: 1
    };

    // Material matching
    if (userSpec.material === refOrder.material) {
        score += baseWeights.material;
    }

    // Area matching (with printing method consideration)
    const areaDiff = Math.abs(userSpec.totalArea - refOrder.totalArea) / Math.max(userSpec.totalArea, refOrder.totalArea);
    let areaScore;
    if (refOrder.printingMethod === 'silkscreen') {
        if (areaDiff < 0.1) areaScore = 1.0;
        else if (areaDiff < 0.2) areaScore = 0.8;
        else areaScore = Math.max(0, 1 - areaDiff / 0.3);
    } else {
        if (areaDiff < 0.3) areaScore = 1.0;
        else areaScore = Math.max(0, 1 - areaDiff / 0.5);
    }
    score += baseWeights.totalArea * areaScore;

    // Color complexity matching
    let colorScore;
    if (refOrder.printingMethod === 'dtf') {
        if (userSpec.maxColorComplexity > 0 && refOrder.maxColorComplexity > 0) {
            colorScore = 1.0;
        } else if (userSpec.maxColorComplexity === 0 && refOrder.maxColorComplexity === 0) {
            colorScore = 1.0;
        } else {
            colorScore = 0.5;
        }
    } else if (refOrder.printingMethod === 'silkscreen') {
        const colorDiff = Math.abs(userSpec.maxColorComplexity - refOrder.maxColorComplexity);
        if (colorDiff === 0) colorScore = 1.0;
        else if (colorDiff === 1) colorScore = 0.7;
        else if (colorDiff >= 4) colorScore = 0.2;
        else colorScore = 0.5;
    } else {
        const colorDiff = Math.abs(userSpec.maxColorComplexity - refOrder.maxColorComplexity);
        colorScore = Math.max(0, 1 - colorDiff / 5);
    }
    score += baseWeights.maxColorComplexity * colorScore;

    // Location matching
    let locationScore = userSpec.numLocations === refOrder.numLocations ? 1.0 : 
        Math.max(0, 1 - Math.abs(userSpec.numLocations - refOrder.numLocations) / 4);
    score += baseWeights.numLocations * locationScore;

    // Quantity matching (with printing method consideration)
    let quantityWeight = refOrder.printingMethod === 'silkscreen' ? 30 : baseWeights.quantity;
    const qtyDiff = Math.abs(userSpec.quantity - refOrder.quantity) / Math.max(userSpec.quantity, refOrder.quantity);
    score += quantityWeight * Math.max(0, 1 - qtyDiff / 0.5);

    // Custom names matching
    if (userSpec.customNames === refOrder.customNames) {
        score += baseWeights.customNames;
    }

    return score;
}

// Format color complexity for display
function formatColorComplexity(colors) {
    if (colors === 0) return 'None';
    if (colors === 1) return 'Mono (1 color)';
    if (colors <= 4) return `Multi (${colors} colors)`;
    return 'Full Color';
}

// Display results
function displayResults(userSpec, topMatches, adjustedMin, adjustedMax, adjustedAvg) {
    document.getElementById('priceRange').innerHTML = 
        `<span>RM ${adjustedMin.toFixed(2)}</span> <span>-</span> <span>RM ${adjustedMax.toFixed(2)}</span>`;
    document.getElementById('confidenceBadge').innerHTML = 
        `Average: RM ${adjustedAvg.toFixed(2)}<br>Based on ${topMatches.length} similar orders`;

    // Use window.currentMode to get the current mode
    const mode = window.currentMode || currentMode;
    
    const detailsList = document.getElementById('detailsList');
    const details = [
        { label: mode === 'preset' ? 'Package' : 'Material', value: mode === 'preset' ? presets[selectedPresetKey].name : userSpec.material.charAt(0).toUpperCase() + userSpec.material.slice(1) },
        { label: 'Total Print Area', value: `${userSpec.totalArea.toFixed(1)} cm²` },
        { label: 'Print Locations', value: `${userSpec.numLocations} location${userSpec.numLocations !== 1 ? 's' : ''}` },
        { label: 'Color Complexity', value: formatColorComplexity(userSpec.maxColorComplexity) },
        { label: 'Quantity', value: `${userSpec.quantity} pieces` }
    ];

    if (mode === 'custom' && userSpec.customNames) {
        details.push({ label: 'Custom Names', value: 'Yes (+RM 1-3/pc)' });
    }

    detailsList.innerHTML = details.map(d => `
        <div class="detail-item">
            <span class="detail-label">${d.label}</span>
            <span class="detail-value">${d.value}</span>
        </div>
    `).join('');

    const similarOrdersList = document.getElementById('similarOrdersList');
    if (similarOrdersList) {
        similarOrdersList.innerHTML = topMatches.map((order, idx) => `
            <div class="order-card">
                <div class="order-header">
                    <span>${order.similarity.toFixed(0)}% similar</span>
                    <span class="order-price">RM ${order.actualPrice.toFixed(2)}</span>
                </div>
                <div class="order-specs">
                    ${order.printingMethod.toUpperCase()} • 
                    ${order.totalArea.toFixed(0)} cm² • 
                    ${formatColorComplexity(order.maxColorComplexity)} • 
                    ${order.quantity} pcs
                    <br><em>${order.notes}</em>
                </div>
            </div>
        `).join('');
    }

    const resultsSection = document.getElementById('resultsSection');
    resultsSection.classList.add('show');
    
    // Track Calculate Quote button click with configuration details
    if (typeof trackCalculateQuote === 'function') {
        setTimeout(() => {
            trackCalculateQuote();
        }, 100);
    }
    
    // Smooth scroll within modal
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Run calculation
function runCalculation(userSpec) {
    userSpec.totalArea = userSpec.frontArea + userSpec.backArea + userSpec.leftSleeveArea + userSpec.rightSleeveArea;
    userSpec.maxColorComplexity = Math.max(userSpec.frontColors, userSpec.backColors, userSpec.leftSleeveColors, userSpec.rightSleeveColors);
    userSpec.numLocations = (userSpec.frontArea > 0 ? 1 : 0) + (userSpec.backArea > 0 ? 1 : 0) + 
                           (userSpec.leftSleeveArea > 0 ? 1 : 0) + (userSpec.rightSleeveArea > 0 ? 1 : 0);

    // Filter out sublimation orders if material is cotton (sublimation only works on polyester/microfiber)
    const filteredData = referenceData.filter(order => {
        if (userSpec.material === 'cotton' && order.printingMethod === 'sublimation') {
            return false; // Exclude sublimation for cotton
        }
        return true; // Include all others
    });

    const similarOrders = filteredData.map(order => ({
        ...order,
        similarity: calculateSimilarity(userSpec, order)
    })).sort((a, b) => b.similarity - a.similarity);

    const topMatches = similarOrders.slice(0, 5);
    const prices = topMatches.map(o => o.actualPrice);
    
    let qtyFactor = 1.0;
    if (userSpec.quantity < 20) qtyFactor = 1.15;
    else if (userSpec.quantity < 50) qtyFactor = 1.05;
    else if (userSpec.quantity >= 100) qtyFactor = 0.95;

    const adjustedMin = Math.round(Math.min(...prices) * qtyFactor * 100) / 100;
    const adjustedMax = Math.round(Math.max(...prices) * qtyFactor * 100) / 100;
    const adjustedAvg = Math.round((prices.reduce((a, b) => a + b) / prices.length) * qtyFactor * 100) / 100;

    displayResults(userSpec, topMatches, adjustedMin, adjustedMax, adjustedAvg);
}

// Preset calculation
function calculatePreset() {
    const quantity = parseInt(document.getElementById('quantityPreset').value) || 50;
    const preset = presets[selectedPresetKey];
    
    const userSpec = {
        ...preset,
        quantity: quantity,
        customNames: false
    };

    runCalculation(userSpec);
}

// Custom calculation
function calculateCustom(e) {
    e.preventDefault();

    const userSpec = {
        material: getSelectedValue('material'),
        frontArea: parseFloat(document.getElementById('frontWidth').value || 0) * 
                  parseFloat(document.getElementById('frontHeight').value || 0),
        backArea: parseFloat(document.getElementById('backWidth').value || 0) * 
                 parseFloat(document.getElementById('backHeight').value || 0),
        leftSleeveArea: parseFloat(document.getElementById('leftSleeveWidth').value || 0) * 
                       parseFloat(document.getElementById('leftSleeveHeight').value || 0),
        rightSleeveArea: parseFloat(document.getElementById('rightSleeveWidth').value || 0) * 
                        parseFloat(document.getElementById('rightSleeveHeight').value || 0),
        frontColors: parseInt(getSelectedValue('frontColor')),
        backColors: parseInt(getSelectedValue('backColor')),
        leftSleeveColors: parseInt(getSelectedValue('leftSleeveColor')),
        rightSleeveColors: parseInt(getSelectedValue('rightSleeveColor')),
        quantity: parseInt(document.getElementById('quantityCustom').value),
        customNames: getSelectedValue('customNames') === 'yes'
    };

    runCalculation(userSpec);
}

