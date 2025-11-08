/**
 * Vercel Serverless Function: calculate-quote
 *
 * Receives quote inputs from the frontend, calculates pricing
 * based on server-side tiers, and returns a structured response.
 */

const priceList = {
    basePrices: {
        dtf: {
            method: 'DTF (Color Print)',
            configuration: 'Front chest logo (A6), Back A3',
            tiers: [
                { minQuantity: 50, maxQuantity: 99, price: 20.0 },
                { minQuantity: 100, maxQuantity: 149, price: 20.0 },
                { minQuantity: 150, maxQuantity: 199, price: 18.5 },
                { minQuantity: 200, maxQuantity: 249, price: 18.5 },
                { minQuantity: 250, maxQuantity: 299, price: 18.5 },
                { minQuantity: 300, maxQuantity: null, price: 18.5 },
            ],
        },
        silkscreen: {
            method: 'Silkscreen (Black/White)',
            configuration: 'Front chest logo (A6), Back A3',
            tiers: [
                { minQuantity: 50, maxQuantity: 99, price: 19.0 },
                { minQuantity: 100, maxQuantity: 149, price: 16.0 },
                { minQuantity: 150, maxQuantity: 199, price: 15.8 },
                { minQuantity: 200, maxQuantity: 249, price: 15.4 },
                { minQuantity: 250, maxQuantity: 299, price: 15.0 },
                { minQuantity: 300, maxQuantity: null, price: 14.8 },
            ],
        },
    },
    addOns: {
        logo: {
            type: 'Add-on Logo',
            sizes: [
                { size: 'A6', price: 2.0 },
                { size: 'A4', price: 4.5 },
                { size: 'A3', price: 7.0 },
            ],
        },
    },
};

function getBasePrice(colorOption, quantity) {
    if (!colorOption || quantity < 50) return null;

    const methodKey = colorOption === 'full-color' ? 'dtf' : 'silkscreen';
    const methodData = priceList.basePrices[methodKey];
    if (!methodData || !methodData.tiers) return null;

    const matchingTier = methodData.tiers.find((tier) => {
        const minQty = tier.minQuantity;
        const maxQty = tier.maxQuantity;

        if (maxQty === null) {
            return quantity >= minQty;
        }
        return quantity >= minQty && quantity <= maxQty;
    });

    return matchingTier ? matchingTier.price : null;
}

function calculateAddOns(addOns = []) {
    const addOnMap = priceList.addOns.logo.sizes.reduce((acc, item) => {
        acc[item.size.toUpperCase()] = item.price;
        return acc;
    }, {});

    let total = 0;
    const breakdown = [];

    addOns.forEach((addOn) => {
        const size = (addOn.size || '').toUpperCase();
        const quantity = Number(addOn.quantity) || 0;
        const unitPrice = addOnMap[size];

        if (!unitPrice || quantity <= 0) {
            return;
        }

        const lineTotal = unitPrice * quantity;
        total += lineTotal;
        breakdown.push({ size, quantity, unitPrice, lineTotal });
    });

    return { total, breakdown };
}

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { colorOption, quantity, addOns = [] } = req.body || {};
        const qty = Number(quantity);

        if (!colorOption || Number.isNaN(qty)) {
            return res.status(400).json({ error: 'Invalid input. Provide colorOption and quantity.' });
        }

        if (qty < 50) {
            return res.status(400).json({ error: 'Minimum order is 50 pieces.' });
        }

        const basePrice = getBasePrice(colorOption, qty);
        if (basePrice === null) {
            return res.status(400).json({ error: 'Unable to determine base price.' });
        }

        const addOnResult = calculateAddOns(addOns);
        const perPiece = basePrice + addOnResult.total;
        const grandTotal = perPiece * qty;

        return res.status(200).json({
            success: true,
            data: {
                colorOption,
                quantity: qty,
                basePrice,
                addOns: addOnResult.breakdown,
                addOnsTotal: addOnResult.total,
                perPiece,
                grandTotal,
            },
        });
    } catch (error) {
        console.error('Serverless pricing error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
