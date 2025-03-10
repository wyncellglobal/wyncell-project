"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { MessageCircle, Ticket, Phone, HelpCircle, Search } from "lucide-react"

export default function Support() {
  const { t } = useTranslation()
  const [orderNumber, setOrderNumber] = useState("")

  const handleOrderStatusCheck = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically check the order status
    console.log("Checking order status for:", orderNumber)
    // Reset form after submission
    setOrderNumber("")
    // You might want to show the order status to the user here
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">{t("support")}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6 text-center">
              <MessageCircle className="h-12 w-12 text-wyncell-primary mx-auto mb-4" />
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">{t("liveChat")}</h3>
              <p className="text-sm text-gray-500 mb-4">{t("liveChatDescription")}</p>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-wyncell-primary hover:bg-wyncell-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wyncell-primary">
                {t("startChat")}
              </button>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6 text-center">
              <Ticket className="h-12 w-12 text-wyncell-primary mx-auto mb-4" />
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">{t("submitTicket")}</h3>
              <p className="text-sm text-gray-500 mb-4">{t("submitTicketDescription")}</p>
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-wyncell-primary hover:bg-wyncell-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wyncell-primary"
              >
                {t("createTicket")}
              </Link>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6 text-center">
              <Phone className="h-12 w-12 text-wyncell-primary mx-auto mb-4" />
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">{t("callSupport")}</h3>
              <p className="text-sm text-gray-500 mb-4">{t("callSupportDescription")}</p>
              <p className="text-lg font-semibold text-wyncell-primary">+1 (800) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">{t("quickLinks")}</h2>
            <div className="space-y-4">
              <Link href="/faq" className="flex items-center text-wyncell-primary hover:text-wyncell-secondary">
                <HelpCircle className="h-5 w-5 mr-2" />
                {t("frequentlyAskedQuestions")}
              </Link>
              <Link href="/esim-guide" className="flex items-center text-wyncell-primary hover:text-wyncell-secondary">
                <HelpCircle className="h-5 w-5 mr-2" />
                {t("eSIMGuide")}
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">{t("checkOrderStatus")}</h2>
            <form onSubmit={handleOrderStatusCheck} className="mt-5 sm:flex sm:items-center">
              <div className="w-full sm:max-w-xs">
                <label htmlFor="orderNumber" className="sr-only">
                  {t("orderNumber")}
                </label>
                <input
                  type="text"
                  name="orderNumber"
                  id="orderNumber"
                  className="shadow-sm focus:ring-wyncell-primary focus:border-wyncell-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder={t("enterOrderNumber")}
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-wyncell-primary hover:bg-wyncell-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wyncell-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                <Search className="h-5 w-5 mr-2" />
                {t("checkStatus")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

