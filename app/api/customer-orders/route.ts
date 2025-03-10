import { NextResponse } from "next/server"
import { supabase } from "../../utils/supabase"

export async function POST(req: Request) {
  try {
    const { name, email, orderId, paymentStatus, planType } = await req.json()

    const { data, error } = await supabase
      .from("customer_orders")
      .insert([{ name, email, order_id: orderId, payment_status: paymentStatus, plan_type: planType }])
      .select()

    if (error) throw error

    return NextResponse.json({ message: "Order stored successfully", data }, { status: 201 })
  } catch (error) {
    console.error("Error storing order:", error)
    return NextResponse.json({ error: "Failed to store order" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const email = url.searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("customer_orders")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ orders: data }, { status: 200 })
  } catch (error) {
    console.error("Error retrieving orders:", error)
    return NextResponse.json({ error: "Failed to retrieve orders" }, { status: 500 })
  }
}

