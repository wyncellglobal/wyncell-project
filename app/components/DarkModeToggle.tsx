"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { motion } from "framer-motion"

interface DarkModeToggleProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

export default function DarkModeToggle({ isDarkMode, toggleDarkMode }: DarkModeToggleProps) {
  return (
    <motion.button
      onClick={toggleDarkMode}
      className="fixed bottom-8 right-8 p-3 rounded-full bg-white dark:bg-gray-800 text-wyncell-primary dark:text-white shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? <SunIcon size={24} /> : <MoonIcon size={24} />}
    </motion.button>
  )
}

