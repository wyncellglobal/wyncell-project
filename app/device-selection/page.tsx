"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"

const devices = [
  { id: 1, name: "iPhone 13", price: 799, image: "/images/devices/iphone-13.jpg" },
  { id: 2, name: "Samsung Galaxy S21", price: 699, image: "/images/devices/samsung-s21.jpg" },
  { id: 3, name: "Google Pixel 6", price: 599, image: "/images/devices/pixel-6.jpg" },
  { id: 4, name: "OnePlus 9", price: 729, image: "/images/devices/oneplus-9.jpg" },
  { id: 5, name: "Xiaomi Mi 11", price: 749, image: "/images/devices/xiaomi-mi11.jpg" },
  { id: 6, name: "Sony Xperia 1 III", price: 1299, image: "/images/devices/sony-xperia-1-iii.jpg" },
]

export default function DeviceSelection() {
  const { t } = useTranslation()
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null)
  const router = useRouter()

  const handleDeviceSelect = (deviceId: number) => {
    setSelectedDevice(deviceId)
  }

  const handleContinue = () => {
    if (selectedDevice) {
      // In a real application, you would save the selected device to your cart or order state
      console.log(`Selected device: ${selectedDevice}`)
      router.push("/checkout")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t("selectDevice")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <motion.div
            key={device.id}
            className={`border rounded-lg p-4 ${selectedDevice === device.id ? "border-[#00ACCD]" : "border-gray-200"}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDeviceSelect(device.id)}
          >
            <Image
              src={device.image || "/placeholder.svg"}
              alt={device.name}
              width={300}
              height={300}
              className="mb-4 rounded-lg"
            />
            <h2 className="text-xl font-semibold mb-2">{device.name}</h2>
            <p className="text-lg mb-4">${device.price}</p>
            <button
              className={`w-full py-2 rounded-full ${
                selectedDevice === device.id ? "bg-[#00ACCD] text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {selectedDevice === device.id ? t("selected") : t("select")}
            </button>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleContinue}
          disabled={!selectedDevice}
          className={`bg-[#00ACCD] text-white px-6 py-3 rounded-full hover:bg-[#0090AB] transition-colors inline-block ${
            !selectedDevice ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {t("continueToCheckout")}
        </button>
      </div>
    </div>
  )
}

