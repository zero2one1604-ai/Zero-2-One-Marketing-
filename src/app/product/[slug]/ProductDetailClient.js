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
  Star,
  Package,
  ThumbsUp,
  Shield,
  X,
  Truck,
  MessageSquare,
  User,
  PenLine
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react'
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
  const [reviews, setReviews] = useState([])
  const [myReview, setMyReview] = useState(null)
  const [toast, setToast] = useState(null) // { type: 'error' | 'success', message }
  const [editingReview, setEditingReview] = useState(false)
  const [sortBy, setSortBy] = useState('recent')
  const [showReviewModal, setShowReviewModal] = useState(false)
  const { openAuthModal } = useAuthModal()
  const router = useRouter()

  const totalReviews = reviews.length

  const averageRating = totalReviews
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length
    return {
      star,
      perc: totalReviews ? Math.round((count / totalReviews) * 100) : 0
    }
  })

  const orderedReviews = myReview
    ? [myReview, ...reviews.filter(r => r.id !== myReview.id)]
    : reviews

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
    if (!rating || comment.length < 10) {
      setToast({
        type: 'error',
        message: 'Please add rating and a proper review.'
      })
      return
    }

    setReviewLoading(true)

    const {
      data: { user }
    } = await supabase.auth.getUser()

    try {
      const res = await submitReview({
        userId: user.id,
        productId: product.id,
        rating,
        comment
      })

      setToast({
        type: 'success',
        message: editingReview ? 'Review updated.' : 'Review submitted.'
      })
      setShowReviewModal(false)
      setEditingReview(false)
      setCanReview(false)
      const { data, error } = await supabase
        .from('reviews')
        .select('id, rating, comment, created_at, user_id')
        .eq('product_id', product.id)
        .order(sortBy === 'rating' ? 'rating' : 'created_at', {
          ascending: false
        })

      setReviews(data)
      const mine = data.find(r => r.user_id === user.id) || null
      setMyReview(mine)
    } catch (err) {
      setToast({ type: 'error', message: err.message })
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

  useEffect(() => {
    loadReviews()
  }, [product.id, sortBy])

  async function loadReviews () {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    const userId = user?.id || null

    const { data, error } = await supabase
      .from('reviews')
      .select(
        `
      id,
      rating,
      comment,
      created_at,
      user_id`
      )
      .eq('product_id', product.id)
      .order(sortBy === 'rating' ? 'rating' : 'created_at', {
        ascending: false
      })

    if (error) {
      console.error(error)
      return
    }

    setReviews(data || [])

    if (userId) {
      const mine = data?.find(r => r.user_id === userId) || null
      setMyReview(mine)

      if (mine) {
        setRating(mine.rating)
        setComment(mine.comment)
      }
    } else {
      setMyReview(null)
    }
  }

  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const productImages = product.dimage
    ? [product.dimage, product.image]
    : [product.image]

  const Toast = ({ toast, onClose }) => {
    useEffect(() => {
      if (!toast) return

      const timer = setTimeout(() => {
        onClose()
      }, 4000) // Slightly longer for better readability

      return () => clearTimeout(timer)
    }, [toast, onClose])

    return (
      <AnimatePresence>
        {toast && (
          <motion.div
            // Responsive positioning: Top-right on desktop, Top-center on mobile
            className='fixed top-6 right-0 left-0 sm:left-auto sm:right-6 z-[9999] flex justify-center sm:justify-end px-4 pointer-events-none'
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          >
            <div
              className={`
              pointer-events-auto
              relative overflow-hidden
              flex items-center gap-4
              min-w-[280px] max-w-[400px]
              px-6 py-4 rounded-[1.5rem]
              backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)]
              border border-white/20
              ${toast.type === 'success' ? 'bg-white/90' : 'bg-white/95'}
            `}
            >
              {/* Indicator Line */}
              <div
                className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                  toast.type === 'success' ? 'bg-neutral-900' : 'bg-red-500'
                }`}
              />

              {/* Icon */}
              <div className='flex-shrink-0'>
                {toast.type === 'success' ? (
                  <div className='w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center'>
                    <CheckCircle2 className='w-5 h-5 text-neutral-900' />
                  </div>
                ) : (
                  <div className='w-8 h-8 rounded-full bg-red-50 flex items-center justify-center'>
                    <AlertCircle className='w-5 h-5 text-red-500' />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className='flex-1'>
                <p className='text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-0.5'>
                  {toast.type === 'success' ? 'Notification' : 'Attention'}
                </p>
                <p className='text-sm font-bold text-neutral-900 leading-tight'>
                  {toast.message}
                </p>
              </div>

              {/* Manual Close */}
              <button
                onClick={onClose}
                className='p-1 hover:bg-neutral-100 rounded-full transition-colors group'
              >
                <X className='w-4 h-4 text-neutral-300 group-hover:text-neutral-900' />
              </button>

              {/* Animated Progress Bar */}
              <motion.div
                className={`absolute bottom-0 left-0 h-[3px] opacity-20 ${
                  toast.type === 'success' ? 'bg-neutral-900' : 'bg-red-500'
                }`}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

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
          <div className='grid lg:grid-cols-2 gap-8 lg:gap-16 mb-5 md:mb-16'>
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

          <section className='max-w-[1400px] mx-auto px-4 py-6 sm:px-12 md:py-12 border rounded-4xl mb-6 md:mb-16 border-neutral-200 bg-white'>
            <div className='flex flex-col lg:flex-row md:gap-16'>
              <div className='lg:w-80 md:space-y-8 text-center md:text-left flex-shrink-0'>
                <div>
                  <h2 className='text-lg md:text-2xl font-bold text-neutral-900 tracking-tight'>
                    Customer Insights
                  </h2>
                  <div className='flex justify-center md:justify-start items-center gap-3 mt-4 mb-4'>
                    <div className='flex items-center justify-center md:w-14 w-12 h-12 md:h-14 rounded-2xl bg-neutral-900 text-white text-sm md:text-xl font-bold'>
                      {averageRating}
                    </div>
                    <div>
                      <div className='flex gap-0.5'>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(averageRating)
                                ? 'fill-neutral-900 text-neutral-900'
                                : 'text-neutral-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className='text-[10px] md:text-xs font-bold text-neutral-400 uppercase tracking-widest mt-1'>
                        Based on {totalReviews} review
                        {totalReviews !== 1 && 's'}
                      </p>
                    </div>
                  </div>
                </div>

                {ratingDistribution.map(item => (
                  <div key={item.star} className='flex items-center gap-4'>
                    <span className='text-[11px] font-black w-10 text-neutral-400'>
                      {item.star} STAR
                    </span>

                    <div className='flex-1 h-3 bg-neutral-200/50 rounded-full overflow-hidden relative border border-neutral-300/30 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]'>
                      <div
                        className='h-full transition-all duration-1000 ease-out relative'
                        style={{
                          width: `${item.perc}%`,
                          background: `linear-gradient(
        to right, 
        #BF953F 0%, 
        #FCF6BA 25%, 
        #B38728 50%, 
        #FBF5B7 75%, 
        #AA771C 100%
      )`,
                          boxShadow:
                            '0 0 10px rgba(191, 149, 63, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                        }}
                      >
                        <div
                          className='absolute inset-0 w-full h-full animate-gold-shine'
                          style={{
                            background:
                              'linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)',
                            transform: 'skewX(-25deg)'
                          }}
                        />
                      </div>
                    </div>

                    <span className='text-[11px] font-bold text-neutral-900 w-8 text-right'>
                      {item.perc}%
                    </span>
                  </div>
                ))}

                <div className='pt-4 mt-4 md:pt-8 border-t border-neutral-100'>
                  <h3 className='font-bold text-xs md:text-sm text-black uppercase tracking-widest md:mb-2'>
                    Review this product
                  </h3>
                  <p className='text-[10px] md:text-sm text-neutral-500 mb-2 md:mb-6 leading-relaxed'>
                    Help the community by sharing your honest experience.
                  </p>

                  {myReview ? (
                    <button
                      onClick={() => {
                        setEditingReview(true)
                        setShowReviewModal(true)
                      }}
                      className='w-full py-2 md:py-4 bg-white cursor-pointer border-2 border-black rounded-xl text-xs text-black uppercase tracking-widest hover:bg-neutral-50 transition-all active:scale-[0.98]'
                    >
                      Modify your review
                    </button>
                  ) : canReview ? (
                    <button
                      onClick={() => setShowReviewModal(true)}
                      className='w-full py-2 md:py-4 bg-black cursor-pointer text-white rounded-xl text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-xl active:scale-[0.98]'
                    >
                      Write a Review
                    </button>
                  ) : (
                    <div className='p-4 bg-neutral-50 rounded-2xl border border-neutral-100 text-center'>
                      <p className='text-[10px] text-neutral-400 font-bold uppercase tracking-widest'>
                        Purchase to Review
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className='flex-1 mt-6'>
                <div className='flex items-center justify-between border-b border-neutral-100 pb-6 mb-2'>
                  <h3 className='text-xs md:text-sm font-black uppercase tracking-widest text-neutral-900'>
                    List of Reviews
                  </h3>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className='text-xs text-black font-bold bg-transparent cursor-pointer'
                  >
                    <option value='recent'>Sort by: Most Recent</option>
                    <option value='rating'>Sort by: Highest Rating</option>
                  </select>
                </div>

                {reviews.length === 0 ? (
                  <div className='py-20 text-center'>
                    <p className='text-neutral-400 text-xs md:text-base md:font-medium italic'>
                      No reviews have been published yet.
                    </p>
                  </div>
                ) : (
                  <div className='divide-y divide-neutral-100'>
                    {orderedReviews.map(review => (
                      <div
                        key={review.id}
                        className='py-4 md:py-10 space-y-2 md:space-y-5 group'
                      >
                        <div className='flex items-center mb-4 justify-between'>
                          <div className='flex items-center gap-3'>
                            <div className='md:w-10 w-8 h-8 md:h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white text-[10px] font-bold'>
                              {review.user_name?.charAt(0) || 'U'}
                            </div>
                            <div className='flex flex-col justify-center gap-0.5'>
                              {' '}
                      
                              <span className='text-xs mb-1 md:text-sm font-black text-neutral-900 leading-tight block'>
                                {review.user_name || 'Verified Client'}
                              </span>
                              <span className='text-[8px] md:text-[10px] font-bold text-green-600 uppercase tracking-tighter block leading-none -mt-0.5'>
                                Verified Purchase
                              </span>
                            </div>
                          </div>
                          <span className='text-[10px] md:text-[11px] font-bold text-neutral-500 uppercase'>
                            {new Date(review.created_at).toLocaleDateString(
                              'en-IN',
                              { month: 'short', year: 'numeric' }
                            )}
                          </span>
                        </div>
                        <div className='flex gap-0.5'>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-black text-black'
                                  : 'text-neutral-200'
                              }`}
                            />
                          ))}
                        </div>

                        <div className='text-xs md:text-[15px] text-neutral-700 leading-relaxed font-medium max-w-3xl'>
                          &quot;{review.comment}&quot;
                        </div>

                        {/* Interaction Bar */}
                        <div className='pt-2 flex items-center gap-6'>
                          <button className='group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-black transition-colors'>
                            <ThumbsUp className='w-3.5 h-3.5 group-active:scale-90 transition-transform' />
                            Helpful
                          </button>
                          <button className='text-[10px] font-black uppercase tracking-widest text-neutral-300 hover:text-red-500 transition-colors'>
                            Report
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
      <Toast toast={toast} onClose={() => setToast(null)} />
      <LuxuryFooter />
    </>
  )
}
