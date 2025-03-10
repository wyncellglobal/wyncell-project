import type React from "react"
import SharedHeader from "./components/SharedHeader"
import SharedFooter from "./components/SharedFooter"
import { I18nProvider } from "./components/I18nProvider"
import { CountryProvider } from "./contexts/CountryContext"
import TawkToClient from "./components/TawkToClient"
import "./globals.css"

export const metadata = {
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <I18nProvider>
          <CountryProvider>
            <SharedHeader />
            <main className="flex-grow">{children}</main>
            <SharedFooter />
            <TawkToClient />
          </CountryProvider>
        </I18nProvider>
      </body>
    </html>
  )
}



import './globals.css'