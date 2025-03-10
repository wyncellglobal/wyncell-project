"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"

const regions = [
  { name: "Europe", countries: 30, price: 19.99 },
  { name: "Asia", countries: 15, price: 24.99 },
  { name: "North America", countries: 3, price: 29.99 },
  { name: "South America", countries: 10, price: 34.99 },
]

interface RegionalPlansProps {
  currency: string
}

export default function RegionalPlans({ currency }: RegionalPlansProps) {
  const { t } = useTranslation()

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">{t("regionalPlans")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {regions.map((region, index) => (
          <motion.div
            key={region.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border rounded-lg p-4"
          >
            <h3 className="text-xl font-semibold mb-2">{region.name}</h3>
            <p className="text-gray-600 mb-2">{t("coveringCountries", { count: region.countries })}</p>
            <p className="text-2xl font-bold text-wyncell-primary">
              {currency} {region.price.toFixed(2)}
            </p>
            <button className="mt-2 w-full bg-wyncell-primary text-white px-4 py-2 rounded-full hover:bg-wyncell-secondary transition-colors">
              {t("selectPlan")}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

