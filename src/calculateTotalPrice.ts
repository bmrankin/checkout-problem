import { type PricingRule } from './pricingRules'

interface Payload {
  qty: number
  pricing: PricingRule

}
interface Pricing {
  unitPrice: number
  specialPrice: number
}

export const calculateTotalPrice = (payload: Payload): Pricing => {
  const {
    qty,
    pricing
  } = payload
  let price: Pricing = {
    unitPrice: 0,
    specialPrice: 0
  }

  // Set unit price
  price.unitPrice = pricing.unitPrice * qty

  // If missing special price data or qty is less than special price qty
  if (!pricing.specialPriceQty || !pricing.specialPrice || qty < pricing.specialPriceQty) {
    price.specialPrice = pricing.unitPrice * qty
  }
  else {
    // A bit verbose but wanted to show my thought process
    // determine how many times special price applies
    const specialQuantityGroups = Math.floor(qty / pricing.specialPriceQty)
    // determine remainder
    const remainder = qty - (specialQuantityGroups * pricing.specialPriceQty)
    // subtotal special price
    const specialPrice = specialQuantityGroups * pricing.specialPrice
    // add remainder * unit price
    const remainderPrice = remainder * pricing.unitPrice
    // set special price
    price.specialPrice = specialPrice + remainderPrice
  }

  return price
}