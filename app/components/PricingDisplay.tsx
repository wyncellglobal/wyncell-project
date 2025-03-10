"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Info } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import UserInfoForm from "./UserInfoForm"
import { supabase } from "../utils/supabase"

interface PricingDisplayProps {
  country: string
  countryCode: string
  dataRatePerGB: number
  currency: string
  currencySymbol: string
  onGetData: (plan: string, duration: number, totalPrice: number) => void
}

const dataPlanOptions = [1, 5, 10, 20]
const durationOptions = [5, 10, 15, 30]

const getDurationMultiplier = (duration: number) => {
  switch (duration) {
    case 5:
      return 1.25 // 25% increase
    case 10:
      return 1.3 // 30% increase
    case 15:
      return 1.32 // 32% increase
    case 30:
      return 1.35 // 35% increase
    default:
      return 1
  }
}

export default function PricingDisplay({
  country,
  countryCode,
  dataRatePerGB,
  currency,
  currencySymbol,
  onGetData,
}: PricingDisplayProps) {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null)
  const [totalPrice, setTotalPrice] = useState<number | null>(null)
  const [showUserInfoForm, setShowUserInfoForm] = useState(false)
  const [showDevicePrompt, setShowDevicePrompt] = useState(false)
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    if (selectedPlan && selectedDuration) {
      const durationMultiplier = getDurationMultiplier(selectedDuration)
      const calculatedPrice = dataRatePerGB * selectedPlan * durationMultiplier
      setTotalPrice(calculatedPrice)
    } else {
      setTotalPrice(null)
    }
  }, [selectedPlan, selectedDuration, dataRatePerGB])

  const handlePlanSelection = (plan: number) => {
    setSelectedPlan(plan)
  }

  const handleDurationSelection = (duration: number) => {
    setSelectedDuration(duration)
  }

  const handleGetData = async () => {
    if (selectedPlan && selectedDuration && totalPrice) {
      // Check if user is already signed in
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        // User is signed in, skip the form and go directly to device prompt
        onGetData(`${selectedPlan}GB`, selectedDuration, totalPrice)
        setShowDevicePrompt(true)
      } else {
        // User is not signed in, show the form
        onGetData(`${selectedPlan}GB`, selectedDuration, totalPrice)
        setShowUserInfoForm(true)
      }
    }
  }

  const handleUserInfoSubmit = (userInfo: { name: string; email: string; phone: string }) => {
    // Here you would typically save the user info to your state management or API
    console.log("User Info:", userInfo)
    setShowUserInfoForm(false)
    setShowDevicePrompt(true)
  }

  const handleDevicePromptResponse = (addDevice: boolean) => {
    setShowDevicePrompt(false)
    if (addDevice) {
      router.push("/device-selection")
    } else {
      router.push("/checkout")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 bg-white bg-opacity-90 p-6 rounded-2xl max-w-md w-full shadow-2xl card-3d"
    >
      <p className="text-lg font-semibold mb-4 flex items-center">
        <Info className="w-5 h-5 mr-2 text-wyncell-primary" />
        {t("selectPlanAndDuration")}
      </p>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Image
            src={`https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`}
            alt={`${country} flag`}
            width={80}
            height={50}
            className="rounded"
          />
          <h2 className="text-2xl font-bold text-gray-800">{country}</h2>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Info className="w-5 h-5 mr-2 text-[#00ACCD]" />
            {t("whatIsESIM")}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{t("esimDescription")}</p>
          <Link
            href="/phone-compatibility"
            className="text-[#00ACCD] hover:underline text-sm font-medium inline-flex items-center"
          >
            {t("checkPhoneCompatibility")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t("dataPlan")}</h3>
        <div className="grid grid-cols-2 gap-4">
          {dataPlanOptions.map((plan) => (
            <button
              key={plan}
              className={`p-3 rounded-lg text-lg font-medium transition-colors ${
                selectedPlan === plan ? "bg-wyncell-primary text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => handlePlanSelection(plan)}
            >
              {plan}GB
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t("duration")}</h3>
        <div className="grid grid-cols-2 gap-4">
          {durationOptions.map((duration) => (
            <button
              key={duration}
              className={`p-3 rounded-lg text-lg font-medium transition-colors ${
                selectedDuration === duration
                  ? "bg-wyncell-primary text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => handleDurationSelection(duration)}
            >
              {duration} {t("days")}
            </button>
          ))}
        </div>
      </div>

      {(!selectedPlan || !selectedDuration) && (
        <p className="text-sm text-gray-500 mb-2">
          {!selectedPlan && !selectedDuration
            ? t("selectPlanAndDurationPrompt")
            : !selectedPlan
              ? t("selectPlanPrompt")
              : t("selectDurationPrompt")}
        </p>
      )}

      {totalPrice !== null && (
        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold mb-2">{t("totalPrice")}</h3>
          <p className="text-3xl font-bold text-[#00ACCD]">
            {currencySymbol}
            {totalPrice.toFixed(2)} {currency}
          </p>
        </div>
      )}

      <button
        className={`w-full p-3 rounded-lg text-lg font-medium transition-colors ${
          selectedPlan && selectedDuration
            ? "bg-wyncell-primary text-white hover:bg-wyncell-secondary"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={handleGetData}
        disabled={!selectedPlan || !selectedDuration}
      >
        {t("getDataPlan")}
      </button>

      {showUserInfoForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl">
            <h2 className="text-xl font-bold mb-4">{t("enterYourInfo")}</h2>
            <UserInfoForm onSubmit={handleUserInfoSubmit} />
          </div>
        </div>
      )}

      {showDevicePrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">{t("addDevicePrompt")}</h2>
            <div className="flex justify-between">
              <button
                className="bg-[#00ACCD] text-white px-4 py-2 rounded-lg"
                onClick={() => handleDevicePromptResponse(true)}
              >
                {t("yesAddDevice")}
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                onClick={() => handleDevicePromptResponse(false)}
              >
                {t("noThanks")}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

