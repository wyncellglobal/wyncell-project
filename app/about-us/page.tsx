"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { supabase } from "../utils/supabaseClient"

interface TeamMember {
  id: number
  name: string
  role: string
  image_url: string
}

export default function AboutUs() {
  const { t } = useTranslation()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const { data, error } = await supabase.from("team_members").select("*").order("id")

        if (error) throw error

        setTeamMembers(data || [])
      } catch (error) {
        console.error("Error fetching team members:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {t("aboutUs")}
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">{t("aboutUsSubtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white overflow-hidden shadow rounded-lg mb-12"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="md:flex md:items-center">
              <div className="md:flex-shrink-0">
                <Image
                  className="h-48 w-full object-cover md:w-48 rounded-lg"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company-overview-IfSBodyc5DwPCkjKwPQN3T34Fn75OU.jpg"
                  alt="Company Overview"
                  width={192}
                  height={192}
                />
              </div>
              <div className="mt-4 md:mt-0 md:ml-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("companyOverview")}</h2>
                <p className="text-gray-600">{t("companyOverviewText")}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("ourMission")}</h2>
              <p className="text-gray-600">{t("ourMissionText")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("ourValues")}</h2>
              <ul className="list-disc list-inside text-gray-600">
                <li>{t("value1")}</li>
                <li>{t("value2")}</li>
                <li>{t("value3")}</li>
                <li>{t("value4")}</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t("ourTeam")}</h2>
          {isLoading ? (
            <div className="text-center">
              <motion.div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </motion.div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <Image
                    className="h-48 w-full object-cover"
                    src={member.image_url || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={200}
                  />
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-wyncell-primary hover:bg-wyncell-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wyncell-primary"
          >
            {t("contactUs")}
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

