'use client'

import React, { useState, useEffect } from 'react'
import {
  ShoppingCart,
  Heart,
  Share2,
  ChevronRight,
  Minus,
  Plus,
  Check,
  Package,
  Shield,
  X,
  Truck,
  MessageSquare,
  PenLine
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import LuxuryFooter from '@/app/components/Footer'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { createOrder } from '@/app/actions/createOrder'
import { submitReview } from '@/app/actions/submitReview'
import products from '@/data/products'
import Product3DScene from '@/app/components/Product3DScene'
import { useAuthModal } from '@/app/components/AuthModalProvider'

export default function ProductDetailClient ({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [buyLoading, setBuyLoading] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [canReview, setCanReview] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviewLoading, setReviewLoading] = useState(false)
  const [orderForReview, setOrderForReview] = useState(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const { openAuthModal } = useAuthModal()
  const router = useRouter()

  async function getPaidOrderIds () {
    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (!user) return []

    const { data } = await supabase
      .from('orders')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'paid')

    return data?.map(o => o.id) || []
  }

  async function checkReviewEligibility (productId) {
    const orderIds = await getPaidOrderIds()
    if (!orderIds.length) return false

    const { data } = await supabase
      .from('order_items')
      .select('id')
      .in('order_id', orderIds)
      .eq('product_id', String(productId))
      .limit(1)

    return !!data?.length
  }

  useEffect(() => {
    const run = async () => {
      const eligible = await checkReviewEligibility(product.id)
      setCanReview(eligible)
    }
    run()
  }, [product.id])

  const handleSubmitReview = async () => {
    setReviewLoading(true)

    const {
      data: { user }
    } = await supabase.auth.getUser()

    try {
    const res = await submitReview({
  productId: product.id,
  rating,
  comment
})

if (res?.error) {
  alert(res.error)
  console.error(res.debug)
  return
}

alert('Review submitted successfully')
      setCanReview(false)
    } catch (err) {
      alert(err.message)
    } finally {
      setReviewLoading(false)
    }
  }

  const handleAddToCart = () => {
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  const handleBuyNow = async () => {
    if (buyLoading) return

    setBuyLoading(true)

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      setBuyLoading(false)
      openAuthModal({
        onSuccess: () => handleBuyNow()
      })
      return
    }

    try {
      const orderId = await createOrder({
        productId: product.id,
        quantity,
        userId: user.id,
        email: user.email
      })

      router.push(`/checkout/${orderId}`)
    } catch (err) {
      console.error(err)
      setBuyLoading(false)
    }
  }

  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const productImages = product.dimage
    ? [product.dimage, product.image]
    : [product.image]

  return (
    <>
      <div className='min-h-screen bg-[#FAF9F6]'>
        <nav className='sticky top-0 z-40 bg-[#FAF9F6]/80 backdrop-blur-xl border-b border-neutral-100'>
          <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-4'>
            <div className='flex items-center gap-2 text-[11px] font-medium tracking-wide text-neutral-500'>
              <Link
                href='/'
                className='hover:text-neutral-900 transition-colors'
              >
                Home
              </Link>
              <ChevronRight className='w-3.5 h-3.5' />
              <Link
                href='/shop'
                className='hover:text-neutral-900 transition-colors'
              >
                Collection
              </Link>
              <ChevronRight className='w-3.5 h-3.5' />
              <span className='text-neutral-900 font-semibold'>
                {product.name}
              </span>
            </div>
          </div>
        </nav>

        <main className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 lg:py-5'>
          <div className='grid lg:grid-cols-2 gap-8 lg:gap-16 mb-5 md:mb-20'>
            <div className='space-y-4'>
              <div className='relative rounded-3xl overflow-hidden bg-neutral-100 group'>
                {selectedImage === 0 && product.dimage ? (
                  <Product3DScene image={product.dimage} />
                ) : (
                  <div className='relative w-full h-full'>
                    <Image
                      src={productImages[selectedImage]}
                      alt={product.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                )}

                <div className='absolute top-6 right-6 flex flex-col gap-3 z-10'>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className='w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform'
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        isFavorite
                          ? 'fill-red-500 text-red-500'
                          : 'text-neutral-700'
                      }`}
                    />
                  </button>
                  <button className='w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform'>
                    <Share2 className='w-5 h-5 text-neutral-700' />
                  </button>
                </div>

                {productImages.length > 1 && (
                  <div className='absolute hidden bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10'>
                    {productImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`h-2 rounded-full transition-all ${
                          selectedImage === i
                            ? 'bg-white w-8'
                            : 'bg-white/50 w-2'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {productImages.length > 1 && (
                <div className='hidden lg:hidden grid-cols-2 gap-3'>
                  {productImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative aspect-square rounded-2xl overflow-hidden transition-all ${
                        selectedImage === i
                          ? 'ring-2 ring-neutral-900 ring-offset-2'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt='' fill className='object-cover' />
                    </button>
                  ))}
                </div>
              )}

              <div className='grid grid-cols-3 gap-1 md:gap-3 md:pt-4'>
                {[
                  {
                    icon: Truck,
                    label: 'Express Delivery',
                    sublabel: '2-3 Days'
                  },
                  {
                    icon: Shield,
                    label: 'Verified Purity',
                    sublabel: '100% Authentic'
                  },
                  {
                    icon: Package,
                    label: 'Luxury Packaging',
                    sublabel: 'Gift Ready'
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className='p-2 md:p-4 flex flex-col items-center text-center gap-2 bg-white rounded-2xl border border-neutral-200 hover:border-neutral-300 transition-colors'
                  >
                    <item.icon className='md:w-6 w-4 h-4 md:h-6 text-neutral-900' />
                    <div>
                      <p className='text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-900'>
                        {item.label}
                      </p>
                      <p className='text-[8px] md:text-[9px] text-neutral-500 mt-0.5'>
                        {item.sublabel}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex flex-col lg:pt-8'>
              <div className='md:space-y-6'>
                <div className='md:space-y-3'>
                  <span className='inline-block mb-4 px-4 py-1.5 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full'>
                    For {product.category}
                  </span>
                  <h1 className='text-5xl the-seasons lg:text-6xl xl:text-7xl font-light text-neutral-900 tracking-tight leading-[0.95]'>
                    {product.name}
                  </h1>
                  <p className='text-lg lg:text-xl text-neutral-600 font-light italic'>
                    {product.tagline}
                  </p>
                </div>

                <div className='flex flex-wrap items-center py-2 gap-4 md:py-6 border-y border-neutral-200'>
                  <span className='text-2xl md:text-5xl font-light text-neutral-900'>
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className='text-xl text-neutral-400 line-through font-light'>
                    ₹{product.mrp.toLocaleString()}
                  </span>
                  <span className='ml-auto text-xs font-bold text-green-700 bg-green-50 px-4 py-2 rounded-full'>
                    {Math.round(
                      ((product.mrp - product.price) / product.mrp) * 100
                    )}
                    % OFF
                  </span>
                </div>

                <div className='mt-5 md:mt-0 space-y-3'>
                  <h3 className='text-xs md:text-xs font-bold uppercase tracking-[0.2em] text-neutral-500'>
                    About This Perfume
                  </h3>
                  <p className='text-sm lg:text-lg text-neutral-700 leading-relaxed font-light'>
                    {product.description}
                  </p>
                </div>

                <div className='grid mt-5 sm:grid-cols-2 gap-4'>
                  <div className='p-6 bg-gradient-to-br from-neutral-50 to-white rounded-2xl border border-neutral-200'>
                    <h4 className='text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900 mb-4'>
                      Signature Notes
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {product.notes.map((note, i) => (
                        <span
                          key={i}
                          className='px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-sm font-medium text-neutral-800'
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className='p-6 bg-gradient-to-br from-neutral-50 to-white rounded-2xl border border-neutral-200'>
                    <h4 className='text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900 mb-4'>
                      Perfect For
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {product.mood.map((mood, i) => (
                        <span
                          key={i}
                          className='px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-sm font-medium text-neutral-800'
                        >
                          {mood}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='pt-6 space-y-4 sticky bottom-0 bg-[#FAF9F6] pb-6 lg:pb-0'>
                  <div className='flex items-center gap-4'>
                    <span className='text-xs md:text-sm font-medium text-neutral-700'>
                      Quantity
                    </span>
                    <div className='flex items-center bg-white border border-neutral-300 rounded-full'>
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className='md:w-11 w-8 h-8 md:h-11 cursor-pointer flex items-center justify-center text-neutral-900 hover:bg-neutral-50 rounded-full transition-colors'
                      >
                        <Minus className='w-4 h-4' />
                      </button>
                      <span className='w-8 md:w-12 text-center text-sm md:text-lg font-medium text-neutral-900'>
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className='md:w-11 w-8 h-8 md:h-11 flex items-center cursor-pointer justify-center text-neutral-900 hover:bg-neutral-50 rounded-full transition-colors'
                      >
                        <Plus className='w-4 h-4' />
                      </button>
                    </div>
                  </div>

                  <div className='flex gap-3'>
                    <button
                      onClick={handleBuyNow}
                      disabled={buyLoading}
                      className={`flex-1 relative overflow-hidden cursor-pointer h-10 md:h-14
bg-gradient-to-br from-[#C9A43B] via-[#F1DB8A] to-[#9C7A22]
text-[#1A1405]
shadow-[0_6px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-2px_0_rgba(0,0,0,0.45)]
transition-all duration-300
hover:shadow-[0_10px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-2px_0_rgba(0,0,0,0.35)]
hover:from-[#B08D2A] hover:via-[#E6C96A] hover:to-[#8A6A1C]
active:scale-[0.98]
focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/40 focus:ring-offset-2
border border-[#8F7220] text-xs md:text-sm font-bold uppercase tracking-wider rounded-full
disabled:opacity-80 disabled:cursor-not-allowed`}
                    >
                      <span className='relative z-10'>
                        {buyLoading ? 'Preparing Checkout…' : 'Buy Now'}
                      </span>

                      {buyLoading && (
                        <span className='absolute bottom-0 left-0 h-[2px] bg-black/80 animate-buy-progress' />
                      )}
                    </button>

                    <button
                      onClick={handleAddToCart}
                      className='md:w-14 w-10 h-10 md:h-14 cursor-pointer border-2 border-neutral-900 rounded-full flex items-center justify-center hover:bg-neutral-50 transition-all active:scale-95'
                    >
                      {isAddedToCart ? (
                        <Check className='md:w-6 h-4 w-4 md:h-6 text-green-600' />
                      ) : (
                        <ShoppingCart className='md:w-6 h-4 w-4 md:h-6 text-neutral-900' />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className='mb-5 md:mb-20 md:py-16 py-5 border-y border-neutral-200'>
            <div className='max-w-3xl mx-auto text-center md:space-y-6'>
              <div className='inline-flex mb-2 items-center justify-center md:w-16 w-10 h-10 md:h-16 rounded-2xl bg-neutral-900 text-white'>
                <MessageSquare className='md:w-7 w-5 h-5 md:h-7' />
              </div>
              <h2 className='text-xl lg:text-5xl font-light text-neutral-900 tracking-tight'>
                Share Your Experience
              </h2>
              <p className=' text-xs md:text-lg text-neutral-600 font-light max-w-xl px-5 mx-auto'>
                Your review helps others discover their perfect scent. Tell us
                about your experience with {product.name}.
              </p>
              {canReview ? (
                <button
                  className=' mt-2 inline-flex cursor-pointer items-center gap-2 md:gap-3 px-4 py-2 md:px-8 md:py-4 border border-slate-600 rounded-full text-slate-800 hover:bg-slate-800 hover:text-white transition-all text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-neutral-800'
                  onClick={() => setShowReviewModal(true)}
                >
                  <PenLine className='md:w-4 w-3 h-3 md:h-4 hover:text-white text-slate-800' />
                  Write a Review
                </button>
              ) : (
                <p className='text-xs text-neutral-500'>
                  Purchase this product to write a review.
                </p>
              )}
            </div>
          </section>

          <section>
            <div className='flex items-end justify-between mb-4 md:mb-10'>
              <div>
                <span className='text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase'>
                  Discover More
                </span>
                <h2 className='text-xl lg:text-4xl font-light text-neutral-900 md:mt-2 tracking-tight'>
                  You May Also Like
                </h2>
              </div>
              <Link
                href='/shop'
                className='text-xs md:text-sm md:font-semibold text-neutral-900 hover:gap-3 flex items-center gap-2 transition-all group'
              >
                View All
                <ChevronRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
              </Link>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4 pb-10 gap-6'>
              {similarProducts.map(item => (
                <Link
                  href={`/product/${item.slug}`}
                  key={item.id}
                  className='group'
                >
                  <div className='relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-neutral-100'>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className='object-cover group-hover:scale-110 transition-transform duration-700'
                    />
                  </div>
                  <div className='space-y-2'>
                    <p className='text-[10px] font-bold text-neutral-500 uppercase tracking-wider'>
                      {item.category}
                    </p>
                    <h3 className='text-lg font-light text-neutral-900 tracking-tight'>
                      {item.name}
                    </h3>
                    <p className='text-base font-semibold text-neutral-900'>
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
      {showReviewModal && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4'>
          {/* Modal Card */}
          <div className='w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200'>
            {/* Header */}
            <div className='flex items-center justify-between md:px-6 px-6 py-4 md:py-5 border-b border-neutral-200'>
              <div>
                <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500'>
                  Review
                </p>
                <h3 className='text-lg md:text-xl font-light text-neutral-900 tracking-tight'>
                  Share your experience
                </h3>
              </div>

              <button
                onClick={() => setShowReviewModal(false)}
                className='md:w-9 w-7 h-7 md:h-9 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition'
              >
                <X className='md:w-4 h-3 w-3 md:h-4 text-neutral-900' />
              </button>
            </div>

            <div className='px-6 py-6 space-y-6'>
              {/* Product Info */}
              <div className='flex items-center gap-4'>
                <div className='relative w-16 h-20 rounded-xl overflow-hidden bg-neutral-100'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className='object-cover'
                  />
                </div>
                <div>
                  <p className='text-xs font-bold uppercase tracking-wider text-neutral-500'>
                    {product.category}
                  </p>
                  <p className='text-lg font-light text-neutral-900'>
                    {product.name}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div>
                <p className='text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2'>
                  Your Rating
                </p>

                <div className='flex gap-2'>
                  {[1, 2, 3, 4, 5].map(i => (
                    <button
                      key={i}
                      onClick={() => setRating(i)}
                      className={`w-10 h-10 rounded-full border transition-all
                  ${
                    rating >= i
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white border-neutral-300 text-neutral-400 hover:border-neutral-900'
                  }
                `}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <p className='text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2'>
                  Your Review
                </p>

                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={4}
                  placeholder='Tell us what you loved, how it made you feel, or how it performed…'
                  className='w-full text-black resize-none rounded-2xl border border-neutral-300 px-4 py-3 text-sm
            focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent'
                />
              </div>
            </div>

            {/* Footer */}
            <div className='px-6 py-3 md:py-5 border-t border-neutral-200 flex gap-3'>
              <button
                onClick={() => setShowReviewModal(false)}
                className='flex-1 h-8 md:h-11 text-black rounded-full border border-neutral-300 text-[10px] md:text-xs font-bold uppercase tracking-wider
          hover:bg-neutral-50 transition'
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await handleSubmitReview()
                  setShowReviewModal(false)
                }}
                disabled={reviewLoading}
                className='flex-1 h-8 md:h-11 rounded-full bg-neutral-900 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider
          hover:bg-neutral-800 transition disabled:opacity-50'
              >
                {reviewLoading ? 'Submitting…' : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>
      )}

      <LuxuryFooter />
    </>
  )
}
