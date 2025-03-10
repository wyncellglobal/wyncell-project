"use client"

import { useEffect } from "react"
import { useCurrentRoute } from "../hooks/useCurrentRoute"

declare global {
  interface Window {
    Tawk_API?: any
    Tawk_LoadStart?: Date
  }
}

export default function TawkToClient() {
  const currentRoute = useCurrentRoute()

  useEffect(() => {
    const allowedRoutes = ["/checkout", "/support"]
    if (!allowedRoutes.includes(currentRoute)) {
      return
    }

    if (typeof window !== "undefined") {
      const s1 = document.createElement("script")
      const s0 = document.getElementsByTagName("script")[0]
      s1.async = true
      s1.src = "https://embed.tawk.to/67c7750360b3c31910a7773b/1ilhi254a"
      s1.charset = "UTF-8"
      s1.setAttribute("crossorigin", "*")
      s0.parentNode?.insertBefore(s1, s0)

      return () => {
        // Remove the script when component unmounts or route changes
        s1.remove()
        if (window.Tawk_API) {
          window.Tawk_API.hideWidget()
        }
      }
    }
  }, [currentRoute])

  return null
}

