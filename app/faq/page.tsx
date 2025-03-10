"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "whatIsESIM",
    answer: "whatIsESIMAnswer",
  },
  {
    question: "howToActivateESIM",
    answer: "howToActivateESIMAnswer",
  },
  {
    question: "countriesCovered",
    answer: "countriesCoveredAnswer",
  },
  {
    question: "dataSpeedAndCoverage",
    answer: "dataSpeedAndCoverageAnswer",
  },
  {
    question: "changePlan",
    answer: "changePlanAnswer",
  },
  {
    question: "cancelSubscription",
    answer: "cancelSubscriptionAnswer",
  },
]

export default function FAQ() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const filteredFaqs = faqs.filter(
    (faq) =>
      t(faq.question).toLowerCase().includes(searchTerm.toLowerCase()) ||
      t(faq.answer).toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">{t("frequentlyAskedQuestions")}</h1>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-wyncell-primary focus:border-wyncell-primary"
              placeholder={t("searchFAQs")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <button
                className="w-full px-4 py-5 sm:px-6 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{t(faq.question)}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-5 sm:px-6">
                  <p className="text-base text-gray-500">{t(faq.answer)}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFaqs.length === 0 && <p className="text-center text-gray-500 mt-4">{t("noFAQsFound")}</p>}

        <div className="mt-8 text-center">
          <Link
            href="/support"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-wyncell-primary hover:bg-wyncell-secondary"
          >
            <HelpCircle className="h-5 w-5 mr-2" />
            {t("needMoreHelp")}
          </Link>
        </div>
      </div>
    </div>
  )
}

