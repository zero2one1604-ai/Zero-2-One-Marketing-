import axios from 'axios'
import { createClient } from '@supabase/supabase-js'
import { getShiprocketToken } from './shiprocket'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function createShiprocketOrder(order, items) {
  const token = await getShiprocketToken()

  const payload = {
    order_id: order.id,
    order_date: new Date().toISOString(),
    pickup_location: 'Primary',

    billing_customer_name: order.full_name,
    billing_last_name: '',
    billing_address: order.address_line1,
    billing_address_2: order.address_line2 || '',
    billing_city: order.city,
    billing_pincode: order.pincode,
    billing_state: order.state,
    billing_country: 'India',
    billing_email: order.email,
    billing_phone: order.phone,

    shipping_is_billing: true,

    order_items: items.map(i => ({
      name: i.name_snapshot,
      sku: `SKU-${i.product_id}`,
      units: i.quantity,
      selling_price: i.price_snapshot
    })),

    payment_method: order.payment_method === 'cod' ? 'COD' : 'Prepaid',
    sub_total: order.total_amount,
    length: 10,
    breadth: 10,
    height: 5,
    weight: 0.5
  }

  const res = await axios.post(
    'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  const data = res.data

  await supabase.from('shipments').insert({
    order_id: order.id,
    shiprocket_order_id: data.order_id,
    shiprocket_shipment_id: data.shipment_id,
    status: data.status,
    status_code: data.status_code,
    raw_response: data
  })

  return data
}
