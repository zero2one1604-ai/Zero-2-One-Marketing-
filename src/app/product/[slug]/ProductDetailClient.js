'use client'

import React, { useState, useEffect } from 'react'
import {
  ShoppingCart, Heart, Share2, ChevronRight, Minus, Plus, Check, 
  Package, Shield, ShoppingBag, Truck, Star, ArrowRight, MessageSquare
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import LuxuryFooter from '@/app/components/Footer'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { createOrder } from '@/app/actions/createOrder'
import products from '@/data/products'
import Product3DScene from '@/app/components/Product3DScene'
import { useAuthModal } from '@/app/components/AuthModalProvider'

export default function ProductDetailClient ({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const { openAuthModal } = useAuthModal()
  const router = useRouter()
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const handleAddToCart = () => {
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  const handleBuyNow = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      openAuthModal({ onSuccess: () => handleBuyNow() })
      return
    }
    const orderId = await createOrder({ productId: product.id, quantity, userId: user.id })
    router.push(`/checkout/${orderId}`)
  }

  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <>
      <div className="min-h-screen bg-[#FAF9F6]">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="pt-24 pb-4 px-6 sm:px-12">
          <div className="max-w-[1600px] mx-auto flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/shop" className="hover:text-black transition-colors">Collection</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-neutral-900">{product.name}</span>
          </div>
        </nav>

        <main className="max-w-[1600px] mx-auto px-6 sm:px-12 pb-24">
          <div className="grid lg:grid-cols-12 gap-16 xl:gap-24">
            
            <div className="lg:col-span-7 space-y-12">
              <div className="relative aspect-square md:aspect-[4/5] bg-white rounded-[3rem] overflow-hidden shadow-sm border border-neutral-100">
                 <Product3DScene image={product.dimage} />
                 
                 <div className="absolute top-8 right-8 flex flex-col gap-4">
                    <button onClick={() => setIsFavorite(!isFavorite)} className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center border border-neutral-100 shadow-sm hover:scale-110 transition-all">
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-neutral-400'}`} />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center border border-neutral-100 shadow-sm hover:scale-110 transition-all">
                      <Share2 className="w-5 h-5 text-neutral-400" />
                    </button>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Truck, label: "Express Delivery" },
                  { icon: Shield, label: "Verified Purity" },
                  { icon: Package, label: "Bespoke Packaging" }
                ].map((item, i) => (
                  <div key={i} className="py-6 flex flex-col items-center justify-center gap-3 bg-white rounded-3xl border border-neutral-100 text-center">
                    <item.icon className="w-5 h-5 text-neutral-900" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* --- RIGHT: PRODUCT INFO --- */}
            <div className="lg:col-span-5 flex flex-col justify-center py-10">
              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">For {product.category}</span>
                  </div>
                  <h1 className="text-5xl the-seasons md:text-7xl font-light text-neutral-900 tracking-tight leading-none uppercase">
                    {product.name}
                  </h1>
                  <p className="text-lg font-serif italic text-neutral-500">{product.tagline}</p>
                </div>

                <div className="flex items-baseline gap-6 border-y border-neutral-100 py-8">
                  <span className="text-4xl font-light text-neutral-900">₹{product.price.toLocaleString()}</span>
                  <span className="text-xl text-neutral-300 line-through font-light italic">₹{product.mrp.toLocaleString()}</span>
                  <span className="ml-auto text-[10px] font-bold text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">Save {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%</span>
                </div>

                <div className="space-y-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic">Description</p>
                  <p className="text-base text-neutral-600 font-light leading-relaxed">{product.description}</p>
                </div>

                {/* Scent Profile Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-white rounded-2xl">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-black mb-4">Top Notes</p>
                    <div className="flex flex-wrap gap-2">
                      {product.notes.map((n, i) => (
                        <span key={i} className="text-xs font-medium text-neutral-900">{n}{i < product.notes.length - 1 ? ' •' : ''}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 bg-white rounded-2xl">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-4">Intended Mood</p>
                    <div className="flex flex-wrap gap-2">
                      {product.mood.map((m, i) => (
                        <span key={i} className="text-xs font-medium text-neutral-900">{m}{i < product.mood.length - 1 ? ' •' : ''}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-10 space-y-6">
                  <div className="flex items-center justify-between p-2 bg-white border border-neutral-100 rounded-full">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 rounded-full flex items-center justify-center text-black hover:bg-neutral-100 cursor-pointer transition-colors"><Minus className="w-4 h-4" /></button>
                    <span className="text-xl text-black font-light">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 rounded-full flex items-center justify-center text-black hover:bg-neutral-100 cursor-pointer transition-colors"><Plus className="w-4 h-4" /></button>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={handleBuyNow} className="flex-1 py-5 cursor-pointer bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-neutral-800 transition-all active:scale-95 shadow-xl shadow-black/5">
                      Purchase Now
                    </button>
                    <button onClick={handleAddToCart} className="w-20 py-5 cursor-pointer border border-neutral-200 rounded-full flex items-center justify-center hover:bg-neutral-50 transition-all">
                      {isAddedToCart ? <Check className="w-5 h-5 text-green-600" /> : <ShoppingCart className="w-5 h-5 text-neutral-900" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- CURATED COLLECTION --- */}
          <section className="mt-40 pt-20 border-t border-neutral-100">
             <div className="flex items-end justify-between mb-16">
                <div>
                   <span className="text-[10px] font-bold tracking-[0.4em] text-neutral-400 uppercase">Discover</span>
                   <h2 className="text-4xl font-light text-neutral-900 mt-4 uppercase tracking-tightest">Curated For You</h2>
                </div>
                <Link href="/shop" className="text-[10px] font-bold uppercase underline underline-offset-8 tracking-widest">Explore All</Link>
             </div>
             
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {similarProducts.map(item => (
                  <Link href={`/product/${item.slug}`} key={item.id} className="group">
                    <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 bg-neutral-50">
                      <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="text-center space-y-2">
                       <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{item.category}</p>
                       <h3 className="text-lg font-light text-neutral-900 uppercase tracking-tight">{item.name}</h3>
                       <p className="text-sm font-medium text-neutral-900">₹{item.price.toLocaleString()}</p>
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