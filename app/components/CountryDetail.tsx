"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Globe } from "lucide-react"
import type { Country } from "../data/countries"
import { type CountryPricing, fetchPricingData } from "../utils/pricingData"

interface CountryDetailProps {
  country: Country
  onBack: () => void
}

const CountryDetail: React.FC<CountryDetailProps> = ({ country, onBack }) => {
  const [pricing, setPricing] = useState<CountryPricing | null>(null)

  useEffect(() => {
    fetchPricingData().then((data) => {
      const countryPricing = data.find((item) => item.country.toLowerCase() === country.name.toLowerCase())
      if (countryPricing) {
        setPricing(countryPricing)
      }
    })
  }, [country])

  const pricingPlans = [
    { name: "Basic", data: "1GB", price: pricing ? `£${(pricing.dataPrice * 1000).toFixed(2)}` : "Loading..." },
    { name: "Standard", data: "5GB", price: pricing ? `£${(pricing.dataPrice * 5000).toFixed(2)}` : "Loading..." },
    { name: "Premium", data: "10GB", price: pricing ? `£${(pricing.dataPrice * 10000).toFixed(2)}` : "Loading..." },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center text-[#00E5FF] hover:text-[#33EEFF]">
        <ArrowLeft className="mr-2" />
        Back to Globe
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-8"
      >
        <div className="flex items-center mb-6">
          {country.flag ? (
            <Image
              src={country.flag || "/placeholder.svg"}
              alt={`${country.name} flag`}
              width={60}
              height={40}
              className="rounded mr-4"
            />
          ) : (
            <Globe className="w-10 h-10 mr-4 text-[#00E5FF]" />
          )}
          <h2 className="text-4xl font-bold text-white">{country.name}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image
              src={country.image || "/placeholder.svg"}
              alt={`${country.name} landscape`}
              width={500}
              height={300}
              className="rounded-lg object-cover w-full h-64"
            />
            <p className="mt-4 text-white text-lg">
              Experience the beauty and culture of {country.name} with our global data plans. Stay connected wherever
              you go!
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#00E5FF]">Available Plans</h3>
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white bg-opacity-10 rounded-lg p-4 mb-4"
              >
                <h4 className="text-xl font-semibold text-white">{plan.name}</h4>
                <p className="text-[#00E5FF]">{plan.data}</p>
                <p className="text-2xl font-bold text-white mt-2">{plan.price}</p>
                <button className="mt-2 bg-[#00E5FF] text-black px-4 py-2 rounded hover:bg-[#33EEFF] transition-colors">
                  Select Plan
                </button>
              </motion.div>
            ))}
            {pricing && (
              <div className="mt-6 text-white">
                <h4 className="text-xl font-semibold mb-2">Additional Services:</h4>
                <p>SMS: £{pricing.smsPrice.toFixed(4)} per message</p>
                <p>Voice: £{pricing.voicePrice.toFixed(4)} per minute</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CountryDetail

