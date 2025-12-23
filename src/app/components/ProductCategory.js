'use client';

import React, { useState } from 'react';
import { ShoppingCart, Heart, Filter, ChevronDown, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LuxuryShopPage({ products, categoryCounts }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredId, setHoveredId] = useState(null);
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'all', label: 'Collection', count: categoryCounts.all },
    { id: 'men', label: 'For Him', count: categoryCounts.men },
    { id: 'women', label: 'For Her', count: categoryCounts.women }
  ];

  const toggleFavorite = (e, id) => {
    e.preventDefault();
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredProducts = products.filter(product => {
    if (activeCategory !== 'all' && product.category !== activeCategory) return false;
    if (priceRange === 'under300' && product.price >= 300) return false;
    if (priceRange === '300to500' && (product.price < 300 || product.price > 500)) return false;
    if (priceRange === 'over500' && product.price <= 500) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'priceLow') return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      
      <div className="md:pt-32 pt-10 md:pb-16 pb-10 px-6 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-2 md:mb-6">
            <div className="h-[1px] w-8 bg-neutral-300"></div>
            <span className="text-[8px] md:text-[10px] font-bold tracking-[0.4em] text-neutral-400 uppercase italic">The Collection</span>
            <div className="h-[1px] w-8 bg-neutral-300"></div>
          </div>
          <h1 className="text-2xl md:text-8xl font-light text-neutral-900 tracking-tightest uppercase mb-2 md:mb-6">
            Solid <span className="font-serif italic text-neutral-400">Perfumes</span>
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 font-light tracking-widest uppercase">
            Portable luxury for the modern nomad.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:py-12">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-5 md:mb-16 md:gap-8">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar w-full md:w-auto pb-4 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group cursor-pointer relative text-[11px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                  activeCategory === cat.id ? 'text-black' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                {cat.label}
                <span className="ml-2 text-[9px] opacity-50 font-mono">[{cat.count}]</span>
                <span className={`absolute -bottom-2 left-0 h-[1px] bg-black transition-all duration-300 ${activeCategory === cat.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex hidden items-center cursor-pointer gap-4 px-8 py-3 text-black bg-white border border-neutral-100 rounded-full text-[10px] font-bold uppercase tracking-widest hover:shadow-lg transition-all active:scale-95"
          >
            <Filter className="w-3 h-3" />
            Filter & Sort
            <ChevronDown className={`w-3 h-3 text-black transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className="md:mb-16 mb-5 p-10 bg-white border border-neutral-100 rounded-[2.5rem] animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Sort By</p>
                <div className="flex flex-col gap-2">
                  {['featured', 'name', 'priceLow', 'priceHigh'].map(opt => (
                    <button key={opt} onClick={() => setSortBy(opt)} className={`text-left text-sm font-light ${sortBy === opt ? 'text-black font-medium underline underline-offset-4' : 'text-neutral-500'}`}>
                      {opt.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Price Range</p>
                <div className="flex flex-col gap-2">
                  {['all', 'under300', '300to500', 'over500'].map(range => (
                    <button key={range} onClick={() => setPriceRange(range)} className={`text-left text-sm font-light ${priceRange === range ? 'text-black font-medium underline underline-offset-4' : 'text-neutral-500'}`}>
                      {range === 'all' ? 'All Prices' : range.replace(/(\d+)/g, ' ₹$1 ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-10">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link href={`/product/${product.slug}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-neutral-100 mb-2 md:mb-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
          
                  <div className={`absolute inset-0 bg-neutral-900/40 backdrop-blur-md transition-all duration-500 flex flex-col items-center justify-center p-8 text-center ${hoveredId === product.id ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-300 mb-4">Scent Profile</p>
                    <div className="h-px w-8 bg-white/30 mb-4"></div>
                    <p className="text-white text-xs font-light tracking-wide leading-relaxed">
                      {product.notes.join(' • ')}
                    </p>
                  </div>

                  <button
                    onClick={(e) => toggleFavorite(e, product.id)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm hover:scale-110 transition-all"
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-neutral-900'}`} />
                  </button>
                </div>

                <div className="md:space-y-2 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                    For {product.category}
                  </p>
                  <h3 className="text-lg font-light text-neutral-900 tracking-tight transition-colors group-hover:text-neutral-500">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-3 md:pt-2">
                    <p className="text-base font-medium text-neutral-900">₹{product.price}</p>
                    {product.mrp && product.mrp > product.price && (
                      <p className="text-xs text-neutral-400 line-through font-light">₹{product.mrp}</p>
                    )}
                  </div>
                </div>
              </Link>
              
              {/* Minimalist CTA */}
              <button className="mt-2 md:mt-6 w-full py-2 md:py-4 rounded-full border border-neutral-200 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-neutral-900 hover:bg-black hover:text-white hover:border-black transition-all duration-300 active:scale-95">
                Discover Fragrance
              </button>
            </div>
          ))}
        </div>

        {/* --- EMPTY STATE --- */}
        {sortedProducts.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-neutral-400 font-serif italic text-2xl">No fragrances match your selection.</p>
            <button onClick={() => {setPriceRange('all'); setActiveCategory('all');}} className="mt-6 text-[10px] font-bold uppercase underline underline-offset-8 tracking-widest">Reset Discovery</button>
          </div>
        )}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
}