import Papa from "papaparse"
import { countries } from "./countries"

export interface CountryPricing {
  country: string
  dataRatePerGB: number
}

export async function fetchPricingData(): Promise<CountryPricing[]> {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/price%20list%20data%20only%20-%20Sheet1%20(1)-cxQ0bzy2vF2tpoMBFJh6vRnNXnjJTV.csv",
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const csvText = await response.text()

    const result = Papa.parse(csvText, { header: true, skipEmptyLines: true })

    if (result.errors && result.errors.length > 0) {
      console.error("CSV parsing errors:", result.errors)
    }

    const pricingData: CountryPricing[] = result.data
      .map((row: any) => ({
        country: row["Country"] || "",
        dataRatePerGB: Number.parseFloat(row["Data Rate(£/GB)"]) || 10,
      }))
      .filter((item: CountryPricing) => item.country !== "")

    return countries.map((country) => {
      const pricing = pricingData.find((p) => p.country.toLowerCase() === country.name.toLowerCase())
      return {
        country: country.name,
        dataRatePerGB: pricing ? pricing.dataRatePerGB : 10, // Default value
      }
    })
  } catch (error) {
    console.error("Error fetching pricing data:", error)
    // Return default pricing for all countries
    return countries.map((country) => ({
      country: country.name,
      dataRatePerGB: 10,
    }))
  }
}

export function getPricingForCountry(pricingData: CountryPricing[], countryName: string): CountryPricing | undefined {
  return pricingData.find((pricing) => pricing.country.toLowerCase() === countryName.toLowerCase())
}

