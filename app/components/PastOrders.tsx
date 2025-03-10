"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

interface Order {
  id: string
  name: string
  email: string
  order_id: string
  payment_status: string
  plan_type: string
  created_at: string
}

export default function PastOrders({ userEmail }: { userEmail: string }) {
  const { t } = useTranslation()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/customer-orders?email=${encodeURIComponent(userEmail)}`)
        if (!response.ok) throw new Error("Failed to fetch orders")
        const data = await response.json()
        setOrders(data.orders)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [userEmail])

  if (isLoading) return <div>{t("loading")}</div>

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{t("pastOrders")}</h2>
      {orders.length === 0 ? (
        <p>{t("noOrders")}</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="bg-white shadow rounded-lg p-4">
              <p>
                <strong>{t("orderID")}:</strong> {order.order_id}
              </p>
              <p>
                <strong>{t("planType")}:</strong> {order.plan_type}
              </p>
              <p>
                <strong>{t("paymentStatus")}:</strong> {order.payment_status}
              </p>
              <p>
                <strong>{t("orderDate")}:</strong> {new Date(order.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

