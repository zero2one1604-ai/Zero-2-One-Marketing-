'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function submitReview({
  userId,
  productId,
  rating,
  comment
}) {
  if (!rating || rating < 1 || rating > 5) {
    throw new Error('Invalid rating')
  }

  if (!comment || comment.length < 10) {
    throw new Error('Review is too short')
  }

  // check purchase validity (security)
  const { data: orderItems } = await supabase
    .from('order_items')
    .select('order_id')
    .eq('product_id', String(productId))

  if (!orderItems?.length) {
    throw new Error('Not allowed to review this product')
  }

  // UPSERT = insert OR update
  const { error } = await supabase
    .from('reviews')
    .upsert(
      {
        user_id: userId,
        product_id: productId,
        rating,
        comment
      },
      {
        onConflict: 'user_id,product_id'
      }
    )

  if (error) {
    throw new Error('Failed to submit review')
  }

  return { success: true }
}
