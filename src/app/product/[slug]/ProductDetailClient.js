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
  ArrowRight,
  MessageSquare
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import LuxuryFooter from '@/app/components/Footer'
import products from '../../data/products'
import Product3DScene from '@/app/components/Product3DScene'

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

  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const goldBtnClasses = `
    relative w-full py-4 sm:py-5 overflow-hidden rounded-lg group transition-all duration-300
    bg-gradient-to-b from-[#FBF3E3] via-[#D4AF37] to-[#A37C1A]
    border border-[#B38D25] cursor-pointer
    shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_12px_rgba(0,0,0,0.4)]
    hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_6px_16px_rgba(212,175,55,0.3)]
    active:scale-[0.99] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]
    disabled:opacity-70 disabled:cursor-not-allowed
  `

  const goldTextClasses =
    'text-transparent bg-clip-text bg-gradient-to-b from-[#FBF3E3] via-[#D4AF37] to-[#A37C1A] drop-shadow-sm'

  return (
    <>
      <div className='min-h-screen bg-[#F6F4EF]  text-slate-200 font-sans selection:bg-amber-900/50 selection:text-amber-100'>
        <div className='bg-gradient-to-b from-amber-50 via-white to-amber-50 backdrop-blur-md sticky top-0 z-50'>
          <div className='max-w-[1440px] mx-auto px-4 sm:px-6 py-3 sm:py-4'>
            <div className='flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.15em] uppercase text-slate-500 font-medium overflow-x-auto'>
              <Link href='/' className='hover:text-amber-900 transition-colors whitespace-nowrap'>
                Home
              </Link>
              <ChevronRight className='w-3 h-3 text-slate-700 flex-shrink-0' />
              <Link href='/shop' className='hover:text-amber-900 transition-colors whitespace-nowrap'>
                Shop
              </Link>
              <ChevronRight className='w-3 h-3 text-slate-700 flex-shrink-0' />
              <span className='text-black whitespace-nowrap'>{product.category}</span>
            </div>
          </div>
        </div>

        <main className='max-w-[1440px] px-4 sm:px-6 mx-auto pb-12 sm:pb-24'>
          <div className='grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-24 py-8 sm:py-12 lg:py-20'>
            
            <div className='lg:col-span-7 space-y-4 sm:space-y-8'>
              <div className='relative w-full h-[400px] px-0 sm:px-0 sm:h-[500px] lg:h-[600px] mb-30 md:mb-0 xl:h-[700px] 2xl:h-[800px]'>
                <Product3DScene image={product.dimage} />
              </div>

              <div className='grid grid-cols-3 divide-x divide-black/65 border border-black  rounded-lg sm:rounded-xl bg-white backdrop-blur-lg'>
                <div className='p-3 sm:p-5 flex flex-col items-center justify-center gap-1.5 sm:gap-2 text-center'>
                  <Truck className='w-4 h-4 sm:w-5 sm:h-5 text-[#3D2F1F]' />
                  <p className='text-[9px] sm:text-[11px] font-bold text-[#6E6A61] uppercase tracking-wider sm:tracking-widest leading-tight'>
                    Quick Shipping
                  </p>
                </div>
                <div className='p-3 sm:p-5 flex flex-col items-center justify-center gap-1.5 sm:gap-2 text-center'>
                  <Shield className='w-4 h-4 sm:w-5 sm:h-5 text-[#3D2F1F]' />
                  <p className='text-[9px] sm:text-[11px] font-bold text-[#6E6A61] uppercase tracking-wider sm:tracking-widest leading-tight'>
                    100% Authentic
                  </p>
                </div>
                <div className='p-3 sm:p-5 flex flex-col items-center justify-center gap-1.5 sm:gap-2 text-center'>
                  <Package className='w-4 h-4 sm:w-5 sm:h-5 text-[#3D2F1F]' />
                  <p className='text-[9px] sm:text-[11px] font-bold text-[#6E6A61] uppercase tracking-wider sm:tracking-widest leading-tight'>
                    Premium Packaging
                  </p>
                </div>
              </div>
            </div>

            <div className='lg:col-span-5 flex flex-col justify-center'>
              <div>
                
                <div className='space-y-3 sm:space-y-4 pb-6 sm:pb-8 border-b border-gray-500'>
                  <div className='flex items-center justify-between'>
                  
                    <div className='flex items-center gap-2 sm:gap-4'>
                      <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className='w-9 h-9 cursor-pointer sm:w-10 sm:h-10 rounded-full bg-white border border-gray-400 flex items-center justify-center hover:bg-white/10 transition-all group'
                      >
                        <Heart
                          className={`w-4 h-4 transition-all ${
                            isFavorite
                              ? 'fill-rose-500 text-rose-500'
                              : 'text-slate-400 group-hover:text-slate-800'
                          }`}
                        />
                      </button>
                      <button className='w-9 h-9 cursor-pointer sm:w-10 sm:h-10 rounded-full bg-white border border-gray-400 flex items-center justify-center hover:bg-white/10 transition-all group'>
                        <Share2 className='w-4 h-4 text-slate-400 group-hover:text-slate-800' />
                      </button>
                    </div>
                  </div>

                  <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-[#3D2F1F] font-medium leading-tight'>
                    {product.name}
                  </h1>

                  <p className='text-base sm:text-lg lg:text-xl text-[#6E6A61] font-serif italic'>
                    {product.tagline}
                  </p>

                  <div className='flex items-end gap-3 sm:gap-4 pt-2 sm:pt-4'>
                    <span className={`text-3xl sm:text-4xl font-serif font-medium text-amber-900`}>
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className='text-lg sm:text-xl text-slate-500 line-through mb-1 font-serif'>
                      ₹{product.mrp.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className='space-y-3 mt-6 sm:space-y-4'>
                  <h3 className='text-xs sm:text-sm font-bold text-[#6E6A61] uppercase tracking-widest flex items-center gap-2'>
                    <span className='w-6 sm:w-8 h-[1px] bg-black'></span>
                    The Experience
                  </h3>
                  <p className='text-sm sm:text-base lg:text-lg text-[#6E6A61] leading-relaxed font-light'>
                    {product.description}
                  </p>
                </div>

                <div className=' py-6 sm:py-8 border-y border-amber-100/5'>
                  <div className='space-y-3'>
                    <h4 className='text-xs font-bold text-slate-500 uppercase tracking-widest'>
                      Mood
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {product.mood.map((m, i) => (
                        <span
                          key={i}
                          className='px-3 sm:px-4 py-1 sm:py-1.5 bg-[#0A1329] border border-amber-500/20 text-amber-100/90 text-[10px] sm:text-xs rounded-full uppercase tracking-wider'
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='space-y-3 mt-6'>
                    <h4 className='text-xs font-bold text-slate-500 uppercase tracking-widest'>
                      Notes
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {product.notes.slice(0, 3).map((note, i) => (
                        <span
                          key={i}
                          className='px-3 sm:px-4 py-1 sm:py-1.5 bg-[#0A1329] border border-amber-500/20 text-amber-100/90 text-[10px] sm:text-xs rounded-full uppercase tracking-wider'
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='space-y-6 sm:space-y-8 pt-2 sm:pt-4'>
                  <div className='flex items-center justify-between'>
                    <label className='text-xs sm:text-sm text-black font-medium tracking-wider uppercase'>
                      Quantity
                    </label>
                    <div className='flex items-center border border-amber-100/20 rounded-full p-0.5 sm:p-1 bg-[#0A1329]'>
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className='w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-white/5 text-slate-400 hover:text-amber-400 transition-colors'
                      >
                        <Minus className='w-3 h-3 sm:w-4 sm:h-4' />
                      </button>
                      <span className='w-12 sm:w-14 text-center text-base sm:text-lg font-medium text-white tabular-nums font-serif'>
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className='w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-white/5 text-slate-400 hover:text-amber-400 transition-colors'
                      >
                        <Plus className='w-3 h-3 sm:w-4 sm:h-4' />
                      </button>
                    </div>
                  </div>

                  <div className='flex gap-3 sm:gap-4'>
                    <button
                      disabled={isAddedToCart}
                      className={goldBtnClasses}
                    >
                      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out' />
                      <span className='relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-[#42200B] text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold'>
                        <ShoppingBag className='w-4 h-4 sm:w-5 sm:h-5' /> 
                        <span className='hidden xs:inline'>Purchase Now</span>
                        <span className='xs:hidden'>Buy Now</span>
                      </span>
                    </button>
                    <button
                      className='py-4 sm:py-5 px-4 sm:px-6 border border-black cursor-pointer hover:scale-105 transition-all rounded-lg sm:rounded-xl flex items-center justify-center'
                      onClick={handleAddToCart}
                    >
                      {isAddedToCart ? (
                        <Check className='w-4 h-4 sm:w-5 sm:h-5 text-green-400' />
                      ) : (
                        <ShoppingCart className='w-4 h-4 sm:w-5 sm:h-5 text-black' />
                      )}
                    </button>
                  </div>

                  <p className='text-center text-[10px] sm:text-xs text-[#6E6A61] font-medium tracking-wider'>
                    In Stock. Ships within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section className='py-12 sm:py-16 lg:py-24 border-t border-amber-100/5'>
            <div className='max-w-3xl mx-auto text-center space-y-6 sm:space-y-8'>
              <div className='inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500/10 border border-[#3D2F1F] mb-4'>
                <MessageSquare className='w-8 h-8 sm:w-10 sm:h-10 text-[#3D2F1F]' />
              </div>
              
              <div className='space-y-3 sm:space-y-4'>
                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-serif text-[#3D2F1F]'>
                  Be The First to Review
                </h2>
                <p className='text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto px-4'>
                  Share your experience with {product.name} and help others discover this exceptional fragrance.
                </p>
              </div>

              <button className='inline-flex cursor-pointer items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest border border-[#232323] text-[#000000] hover:bg-[#D4AF37]/10 transition-all hover:scale-105'>
                <Star className='w-4 h-4' />
                Write a Review
              </button>
            </div>
          </section>

          {similarProducts.length > 0 && (
            <section className='py-12 sm:py-16 lg:py-24 border-t border-amber-100/5'>
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12'>
                <h2 className='text-2xl sm:text-3xl font-serif text-black'>
                  Curated For You
                </h2>
                <Link
                  href='/shop'
                  className='group flex items-center gap-2 text-xs font-bold text-[#3D2F1F] uppercase tracking-widest'
                >
                  View Collection{' '}
                  <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                </Link>
              </div>

              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
                {similarProducts.map(item => (
                  <Link
                    href={`/product/${item.slug}`}
                    key={item.id}
                    className='group block'
                  >
                    <div className='relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-6 border border-amber-100/5 bg-[#0A1329]'>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className='object-cover  group-hover:scale-105 transition-all duration-700'
                        sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
                      />
                     </div>
                    <div className='text-center space-y-1 sm:space-y-2 px-1'>
                      <p className='text-[9px] sm:text-xs text-[#6E6A61] font-medium uppercase tracking-widest'>
                        {item.category}
                      </p>
                      <h3 className='text-sm sm:text-base lg:text-lg font-serif text-[#3D2F1F] group-hover:text-amber-800 transition-colors line-clamp-2'>
                        {item.name}
                      </h3>
                      <p className={`text-sm sm:text-base font-serif text-amber-900`}>
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
      <LuxuryFooter />
    </>
  )
}