/**
 * Shared price list data for Vercel serverless functions.
 * In production this can be moved to a secure database or CMS.
 */

export const priceList = {
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
                { size: 'A6', price: 20.0, priceFormatted: 'RM20.00' },
                { size: 'A4', price: 4.5, priceFormatted: 'RM4.50' },
                { size: 'A3', price: 7.0, priceFormatted: 'RM7.00' },
            ],
        },
    },
};

export function getAddOnsDisplay() {
    const sizes = priceList.addOns?.logo?.sizes || [];
    return sizes.map((item) => ({
        size: item.size,
        price: item.price,
        priceFormatted: item.priceFormatted ?? `RM${item.price.toFixed(2)}`,
    }));
}
