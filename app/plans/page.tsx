"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { HelpCircle } from "lucide-react"
import CountrySelector from "../components/CountrySelector"
import PricingDisplay from "../components/PricingDisplay"
import PopularCountries from "../components/PopularCountries"
import { fetchPricingData } from "../data/pricingData"
import { getUserCurrency, currencySymbols } from "../utils/currencyUtils"
import { useTranslation } from "react-i18next"
import MapComponent from "../components/MapComponent"
import { countries } from "../data/countries"
import { useCountry } from "../contexts/CountryContext"
import { useSearchParams } from "next/navigation"

export default function Plans() {
  const { t } = useTranslation()
  const { selectedCountry, setSelectedCountry } = useCountry()
  const [userCurrency, setUserCurrency] = useState("USD")
  const [pricingData, setPricingData] = useState([])

  const searchParams = useSearchParams()

  useEffect(() => {
    getUserCurrency().then(setUserCurrency)
    fetchPricingData().then(setPricingData)

    const countryCode = searchParams.get("country")
    if (countryCode && !selectedCountry) {
      const country = countries.find((c) => c.code === countryCode)
      if (country) {
        setSelectedCountry(country)
      }
    }
  }, [searchParams, selectedCountry, setSelectedCountry])

  const testimonials = [
    {
      name: "Sarah T.",
      country: "United States",
      text: "Wyncell made my international travel so much easier. Great coverage and affordable rates!",
    },
    {
      name: "Akira M.",
      country: "Japan",
      text: "I love how simple it is to switch between plans. Perfect for frequent travelers like me.",
    },
    {
      name: "Elena R.",
      country: "Spain",
      text: "The customer support is fantastic. They helped me set up my eSIM in minutes!",
    },
  ]

  const faqs = [
    {
      question: "How does eSIM work?",
      answer:
        "eSIM is a digital SIM that allows you to activate a cellular plan without using a physical SIM card. It's built into your device and can be easily programmed.",
    },
    {
      question: "Can I use Wyncell in multiple countries?",
      answer:
        "Yes! Wyncell offers coverage in over 190 countries. You can easily switch between local and regional plans as you travel.",
    },
    {
      question: "Do I need to return anything after my trip?",
      answer:
        "No, there's nothing to return. eSIMs are digital, so once your plan expires, you can simply purchase a new plan or let it lapse.",
    },
  ]

  const handleCountryChange = (code: string) => {
    const country = countries.find((c) => c.code === code)
    if (country) setSelectedCountry(country)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-wyncell-primary text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">{t("makeYourPerfectPlan")}</h1>
          <div className="max-w-xl mx-auto">
            <CountrySelector />
          </div>
        </div>
      </section>

      {/* Plan Type Selector */}
      {selectedCountry && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                <MapComponent selectedCountry={selectedCountry} />
                {selectedCountry && (
                  <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-2xl font-semibold mb-4">{t("networkInfo")}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">{t("signalStrength")}</h4>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div className="bg-wyncell-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
                          </div>
                          <span>85%</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{t("coverage")}</h4>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div className="bg-wyncell-primary h-2.5 rounded-full" style={{ width: "92%" }}></div>
                          </div>
                          <span>92%</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{t("dataSpeed")}</h4>
                        <p>Up to 100 Mbps</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{t("networkType")}</h4>
                        <p>4G LTE, 5G</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">{t("supportedCarriers")}</h4>
                      <p>Vodafone, Orange, T-Mobile</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full md:w-1/2">
                {selectedCountry && (
                  <PricingDisplay
                    country={selectedCountry?.name}
                    countryCode={selectedCountry?.code}
                    dataRatePerGB={10}
                    currency={userCurrency}
                    currencySymbol={currencySymbols[userCurrency] || "$"}
                    onGetData={(plan, duration, totalPrice) => {
                      console.log(`Selected plan: ${plan} for ${duration} days`)
                      console.log(`Total price: ${totalPrice}`)
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t("whatOurCustomersSay")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 rounded-lg p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <Image
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${testimonial.name}`}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t("frequentlyAskedQuestions")}</h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <HelpCircle className="mr-2 text-wyncell-primary" />
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PopularCountries onCountrySelect={handleCountryChange} showOnPlansPage={false} />

      {/* CTA Section */}
      <section className="py-12 bg-wyncell-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t("readyToStayConnected")}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{t("getYoureSIMNowAndEnjoy")}</p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/checkout"
              className="bg-white text-wyncell-primary px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-all"
            >
              {t("getYoureSIMNow")}
            </Link>
            <Link
              href="/support"
              className="bg-wyncell-dark text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all"
            >
              {t("needHelp")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

