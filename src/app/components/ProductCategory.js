'use client'

import React, { useState } from 'react';
import { ShoppingCart, Heart, Filter, ChevronDown, Clock } from 'lucide-react';
import Image from 'next/image';

export default function LuxuryShopPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [cartItems, setCartItems] = useState(new Set());
  const [hoveredId, setHoveredId] = useState(null);
  
  const [priceRange, setPriceRange] = useState('all');
  const [skinType, setSkinType] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const products = [
    {
      id: 1,
      name: "Midnight Oud",
      category: "men",
      price: 89,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop",
      notes: "Oud, Amber, Leather",
      skinType: "all",
      bestseller: true
    },
    {
      id: 2,
      name: "Royal Cedar",
      category: "men",
      price: 95,
      image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&h=600&fit=crop",
      notes: "Cedar, Vetiver, Musk",
      skinType: "sensitive",
      bestseller: false
    },
    {
      id: 3,
      name: "Noir Mystique",
      category: "men",
      price: 105,
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop",
      notes: "Tobacco, Patchouli, Spice",
      skinType: "normal",
      bestseller: true
    },
    {
      id: 4,
      name: "Ocean Breeze",
      category: "men",
      price: 79,
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=600&fit=crop",
      notes: "Citrus, Sea Salt, Sage",
      skinType: "oily",
      bestseller: false
    },
    
    // Women's Products
    {
      id: 5,
      name: "Velvet Rose",
      category: "women",
      price: 98,
      image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&h=600&fit=crop",
      notes: "Rose, Jasmine, Sandalwood",
      skinType: "dry",
      bestseller: true
    },
    {
      id: 6,
      name: "Crystal Dawn",
      category: "women",
      price: 92,
      image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=500&h=600&fit=crop",
      notes: "White Tea, Iris, Vanilla",
      skinType: "sensitive",
      bestseller: false
    },
    {
      id: 7,
      name: "Golden Aura",
      category: "women",
      price: 115,
      image: "https://images.unsplash.com/photo-1593086997231-5006a292b79a?q=80&w=1470&auto=format&fit=crop",
      notes: "Saffron, Orange Blossom, Amber",
      skinType: "normal",
      bestseller: true
    },
    {
      id: 8,
      name: "Summer Silk",
      category: "women",
      price: 85,
      image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=600&fit=crop",
      notes: "Peony, Lychee, White Musk",
      skinType: "all",
      bestseller: false
    },

    {
      id: 9,
      name: "Essence Noir",
      category: "unisex",
      price: 110,
      image: "https://plus.unsplash.com/premium_photo-1675812488919-21fc8fae565b?q=80&w=2127&auto=format&fit=crop",
      notes: "Black Currant, Bergamot, Vetiver",
      skinType: "normal",
      bestseller: true
    },
    {
      id: 10,
      name: "Pure Harmony",
      category: "unisex",
      price: 88,
      image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=500&h=600&fit=crop",
      notes: "Lavender, Cedar, Vanilla",
      skinType: "sensitive",
      bestseller: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Products', count: 10 },
    { id: 'men', label: 'For Him', count: 4 },
    { id: 'women', label: 'For Her', count: 4 },
    { id: 'unisex', label: 'Unisex', count: 2 }
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
    if (priceRange === 'under90' && product.price >= 90) return false;
    if (priceRange === '90to100' && (product.price < 90 || product.price > 100)) return false;
    if (priceRange === 'over100' && product.price <= 100) return false;
    if (skinType !== 'all' && product.skinType !== skinType && product.skinType !== 'all') return false;
    if (sortBy === 'bestsellers' && !product.bestseller) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'priceLow') return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1629] to-[#1a1f3a]">
      
      <div className="border-b border-amber-200/10 bg-gradient-to-r from-[#0a1628]/80 to-[#1a2942]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h1 className="text-5xl font-light text-white tracking-[0.25em] uppercase">
                Solid Perfumes
              </h1>
            </div>
            <p className="text-amber-100/60 text-sm tracking-[0.15em] uppercase font-light">
              Portable luxury that travels with you
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12 space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 cursor-pointer rounded-full text-sm tracking-wider uppercase font-medium transition-all duration-300 border ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white border-amber-500 shadow-lg shadow-amber-500/30'
                    : 'bg-white/5 text-amber-100/70 border-white/10 hover:bg-white/10 hover:border-amber-500/30'
                }`}
              >
                {cat.label}
                <span className="ml-2 text-xs opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-amber-200/10">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-all duration-300"
            >
              <Filter className="w-4 h-4" />
              <span className="tracking-wide">Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <div className="flex items-center gap-3 text-amber-100/70 text-sm">
              <span className="tracking-wide">{sortedProducts.length} Products</span>
            </div>
          </div>

          {showFilters && (
            <div className="bg-gradient-to-b from-[#1a2540]/60 to-[#0f1629]/60 backdrop-blur-md rounded-xl p-6 border border-amber-200/10 animate-slideDown">
              <div className="grid md:grid-cols-3 gap-6">
                
                <div>
                  <label className="text-white text-sm font-medium tracking-wider uppercase mb-3 block">
                    Price Range
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg cursor-pointer text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="all">All Prices</option>
                    <option value="under90">Under $90</option>
                    <option value="90to100">$90 - $100</option>
                    <option value="over100">Over $100</option>
                  </select>
                </div>

                <div>
                  <label className="text-white text-sm font-medium tracking-wider uppercase mb-3 block">
                    Skin Type
                  </label>
                  <select
                    value={skinType}
                    onChange={(e) => setSkinType(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg cursor-pointer text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="all">All Types</option>
                    <option value="normal">Normal</option>
                    <option value="dry">Dry</option>
                    <option value="oily">Oily</option>
                    <option value="sensitive">Sensitive</option>
                  </select>
                </div>

                <div>
                  <label className="text-white text-sm font-medium tracking-wider uppercase mb-3 cursor-pointer block">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="featured">Featured</option>
                    <option value="bestsellers">Best Sellers</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative bg-gradient-to-b from-[#1a2540] to-[#0f1629] rounded-lg overflow-hidden border border-amber-200/10 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-amber-500/20">
                
                {product.bestseller && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full text-white text-xs tracking-wider uppercase font-semibold shadow-lg">
                    Best Seller
                  </div>
                )}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1629] via-transparent to-transparent opacity-60" />
                  
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${
                        favorites.has(product.id)
                          ? 'fill-red-400 text-red-400'
                          : 'text-white'
                      }`}
                    />
                  </button>

                  <div className={`absolute inset-0 bg-[#0a1628]/95 backdrop-blur-sm transition-all duration-500 flex items-center justify-center ${
                    hoveredId === product.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="text-center px-6">
                      <p className="text-amber-200/80 text-xs tracking-widest uppercase mb-2 font-light">
                        Notes
                      </p>
                      <p className="text-white text-sm font-light">
                        {product.notes}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <p className="text-amber-300/70 text-xs tracking-[0.2em] uppercase font-light">
                      {product.category === 'men' ? 'For Him' : product.category === 'women' ? 'For Her' : 'Unisex'}
                    </p>
                    <h3 className="text-white text-xl font-light tracking-wide">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-amber-100 text-2xl font-light">
                      ${product.price}
                    </p>
                  </div>

                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={cartItems.has(product.id)}
                    className="w-full py-3.5 bg-gradient-to-br cursor-pointer from-[#d4af37] via-[#f4e5c2] to-[#d4af37] text-[#1a1a1a] text-xs tracking-[0.15em] uppercase font-semibold rounded shadow-xl shadow-black/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-700/50 hover:from-[#f0d678] hover:via-[#fff5dc] hover:to-[#f0d678] active:scale-[0.98] border border-[#b8941f] disabled:from-slate-700 disabled:via-slate-600 disabled:to-slate-700 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed disabled:border-slate-600 flex items-center justify-center gap-2 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/20 pointer-events-none" />
                    <span className="relative z-10 flex items-center gap-2">
                      {cartItems.has(product.id) ? (
                        <>
                          <span>✓</span>
                          <span>Added to Cart</span>
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

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#1a2540]/80 to-[#0f1629]/80 backdrop-blur-xl rounded-2xl p-12 border border-amber-200/10 shadow-2xl text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-500/10 border border-amber-500/30 rounded-full mb-4">
              <Clock className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 text-sm tracking-widest uppercase font-medium">
                Coming Soon
              </span>
            </div>

            <h2 className="text-4xl font-light text-white tracking-[0.2em] uppercase mb-4">
              Expanding Our Collection
            </h2>
            
            <p className="text-amber-100/70 text-lg leading-relaxed font-light mb-8">
              We're curating an exceptional selection of luxury fragrances to complement our solid perfume collection.
            </p>

            <div className="grid md:grid-cols-3 gap-6 pt-6">
              {[
                { title: 'Liquid Perfumes', desc: 'Premium eau de parfum', url:'https://images.unsplash.com/photo-1759793499854-4044b125b37d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop' },
                { title: 'Car Fresheners', desc: 'Luxury on the go', url:'https://images.unsplash.com/photo-1653020194245-484aa429e963?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470' },
                { title: 'Home Diffusers', desc: 'Ambient elegance', url:'https://images.unsplash.com/photo-1671161238404-e5b4845260b9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-amber-500/30 transition-all duration-300"
                >
                  <Image
                    src={item.url}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-white text-lg font-medium mb-2 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-amber-100/60 text-sm font-light">
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
      `}</style>
    </div>
  );
}