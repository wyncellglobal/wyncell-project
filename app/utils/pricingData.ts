import Papa from "papaparse"

export interface CountryPricing {
  country: string
  dataPrice: number
  smsPrice: number
  voicePrice: number
}

const parsePrice = (value: string): number => {
  if (!value || value.trim() === "") return 0
  const numericValue = Number.parseFloat(value.replace("£", "").trim())
  return isNaN(numericValue) ? 0 : numericValue * 1.35 // Increase price by 35%
}

export async function fetchPricingData(): Promise<CountryPricing[]> {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/price%20list%20-%20Sheet1-IfSBodyc5DwPCkjKwPQN3T34Fn75OU.csv",
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const csvText = await response.text()
    console.log("CSV text:", csvText.substring(0, 200)) // Log the first 200 characters of the CSV

    const result = Papa.parse(csvText, { header: true, skipEmptyLines: true })
    console.log("Parsed result:", result)

    if (result.errors && result.errors.length > 0) {
      console.error("CSV parsing errors:", result.errors)
    }

    return result.data
      .map((row: any) => ({
        country: row["Country"] || "",
        dataPrice: parsePrice(row["Data Services"]),
        smsPrice: parsePrice(row["SMS Services"]),
        voicePrice: parsePrice(row["Voice Services"]),
      }))
      .filter((item) => item.country !== "") // Remove entries with empty country names
  } catch (error) {
    console.error("Error fetching pricing data:", error)
    throw error
  }
}

