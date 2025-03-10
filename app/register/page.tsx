"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"

type FormData = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

// Mock user creation function
const mockCreateUser = async (userData: Omit<FormData, "confirmPassword" | "agreeTerms">): Promise<boolean> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // For demo purposes, consider any valid data as successful registration
  return true
}

export default function Register() {
  const { t } = useTranslation()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()
  const password = watch("password")

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError("")

    try {
      const { confirmPassword, agreeTerms, ...userData } = data
      const isRegistered = await mockCreateUser(userData)
      if (isRegistered) {
        router.push("/")
      } else {
        setError(t("registrationFailed"))
      }
    } catch (error) {
      setError(t("registrationError"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{t("createAccount")}</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                {t("fullName")}
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  {...register("fullName", { required: t("fullNameRequired") })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-wyncell-primary focus:border-wyncell-primary sm:text-sm"
                />
                {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t("email")}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: t("emailRequired") })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-wyncell-primary focus:border-wyncell-primary sm:text-sm"
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t("password")}
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("password", {
                    required: t("passwordRequired"),
                    minLength: { value: 8, message: t("passwordMinLength") },
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-wyncell-primary focus:border-wyncell-primary sm:text-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                {t("confirmPassword")}
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: t("confirmPasswordRequired"),
                    validate: (value) => value === password || t("passwordsMustMatch"),
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-wyncell-primary focus:border-wyncell-primary sm:text-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agreeTerms"
                type="checkbox"
                {...register("agreeTerms", { required: t("agreeToTermsRequired") })}
                className="h-4 w-4 text-wyncell-primary focus:ring-wyncell-primary border-gray-300 rounded"
              />
              <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-900">
                {t("agreeToTerms")}{" "}
                <Link href="/terms" className="font-medium text-wyncell-primary hover:text-wyncell-secondary">
                  {t("termsAndConditions")}
                </Link>
              </label>
            </div>
            {errors.agreeTerms && <p className="mt-2 text-sm text-red-600">{errors.agreeTerms.message}</p>}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-wyncell-primary hover:bg-wyncell-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wyncell-primary"
              >
                {isLoading ? t("registering") : t("register")}
              </button>
            </div>
          </form>

          {error && <div className="mt-4 text-center text-sm text-red-600">{error}</div>}
        </motion.div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {t("alreadyHaveAccount")}{" "}
          <Link href="/signin" className="font-medium text-wyncell-primary hover:text-wyncell-secondary">
            {t("signInHere")}
          </Link>
        </p>
      </div>
    </div>
  )
}

