"use client"

import { usePathname } from "next/navigation"

export function useCurrentRoute() {
  const pathname = usePathname()
  return pathname
}

