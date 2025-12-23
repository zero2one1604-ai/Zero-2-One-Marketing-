import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get('x-razorpay-signature')

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex')

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(rawBody)

    if (event.event !== 'payment.captured') {
      return NextResponse.json({ status: 'ignored' })
    }

    const payment = event.payload.payment.entity

    const razorpayOrderId = payment.order_id
    const internalOrderId = payment.notes?.order_id

    if (!razorpayOrderId && !internalOrderId) {
      return NextResponse.json({ error: 'No order reference' }, { status: 400 })
    }

   const { data: order, error } = await supabase
  .from('orders')
  .update({
    status: 'paid',
    razorpay_payment_id: payment.id,
    razorpay_order_id: payment.order_id,
    paid_at: new Date().toISOString()
  })
  .eq('id', internalOrderId)
  .select()
  .single()


    if (error) {
      return NextResponse.json({ error: 'DB update failed' }, { status: 500 })
    }

   await resend.emails.send({
  from: 'Saavi <support@saaviskincare.com>',
  to: order.email,
  subject: 'Order Confirmed · Saavi',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:italic&family=Inter:wght@300;400;700&display=swap');
      </style>
    </head>
    <body style="background-color: #FAF9F6; margin: 0; padding: 40px 0; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #f0f0f0; border-radius: 40px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.02);">
        
        <tr>
          <td style="padding: 60px 40px 40px 40px; text-align: center;">
            <div style="text-transform: uppercase; letter-spacing: 0.4em; color: #a3a3a3; font-size: 10px; font-weight: 700; margin-bottom: 20px;">
              Confirmation
            </div>
            <h1 style="color: #1a1a1a; font-size: 32px; font-weight: 300; letter-spacing: -0.02em; margin: 0; text-transform: uppercase;">
              Thank You <span style="font-family: 'Playfair Display', serif; font-style: italic; color: #a3a3a3;">for Your</span> Purchase
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding: 0 40px 40px 40px;">
            <div style="background-color: #FAF9F6; border-radius: 24px; padding: 32px; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #737373; font-weight: 700;">Order Identifier</p>
              <p style="margin: 0; font-size: 18px; color: #1a1a1a; font-weight: 400;">#${order.id.slice(0, 8).toUpperCase()}</p>
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding: 0 40px 40px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
              <tr>
                <td style="padding-bottom: 12px; font-size: 14px; color: #737373; font-weight: 300;">Status</td>
                <td style="padding-bottom: 12px; font-size: 14px; color: #1a1a1a; text-align: right; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Confirmed / Paid</td>
              </tr>
              <tr>
                <td style="padding-bottom: 12px; font-size: 14px; color: #737373; font-weight: 300;">Amount Settled</td>
                <td style="padding-bottom: 12px; font-size: 14px; color: #1a1a1a; text-align: right; font-weight: 700;">₹${order.total_amount}</td>
              </tr>
              <tr>
                <td style="padding-top: 20px; border-top: 1px solid #f0f0f0; font-size: 14px; color: #737373; font-weight: 300; line-height: 1.6;">
                  Your order has been received and is currently being prepared in our laboratory. We will notify you with tracking details as soon as it is dispatched.
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding: 0 40px 60px 40px; text-align: center;">
            <a href="https://saaviskincare.com/account" style="display: inline-block; background-color: #000000; color: #ffffff; padding: 18px 40px; border-radius: 50px; text-decoration: none; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em;">
              Track Order
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding: 40px; background-color: #FAF9F6; text-align: center; border-top: 1px solid #f0f0f0;">
            <p style="margin: 0 0 10px 0; font-size: 12px; color: #1a1a1a; font-weight: 400;">Saavi Skincare</p>
            <p style="margin: 0; font-size: 10px; color: #a3a3a3; font-weight: 300; letter-spacing: 0.1em; text-transform: uppercase;">
              Crafted with Care & Truth
            </p>
            <div style="margin-top: 20px;">
              <a href="#" style="text-decoration: none; color: #a3a3a3; font-size: 10px; margin: 0 10px;">Instagram</a>
              <a href="#" style="text-decoration: none; color: #a3a3a3; font-size: 10px; margin: 0 10px;">Terms</a>
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
})

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Webhook crashed' }, { status: 500 })
  }
}
