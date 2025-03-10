"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"

const steps = [
  {
    title: "Purchase an eSIM plan",
    content: "Visit our website and select the eSIM plan that best suits your needs. Complete the purchase process.",
  },
  {
    title: "Receive your QR code",
    content: "After purchase, you'll receive an email with a QR code or an activation code for your eSIM.",
  },
  {
    title: "Go to your phone settings",
    content:
      "On your device, go to Settings > Cellular > Add Cellular Plan or Settings > Connections > SIM Manager > Add eSIM.",
  },
  {
    title: "Scan the QR code",
    content:
      "Select 'Scan QR Code' on your device and scan the QR code you received. If you have an activation code, enter it manually.",
  },
  {
    title: "Confirm installation",
    content:
      "Your device will confirm that you want to add the new eSIM plan. Confirm to proceed with the installation.",
  },
  {
    title: "Set up your eSIM",
    content:
      "Choose a label for your new eSIM (e.g., 'Travel eSIM') and select whether to use it as your default line for calls, messages, and data.",
  },
  {
    title: "Activate your eSIM",
    content:
      "Your eSIM is now installed. To activate it, ensure you're connected to Wi-Fi, then toggle on the eSIM in your cellular settings.",
  },
  {
    title: "Ready to use",
    content: "Your eSIM is now active and ready to use. Enjoy your mobile data in your destination country!",
  },
]

export default function ESIMGuide() {
  const [currentStep, setCurrentStep] = useState(0)
  const { t } = useTranslation()

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#00ACCD] hover:text-[#0090AB] transition-colors flex items-center mb-8">
          <ChevronLeft size={20} />
          <span>{t("backToHome")}</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t("esimGuideTitle")}</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {t("step")} {currentStep + 1}: {t(steps[currentStep].title)}
            </h2>
            <p className="text-gray-600 mb-6">{t(steps[currentStep].content)}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center ${
                  currentStep === 0 ? "text-gray-400 cursor-not-allowed" : "text-[#00ACCD] hover:text-[#0090AB]"
                }`}
              >
                <ChevronLeft size={20} />
                <span>{t("previous")}</span>
              </button>
              <div className="text-gray-500">
                {currentStep + 1} / {steps.length}
              </div>
              <button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className={`flex items-center ${
                  currentStep === steps.length - 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#00ACCD] hover:text-[#0090AB]"
                }`}
              >
                <span>{t("next")}</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="bg-gray-100 px-6 py-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div
                className="bg-[#00ACCD] h-2.5 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

