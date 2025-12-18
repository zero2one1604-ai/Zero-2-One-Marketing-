// app/shop/LuxuryShopPage.js
'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { ShoppingCart, Heart, SlidersHorizontal, X } from 'lucide-react';
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

  const categories = useMemo(() => [
    { id: 'all', label: 'All', count: categoryCounts.all },
    { id: 'men', label: 'Men', count: categoryCounts.men },
    { id: 'women', label: 'Women', count: categoryCounts.women },
    { id: 'unisex', label: 'Unisex', count: categoryCounts.unisex }
  ], [categoryCounts]);

  const toggleFavorite = useCallback((id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  }, []);

  const addToCart = useCallback((id) => {
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
  }, []);

  const sortedProducts = useMemo(() => {
    const filtered = products.filter(product => {
      if (activeCategory !== 'all' && product.category !== activeCategory) return false;
      if (priceRange === 'under300' && product.price >= 300) return false;
      if (priceRange === '300to500' && (product.price < 300 || product.price > 500)) return false;
      if (priceRange === 'over500' && product.price <= 500) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [products, activeCategory, priceRange, sortBy]);

  const handleClearFilters = useCallback(() => {
    setPriceRange('all');
    setSortBy('featured');
  }, []);

  const getCategoryLabel = useCallback((category) => {
    switch(category) {
      case 'men': return 'Men';
      case 'women': return 'Women';
      default: return 'Unisex';
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Elegant Hero Header */}
      <header className="relative overflow-hidden bg-white border-b border-neutral-100">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 to-transparent pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-neutral-900 tracking-[0.3em] uppercase letterspacing">
              Solid Perfumes
            </h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
            <p className="text-xs sm:text-sm text-neutral-500 tracking-[0.2em] uppercase font-light max-w-md mx-auto">
              Luxury in Every Touch
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Refined Filter Bar */}
        <div className="mb-10 sm:mb-14 space-y-6">
          {/* Category Pills - Horizontal Scroll */}
          <nav aria-label="Product categories" className="relative">
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex sm:justify-center items-center gap-2 sm:gap-3 min-w-max sm:min-w-0 pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    aria-pressed={activeCategory === cat.id}
                    className={`group relative px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 whitespace-nowrap ${
                      activeCategory === cat.id
                        ? 'text-neutral-900'
                        : 'text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    <span className="relative z-10">{cat.label}</span>
                    <span className={`ml-1.5 text-[10px] sm:text-xs opacity-60 relative z-10 ${
                      activeCategory === cat.id ? 'text-neutral-600' : ''
                    }`}>
                      {cat.count}
                    </span>
                    {activeCategory === cat.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-neutral-100">
            <button
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              aria-controls="filter-panel"
              className="group flex items-center justify-center sm:justify-start gap-2.5 px-5 py-2.5 bg-white border border-neutral-200 hover:border-neutral-300 rounded-md text-neutral-700 text-sm transition-all duration-200"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="tracking-wide">Filters</span>
              {(priceRange !== 'all' || sortBy !== 'featured') && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              )}
            </button>

            <div className="flex items-center justify-center text-neutral-500 text-sm">
              <span aria-live="polite">{sortedProducts.length} items</span>
            </div>
          </div>

          {/* Elegant Filter Panel */}
          {showFilters && (
            <div 
              id="filter-panel"
              role="region"
              aria-label="Filter options"
              className="bg-white rounded-lg border border-neutral-100 p-6 sm:p-8 shadow-sm animate-slideDown"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm uppercase tracking-[0.15em] text-neutral-900 font-medium">Refine</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="sm:hidden p-1 hover:bg-neutral-100 rounded-full transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-4 h-4 text-neutral-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Range */}
                <div>
                  <label htmlFor="price-range" className="block text-xs uppercase tracking-wider text-neutral-500 mb-3">
                    Price
                  </label>
                  <select
                    id="price-range"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-md text-neutral-900 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-all"
                  >
                    <option value="all">All Prices</option>
                    <option value="under300">Under ₹300</option>
                    <option value="300to500">₹300 - ₹500</option>
                    <option value="over500">Over ₹500</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label htmlFor="sort-by" className="block text-xs uppercase tracking-wider text-neutral-500 mb-3">
                    Sort
                  </label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-md text-neutral-900 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-all"
                  >
                    <option value="featured">Featured</option>
                    <option value="name">Alphabetical</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="sm:col-span-2 lg:col-span-2 flex items-end">
                  <button
                    onClick={handleClearFilters}
                    className="w-full px-4 py-2.5 border border-neutral-200 hover:bg-neutral-50 rounded-md text-neutral-700 text-sm transition-all font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Elegant Products Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-16 sm:mb-20">
          {sortedProducts.map((product) => (
            <article
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link href={`/product/${product.slug}`} className="block">
                <div className="relative bg-white overflow-hidden transition-all duration-500">
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      priority={sortedProducts.indexOf(product) < 4}
                    />
                    
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(product.id);
                      }}
                      aria-label={favorites.has(product.id) ? 'Remove from favorites' : 'Add to favorites'}
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm z-10"
                    >
                      <Heart
                        className={`w-4 h-4 transition-all duration-300 ${
                          favorites.has(product.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-neutral-400'
                        }`}
                      />
                    </button>

                    {/* Hover Overlay */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 flex items-end ${
                        hoveredId === product.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="w-full p-6 text-center">
                        <p className="text-white/60 text-xs tracking-[0.2em] uppercase mb-2">
                          Notes
                        </p>
                        <p className="text-white text-sm font-light">
                          {product.notes.slice(0, 3).join(' · ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="space-y-2">
                      <p className="text-neutral-400 text-xs tracking-[0.15em] uppercase">
                        {getCategoryLabel(product.category)}
                      </p>
                      <h2 className="text-neutral-900 text-base sm:text-lg font-light tracking-wide leading-snug min-h-[3rem]">
                        {product.name}
                      </h2>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <p className="text-neutral-900 text-xl sm:text-2xl font-light">
                        ₹{product.price}
                      </p>
                      {product.mrp && product.mrp > product.price && (
                        <p className="text-neutral-400 text-sm line-through">
                          ₹{product.mrp}
                        </p>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product.id);
                      }}
                      disabled={cartItems.has(product.id)}
                      aria-label={cartItems.has(product.id) ? 'Added to cart' : `Add ${product.name} to cart`}
                      className={`w-full py-3.5 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300 ${
                        cartItems.has(product.id)
                          ? 'bg-neutral-900 text-white cursor-default'
                          : 'bg-neutral-900 text-white hover:bg-neutral-800'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {cartItems.has(product.id) ? (
                          <>
                            <span className="text-base">✓</span>
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Coming Soon Section */}
        <section 
          aria-labelledby="coming-soon-heading"
          className="relative overflow-hidden bg-white border border-neutral-100 rounded-lg p-8 sm:p-12 lg:p-16"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent pointer-events-none" />
          
          <div className="relative max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-amber-100/50 border border-amber-200/50 rounded-full">
              <span className="text-amber-800 text-xs tracking-[0.2em] uppercase font-medium">
                Expanding Soon
              </span>
            </div>

            <div className="space-y-4">
              <h2 id="coming-soon-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-neutral-900 tracking-[0.2em] uppercase">
                New Arrivals
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
            </div>
            
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Curating an exceptional collection of luxury fragrances, car fresheners, and home diffusers to elevate every moment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8">
              {[
                { title: 'Eau de Parfum', desc: 'Signature scents', url: 'https://images.unsplash.com/photo-1759793499854-4044b125b37d?w=400&h=300&fit=crop' },
                { title: 'Car Fresheners', desc: 'Travel in style', url: 'https://images.unsplash.com/photo-1653020194245-484aa429e963?w=400&h=300&fit=crop' },
                { title: 'Home Diffusers', desc: 'Ambient luxury', url: 'https://images.unsplash.com/photo-1671161238404-e5b4845260b9?w=400&h=300&fit=crop' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="group text-center"
                >
                  <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden bg-neutral-50">
                    <Image
                      src={item.url}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="text-neutral-900 text-base sm:text-lg font-light mb-2 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm uppercase tracking-wider">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (min-width: 480px) {
          .xs\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
}