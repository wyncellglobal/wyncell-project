"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { countries, type Country } from "../data/countries"
import { useRouter } from "next/navigation"
import { useCountry } from "../contexts/CountryContext"

export default function CountrySelector() {
  const { selectedCountry, setSelectedCountry } = useCountry()
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCountries, setFilteredCountries] = useState(countries)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const filtered = countries.filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredCountries(filtered)
  }, [searchTerm])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setIsOpen(false)
    if (router.pathname !== "/plans") {
      router.push(`/plans?country=${encodeURIComponent(country.code)}`)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 border-2 border-wyncell-primary rounded-lg shadow-md focus:ring-2 focus:ring-wyncell-primary focus:border-wyncell-primary bg-white text-wyncell-text-primary flex items-center justify-between"
      >
        {selectedCountry ? (
          <>
            <Image
              src={selectedCountry.flag || "/placeholder.svg"}
              alt={`${selectedCountry.name} flag`}
              width={20}
              height={15}
              className="rounded-sm mr-2"
            />
            <span>{selectedCountry.name}</span>
          </>
        ) : (
          <span>Select a country</span>
        )}
        <ChevronDown className="ml-2" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-white border-2 border-wyncell-primary rounded-lg shadow-lg"
          >
            <div className="p-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            <ul className="max-h-60 overflow-auto">
              {filteredCountries.map((country) => (
                <li
                  key={country.code}
                  className="px-4 py-2 hover:bg-wyncell-light cursor-pointer flex items-center text-gray-800"
                  onClick={() => handleCountrySelect(country)}
                >
                  <Image
                    src={country.flag || "/placeholder.svg"}
                    alt={`${country.name} flag`}
                    width={20}
                    height={15}
                    className="rounded-sm mr-3"
                  />
                  {country.name}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

