"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pricingRules_1 = require("./pricingRules");
var checkout_1 = __importDefault(require("./checkout"));
// Customer's cart
var customersCart = ['A', 'B', 'A', 'C', 'A', 'A', 'A'];
var customersCart2 = ['A', 'B', 'A'];
// Function to checkout customer's cart
// Could be a call from the UI, payload from a POST request, etc
var checkoutCustomer = function (customersCart) {
    try {
        // Scope asked for pricing to be passed to the class.
        // Probably wanting to show how we could pass some setup payload to the Class
        // In real world use case this may cause performance issues depending on size of pricing_rules object
        // Discussed in interview that other options might be to have the pricing_rules accessible to all instances of the class OR to instead lookup keyed pricing rules as needed and build a cache of pricing rules as they are used
        // Create new instance of Checkout class
        var co_1 = new checkout_1.default(pricingRules_1.pricing_rules);
        // Scan each item in the customer's cart
        customersCart.forEach(function (item) {
            co_1.scan({ id: item });
        });
        // Log results to console... Could also return and then wrap the call in a logging function order return for a POST request
        console.group();
        console.log("Total price: ".concat(co_1.totalPrice));
        console.log("Total special price: ".concat(co_1.totalSpecialPrice));
        console.log("Scanned items: ".concat(JSON.stringify(co_1.scannedItems)));
        console.groupEnd();
    }
    catch (error) {
        console.error(error);
    }
};
var buildRandomCart = function () {
    var customerCart = [];
    var skus = ['A', 'B', 'C', 'D'];
    var randomQty = Math.floor(Math.random() * 20);
    for (var i = 0; i < randomQty; i++) {
        var randomSku = Math.floor(Math.random() * skus.length);
        customerCart.push(skus[randomSku]);
    }
    return customerCart;
};
// Force call and log to console. Shows that there are new instances of the class for each call
checkoutCustomer(buildRandomCart());
checkoutCustomer(buildRandomCart());
//# sourceMappingURL=index.js.map