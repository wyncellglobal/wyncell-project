"use client"

import type React from "react"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import Link from "next/link"
import { Search, Package, ArrowLeft, CheckCircle, Clock, XCircle } from "lucide-react"
import { supabase } from "../utils/supabaseClient"

interface Order {
  id: string
  customer_name: string
  order_date: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  estimated_delivery: string
  payment_status: "paid" | "pending" | "failed"
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
}

export default function OrderTracking() {
  const { t } = useTranslation()
  const [orderId, setOrderId] = useState("")
  const [order, setOrder] = useState<Order | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  const handleOrderSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setOrder(null)

    try {
      const { data, error } = await supabase.from("orders").select("*").eq("id", orderId).single()

      if (error) throw error

      if (data) {
        setOrder(data as Order)
        updateRecentSearches(orderId)
      } else {
        setError(t("orderNotFound"))
      }
    } catch (error) {
      console.error("Error fetching order:", error)
      setError(t("errorFetchingOrder"))
    } finally {
      setIsLoading(false)
    }
  }

  const updateRecentSearches = (newSearch: string) => {
    const updatedSearches = [newSearch, ...recentSearches.filter((id) => id !== newSearch)].slice(0, 5)
    setRecentSearches(updatedSearches)
    localStorage.setItem("recentOrderSearches", JSON.stringify(updatedSearches))
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return "text-yellow-500"
      case "shipped":
        return "text-blue-500"
      case "delivered":
        return "text-green-500"
      case "cancelled":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "shipped":
        return <Package className="h-5 w-5 text-blue-500" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getPaymentStatusColor = (status: Order["payment_status"]) => {
    switch (status) {
      case "paid":
        return "text-green-500"
      case "pending":
        return "text-yellow-500"
      case "failed":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-wyncell-primary hover:text-wyncell-secondary mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t("backToHome")}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <h1 className="text-3xl font-bold text-center mb-8">{t("trackYourOrder")}</h1>

          <form onSubmit={handleOrderSearch} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder={t("enterOrderId")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wyncell-primary"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-wyncell-primary text-white px-6 py-2 rounded-md hover:bg-wyncell-secondary transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("searching")}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Search className="h-4 w-4 mr-2" />
                    {t("trackOrder")}
                  </span>
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">{t("orderIdFormat")}</p>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6"
            >
              <p className="flex items-center">
                <XCircle className="h-5 w-5 mr-2" />
                {error}
              </p>
              <p className="text-sm mt-2">{t("checkOrderIdAndTryAgain")}</p>
            </motion.div>
          )}

          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h2 className="text-xl font-semibold">{t("orderDetails")}</h2>
                  <div className="flex items-center mt-2 sm:mt-0">
                    {getStatusIcon(order.status)}
                    <span className={`ml-2 font-medium ${getStatusColor(order.status)}`}>{t(order.status)}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">{t("orderId")}</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("orderDate")}</p>
                    <p className="font-medium">{new Date(order.order_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("estimatedDelivery")}</p>
                    <p className="font-medium">{new Date(order.estimated_delivery).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("paymentStatus")}</p>
                    <p className={`font-medium ${getPaymentStatusColor(order.payment_status)}`}>
                      {t(order.payment_status)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium mb-2">{t("orderItems")}</h3>
                  <ul className="divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <li key={index} className="py-3 flex justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {t("quantity")}: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between font-bold mt-4 pt-4 border-t border-gray-200">
                    <p>{t("total")}</p>
                    <p>${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {recentSearches.length > 0 && !order && !error && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">{t("recentSearches")}</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((id) => (
                  <button
                    key={id}
                    onClick={() => {
                      setOrderId(id)
                      handleOrderSearch({ preventDefault: () => {} } as React.FormEvent)
                    }}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">{t("needHelp")}</p>
            <Link href="/support" className="text-wyncell-primary hover:text-wyncell-secondary font-medium">
              {t("contactSupport")}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

