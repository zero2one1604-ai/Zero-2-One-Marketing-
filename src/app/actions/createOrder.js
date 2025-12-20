'use server'

import { createClient } from '@supabase/supabase-js'
import products from '@/data/products'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY 
)

export async function createOrder ({ productId, quantity, userId, email }) {
  const product = products.find(p => p.id === productId)
  if (!product) throw new Error('Product not found')

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      status: 'pending',
      email: email,
      total_amount: product.price * quantity
    })
    .select()
    .single()

  if (orderError) throw orderError

  const { error: itemError } = await supabase
    .from('order_items')
    .insert({
      order_id: order.id,
      product_id: product.id,
      name_snapshot: product.name,
      price_snapshot: product.price,
      quantity
    })

  if (itemError) throw itemError

  return order.id
}
