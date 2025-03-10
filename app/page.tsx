"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import CountrySelector from "./components/CountrySelector"
import PopularCountries from "./components/PopularCountries"
import { getUserCurrency } from "./utils/currencyUtils"

export default function Home() {
  const { t } = useTranslation()
  const [selectedCountry, setSelectedCountry] = useState("")
  const [userCurrency, setUserCurrency] = useState("USD")

  useState(() => {
    getUserCurrency().then(setUserCurrency)
  }, [])

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-wyncell-primary overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-1/2">
          <div className="w-full h-full bg-wyncell-secondary rounded-bl-[200%] transform translate-x-1/2 translate-y-[-25%]"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex flex-col items-center">
            <div className="w-full text-center mb-8">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 mr-1" fill="currentColor" />
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Welcome to
                <br />
                Wyncell Telecom
              </h1>
              <p className="text-xl text-white mb-4">Your Affordable Trusted Provider</p>
              <p className="text-lg text-white mb-8">
                No Credit Check, Pre-Paid,
                <br />
                No Contract, No Activation Fee
              </p>
              <Link
                href="/plans"
                className="inline-block bg-wyncell-dark text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
              >
                View Our Plans!
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 text-center">
            <div>
              <svg
                className="w-16 h-16 mx-auto mb-4 text-wyncell-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
              <p>Connect in 190+ countries</p>
            </div>
            <div>
              <svg
                className="w-16 h-16 mx-auto mb-4 text-wyncell-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Secure Connection</h3>
              <p>End-to-end encryption</p>
            </div>
            <div>
              <svg
                className="w-16 h-16 mx-auto mb-4 text-wyncell-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p>Always here to help</p>
            </div>
            <div>
              <svg
                className="w-16 h-16 mx-auto mb-4 text-wyncell-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Trusted Users</h3>
              <p>Over 100,000 satisfied customers</p>
            </div>
            <div>
              <svg
                className="w-16 h-16 mx-auto mb-4 text-wyncell-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">5-Star Rated</h3>
              <p>Excellent customer satisfaction on Google</p>
            </div>
          </div>
        </div>
      </section>

      {/* Country Selector Section */}
      <section className="py-16 bg-wyncell-light">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <CountrySelector onCountryChange={handleCountryChange} />

            {selectedCountry && (
              <Link
                href={`/plans?country=${selectedCountry}`}
                className="mt-6 inline-block bg-wyncell-primary text-white px-6 py-3 rounded-full font-medium hover:bg-wyncell-secondary transition-colors"
              >
                {t("viewAvailablePlans")}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* What is Wyncell Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-[#C4D600] rounded-full">
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon%20wyn-QrapwQ8jTVWFHHxdC9UhfTBSpw4HzO.png"
                      alt="Wyncell Icon"
                      width={300}
                      height={300}
                      className="w-[75%] h-[75%]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-6">What is Wyncell?</h2>
              <p className="text-lg mb-6">
                Founded in 2022, we set out with a mission to provide affordable, reliable, high-quality phone services
                that connect people and businesses across the globe.
              </p>
              <p className="text-lg mb-8">
                Our eSIM technology allows you to stay connected in over 200 countries without the hassle of physical
                SIM cards or expensive roaming charges.
              </p>
              <Link
                href="/about-us"
                className="inline-block bg-wyncell-primary text-white px-6 py-3 rounded-full font-medium hover:bg-wyncell-secondary transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Incentives and Loyalty Section */}
      <section className="py-20 bg-[#1E2A38] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center mb-16">
            <span className="text-wyncell-secondary">Exclusive Offers</span> <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-wyncell-primary to-wyncell-secondary">
              Unlock Premium Connectivity
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              className="bg-white text-[#1E2A38] rounded-lg p-8 text-center flex flex-col justify-between h-full shadow-lg"
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 172, 205, 0.2)" }}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-4">Group Savings</h3>
                <p className="text-lg mb-6">Save up to 20% when you connect 4+ eSIMs</p>
                <p className="text-3xl font-bold text-wyncell-primary mb-4">20% OFF</p>
              </div>
              <button
                onClick={() => {
                  // Check if there are 4 or more plans in cart
                  const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") || "[]") : []
                  const planCount = cart.filter((item) => item.type === "plan").length

                  if (planCount >= 4) {
                    // Apply 20% discount to all plans in cart
                    const discountedCart = cart.map((item) => {
                      if (item.type === "plan") {
                        return { ...item, price: item.price * 0.8, discounted: true }
                      }
                      return item
                    })

                    localStorage.setItem("cart", JSON.stringify(discountedCart))
                    alert("20% discount applied to all plans in your cart!")
                  } else {
                    alert("This discount is only available when you have 4 or more plans in your cart.")
                  }
                }}
                className="w-full bg-wyncell-primary text-white py-3 rounded-full hover:bg-wyncell-secondary transition-colors mt-auto font-semibold"
              >
                Claim Your Discount
              </button>
            </motion.div>
            <motion.div
              className="bg-white text-[#1E2A38] rounded-lg p-8 text-center flex flex-col justify-between h-full shadow-lg"
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 172, 205, 0.2)" }}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-4">Global Explorer Pass</h3>
                <p className="text-lg mb-6">Unlimited data in 100+ countries</p>
                <p className="text-3xl font-bold text-wyncell-primary mb-4">From $99/month</p>
              </div>
              <button
                onClick={() => {
                  // Show popup with plan details
                  const popup = document.createElement("div")
                  popup.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                  popup.innerHTML = `
      <div class="bg-white p-6 rounded-lg max-w-md w-full shadow-xl">
        <h2 class="text-2xl font-bold mb-4 text-wyncell-primary">Global Explorer Pass</h2>
        <div class="mb-4">
          <h3 class="font-semibold text-lg mb-2">Plan Details:</h3>
          <ul class="list-disc list-inside space-y-2 mb-4">
            <li>Unlimited data access in over 100 countries</li>
            <li>30-day validity period</li>
            <li>24/7 premium customer support</li>
            <li>Speeds up to 100 Mbps (varies by location)</li>
            <li>Compatible with all eSIM-enabled devices</li>
          </ul>
          <div class="bg-gray-100 p-3 rounded-lg mb-4">
            <p class="font-semibold">Price: $99/month</p>
            <p class="text-sm text-gray-600">Subscription renews automatically</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <button class="flex-1 bg-wyncell-primary text-white py-2 rounded-full hover:bg-wyncell-secondary transition-colors font-semibold" onclick="
            // Add to cart
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push({
              id: 'global-explorer-' + Date.now(),
              title: 'Global Explorer Pass',
              price: 99,
              quantity: 1,
              image: '/placeholder.svg?height=80&width=80',
              type: 'plan'
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Global Explorer Pass added to cart!');
            this.closest('.fixed').remove();
          ">Add to Cart</button>
          <button class="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors" onclick="this.closest('.fixed').remove()">Close</button>
        </div>
      </div>
    `
                  document.body.appendChild(popup)

                  // Add event listener to close popup when clicking outside
                  popup.addEventListener("click", (e) => {
                    if (e.target === popup) {
                      popup.remove()
                    }
                  })
                }}
                className="w-full bg-wyncell-primary text-white py-3 rounded-full hover:bg-wyncell-secondary transition-colors mt-auto font-semibold"
              >
                Start Exploring
              </button>
            </motion.div>
            <motion.div
              className="bg-white text-[#1E2A38] rounded-lg p-8 text-center flex flex-col justify-between h-full shadow-lg"
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 172, 205, 0.2)" }}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-4">Premium Bundle</h3>
                <p className="text-lg mb-6">Data, Text & Voice with 24/7 support</p>
                <p className="text-3xl font-bold text-wyncell-primary mb-4">30% OFF</p>
              </div>
              <button className="w-full bg-wyncell-primary text-white py-3 rounded-full hover:bg-wyncell-secondary transition-colors mt-auto font-semibold">
                Upgrade Now
              </button>
            </motion.div>
          </div>
          <div className="text-center mt-16">
            <Link
              href="/plans"
              className="inline-block bg-wyncell-secondary text-[#1E2A38] px-12 py-4 rounded-full text-lg font-semibold hover:bg-white transition-colors"
            >
              View All Exclusive Offers
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Countries Section */}
      <PopularCountries onCountrySelect={handleCountryChange} />

      {/* Activation Steps Section */}
      <section className="py-20 bg-wyncell-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Activation
            <span className="block text-2xl font-normal mt-2">in Only 4 Steps</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "Check if Your Phone is Unlocked",
                icon: (
                  <svg
                    className="w-12 h-12 mx-auto mb-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12" y2="18" />
                    <path d="M8 6h8" />
                    <circle cx="12" cy="10" r="2" />
                    <path d="M12 12v3" />
                  </svg>
                ),
              },
              {
                step: "Place Your Order",
                icon: (
                  <svg
                    className="w-12 h-12 mx-auto mb-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                ),
              },
              {
                step: "Receive QR Code",
                icon: (
                  <svg
                    className="w-12 h-12 mx-auto mb-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <path d="M7 7h3v3H7zM14 7h3v3h-3zM7 14h3v3H7zM12 12h5v5h-5z" />
                    <path d="M14 14h3v3h-3z" />
                  </svg>
                ),
              },
              {
                step: "Scan and Activate",
                icon: (
                  <svg
                    className="w-12 h-12 mx-auto mb-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 2H9a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                    <path d="M12 18h.01" />
                    <path d="M10 6h4" />
                    <path d="M12 22v-4" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-white text-wyncell-primary rounded-lg p-6 shadow-lg w-full h-full flex flex-col items-center justify-center relative">
                  <div className="absolute top-0 left-0 bg-wyncell-secondary text-white rounded-tl-lg rounded-br-lg px-3 py-1 text-sm font-bold">
                    Step {index + 1}
                  </div>
                  {item.icon}
                  <p className="text-center text-lg font-semibold">{item.step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amazon Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Wyncell Telecom is Now Available on</h2>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon"
            width={200}
            height={60}
            className="mx-auto mb-8"
          />
          <Link
            href="https://www.amazon.com/mo-Wyncell-SIM-Kit-Unlimited/dp/B0D96RXKLG/ref=sr_1_1?crid=1MX22POFN7KOC&dib=eyJ2IjoiMSJ9.Dkf72w5hUpVwSnLMf5_zww.Q-9noVXiX60p_Fxsx--qXnBbIK0xx5th-1YH9pkRm0A&dib_tag=se&keywords=wyncell&qid=1722373767&sprefix=wyncell%2Caps%2C117&sr=8-1&th=1"
            className="inline-block bg-wyncell-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-wyncell-secondary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop Now on Amazon
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-wyncell-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t("readyToStayConnected")}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{t("getYoureSIMNowAndEnjoy")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/plans"
              className="bg-white text-wyncell-primary px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-all"
            >
              {t("viewPlans")}
            </Link>
            <Link
              href="/support"
              className="bg-wyncell-dark text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all"
            >
              {t("needHelp")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

