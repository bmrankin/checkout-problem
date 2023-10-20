import { calculateTotalPrice } from './calculateTotalPrice'
import { type PricingRule } from './pricingRules'

interface ScanPayload {
  id: string
}

class Checkout {
  totalPrice: number
  totalSpecialPrice: number
  scannedItems: {
    [key: string]: {
      qty: number
    }
  }
  pricingRules: PricingRule[]
  constructor(pricing_rules: PricingRule[] = []) {
    this.totalPrice = 0
    this.totalSpecialPrice = 0
    this.scannedItems = {}
    this.pricingRules = pricing_rules
  }

  scan(payload: ScanPayload) {
    const {
      id
    } = payload
    console.log(`Scanning item ${id}`)
    try {
      // if item has not been scanned add to scannedItems and increment qty
      if (!this.scannedItems?.[id]) {
        this.scannedItems[id] = {
          qty: 1
        }
      }
      else {
        this.scannedItems[id].qty++
      }

      const pricing = this.pricingRules.filter((pricing: any) => pricing.sku === id)?.[0]

      // Simple catch for missing pricing rules
      // How would we want the app handle this in production?
      // Calculate items with exiting or halt calculation and throw error?
      if (!pricing)
        throw new Error(`Pricing not found for ${id}`)

      // Call after setting qty so that it will be the new scanned qty
      const price = calculateTotalPrice({
        qty: this.scannedItems[id].qty,
        pricing
      })

      // Update totals
      this.totalPrice = this.totalPrice + price.unitPrice
      this.totalSpecialPrice = this.totalSpecialPrice + price.specialPrice
    }
    catch (error) {
      console.error(error)
    }
  }
}

export default Checkout
