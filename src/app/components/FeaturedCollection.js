'use client'

import React, { useState } from 'react';
import { ShoppingCart, Heart, Sparkles } from 'lucide-react';

export default function LuxuryPerfumeGallery() {
  const [hoveredId, setHoveredId] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [cartItems, setCartItems] = useState(new Set());

  const perfumes = [
    {
      id: 1,
      name: "Midnight Essence",
      brand: "ÉLITE",
      price: 245,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop",
      notes: "Oud, Amber, Vanilla"
    },
    {
      id: 2,
      name: "Velvet Rose",
      brand: "NOIR",
      price: 198,
      image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&h=600&fit=crop",
      notes: "Rose, Musk, Sandalwood"
    },
    {
      id: 3,
      name: "Ocean Breeze",
      brand: "AZUR",
      price: 175,
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=600&fit=crop",
      notes: "Citrus, Sea Salt, Cedar"
    },
    {
      id: 4,
      name: "Golden Aura",
      brand: "LUMIÈRE",
      price: 289,
      image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&h=600&fit=crop",
      notes: "Saffron, Jasmine, Amber"
    },
    {
      id: 5,
      name: "Noir Mystique",
      brand: "OBSCURE",
      price: 312,
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop",
      notes: "Leather, Tobacco, Patchouli"
    },
    {
      id: 6,
      name: "Crystal Dawn",
      brand: "AURORA",
      price: 225,
      image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=500&h=600&fit=crop",
      notes: "Bergamot, White Tea, Iris"
    },
    {
      id: 7,
      name: "Royal Oud",
      brand: "MAJESTÉ",
      price: 395,
      image: "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=687&auto=format&fit=crop",
      notes: "Oud, Rose, Saffron"
    },
    {
      id: 8,
      name: "Summer Silk",
      brand: "LÉGÈRE",
      price: 165,
      image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=600&fit=crop",
      notes: "Peony, Lychee, Vanilla"
    },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1629] to-[#1a1f3a] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-5xl font-light text-white tracking-[0.2em] uppercase">
              Featured Collection
            </h1>
          </div>
          <p className="text-amber-100/60 text-sm tracking-wider uppercase font-light">
            Discover our most exquisite fragrances
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {perfumes.map((perfume) => (
            <div
              key={perfume.id}
              className="group relative"
              onMouseEnter={() => setHoveredId(perfume.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative bg-gradient-to-b from-[#1a2540] to-[#0f1629] rounded-lg overflow-hidden border border-amber-200/10 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-amber-500/20">
                
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    className="w-full h-full cursor-pointer object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1629] via-transparent to-transparent opacity-60" />
                  
                  <button
                    onClick={() => toggleFavorite(perfume.id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${
                        favorites.has(perfume.id)
                          ? 'fill-red-400 text-red-400'
                          : 'text-white'
                      }`}
                    />
                  </button>

                  <div className={`absolute inset-0 bg-[#0a1628]/95 backdrop-blur-sm transition-all duration-500 flex items-center justify-center ${
                    hoveredId === perfume.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="text-center px-6">
                      <p className="text-amber-200/80 text-xs tracking-widest uppercase mb-2 font-light">
                        Notes
                      </p>
                      <p className="text-white text-sm font-light">
                        {perfume.notes}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <p className="text-amber-300/70 text-xs tracking-[0.2em] uppercase font-light">
                      {perfume.brand}
                    </p>
                    <h3 className="text-white text-xl font-light tracking-wide">
                      {perfume.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-amber-100 text-2xl font-light">
                      ₹{perfume.price}
                    </p>
                  </div>

<button
    onClick={() => addToCart(perfume.id)}
    disabled={cartItems.has(perfume.id)}
    className="w-full py-3.5 bg-gradient-to-br cursor-pointer from-[#d4af37] via-[#f4e5c2] to-[#d4af37] text-[#1a1a1a] text-xs tracking-[0.15em] uppercase font-semibold rounded shadow-xl shadow-black/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-700/50 hover:from-[#f0d678] hover:via-[#fff5dc] hover:to-[#f0d678] active:scale-[0.98] border border-[#b8941f] disabled:from-slate-700 disabled:via-slate-600 disabled:to-slate-700 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed disabled:border-slate-600 flex items-center justify-center gap-2 relative overflow-hidden"
>
    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/20 pointer-events-none" />
    
    <span className="relative z-10 flex items-center gap-2">
        {cartItems.has(perfume.id) ? (
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
      </div>
    </div>
  );
}