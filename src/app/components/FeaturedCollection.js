'use client'

import React, { useState } from 'react'
import { ShoppingCart, Heart, ShoppingBag } from 'lucide-react'
import products from '../data/products'
import Image from 'next/image'
import Link from 'next/link'

export default function LuxuryPerfumeGallery () {
  const [hoveredId, setHoveredId] = useState(null)
  const [favorites, setFavorites] = useState(new Set())
  const [cartItems, setCartItems] = useState(new Set())

  const perfumes = products.slice(0, 8)

  const toggleFavorite = id => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  const addToCart = id => {
    setCartItems(prev => {
      const newCart = new Set(prev)
      newCart.add(id)
      return newCart
    })
    setTimeout(() => {
      setCartItems(prev => {
        const newCart = new Set(prev)
        newCart.delete(id)
        return newCart
      })
    }, 2000)
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-[#1c3858] via-[#1B3A5F] to-[#1c3858] py-8 md:py-16 px-4 border-t-4 md:border-t-8 border-gold-texture'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-6 md:mb-16 md:space-y-4'>
          <div className='flex items-center justify-center gap-2 md:mb-4'>
            <h1 className='text-lg md:text-5xl font-light text-white tracking-[0.2em] the-seasons uppercase'>
              Featured Collection
            </h1>
          </div>
          <p className='text-amber-100/60 text-xs md:text-sm tracking-wider uppercase font-light'>
            Discover our most exquisite fragrances
          </p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8'>
          {perfumes.map(perfume => (
            <div
              key={perfume.id}
              className='group relative'
              onMouseEnter={() => setHoveredId(perfume.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className='relative bg-gradient-to-b from-[#1a2540] to-[#0f1629] rounded-lg overflow-hidden border border-amber-200/10 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-amber-500/20'>
                <div className='relative h-fit overflow-hidden'>
                  <Link href={`/product/${perfume.slug}`}>
                    <Image
                      src={perfume.image}
                      alt={`${perfume.name} perfume bottle`}
                      width={600}
                      height={600}
                      priority={false}
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      className='w-full h-full cursor-pointer object-cover transition-transform duration-700 group-hover:scale-110'
                    />
                  </Link>

                  <div className='absolute inset-0 bg-gradient-to-t from-[#0f1629] via-transparent to-transparent opacity-60' />

                  <button
                    onClick={() => toggleFavorite(perfume.id)}
                    className='absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110'
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${
                        favorites.has(perfume.id)
                          ? 'fill-red-400 text-red-400'
                          : 'text-white'
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute inset-0 bg-[#0a1628]/95 backdrop-blur-sm transition-all duration-500 flex items-center justify-center ${
                      hoveredId === perfume.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className='text-center px-6'>
                      <p className='text-amber-200/80 text-xs tracking-widest uppercase mb-2 font-light'>
                        Notes
                      </p>
                      <p className='text-white text-sm font-light'>
                        {perfume.notes.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
                <Link href={`/product/${perfume.slug}`}>
                  <div className='p-3 md:p-6 md:space-y-4 cursor-pointer'>
                    <h3 className='text-white text-sm text-center md:text-left md:text-xl font-light tracking-wide'>
                      {perfume.name}
                    </h3>

                    <p className='text-amber-100  text-center md:text-left text-lg md:text-2xl font-light'>
                      ₹{perfume.price}
                    </p>

                    <button
                      onClick={() => addToCart(perfume.id)}
                      disabled={cartItems.has(perfume.id)}
                      className='w-full py-2 mt-2 md:py-3.5 cursor-pointer bg-gradient-to-br from-[#f8f8f8] via-[#dcdcdc] to-[#f1f1f1] text-[#1a1a1a] text-xs tracking-[0.15em] uppercase font-semibold rounded shadow-xl shadow-black/30 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50
hover:from-[#ffffff] hover:via-[#e6e6e6] hover:to-[#ffffff] active:scale-[0.98] border border-[#bfbfbf] disabled:from-slate-700 disabled:via-slate-600 disabled:to-slate-700  disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed  disabled:border-slate-600 flex items-center justify-center gap-2 relative overflow-hidden'
                    >
                      <div className='absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/20 pointer-events-none' />

                      <span className='relative z-10 flex text-xs md:text-base items-center gap-2'>
                        {cartItems.has(perfume.id) ? (
                          <>
                            <span>✓</span>
                            <span>Added to Cart</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className='w-3 h-3 md:w-4 md:h-4' />
                            <span>Buy Now</span>
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </Link>

                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
