/**
 * Returns public configuration for the quote calculator UI.
 * This exposes only the data needed to render options, while
 * sensitive logic stays within other serverless functions.
 */

import { getAddOnsDisplay } from './_price-data.js';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const addOns = getAddOnsDisplay();
        return res.status(200).json({
            success: true,
            data: {
                addOns,
            },
        });
    } catch (error) {
        console.error('Quote config error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
