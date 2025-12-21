'use server'

import { createSupabaseServerClient } from '@/lib/supabaseServer'

export async function submitReview({ productId, rating, comment }) {
  try {
    const supabase = createSupabaseServerClient()

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'NOT_AUTHENTICATED' }
    }

    if (!rating || rating < 1 || rating > 5) {
      return { error: 'INVALID_RATING' }
    }

    if (!comment || comment.length < 10) {
      return { error: 'COMMENT_TOO_SHORT' }
    }

    // 🔍 PURCHASE CHECK (THIS IS WHERE IT USUALLY FAILS)
    const { data: item, error: itemError } = await supabase
      .from('order_items')
      .select(`
        order_id,
        orders!inner (
          user_id,
          status
        )
      `)
      .eq('product_id', String(productId))
      .eq('orders.user_id', user.id)
      .in('orders.status', ['paid', 'delivered'])
      .limit(1)
      .single()

    if (itemError || !item) {
      return {
        error: 'NOT_ELIGIBLE',
        debug: itemError?.message || 'no matching order_items row'
      }
    }

    const { error: insertError } = await supabase.from('reviews').insert({
      user_id: user.id,
      product_id: productId,
      order_id: item.order_id,
      rating,
      comment
    })

    if (insertError) {
      return { error: 'REVIEW_ALREADY_EXISTS' }
    }

    return { success: true }
  } catch (err) {
    return { error: 'SERVER_CRASH', debug: err.message }
  }
}
