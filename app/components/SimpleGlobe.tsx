"use client"

import type React from "react"
import { motion } from "framer-motion"
import type { Country } from "../data/countries"

interface SimpleGlobeProps {
  selectedCountry: Country | null
}

const SimpleGlobe: React.FC<SimpleGlobeProps> = ({ selectedCountry }) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-[200vw] h-[200vw] bg-blue-900 rounded-full opacity-30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-[180vw] h-[180vw] bg-blue-800 rounded-full opacity-30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-[160vw] h-[160vw] bg-blue-700 rounded-full opacity-30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
      </div>
      {selectedCountry && (
        <motion.div
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            left: `${((selectedCountry.lng + 180) / 360) * 100}%`,
            top: `${((90 - selectedCountry.lat) / 180) * 100}%`,
          }}
        >
          <div className="w-4 h-4 bg-[#00ACCD] rounded-full shadow-lg shadow-[#00ACCD]/50 pulse" />
          <div className="mt-2 text-white text-sm font-bold text-center">{selectedCountry.name}</div>
        </motion.div>
      )}
    </div>
  )
}

export default SimpleGlobe

