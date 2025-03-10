import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function Header() {
  const { t } = useTranslation()
  return (
    <header>
      <div className="bg-wyncell-dark">
        {/* Utility Bar */}
        <div className="container mx-auto px-4 py-2 flex justify-end items-center space-x-6">
          <Link href="/activation" className="utility-link">
            {t("activation")}
          </Link>
          <Link href="/byod" className="utility-link">
            {t("bringYourOwnDevice")}
          </Link>
          <Link href="/signin" className="utility-link">
            {t("signIn")}
          </Link>
          <Link href="/register" className="utility-link">
            {t("register")}
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-wyncell-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-white font-bold text-xl">WYNCELL TELECOM</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link">
              {t("home")}
            </Link>
            <Link href="/phones-and-devices" className="nav-link">
              {t("phonesAndDevices")}
            </Link>
            <Link href="/plans" className="nav-link">
              {t("plans")}
            </Link>
            <Link href="/support" className="nav-link">
              {t("support")}
            </Link>
            <Link href="/esim-guide" className="nav-link">
              {t("esimGuide")}
            </Link>
            <Link href="/cart" className="nav-link">
              <ShoppingCart className="w-6 h-6" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

