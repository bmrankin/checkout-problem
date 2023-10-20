"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calculateTotalPrice_1 = require("./calculateTotalPrice");
var Checkout = /** @class */ (function () {
    function Checkout(pricing_rules) {
        if (pricing_rules === void 0) { pricing_rules = []; }
        this.totalPrice = 0;
        this.totalSpecialPrice = 0;
        this.scannedItems = {};
        this.pricingRules = pricing_rules;
    }
    Checkout.prototype.scan = function (payload) {
        var _a, _b;
        var id = payload.id;
        console.log("Scanning item ".concat(id));
        try {
            // if item has not been scanned add to scannedItems and increment qty
            if (!((_a = this.scannedItems) === null || _a === void 0 ? void 0 : _a[id])) {
                this.scannedItems[id] = {
                    qty: 1
                };
            }
            else {
                this.scannedItems[id].qty++;
            }
            var pricing = (_b = this.pricingRules.filter(function (pricing) { return pricing.sku === id; })) === null || _b === void 0 ? void 0 : _b[0];
            // Simple catch for missing pricing rules
            // How would we want the app handle this in production?
            // Calculate items with exiting or halt calculation and throw error?
            if (!pricing)
                throw new Error("Pricing not found for ".concat(id));
            // Call after setting qty so that it will be the new scanned qty
            var price = (0, calculateTotalPrice_1.calculateTotalPrice)({
                qty: this.scannedItems[id].qty,
                pricing: pricing
            });
            // Update totals
            this.totalPrice = this.totalPrice + price.unitPrice;
            this.totalSpecialPrice = this.totalSpecialPrice + price.specialPrice;
        }
        catch (error) {
            console.error(error);
        }
    };
    return Checkout;
}());
exports.default = Checkout;
//# sourceMappingURL=checkout.js.map