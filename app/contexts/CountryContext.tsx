"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"
import type { Country } from "../data/countries"

type CountryContextType = {
  selectedCountry: Country | null
  setSelectedCountry: (country: Country | null) => void
}

const CountryContext = createContext<CountryContextType | undefined>(undefined)

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)

  return <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>{children}</CountryContext.Provider>
}

export const useCountry = () => {
  const context = useContext(CountryContext)
  if (context === undefined) {
    throw new Error("useCountry must be used within a CountryProvider")
  }
  return context
}

