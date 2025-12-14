// app/shop/LuxuryShopPage.js
'use client';

import React, { useState } from 'react';
import { ShoppingCart, Heart, Filter, ChevronDown, Clock, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LuxuryShopPage({ products, categoryCounts }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [cartItems, setCartItems] = useState(new Set());
  const [hoveredId, setHoveredId] = useState(null);
  
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'all', label: 'All Products', count: categoryCounts.all },
    { id: 'men', label: 'For Him', count: categoryCounts.men },
    { id: 'women', label: 'For Her', count: categoryCounts.women },
    { id: 'unisex', label: 'Unisex', count: categoryCounts.unisex }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const addToCart = (id) => {
    setCartItems(prev => {
      const newCart = new Set(prev);
      newCart.add(id);
      return newCart;
    });
    setTimeout(() => {
      setCartItems(prev => {
        const newCart = new Set(prev);
        newCart.delete(id);
        return newCart;
      });
    }, 2000);
  };

  const filteredProducts = products.filter(product => {
    if (activeCategory !== 'all' && product.category !== activeCategory) return false;
    if (priceRange === 'under300' && product.price >= 300) return false;
    if (priceRange === '300to500' && (product.price < 300 || product.price > 500)) return false;
    if (priceRange === 'over500' && product.price <= 500) return false;
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'priceLow') return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1c3858] via-[#1B3A5F] to-[#1c3858]">
      
      <div className="border-b border-amber-200/10 bg-gradient-to-r from-[#0a1628]/80 to-[#1a2942]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12 sm:py-16">
          <div className="text-center md:space-y-3 sm:space-y-4">
            <h1 className="the-seasons text-2xl md:text-5xl font-light text-white tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                Solid Perfumes
              </h1>
            <p className="text-amber-100/60 text-xs md:text-sm tracking-[0.1em] sm:tracking-[0.15em] uppercase font-light">
              Portable luxury that travels with you
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
          
          <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex sm:flex-wrap items-center justify-start sm:justify-center gap-2 sm:gap-3 min-w-max sm:min-w-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 cursor-pointer rounded-full text-xs sm:text-sm tracking-wider uppercase font-medium transition-all duration-300 border whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white border-amber-500 shadow-lg shadow-amber-500/30'
                      : 'bg-white/5 text-amber-100/70 border-white/10 hover:bg-white/10 hover:border-amber-500/30'
                  }`}
                >
                  {cat.label}
                  <span className="ml-2 text-[10px] sm:text-xs opacity-70">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex hidden flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-amber-200/10">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex cursor-pointer items-center justify-center sm:justify-start gap-2 px-4 sm:px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-all duration-300"
            >
              <Filter className="w-4 h-4" />
              <span className="tracking-wide">Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <div className="flex items-center justify-center gap-3 text-amber-100/70 text-sm">
              <span className="tracking-wide">{sortedProducts.length} Products</span>
            </div>
          </div>

          {showFilters && (
            <div className="bg-gradient-to-b from-[#1a2540]/60 to-[#0f1629]/60 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-amber-200/10 animate-slideDown">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                
                <div>
                  <label className="text-white text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 sm:mb-3 block">
                    Price Range
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/5 border border-white/20 rounded-lg cursor-pointer text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="all">All Prices</option>
                    <option value="under300">Under ₹300</option>
                    <option value="300to500">₹300 - ₹500</option>
                    <option value="over500">Over ₹500</option>
                  </select>
                </div>

                <div>
                  <label className="text-white text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 sm:mb-3 cursor-pointer block">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="featured">Featured</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                  </select>
                </div>

                <div className="sm:col-span-2 lg:col-span-1 flex items-end">
                  <button
                    onClick={() => {
                      setPriceRange('all');
                      setSortBy('featured');
                    }}
                    className="w-full px-4 py-2 sm:py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm hover:bg-white/20 transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {sortedProducts.map((product) => (
            <Link
              href={`/product/${product.slug}`}
              key={product.id}
              className="group relative block"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative bg-gradient-to-b from-[#1a2540] to-[#0f1629] rounded-lg overflow-hidden border border-amber-200/10 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-amber-500/20">
                
                <div className="relative h-64 sm:h-72 md:h-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 480px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1629] via-transparent to-transparent opacity-60" />
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110"
                  >
                    <Heart
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                        favorites.has(product.id)
                          ? 'fill-red-400 text-red-400'
                          : 'text-white'
                      }`}
                    />
                  </button>

                  <div className={`absolute inset-0 bg-[#0a1628]/95 backdrop-blur-sm transition-all duration-500 flex items-center justify-center ${
                    hoveredId === product.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="text-center px-4 sm:px-6">
                      <p className="text-amber-200/80 text-[10px] sm:text-xs tracking-widest uppercase mb-2 font-light">
                        Notes
                      </p>
                      <p className="text-white text-xs sm:text-sm font-light">
                        {product.notes.slice(0, 3).join(', ')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-2 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-amber-300/70 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-light">
                      {product.category === 'men' ? 'For Him' : product.category === 'women' ? 'For Her' : 'Unisex'}
                    </p>
                    <h3 className="text-white text-base sm:text-lg lg:text-xl font-light tracking-wide line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <p className="text-amber-100 text-lg sm:text-xl lg:text-2xl font-light">
                        ₹{product.price}
                      </p>
                      {product.mrp && product.mrp > product.price && (
                        <p className="text-amber-100/40 text-xs sm:text-sm line-through">
                          ₹{product.mrp}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product.id);
                    }}
                    disabled={cartItems.has(product.id)}
                    className="w-full py-2.5 sm:py-3.5 bg-gradient-to-br cursor-pointer from-[#d4af37] via-[#f4e5c2] to-[#d4af37] text-[#1a1a1a] text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase font-semibold rounded shadow-xl shadow-black/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-700/50 hover:from-[#f0d678] hover:via-[#fff5dc] hover:to-[#f0d678] active:scale-[0.98] border border-[#b8941f] disabled:from-slate-700 disabled:via-slate-600 disabled:to-slate-700 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed disabled:border-slate-600 flex items-center justify-center gap-1.5 sm:gap-2 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/20 pointer-events-none" />
                    <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                      {cartItems.has(product.id) ? (
                        <>
                          <span>✓</span>
                          <span className="hidden xs:inline">Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-gradient-to-br hidden from-[#1a2540]/80 to-[#0f1629]/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 border border-amber-200/10 shadow-2xl text-center">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-amber-500/10 border border-amber-500/30 rounded-full mb-3 sm:mb-4">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              <span className="text-amber-300 text-xs sm:text-sm tracking-widest uppercase font-medium">
                Coming Soon
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4">
              Expanding Our Collection
            </h2>
            
            <p className="text-amber-100/70 text-sm sm:text-base lg:text-lg leading-relaxed font-light mb-6 sm:mb-8 px-4 sm:px-0">
              We are curating an exceptional selection of luxury fragrances to complement our solid perfume collection.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-6">
              {[
                { title: 'Liquid Perfumes', desc: 'Premium eau de parfum', url: 'https://images.unsplash.com/photo-1759793499854-4044b125b37d?w=400&h=300&fit=crop' },
                { title: 'Car Fresheners', desc: 'Luxury on the go', url: 'https://images.unsplash.com/photo-1653020194245-484aa429e963?w=400&h=300&fit=crop' },
                { title: 'Home Diffusers', desc: 'Ambient elegance', url: 'https://images.unsplash.com/photo-1671161238404-e5b4845260b9?w=400&h=300&fit=crop' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="p-4 sm:p-6 bg-white/5 rounded-lg border border-white/10 hover:border-amber-500/30 transition-all duration-300"
                >
                  <div className="relative w-full aspect-video mb-3 sm:mb-4 rounded-md overflow-hidden">
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="text-white text-base sm:text-lg font-medium mb-1 sm:mb-2 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-amber-100/60 text-xs sm:text-sm font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        @media (min-width: 480px) {
          .xs\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .xs\:inline {
            display: inline;
          }
        }
      `}</style>
    </div>
  );
}