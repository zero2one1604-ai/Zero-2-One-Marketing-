'use server'

import Razorpay from 'razorpay'
import { createClient } from '@supabase/supabase-js'

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function createRazorpayOrder(orderId) {
  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  if (error || !order) {
    throw new Error('Order not found')
  }

  // 2. create razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(order.total_amount * 100), // paise
    currency: 'INR',
    receipt: order.id,
    payment_capture: 1,
    notes: {
      order_id: order.id
    }
  })

  // 3. save razorpay order id
  await supabase
    .from('orders')
    .update({
      razorpay_order_id: razorpayOrder.id
    })
    .eq('id', order.id)

  return {
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount
  }
}
