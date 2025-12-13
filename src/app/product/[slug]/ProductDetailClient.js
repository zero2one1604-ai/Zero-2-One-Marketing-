// app/product/[slug]/ProductDetailClient.js
'use client'

import React, { useState } from 'react'
import {
  ShoppingCart,
  Heart,
  Share2,
  Sparkles,
  ChevronRight,
  Minus,
  Plus,
  Check,
  Package,
  Shield,
  ShoppingBag,
  Truck,
  Star,
  ArrowRight
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import LuxuryFooter from '@/app/components/Footer'

const REVIEWS = [
  {
    id: 1,
    author: 'Eleanor V.',
    rating: 5,
    title: 'An absolute masterpiece',
    content:
      'The scent profile is incredibly complex. It sits beautifully on the skin all day. The solid format is perfect for travel.',
    date: '2 days ago'
  },
  {
    id: 2,
    author: 'Marcus C.',
    rating: 5,
    title: 'Signature Scent Worthy',
    content:
      'Deep, rich, and sophisticated. Worth every penny for the quality of ingredients.',
    date: '1 week ago'
  },
  {
    id: 3,
    author: 'Sarah L.',
    rating: 4,
    title: 'Luxurious packaging',
    content:
      'The compact itself is heavy and feels expensive. The scent is lovely, though I wish it projected slightly more.',
    date: '2 weeks ago'
  }
]

const SIMILAR_PRODUCTS = [
  {
    id: 1,
    name: 'Oud Noir Intense',
    category: 'Solid Perfume',
    price: 4999,
    image: '/images/perfume1.jpg'
  }, // Replace image paths
  {
    id: 2,
    name: 'Amber Majesty',
    category: 'Solid Perfume',
    price: 3500,
    image: '/images/perfume2.jpg'
  },
  {
    id: 3,
    name: 'Midnight Rose',
    category: 'Solid Perfume',
    price: 4200,
    image: '/images/perfume3.jpg'
  },
  {
    id: 4,
    name: 'Sandalwood Santal',
    category: 'Solid Perfume',
    price: 3800,
    image: '/images/perfume4.jpg'
  }
]

export default function ProductDetailClient ({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const handleAddToCart = () => {
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  const discount = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
  )

  const goldBtnClasses = `
    relative w-full py-5 overflow-hidden rounded-lg group transition-all duration-300
    bg-gradient-to-b from-[#FBF3E3] via-[#D4AF37] to-[#A37C1A]
    border border-[#B38D25]
    shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_12px_rgba(0,0,0,0.4)]
    hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_6px_16px_rgba(212,175,55,0.3)]
    active:scale-[0.99] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]
    disabled:opacity-70 disabled:cursor-not-allowed
  `

  const goldTextClasses =
    'text-transparent bg-clip-text bg-gradient-to-b from-[#FBF3E3] via-[#D4AF37] to-[#A37C1A] drop-shadow-sm'

  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1629] to-[#1a1f3a] text-slate-200 font-sans selection:bg-amber-900/50 selection:text-amber-100'>
        <div className='border-b border-amber-100/5 bg-[#050B1A]/90 backdrop-blur-md sticky top-0 z-50'>
          <div className='max-w-[1440px] mx-auto px-6 py-4'>
            <div className='flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-slate-500 font-medium'>
              <Link href='/' className='hover:text-amber-400 transition-colors'>
                Home
              </Link>
              <ChevronRight className='w-3 h-3 text-slate-700' />
              <Link
                href='/shop'
                className='hover:text-amber-400 transition-colors'
              >
                Shop
              </Link>
              <ChevronRight className='w-3 h-3 text-slate-700' />
              <span className='text-slate-300'>{product.category}</span>
            </div>
          </div>
        </div>

        <main className='max-w-[1440px] mx-auto px-6 pb-24'>
          <div className='grid lg:grid-cols-12 gap-12 lg:gap-24 py-12 lg:py-20'>
            <div className='lg:col-span-7 space-y-8'>
              <div className='relative w-full aspect-[4/5] bg-gradient-to-b from-[#0A1329] to-[#050B1A] rounded-2xl overflow-hidden border border-amber-100/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group'>
                <Image
                  src={product.proimage}
                  alt={`${product.name} by ${product.brand}`}
                  fill
                  className='object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-105'
                  priority
                  sizes='(max-width: 1024px) 100vw, 60vw'
                />
                <div className='absolute inset-0 bg-radial-gradient from-transparent to-[#050B1A]/60 pointer-events-none' />
              </div>

              <div className='grid grid-cols-3 divide-x divide-amber-100/10 border border-amber-100/10 rounded-xl bg-[#0A1329]/50 backdrop-blur-lg'>
                <div className='p-5 flex flex-col items-center justify-center gap-2 text-center'>
                  <Truck className='w-5 h-5 text-white' />
                  <p className='text-[11px] font-bold text-amber-100 uppercase tracking-widest'>
                    Complimentary Shipping
                  </p>
                </div>
                <div className='p-5 flex flex-col items-center justify-center gap-2 text-center'>
                  <Shield className='w-5 h-5 text-white' />
                  <p className='text-[11px] font-bold text-amber-100 uppercase tracking-widest'>
                    Guaranteed Authentic
                  </p>
                </div>
                <div className='p-5 flex flex-col items-center justify-center gap-2 text-center'>
                  <Package className='w-5 h-5 text-white' />
                  <p className='text-[11px] font-bold text-amber-100 uppercase tracking-widest'>
                    Exquisite Packaging
                  </p>
                </div>
              </div>
            </div>

            <div className='lg:col-span-5 flex flex-col justify-center'>
              <div className='space-y-10'>
                <div className='space-y-4 pb-8 border-b border-amber-100/5'>
                  <div className='flex items-center justify-between'>
                    <span
                      className={`font-bold text-sm tracking-[0.3em] uppercase ${goldTextClasses}`}
                    >
                      {product.brand}
                    </span>
                    <div className='flex items-center gap-4'>
                      <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className='w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group'
                      >
                        <Heart
                          className={`w-4 h-4 transition-all ${
                            isFavorite
                              ? 'fill-rose-500 text-rose-500'
                              : 'text-slate-400 group-hover:text-white'
                          }`}
                        />
                      </button>
                      <button className='w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group'>
                        <Share2 className='w-4 h-4 text-slate-400 group-hover:text-white' />
                      </button>
                    </div>
                  </div>

                  <h1 className='text-5xl lg:text-6xl font-serif text-white font-medium leading-tight'>
                    {product.name}
                  </h1>

                  <p className='text-xl text-amber-200/80 font-serif italic'>
                    {product.tagline}
                  </p>

                  <div className='flex items-end gap-4 pt-4'>
                    <span
                      className={`text-4xl font-serif font-medium ${goldTextClasses}`}
                    >
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className='text-xl text-slate-500 line-through mb-1 font-serif'>
                      ₹{product.mrp.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className='space-y-4'>
                  <h3 className='text-sm font-bold text-amber-100 uppercase tracking-widest flex items-center gap-2'>
                    <span className='w-8 h-[1px] bg-amber-500/50'></span>
                    The Experience
                  </h3>
                  <p className='text-slate-300 leading-relaxed font-light text-base lg:text-lg'>
                    {product.description}
                  </p>
                </div>
                <div className='space-y-6 py-8 border-y border-amber-100/5'>
                  <div className='grid grid-cols-[100px_1fr] items-baseline gap-4'>
                    <h4 className='text-xs font-bold text-slate-500 uppercase tracking-widest'>
                      Mood
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {product.mood.map((m, i) => (
                        <span
                          key={i}
                          className='px-4 py-1.5 bg-[#0A1329] border border-amber-500/20 text-amber-100/90 text-xs rounded-full uppercase tracking-wider'
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='grid grid-cols-[100px_1fr] items-baseline gap-4'>
                    <h4 className='text-xs font-bold text-slate-500 uppercase tracking-widest'>
                      Notes
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {product.notes.slice(0, 3).map((note, i) => (
                        <span
                          key={i}
                          className='px-4 py-1.5 bg-[#0A1329] border border-amber-500/20 text-amber-100/90 text-xs rounded-full uppercase tracking-wider'
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='space-y-8 pt-4'>
                  <div className='flex items-center justify-between'>
                    <label className='text-sm text-amber-100/80 font-medium tracking-wider uppercase'>
                      Quantity
                    </label>
                    <div className='flex items-center border border-amber-100/20 rounded-full p-1 bg-[#0A1329]'>
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className='w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 text-slate-400 hover:text-amber-400 transition-colors'
                      >
                        <Minus className='w-4 h-4' />
                      </button>
                      <span className='w-14 text-center text-lg font-medium text-white tabular-nums font-serif'>
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className='w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 text-slate-400 hover:text-amber-400 transition-colors'
                      >
                        <Plus className='w-4 h-4' />
                      </button>
                    </div>
                  </div>

                  <div className='flex'>
                    <button
                      disabled={isAddedToCart}
                      className={goldBtnClasses}
                    >
                      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out' />

                      <span className='relative z-10 flex cursor-pointer items-center justify-center gap-3 text-[#42200B] text-sm tracking-[0.2em] uppercase font-bold'>
                         <ShoppingBag className='w-5 h-5' /> Purchase Now
                      </span>
                    </button>
                    <button
                      className={`py-5 border border-yellow-400 cursor-pointer hover:scale-105 transition-all rounded-xl ml-4 w-50 p-0 flex items-center justify-center`}
                    onClick={handleAddToCart}>
                      <span>
                         {isAddedToCart ? (
                          <>
                            <Check className='w-5 h-5' />
                          </>
                        ) : (
                          <>
                            <ShoppingCart className='w-5 h-5 text-yellow-400' />
                          </>
                        )}
                      </span>
                   
                    </button>
                  </div>

                  <p className='text-center text-xs text-amber-200/60 font-medium tracking-wider'>
                    In Stock. Ships within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section className='py-24 border-t border-amber-100/5'>
            <div className='grid lg:grid-cols-12 gap-12'>
              <div className='lg:col-span-4 space-y-6'>
                <h2 className='text-3xl font-serif text-white'>
                  Client Reviews
                </h2>
                <div className='flex items-center gap-4'>
                  <div className='flex text-amber-400'>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className='w-6 h-6 fill-current' />
                    ))}
                  </div>
                  <span className='text-2xl font-serif text-white'>4.9</span>
                  <span className='text-slate-400'>(128 Reviews)</span>
                </div>
                <p className='text-slate-300 text-sm leading-relaxed'>
                  Read what our discerning clientele has to say about the{' '}
                  {product.name} experience.
                </p>
                <button
                  className={`mt-4 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border border-[#B38D25] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors`}
                >
                  Write a Review
                </button>
              </div>
              <div className='lg:col-span-8 grid md:grid-cols-2 gap-6'>
                {REVIEWS.map(review => (
                  <div
                    key={review.id}
                    className='p-8 bg-[#0A1329]/60 border border-amber-100/10 rounded-2xl backdrop-blur-sm relative group hover:border-amber-500/30 transition-colors'
                  >
                    <span className='absolute top-6 right-6 text-6xl text-amber-900/40 font-serif leading-none'>
                      “
                    </span>

                    <div className='flex text-amber-400 mb-4 relative z-10'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-current'
                              : 'text-slate-700 fill-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <h4 className='text-lg font-serif text-white mb-2 relative z-10'>
                      {review.title}
                    </h4>
                    <p className='text-slate-300 text-sm leading-relaxed mb-6 relative z-10'>
                      {review.content}
                    </p>
                    <div className='flex items-center justify-between text-xs relative z-10'>
                      <span className='font-bold text-amber-100/80 uppercase tracking-wider'>
                        {review.author}
                      </span>
                      <span className='text-slate-500'>{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className='py-24 border-t border-amber-100/5'>
            <div className='flex items-center justify-between mb-12'>
              <h2 className='text-3xl font-serif text-white'>
                Curated For You
              </h2>
              <Link
                href='/shop'
                className='group flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest'
              >
                View Collection{' '}
                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
              </Link>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8'>
              {SIMILAR_PRODUCTS.map(item => (
                <Link
                  href={`/product/${item.id}`}
                  key={item.id}
                  className='group block'
                >
                  <div className='relative aspect-[3/4] rounded-xl overflow-hidden mb-6 border border-amber-100/5 bg-[#0A1329]'>
                    <Image
                      src={item.image || product.image}
                      alt={item.name}
                      fill
                      className='object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#050B1A] via-transparent to-transparent opacity-50'></div>
                  </div>
                  <div className='text-center space-y-2'>
                    <p className='text-xs text-amber-200/60 font-medium uppercase tracking-widest'>
                      {item.category}
                    </p>
                    <h3 className='text-lg font-serif text-white group-hover:text-amber-400 transition-colors'>
                      {item.name}
                    </h3>
                    <p className={`text-base font-serif ${goldTextClasses}`}>
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
      <LuxuryFooter />
    </>
  )
}
