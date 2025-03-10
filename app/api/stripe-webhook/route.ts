import { NextResponse } from "next/server"
import Stripe from "stripe"
import { supabase } from "../../utils/supabase"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
})

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  console.log(`Received event: ${event.type}`)

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session

      // Store order information
      const { data: orderData, error: orderError } = await supabase.from("customer_orders").insert({
        name: session.metadata?.name,
        email: session.customer_email,
        order_id: session.id,
        payment_status: session.payment_status,
        plan_type: session.metadata?.planType,
      })

      if (orderError) {
        console.error("Error storing order:", orderError)
      } else {
        console.log("Order stored successfully:", orderData)
      }

      // Store payment information
      const { data: paymentData, error: paymentError } = await supabase.from("payments").insert({
        stripe_event_type: event.type,
        payment_id: session.id,
        amount: session.amount_total,
        status: session.payment_status,
        created_at: new Date().toISOString(),
      })

      if (paymentError) {
        console.error("Error storing payment:", paymentError)
      } else {
        console.log("Payment stored successfully:", paymentData)
      }
      break
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true }, { status: 200 })
}

