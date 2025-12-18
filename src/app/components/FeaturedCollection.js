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
    <div className='min-h-screen bg-[#F6F4EF] py-8 md:py-16 px-4 border-t-4 md:border-t-8 border-gold-texture'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-6 md:mb-16 md:space-y-4'>
          <div className='flex items-center justify-center gap-2 md:mb-4'>
            <h1 className='text-lg md:text-5xl font-light text-[#1C1C1A] tracking-[0.2em] the-seasons uppercase'>
              Featured Collection
            </h1>
          </div>
          <p className='text-[#6E6A61] text-xs md:text-sm tracking-wider uppercase font-light'>
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
              <div className='relative bg-white rounded-lg overflow-hidden border border-amber-200/10 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-amber-500/20'>
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

                  <div className='absolute inset-0 bg-gradient-to-t hidden from-[#D4C4A8] via-transparent to-transparent opacity-60' />

                  <button
                    onClick={() => toggleFavorite(perfume.id)}
                    className='absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-slate-900 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110'
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${
                        favorites.has(perfume.id)
                          ? 'fill-red-400 text-red-400'
                          : 'text-black'
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute inset-0 bg-[#D9CDB5]/95 backdrop-blur-sm transition-all duration-500 flex items-center justify-center ${
                      hoveredId === perfume.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className='text-center px-6'>
                      <p className='text-amber-800/80 text-xs tracking-widest uppercase mb-2 font-light'>
                        Notes
                      </p>
                      <p className='text-[#3D2F1F] text-sm font-light'>
                        {perfume.notes.join(', ')}
                      </p>
                    </div>
                  </div>
                       </Link>
                </div>
                
                <Link href={`/product/${perfume.slug}`}>
                  <div className='p-3 md:p-6 md:space-y-4 cursor-pointer'>
                    <h3 className='text-[#3D2F1F] text-sm text-center md:text-left md:text-xl font-light tracking-wide'>
                      {perfume.name}
                    </h3>

                    <div className='flex items-center mx-auto md:justify-between justify-center'>
                      <div className='flex items-baseline gap-2'>
                        <p className='text-amber-900 text-lg sm:text-xl lg:text-2xl font-light'>
                          ₹{perfume.price}
                        </p>
                        {perfume.mrp && perfume.mrp > perfume.price && (
                          <p className='text-slate-500 text-xs sm:text-sm line-through'>
                            ₹{perfume.mrp}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(perfume.id)}
                      disabled={cartItems.has(perfume.id)}
                      className='
w-full py-2 mt-2 md:py-3.5 cursor-pointer
bg-gradient-to-br from-[#C9A43B] via-[#F1DB8A] to-[#9C7A22]
text-[#1A1405]
shadow-[0_6px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-2px_0_rgba(0,0,0,0.45)]
transition-all duration-300
hover:shadow-[0_10px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-2px_0_rgba(0,0,0,0.35)]
hover:from-[#B08D2A] hover:via-[#E6C96A] hover:to-[#8A6A1C]
active:scale-[0.98]
focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/40 focus:ring-offset-2
border border-[#8F7220]
relative overflow-hidden rounded-xl
flex items-center justify-center gap-2
'
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
