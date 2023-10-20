"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalPrice = void 0;
var calculateTotalPrice = function (payload) {
    var qty = payload.qty, pricing = payload.pricing;
    var price = {
        unitPrice: 0,
        specialPrice: 0
    };
    // Set unit price
    price.unitPrice = pricing.unitPrice * qty;
    // If missing special price data or qty is less than special price qty
    if (!pricing.specialPriceQty || !pricing.specialPrice || qty < pricing.specialPriceQty) {
        price.specialPrice = pricing.unitPrice * qty;
    }
    else {
        // A bit verbose but wanted to show my thought process
        // determine how many times special price applies
        var specialQuantityGroups = Math.floor(qty / pricing.specialPriceQty);
        // determine remainder
        var remainder = qty - (specialQuantityGroups * pricing.specialPriceQty);
        // subtotal special price
        var specialPrice = specialQuantityGroups * pricing.specialPrice;
        // add remainder * unit price
        var remainderPrice = remainder * pricing.unitPrice;
        // set special price
        price.specialPrice = specialPrice + remainderPrice;
    }
    return price;
};
exports.calculateTotalPrice = calculateTotalPrice;
//# sourceMappingURL=calculateTotalPrice.js.map