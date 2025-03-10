import { useTranslation } from "react-i18next"
import { Users } from "lucide-react"

interface FamilyComboProps {
  country: string
}

export default function FamilyCombo({ country }: FamilyComboProps) {
  const { t } = useTranslation()

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Users className="text-wyncell-primary mr-2" />
        {t("familyFriendsCombo")}
      </h2>
      <p className="mb-4">{t("travelTogetherAndSave", { country })}</p>
      <ul className="space-y-2">
        <li className="flex items-center">
          <span className="bg-wyncell-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
            2
          </span>
          <span>{t("buyPlansGetOff", { plans: 2, percent: 10 })}</span>
        </li>
        <li className="flex items-center">
          <span className="bg-wyncell-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
            3
          </span>
          <span>{t("buyPlansGetOff", { plans: 3, percent: 15 })}</span>
        </li>
        <li className="flex items-center">
          <span className="bg-wyncell-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
            4+
          </span>
          <span>{t("buyPlansGetOff", { plans: 4, percent: 20 })}</span>
        </li>
      </ul>
      <button className="mt-4 bg-wyncell-primary text-white px-6 py-2 rounded-full hover:bg-wyncell-secondary transition-colors">
        {t("addGroupPlan")}
      </button>
    </div>
  )
}

