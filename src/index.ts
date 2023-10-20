import { pricing_rules } from './pricingRules'
import Checkout from './checkout'

// Customer's cart
const customersCart = ['A', 'B', 'A', 'C', 'A', 'A', 'A']
const customersCart2 = ['A', 'B', 'A']

// Function to checkout customer's cart
// Could be a call from the UI, payload from a POST request, etc
const checkoutCustomer = (customersCart: string[]) => {
  try {
    // Scope asked for pricing to be passed to the class.
    // Probably wanting to show how we could pass some setup payload to the Class
    // In real world use case this may cause performance issues depending on size of pricing_rules object
    // Discussed in interview that other options might be to have the pricing_rules accessible to all instances of the class OR to instead lookup keyed pricing rules as needed and build a cache of pricing rules as they are used

    // Create new instance of Checkout class
    const co = new Checkout(pricing_rules)

    // Scan each item in the customer's cart
    customersCart.forEach((item: any) => {
      co.scan({ id: item })
    })

    // Log results to console... Could also return and then wrap the call in a logging function order return for a POST request
    console.group()
    console.log(`Total price: ${co.totalPrice}`)
    console.log(`Total special price: ${co.totalSpecialPrice}`)
    console.log(`Scanned items: ${JSON.stringify(co.scannedItems)}`)
    console.groupEnd()
  }
  catch (error) {
    console.error(error)
  }
}

const buildRandomCart = () => {
  const customerCart = []
  const skus = ['A', 'B', 'C', 'D']
  const randomQty = Math.floor(Math.random() * 20)
  for (let i = 0; i < randomQty; i++) {
    const randomSku = Math.floor(Math.random() * skus.length)
    customerCart.push(skus[randomSku])
  }
  return customerCart
}

// Force call and log to console. Shows that there are new instances of the class for each call
checkoutCustomer(buildRandomCart())
checkoutCustomer(buildRandomCart())
