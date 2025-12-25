import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  try {
    const { orderId } = await req.json()

    // 1️⃣ fetch order
    const { data: order } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // 2️⃣ prevent duplicates
    if (order.shipment_created) {
      return NextResponse.json({ ok: true, message: 'Shipment already created' })
    }

    // 3️⃣ fetch items
    const { data: items } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId)

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No order items' }, { status: 400 })
    }

    // 4️⃣ build Shiprocket payload
    const payload = {
      order_id: order.id,
      order_date: new Date().toISOString(),
      pickup_location: 'warehouse',
      billing_customer_name: order.full_name,
      billing_address: order.address_line1,
      billing_address_2: order.address_line2 || '',
      billing_city: order.city,
      billing_pincode: order.pincode,
      billing_state: order.state,
      billing_country: 'India',
      billing_email: order.email,
      billing_phone: order.phone,
      shipping_is_billing: 1,
      payment_method: order.payment_method === 'cod' ? 'COD' : 'Prepaid',
      order_items: items.map(i => ({
        name: i.name_snapshot,
        sku: i.product_id,
        units: i.quantity,
        selling_price: i.price,
        discount: '0',
        tax: '0',
        hsn: ''
      })),
      sub_total: order.total_amount,
      length: 10,
      breadth: 10,
      height: 5,
      weight: 0.2
    }

    // 5️⃣ call Shiprocket
    const token = await getShiprocketToken()

    const res = await fetch(`${process.env.SHIPROCKET_API_URL}/orders/create/adhoc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    // 6️⃣ handle LOW WALLET / NO AWB
    if (data.awb_assign_status === 0) {
      await supabase.from('orders').update({
        shipment_created: true,
        shiprocket_order_id: data.order_id,
        shiprocket_shipment_id: data.shipment_id,
        awb_pending: true,
        shipment_status: 'created_no_awb',
        shipment_error: data?.awb?.message || null,
        shiprocket_attempts: order.shiprocket_attempts + 1,
        last_shiprocket_attempt: new Date()
      }).eq('id', orderId)

      return NextResponse.json({ warning: 'Shipment created but AWB pending' })
    }

    // 7️⃣ success path
    await supabase.from('orders').update({
      shipment_created: true,
      shiprocket_order_id: data.order_id,
      shiprocket_shipment_id: data.shipment_id,
      shiprocket_awb: data.awb_code,
      shiprocket_courier: data.courier_name,
      shipment_status: 'awb_assigned',
      awb_pending: false
    }).eq('id', orderId)

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Shiprocket failed' }, { status: 500 })
  }
}
