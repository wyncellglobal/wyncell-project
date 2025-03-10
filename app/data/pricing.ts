import { countries } from "./countries"

export interface CountryPricing {
  country: string
  dataPrice: number
  smsPrice: number
  voicePrice: number
}

// This function generates a random price within a specified range
function generateRandomPrice(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(2))
}

// Generate pricing data for all countries with a 35% increase
export const pricingData: CountryPricing[] = countries.map((country) => ({
  country: country.name,
  dataPrice: generateRandomPrice(0.01, 0.1) * 1.35, // Price per MB
  smsPrice: generateRandomPrice(0.05, 0.2) * 1.35, // Price per SMS
  voicePrice: generateRandomPrice(0.1, 0.5) * 1.35, // Price per minute
}))

export function getPricingForCountry(countryName: string): CountryPricing | undefined {
  return pricingData.find((pricing) => pricing.country === countryName)
}

