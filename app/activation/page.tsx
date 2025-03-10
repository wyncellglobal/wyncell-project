"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Smartphone, QrCode, Settings, Wifi, HelpCircle, CheckCircle, AlertCircle } from "lucide-react"

const activationSteps = [
  {
    icon: Smartphone,
    title: "checkDevice",
    description: "checkDeviceDescription",
  },
  {
    icon: QrCode,
    title: "scanQRCode",
    description: "scanQRCodeDescription",
  },
  {
    icon: Settings,
    title: "configureSettings",
    description: "configureSettingsDescription",
  },
  {
    icon: Wifi,
    title: "connect",
    description: "connectDescription",
  },
]

export default function Activation() {
  const { t } = useTranslation()
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    const savedProgress = localStorage.getItem("activationProgress")
    if (savedProgress) {
      setCompletedSteps(JSON.parse(savedProgress))
    }
  }, [])

  const toggleStepCompletion = (index: number) => {
    setCompletedSteps((prevSteps) => {
      let newSteps
      if (prevSteps.includes(index)) {
        newSteps = prevSteps.filter((step) => step !== index)
      } else {
        newSteps = [...prevSteps, index]
      }
      localStorage.setItem("activationProgress", JSON.stringify(newSteps))
      return newSteps
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">{t("activateYourESIM")}</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">{t("activationSteps")}</h3>
            <div className="space-y-6">
              {activationSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-start p-4 rounded-lg ${
                    completedSteps.includes(index) ? "bg-green-50" : "bg-gray-50"
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`flex items-center justify-center h-12 w-12 rounded-md ${
                        completedSteps.includes(index) ? "bg-green-500" : "bg-wyncell-primary"
                      } text-white`}
                    >
                      <step.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4 flex-grow">
                    <h4 className="text-lg leading-6 font-medium text-gray-900">{t(step.title)}</h4>
                    <p className="mt-2 text-base text-gray-500">{t(step.description)}</p>
                  </div>
                  <button
                    onClick={() => toggleStepCompletion(index)}
                    className={`ml-4 p-2 rounded-full ${
                      completedSteps.includes(index) ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600"
                    } hover:bg-opacity-80 transition-colors`}
                  >
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <AlertCircle className="h-6 w-6" />
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/support"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-wyncell-primary hover:bg-wyncell-secondary"
          >
            <HelpCircle className="h-5 w-5 mr-2" />
            {t("needHelp")}
          </Link>
          <Link
            href="/check-eligibility"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-wyncell-primary bg-white hover:bg-gray-50"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            {t("checkEligibility")}
          </Link>
        </div>
      </div>
    </div>
  )
}

