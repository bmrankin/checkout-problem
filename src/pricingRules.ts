// Pricing has unit price and possible grouped special price e.g. 3 for $130
// Assumes that pricing_rules are imported from a database with correct typing enforced at database level
// If not then additional validation conditions would be required in caclulateTotalPrice
// Could import all pricing rules or fetch and append on first encounter of each rule
export interface PricingRule {
  sku: string
  unitPrice: number
  specialPriceQty?: number | null
  specialPrice?: number | null
}

export const pricing_rules: PricingRule[] = [
  {
    sku: 'A',
    unitPrice: 50,
    specialPrice: 130,
    specialPriceQty: 3
  },
  {
    sku: 'B',
    unitPrice: 30,
    specialPrice: 45,
    specialPriceQty: 2
  },
  {
    sku: 'C',
    unitPrice: 20,
    specialPrice: null,
    specialPriceQty: null
  },
  {
    sku: 'D',
    unitPrice: 15,
    specialPrice: null,
    specialPriceQty: null
  }
]
