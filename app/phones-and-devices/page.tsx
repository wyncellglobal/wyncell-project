"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"

const devices = [
  {
    id: 1,
    name: "iPhone 13",
    price: 799,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iphone-13-IfSBodyc5DwPCkjKwPQN3T34Fn75OU.jpg",
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    price: 699,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/samsung-s21-IfSBodyc5DwPCkjKwPQN3T34Fn75OU.jpg",
  },
  {
    id: 3,
    name: "Google Pixel 6",
    price: 599,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pixel-6-IfSBodyc5DwPCkjKwPQN3T34Fn75OU.jpg",
  },
  {
    id: 4,
    name: "OnePlus 9",
    price: 729,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oneplus-9-IfSBodyc5DwPCkjKwPQN3T34Fn75OU.jpg",
  },
  {
    id: 5,
    name: "Xiaomi Mi 11",
    price: 749,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xiaomi-mi11-IfSBodyc5DwPCkjKwPQN3T34Fn75OU.jpg",
  },
  {
    id: 6,
    name: "Sony Xperia 1 III",
    price: 1299,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sony-xperia-1-iii-IfSBodyc5DwPCkjKwPQN3T34Fn75OU.jpg",
  },
]

export default function PhonesAndDevices() {
  const { t } = useTranslation()
  const [selectedDevices, setSelectedDevices] = useState<number[]>([])

  const toggleDevice = (deviceId: number) => {
    setSelectedDevices((prev) => (prev.includes(deviceId) ? prev.filter((id) => id !== deviceId) : [...prev, deviceId]))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t("phonesAndDevices")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <motion.div
            key={device.id}
            className={`border rounded-lg p-4 ${
              selectedDevices.includes(device.id) ? "border-[#00ACCD]" : "border-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={device.image || "/placeholder.svg"}
              alt={device.name}
              width={300}
              height={300}
              className="mb-4 rounded-lg object-cover w-full h-64"
            />
            <h2 className="text-xl font-semibold mb-2">{device.name}</h2>
            <p className="text-lg mb-4">${device.price}</p>
            <button
              className={`w-full py-2 rounded-full ${
                selectedDevices.includes(device.id)
                  ? "bg-[#00ACCD] text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => toggleDevice(device.id)}
            >
              {selectedDevices.includes(device.id) ? t("selected") : t("addToCart")}
            </button>
          </motion.div>
        ))}
      </div>
      {selectedDevices.length > 0 && (
        <div className="mt-8 text-center">
          <Link
            href="/cart"
            className="bg-[#00ACCD] text-white px-6 py-3 rounded-full hover:bg-[#0090AB] transition-colors inline-block"
          >
            {t("viewCart")}
          </Link>
        </div>
      )}
    </div>
  )
}

