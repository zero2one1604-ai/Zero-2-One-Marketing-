import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const DTDC_CANCEL_URL =
  'http://pxapi.dtdc.in/api/customer/integration/consignment/cancel'

export async function POST(req) {
  try {
    const { orderId } = await req.json()

    if (!orderId) {
      return NextResponse.json(
        { ok: false, error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (error || !order) {
      return NextResponse.json(
        { ok: false, error: 'Order not found' },
        { status: 404 }
      )
    }

    if (!order.shipment_created || !order.shiprocket_awb) {
      return NextResponse.json(
        { ok: false, error: 'No shipment exists for this order' },
        { status: 400 }
      )
    }

    if (['IN_TRANSIT', 'DELIVERED'].includes(order.shipment_status)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Shipment already picked up, cancellation not allowed'
        },
        { status: 400 }
      )
    }

    if (order.shipment_status === 'CANCELLED') {
      return NextResponse.json({
        ok: true,
        already_cancelled: true,
        awb: order.shiprocket_awb
      })
    }

    const dtdcRes = await fetch(DTDC_CANCEL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.DTDC_API_KEY
      },
      body: JSON.stringify({
        AWBNo: [order.shiprocket_awb],
        customerCode: process.env.DTDC_CUSTOMER_CODE
      })
    })

    const dtdcData = await dtdcRes.json()


    const isAlreadyCancelled =
      typeof dtdcData?.message === 'string' &&
      dtdcData.message.toLowerCase().includes('already')

    if (!dtdcRes.ok || (!dtdcData.success && !isAlreadyCancelled)) {
      await supabase.from('orders').update({
        shipment_error: JSON.stringify(dtdcData),
        last_shiprocket_attempt: new Date().toISOString()
      }).eq('id', orderId)

      return NextResponse.json(
        {
          ok: false,
          error: dtdcData || 'DTDC cancellation failed',
          raw: dtdcData
        },
        { status: 500 }
      )
    }

    await supabase.from('orders').update({
      shipment_status: 'CANCELLED',
      awb_status: 'CANCELLED',
      awb_pending: false,
      shipment_error: null
    }).eq('id', orderId)

    return NextResponse.json({
      ok: true,
      cancelled: true,
      awb: order.shiprocket_awb
    })

  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Cancellation crashed',
        message: err.message
      },
      { status: 500 }
    )
  }
}
