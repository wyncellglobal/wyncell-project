"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { loadStripe } from "@stripe/stripe-js"
import Image from "next/image"
import Link from "next/link"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  image: string
}

interface CheckoutFormData {
  fullName: string
  email: string
  address: string
  city: string
  country: string
  postalCode: string
}

const TAX_RATE = 0.1 // 10% tax rate

function CheckoutForm() {
  const { t } = useTranslation()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isUpdatingCart, setIsUpdatingCart] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>()

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  const updateQuantity = (id: string, newQuantity: number) => {
    setIsUpdatingCart(true)
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item,
    )
    setCartItems(updatedItems)
    localStorage.setItem("cart", JSON.stringify(updatedItems))
    setIsUpdatingCart(false)
  }

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedItems)
    localStorage.setItem("cart", JSON.stringify(updatedItems))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax

  const onSubmit = async (data: CheckoutFormData) => {
    // Payment processing logic is moved to the parent Checkout component
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">{t("orderSummary")}</h2>
        {cartItems.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-md">
            <p>{t("cartEmpty")}</p>
            <Link href="/plans" className="text-wyncell-primary hover:underline mt-2 inline-block">
              {t("browsePlans")}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center p-3 bg-gray-50 rounded-md">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="rounded-md mr-3"
                />
                <div className="flex-grow">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-200"
                    disabled={isUpdatingCart}
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-200"
                    disabled={isUpdatingCart}
                  >
                    +
                  </button>
                </div>
                <div className="ml-4 text-right">
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    {t("remove")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="border-t pt-4 mt-4 space-y-2">
          <div className="flex justify-between">
            <span>{t("subtotal")}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>
              {t("tax")} ({(TAX_RATE * 100).toFixed(0)}%)
            </span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>{t("total")}</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">{t("billingInformation")}</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              {t("fullName")}
            </label>
            <input
              type="text"
              id="fullName"
              {...register("fullName", { required: t("fullNameRequired") })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-wyncell-primary focus:border-wyncell-primary sm:text-sm"
            />
            {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: t("emailRequired") })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-wyncell-primary focus:border-wyncell-primary sm:text-sm"
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              {t("address")}
            </label>
            <input
              type="text"
              id="address"
              {...register("address", { required: t("addressRequired") })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-wyncell-primary focus:border-wyncell-primary sm:text-sm"
            />
            {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                {t("city")}
              </label>
              <input
                type="text"
                id="city"
                {...register("city", { required: t("cityRequired") })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-wyncell-primary focus:border-wyncell-primary sm:text-sm"
              />
              {errors.city && <p className="mt-2 text-sm text-red-600">{errors.city.message}</p>}
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                {t("country")}
              </label>
              <input
                type="text"
                id="country"
                {...register("country", { required: t("countryRequired") })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-wyncell-primary focus:border-wyncell-primary sm:text-sm"
              />
              {errors.country && <p className="mt-2 text-sm text-red-600">{errors.country.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
              {t("postalCode")}
            </label>
            <input
              type="text"
              id="postalCode"
              {...register("postalCode", { required: t("postalCodeRequired") })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-wyncell-primary focus:border-wyncell-primary sm:text-sm"
            />
            {errors.postalCode && <p className="mt-2 text-sm text-red-600">{errors.postalCode.message}</p>}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={cartItems.length === 0}
        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-wyncell-primary hover:bg-wyncell-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wyncell-primary ${
          cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {t("proceedToPayment")}
      </button>
    </form>
  )
}

// Mock function to store order details (removed as not needed with server-side checkout)

export default function Checkout() {
  const { t } = useTranslation()
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>()

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true)

    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error("Stripe failed to load")

      // Get the latest cart items from localStorage
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]")

      if (cartItems.length === 0) {
        throw new Error("Your cart is empty")
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            name: item.title,
            price: item.price,
            quantity: item.quantity,
          })),
          currency: "usd", // You can make this dynamic based on user selection
          customerDetails: data, //add customer details to the request
        }),
      })

      const { sessionId } = await response.json()

      const result = await stripe.redirectToCheckout({
        sessionId,
      })

      if (result.error) {
        throw new Error(result.error.message)
      }
    } catch (error) {
      console.error("Error:", error)
      // Handle error (show error message to user) -  Add user-friendly error handling here.
      alert(error.message) //Simple alert for demonstration.  Replace with more robust error handling.
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Checkout</h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <CheckoutForm />
          </form>
        </motion.div>
      </div>
    </div>
  )
}

