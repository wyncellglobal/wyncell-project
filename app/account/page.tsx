"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import PastOrders from "../components/PastOrders"
import { supabase } from "../utils/supabase"

export default function AccountPage() {
  const { t } = useTranslation()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }

    fetchUser()
  }, [])

  if (!user) return <div>{t("loading")}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t("accountPage")}</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">{t("accountInfo")}</h2>
        <p>
          <strong>{t("email")}:</strong> {user.email}
        </p>
      </div>
      <PastOrders userEmail={user.email} />
    </div>
  )
}

