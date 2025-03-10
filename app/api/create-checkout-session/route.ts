import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
})

export async function POST(req: Request) {
  const { items, currency, customerDetails } = await req.json()

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: currency || "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Stripe expects amounts in cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${req.headers.get("origin")}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/cart`,
      customer_email: customerDetails.email,
      metadata: {
        name: customerDetails.fullName,
        planType: items[0].name, // Assuming the first item is the plan
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err: any) {
    console.error("Error creating checkout session:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

