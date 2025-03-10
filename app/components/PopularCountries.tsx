"use client"

import { useState } from "react"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const popularCountries = [
  { code: "US", name: "United States" },
  { code: "JP", name: "Japan" },
  { code: "MX", name: "Mexico" },
  { code: "GB", name: "United Kingdom" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "CN", name: "China" },
  { code: "IN", name: "India" },
  { code: "TH", name: "Thailand" },
  { code: "FR", name: "France" },
  { code: "CR", name: "Costa Rica" },
  { code: "BR", name: "Brazil" },
]

interface PopularCountriesProps {
  onCountrySelect: (countryCode: string) => void
  showOnPlansPage?: boolean
}

export default function PopularCountries({ onCountrySelect, showOnPlansPage = true }: PopularCountriesProps) {
  const { t } = useTranslation()
  const [visibleCountries, setVisibleCountries] = useState(8)
  const router = useRouter()

  const handleCountrySelect = (country: { code: string; name: string }) => {
    onCountrySelect(country.code)
    router.push(`/plans?country=${encodeURIComponent(country.code)}`)
  }

  if (!showOnPlansPage && router.pathname === "/plans") {
    return null
  }

  return (
    <div className="mt-16" id="popular-countries">
      <h2 className="text-2xl font-bold mb-6 text-center">{t("popularCountries")}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {popularCountries.slice(0, visibleCountries).map((country) => (
          <motion.div
            key={country.code}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCountrySelect(country)}
          >
            <div className="flex items-center">
              <Image
                src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                alt={`${country.name} flag`}
                width={40}
                height={30}
                className="mr-3"
              />
              <span>{country.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
      {visibleCountries < popularCountries.length && (
        <div className="text-center mt-8">
          <button
            className="bg-wyncell-primary text-white px-6 py-2 rounded-full hover:bg-wyncell-secondary transition-colors"
            onClick={() => setVisibleCountries(popularCountries.length)}
          >
            {t("showMoreCountries")}
          </button>
        </div>
      )}
    </div>
  )
}

