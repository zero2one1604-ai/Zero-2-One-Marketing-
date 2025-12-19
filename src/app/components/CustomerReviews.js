'use client'

import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, Verified, Quote } from 'lucide-react';

export default function LuxuryReviews() {
  const [activeReview, setActiveReview] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [likedReviews, setLikedReviews] = useState(new Set());

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      title: "Absolutely Divine",
      review: "The Midnight Essence has become my signature scent. The complexity of the oud and vanilla creates an intoxicating aura that lasts from morning meetings to evening parties.",
      product: "Midnight Essence",
      likes: 247,
      image: "https://images.unsplash.com/photo-1622038094167-a2e40e21df17?q=80&w=735&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Rohan Kapoor",
      location: "Delhi",
      title: "Unparalleled Quality",
      review: "As someone who has collected fragrances for over 20 years, I can confidently say this rivals the finest houses. The longevity is exceptional and the sillage is perfectly balanced.",
      product: "Royal Oud",
      likes: 189,
      image: "https://images.unsplash.com/photo-1729157661483-ed21901ed892?q=80&w=687&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Anjali Menon",
      location: "Bangalore",
      title: "Pure Elegance",
      review: "Crystal Dawn is breathtaking. The white tea and iris blend creates such an ethereal, clean sophistication. It's become my daily luxury, understated yet unmistakably premium.",
      product: "Crystal Dawn",
      likes: 312,
      image: "https://images.unsplash.com/photo-1726076581380-980193a75161?q=80&w=687&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const toggleLike = (id) => {
    setLikedReviews(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="bg-[#FAF9F6] py-24 px-6 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-neutral-300"></div>
              <span className="text-[10px] font-bold tracking-[0.4em] text-neutral-400 uppercase italic">Testimonials</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-light text-neutral-900 tracking-tightest uppercase">
              Client <span className="font-serif italic text-neutral-400">Stories</span>
            </h2>
          </div>

          <div className="flex items-center gap-6 pb-2">
            <div className="text-right">
              <div className="flex gap-1 mb-2 justify-end">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-neutral-900 text-neutral-900" />)}
              </div>
              <p className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">4.9 Average Rating</p>
            </div>
          </div>
        </div>

        {/* --- MAIN THEATRE SLIDER --- */}
        <div className="relative min-h-[500px]">
          {reviews.map((rev, index) => (
            <div
              key={rev.id}
              className={`transition-all duration-1000 ease-in-out ${
                index === activeReview ? 'opacity-100 translate-y-0 relative z-10' : 'opacity-0 translate-y-10 absolute inset-0 pointer-events-none'
              }`}
            >
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                {/* Text Side */}
                <div className="lg:col-span-7 space-y-8">
                  <Quote className="w-12 h-12 text-neutral-100" />
                  <h3 className="text-3xl md:text-5xl font-light text-neutral-900 leading-tight italic font-serif">
                    &quot;{rev.review}&quot;
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-1.5 rounded-full bg-neutral-900 text-white text-[9px] font-bold uppercase tracking-widest">
                      {rev.product}
                    </span>
                    <button 
                      onClick={() => toggleLike(rev.id)}
                      className="flex items-center gap-2 text-neutral-400 hover:text-black transition-colors"
                    >
                      <ThumbsUp className={`w-4 h-4 ${likedReviews.has(rev.id) ? 'fill-black text-black' : ''}`} />
                      <span className="text-[10px] font-bold">{rev.likes + (likedReviews.has(rev.id) ? 1 : 0)}</span>
                    </button>
                  </div>
                </div>

                {/* Profile Side */}
                <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
                  <div className="relative w-64 h-80 md:w-80 md:h-[450px] rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                    <img src={rev.image} alt={rev.name} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-8 left-8 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-lg tracking-tight">{rev.name}</p>
                        <Verified className="w-4 h-4 text-blue-400 fill-white" />
                      </div>
                      <p className="text-xs font-light text-neutral-300 uppercase tracking-widest">{rev.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- NAVIGATION --- */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-12 pt-12 border-t border-neutral-100">
          <div className="flex gap-4">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {setActiveReview(i); setIsAutoPlaying(false);}}
                className={`h-1 transition-all duration-500 rounded-full ${i === activeReview ? 'w-16 bg-black' : 'w-8 bg-neutral-200'}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-12">
            <div className="text-center">
              <p className="text-2xl font-light text-neutral-900">1000+</p>
              <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Verified Reviews</p>
            </div>
            <div className="w-[1px] h-8 bg-neutral-200"></div>
            <div className="text-center">
              <p className="text-2xl font-light text-neutral-900">98%</p>
              <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Client Satisfaction</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}