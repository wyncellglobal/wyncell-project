"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function SharedHeader() {
  const { t, i18n } = useTranslation()
  const [userCurrency, setUserCurrency] = useState("USD")
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const currencyDropdownRef = useRef<HTMLDivElement>(null)
  const languageDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setIsCurrencyDropdownOpen(false)
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const currencies = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setIsLanguageDropdownOpen(false)
  }

  // Get the current language, defaulting to 'en' if not set
  const currentLanguage = i18n?.language || "en"

  return (
    <header className="bg-white bg-opacity-90 text-wyncell-dark shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Wyncell%20(2)-nmRkExoPYDMYJMku2tQxuZIuvvsYQX.png"
              alt="Wyncell Logo"
              width={320}
              height={80}
              className="h-16 w-auto"
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/plans" className="text-wyncell-dark font-medium hover:text-wyncell-primary transition-colors">
              {t("plans")}
            </Link>
            <Link
              href="/about-us"
              className="text-wyncell-dark font-medium hover:text-wyncell-primary transition-colors"
            >
              {t("aboutUs")}
            </Link>
            <Link
              href="/phones-and-devices"
              className="text-wyncell-dark font-medium hover:text-wyncell-primary transition-colors"
            >
              {t("products")}
            </Link>
            {/* Currency and Language dropdowns */}
            {/* ... (keep existing dropdown code) */}
          </nav>
          <button className="md:hidden text-wyncell-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white bg-opacity-95 shadow-md">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/plans"
                className="text-wyncell-dark font-medium hover:text-wyncell-primary transition-colors"
              >
                {t("plans")}
              </Link>
              <Link
                href="/about-us"
                className="text-wyncell-dark font-medium hover:text-wyncell-primary transition-colors"
              >
                {t("aboutUs")}
              </Link>
              <Link
                href="/phones-and-devices"
                className="text-wyncell-dark font-medium hover:text-wyncell-primary transition-colors"
              >
                {t("products")}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

