import { Resend } from 'resend'
import { orderPlacedEmail } from '@/lib/orderPlacedEmail'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const { orderId } = await req.json()

    const { data: order } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (!order || order.email_sent) {
      return Response.json({ ok: true })
    }

    const { data: items } = await supabaseAdmin
      .from('order_items')
      .select('name_snapshot, quantity')
      .eq('order_id', orderId)
    
    await resend.emails.send({
      from: 'Saavi <support@saaviskincare.com>',
      to: order.email,
      subject: `Order Confirmed · Saavi`,
      html: orderPlacedEmail({ order, items })
    })

    await supabaseAdmin
      .from('orders')
      .update({ email_sent: true })
      .eq('id', orderId)

    return Response.json({ success: true })
  } catch (err) {
    console.error(err)
    return new Response('Email failed', { status: 500 })
  }
}
