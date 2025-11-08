/**
 * Vercel Serverless Function: calculate-quote
 *
 * Receives quote inputs from the frontend, calculates pricing
 * based on server-side tiers, and returns a structured response.
 */

import { priceList } from './_price-data.js';

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
