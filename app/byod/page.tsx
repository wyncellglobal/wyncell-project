"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, Loader } from "lucide-react"

interface FormData {
  imei: string
}

// Mock API function to check device compatibility
const checkDeviceCompatibility = async (imei: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))
  // For demonstration, consider IMEIs starting with '1' as compatible
  return imei.startsWith("1")
}

export default function BYOD() {
  const { t } = useTranslation()
  const [isChecking, setIsChecking] = useState(false)
  const [checkResult, setCheckResult] = useState<"compatible" | "incompatible" | null>(null)
  const [recentLookups, setRecentLookups] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  useEffect(() => {
    const storedLookups = localStorage.getItem("imeiLookups")
    if (storedLookups) {
      setRecentLookups(JSON.parse(storedLookups))
    }
  }, [])

  const onSubmit = async (data: FormData) => {
    setIsChecking(true)
    try {
      const isCompatible = await checkDeviceCompatibility(data.imei)
      setCheckResult(isCompatible ? "compatible" : "incompatible")

      // Update recent lookups
      const updatedLookups = [data.imei, ...recentLookups.slice(0, 4)]
      setRecentLookups(updatedLookups)
      localStorage.setItem("imeiLookups", JSON.stringify(updatedLookups))
    } catch (error) {
      console.error("Error checking device compatibility:", error)
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow"
        >
          <h1 className="text-2xl font-bold text-center mb-6">{t("checkDeviceCompatibility")}</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="imei" className="block text-sm font-medium text-gray-700">
                {t("imeiNumber")}
              </label>
              <input
                type="text"
                id="imei"
                {...register("imei", {
                  required: t("imeiRequired"),
                  pattern: {
                    value: /^[0-9]{15,17}$/,
                    message: t("invalidImei"),
                  },
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-wyncell-primary focus:border-wyncell-primary sm:text-sm"
                placeholder={t("enterImei")}
              />
              {errors.imei && <p className="mt-2 text-sm text-red-600">{errors.imei.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isChecking}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-wyncell-primary hover:bg-wyncell-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wyncell-primary"
            >
              {isChecking ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  {t("checking")}
                </>
              ) : (
                t("checkCompatibility")
              )}
            </button>
          </form>

          {checkResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mt-6 p-4 rounded-md ${checkResult === "compatible" ? "bg-green-50" : "bg-red-50"}`}
            >
              {checkResult === "compatible" ? (
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  <p className="text-green-800">{t("deviceCompatible")}</p>
                </div>
              ) : (
                <div className="flex items-center">
                  <XCircle className="h-5 w-5 text-red-400 mr-2" />
                  <p className="text-red-800">{t("deviceIncompatible")}</p>
                </div>
              )}
              {checkResult === "compatible" && (
                <Link href="/plans" className="mt-2 inline-block text-wyncell-primary hover:underline">
                  {t("viewPlans")}
                </Link>
              )}
              {checkResult === "incompatible" && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{t("alternativeRecommendations")}</p>
                  <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
                    <li>{t("checkImeiAgain")}</li>
                    <li>{t("contactSupport")}</li>
                    <li>{t("exploreCompatibleDevices")}</li>
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {recentLookups.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2">{t("recentLookups")}</h2>
              <ul className="space-y-1">
                {recentLookups.map((imei, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {imei}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

