I have completed a simple version the supermarket checkout

# Build
If you would like to build
- `npm i`
- `npm run build`

# Run
The code is already built so that you should just be able to download and run with `node dist/index.js`

# Testing
The testing has not been implemented yet

# Scope
Supermarket Checkout - pairing project

Let’s implement the code for a supermarket checkout that calculates the total price of a number of items. In a normal supermarket, things are identified using Stock Keeping Units, or SKUs. In our store, we’ll use individual letters of the alphabet (A, B, C, and so on). Our goods are priced individually. In addition, some items are multipriced: buy n of them, and they’ll cost you y cents. For example, item ‘A’ might cost 50 cents individually, but this week we have a special offer: buy three ‘A’s and they’ll cost you $1.30. In fact this week’s prices are:

//   Item   Unit      Special
//          Price     Price
//   --------------------------
//     A     50       3 for 130
//     B     30       2 for 45
//     C     20
//     D     15

Our checkout accepts items in any order, so that if we scan a B, an A, and another B, we’ll recognize the two B’s and price them at 45 (for a total price so far of 95).

Because the pricing changes frequently, we need to be able to pass in a set of pricing rules each time we start handling a checkout transaction.

The interface to the checkout should look like:

// co = CheckOut.new(pricing_rules)
// co.scan(item)
// co.scan(item)
//     :    :
// price = co.total

// assert_equal(100, price("AA"))
// assert_equal(130, price("AAA"))
// assert_equal(180, price("AAAA"))
// assert_equal(230, price("AAAAA"))
// assert_equal(260, price("AAAAAA"))