export const currencySymbols: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  // Add more currency symbols as needed
}

function getFallbackCurrency(): string {
  if (typeof window === "undefined") {
    return "USD" // Default for server-side rendering
  }

  const userLanguage = navigator.language || (navigator as any).userLanguage
  const currencyMap: { [key: string]: string } = {
    "en-US": "USD",
    "en-GB": "GBP",
    "en-CA": "CAD",
    "en-AU": "AUD",
    "ja-JP": "JPY",
    "de-DE": "EUR",
    "fr-FR": "EUR",
    "it-IT": "EUR",
    "es-ES": "EUR",
    // Add more mappings as needed
  }

  return currencyMap[userLanguage] || "USD" // Default to USD if no match is found
}

export async function getUserCurrency(): Promise<string> {
  try {
    // First, try to get the currency from localStorage
    if (typeof window !== "undefined" && window.localStorage) {
      const storedCurrency = localStorage.getItem("userCurrency")
      if (storedCurrency) {
        return storedCurrency
      }
    }

    // If not in localStorage, use the fallback method
    const currency = getFallbackCurrency()

    // Store the currency in localStorage for future use
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("userCurrency", currency)
    }

    return currency
  } catch (error) {
    console.error("Error getting user currency:", error)
    return "USD" // Default to USD in case of any errors
  }
}

