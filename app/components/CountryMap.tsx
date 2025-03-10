"use client"

import type React from "react"
import { motion } from "framer-motion"

interface CountryMapProps {
  countryCode: string
  className?: string
}

const CountryMap: React.FC<CountryMapProps> = ({ countryCode, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full h-40 bg-gray-100 rounded-lg overflow-hidden ${className}`}
    >
      <img
        src={`https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${countryCode.toLowerCase()}/vector.svg`}
        alt={`Map of ${countryCode}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = "/placeholder-map.svg"
        }}
      />
    </motion.div>
  )
}

export default CountryMap

