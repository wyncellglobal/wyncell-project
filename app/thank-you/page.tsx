"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function ThankYou() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    const session_id = searchParams.get("session_id")
    if (session_id) {
      setSessionId(session_id)
      // Here you would typically make an API call to your backend to verify the session
      // and retrieve order details. For this example, we'll just simulate it:
      setOrderDetails({
        id: session_id,
        total: "$XX.XX",
        items: ["Item 1", "Item 2"],
      })
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{t("thankYou")}</h2>
          <p className="mt-2 text-center text-sm text-gray-600">{t("orderConfirmation")}</p>
          {orderDetails && (
            <div className="mt-4">
              <p>Order ID: {orderDetails.id}</p>
              <p>Total: {orderDetails.total}</p>
              <p>Items:</p>
              <ul>
                {orderDetails.items.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-6">
            <Link
              href="/"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-wyncell-primary hover:bg-wyncell-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wyncell-primary"
            >
              {t("backToHome")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

