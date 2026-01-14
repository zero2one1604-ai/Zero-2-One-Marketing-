import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const DTDC_API_URL =
  'https://pxapi.dtdc.in/api/customer/integration/consignment/softdata'

const clean = v => typeof v === 'string' ? v.trim() : null
const digits = v => typeof v === 'string' ? v.replace(/\D/g, '') : null
const required = (v, label) => {
  if (!v) throw new Error(`Missing ${label}`)
}

export async function POST(req) {
  try {
    const { orderId } = await req.json()
    required(orderId, 'orderId')

    const { data: order } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (order.shipment_created && order.shiprocket_awb) {
      return NextResponse.json({
        ok: true,
        already_created: true,
        awb: order.shiprocket_awb
      })
    }

    const shipmentType = order.payment_method === 'cod' ? 'cod' : 'prepaid'

    const { data: awbRow } = await supabase
      .from('dtdc_awb_pool')
      .select('*')
      .eq('used', false)
      .eq('type', shipmentType)
      .order('awb', { ascending: true })
      .limit(1)
      .single()

    if (!awbRow) {
      throw new Error(`No ${shipmentType.toUpperCase()} DTDC AWB available`)
    }

    const awb = awbRow.awb

    const name = clean(order.full_name)
    const phone = digits(order.phone)

    required(name && name.length >= 3, 'destination name')
    required(phone && phone.length >= 10, 'destination phone')
    required(order.address_line1, 'address')
    required(order.city, 'city')
    required(order.state, 'state')
    required(order.pincode, 'pincode')

    const payload = {
      consignments: [
        {
          customer_code: process.env.DTDC_CUSTOMER_CODE,
          service_type_id: process.env.DTDC_SERVICE_TYPE_PRIMARY ||
        process.env.DTDC_SERVICE_TYPE_SECONDARY,

          load_type: 'NON-DOCUMENT',
          consignment_type: 'Forward',
          description: 'Saavi Skincare Order',

          dimension_unit: 'CM',
          length: '13.3',
          width: '7.1',
          height: '5',

          weight_unit: 'KG',
          weight: '0.1',

          declared_value: String(order.total_amount),
          num_pieces: '1',

          origin_details: {
            name: 'Saavi Skincare',
            phone: '+918800504373',
            address_line_1: '69/6A Rama Road, Najafgarh Road Industrial Area',
            pincode: '110015',
            city: 'Delhi',
            state: 'Delhi'
          },

          destination_details: {
            name,
            phone,
            address_line_1: order.address_line1,
            address_line_2: order.address_line2 || '',
            pincode: order.pincode,
            city: order.city,
            state: order.state
          },

          customer_reference_number: order.id,
          reference_number: awb,

          cod_collection_mode: shipmentType === 'cod' ? 'CASH' : '',
          cod_amount:
            shipmentType === 'cod' ? String(order.total_amount) : '',

          commodity_id: process.env.DTDC_COMMODITY_ID || '153',

          invoice_number: order.id.slice(0, 8).toUpperCase(),
          invoice_date: new Date().toISOString().split('T')[0]
        }
      ]
    }

    const res = await fetch(DTDC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.DTDC_API_KEY
      },
      body: JSON.stringify(payload)
    })

    const json = await res.json()
    const result = json?.data?.[0]

    if (!res.ok || json.status !== 'OK' || !result?.success) {
      await supabase.from('orders').update({
        shipment_status: 'FAILED',
        shipment_error: result?.message || JSON.stringify(json),
        awb_pending: true
      }).eq('id', orderId)

      return NextResponse.json(
        { ok: false, error: result?.message || 'DTDC booking failed' },
        { status: 400 }
      )
    }

    await supabase.from('dtdc_awb_pool').update({
      used: true,
      used_at: new Date().toISOString(),
      order_id: orderId
    }).eq('awb', awb)

    await supabase.from('orders').update({
      shiprocket_awb: awb,
      shiprocket_courier: 'DTDC',
      shipment_created: true,
      awb_pending: false,
      shipment_status: 'BOOKED',
      awb_status: 'ASSIGNED',
      shipment_error: null
    }).eq('id', orderId)

    return NextResponse.json({ ok: true, awb })

  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    )
  }
}
