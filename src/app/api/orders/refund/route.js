import Razorpay from 'razorpay'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  try {
    const { orderId, userId } = await req.json()

    if (!orderId || !userId) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

  
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', userId)
      .single()

    if (error || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // 2. validations
    if (order.payment_method !== 'online') {
      return NextResponse.json({ error: 'Not a prepaid order' }, { status: 400 })
    }

    if (order.status !== 'paid') {
      return NextResponse.json({ error: 'Order not paid' }, { status: 400 })
    }

    if (!order.razorpay_payment_id) {
      return NextResponse.json({ error: 'Payment ID missing' }, { status: 400 })
    }

    const refund = await razorpay.payments.refund(
      order.razorpay_payment_id,
      {
        amount: Math.round(order.total_amount * 100),
        speed: 'optimum'
      }
    )

    await supabase
      .from('orders')
      .update({
        status: 'cancelled',
        refund_id: refund.id,
        refund_status: refund.status,
        shipment_status: 'CANCELLED',
        awb_pending: false
      })
      .eq('id', orderId)

    return NextResponse.json({
      success: true,
      refund
    })

  } catch (err) {
    console.error('REFUND ERROR', err)
    return NextResponse.json(
      { error: 'Refund failed' },
      { status: 500 }
    )
  }
}
