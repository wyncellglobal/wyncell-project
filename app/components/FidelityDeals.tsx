import { useTranslation } from "react-i18next"
import { Star } from "lucide-react"

interface FidelityDealsProps {
  country: string
}

export default function FidelityDeals({ country }: FidelityDealsProps) {
  const { t } = useTranslation()

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Star className="text-yellow-400 mr-2" />
        {t("fidelityDealsFor", { country })}
      </h2>
      <p className="mb-4">{t("unlockExclusiveBenefits")}</p>
      <ul className="space-y-2">
        <li className="flex items-center">
          <Star className="text-yellow-400 mr-2" size={16} />
          <span>{t("offNextPurchase", { percent: 10 })}</span>
        </li>
        <li className="flex items-center">
          <Star className="text-yellow-400 mr-2" size={16} />
          <span>{t("freeDataBoost", { amount: "1GB" })}</span>
        </li>
      </ul>
      <button className="mt-4 text-wyncell-primary font-semibold hover:underline">{t("showMore")}</button>
    </div>
  )
}

