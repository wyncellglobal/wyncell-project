"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"

interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  image: string
}

export default function Cart() {
  const { t } = useTranslation()
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item)),
    )
  }

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">{t("yourCart")}</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-2 text-lg font-medium text-gray-900">{t("cartEmpty")}</h2>
            <p className="mt-1 text-sm text-gray-500">{t("startShoppingMessage")}</p>
            <div className="mt-6">
              <Link
                href="/plans"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-wyncell-primary hover:bg-wyncell-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wyncell-primary"
              >
                {t("continueShopping")}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center bg-white p-4 shadow rounded-lg mb-4"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div className="ml-4 flex-grow">
                    <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="mx-2 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="ml-4 p-2 text-red-500 hover:text-red-700">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="mt-8 bg-white p-4 shadow rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">{t("subtotal")}</span>
                <span className="text-xl font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Link
                  href="/plans"
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-wyncell-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wyncell-primary"
                >
                  {t("continueShopping")}
                </Link>
                <Link
                  href="/checkout"
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-wyncell-primary hover:bg-wyncell-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wyncell-primary"
                >
                  {t("proceedToCheckout")}
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

