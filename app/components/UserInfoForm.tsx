import type React from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

interface UserInfo {
  name: string
  email: string
  phone: string
}

interface UserInfoFormProps {
  onSubmit: (userInfo: UserInfo) => void
}

export default function UserInfoForm({ onSubmit }: UserInfoFormProps) {
  const { t } = useTranslation()
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(userInfo)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {t("name")}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={userInfo.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {t("email")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={userInfo.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          {t("phone")}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={userInfo.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#00ACCD] text-white px-4 py-2 rounded-md hover:bg-[#0090AB] transition-colors"
      >
        {t("continue")}
      </button>
    </form>
  )
}

