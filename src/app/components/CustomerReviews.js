'use client'

import React, { useState, useEffect } from 'react';
import { Star, Quote, ThumbsUp, Verified } from 'lucide-react';

export default function LuxuryReviews() {
  const [activeReview, setActiveReview] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [likedReviews, setLikedReviews] = useState(new Set());

  const reviews = [
    {
      id: 1,
      name: "Isabella Chen",
      location: "New York, NY",
      rating: 5,
      date: "September 2024",
      title: "Absolutely Divine",
      review: "The Midnight Essence has become my signature scent. The complexity of the oud and vanilla creates an intoxicating aura that lasts from morning meetings to evening galas. I have received countless compliments.",
      product: "Midnight Essence",
      verified: true,
      likes: 247,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
      id: 2,
      name: "Alexander Wright",
      location: "London, UK",
      rating: 5,
      date: "August 2024",
      title: "Unparalleled Quality",
      review: "As someone who has collected fragrances for over 20 years, I can confidently say this rivals the finest houses in Paris. The longevity is exceptional and the sillage is perfectly balanced, sophisticated without being overpowering.",
      product: "Royal Oud",
      verified: true,
      likes: 189,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
    },
    {
      id: 3,
      name: "Sofia Martinez",
      location: "Dubai, UAE",
      rating: 5,
      date: "September 2024",
      title: "Pure Elegance",
      review: "Crystal Dawn is breathtaking. The white tea and iris blend creates such an ethereal, clean sophistication. It&apos;s become my daily luxury, understated yet unmistakably premium. Worth every penny.",
      product: "Crystal Dawn",
      verified: true,
      likes: 312,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
    },
    {
      id: 4,
      name: "James Morrison",
      location: "Los Angeles, CA",
      rating: 5,
      date: "July 2024",
      title: "Investment Worthy",
      review: "The craftsmanship is evident in every note. Noir Mystique has this incredible depth that evolves throughout the day. My wife says it is the best fragrance I have ever worn. The packaging alone feels like opening a luxury gift.",
      product: "Noir Mystique",
      verified: true,
      likes: 203,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    {
      id: 5,
      name: "Olivia Bernard",
      location: "Paris, France",
      rating: 5,
      date: "August 2024",
      title: "Magnifique",
      review: "Velvet Rose captures the essence of a Parisian rose garden at dawn. The sandalwood base gives it such warmth and sensuality. I have worked in the fragrance industry for 15 years, this is exceptional artistry.",
      product: "Velvet Rose",
      verified: true,
      likes: 428,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const toggleLike = (id) => {
    setLikedReviews(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(id)) {
        newLikes.delete(id);
      } else {
        newLikes.add(id);
      }
      return newLikes;
    });
  };

  const goToReview = (index) => {
    setActiveReview(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1629] to-[#1a1f3a] py-20 px-4">
      <div className="max-w-6xl mx-auto">
    
        <div className="text-center mb-16 space-y-6">
          
          <h2 className="text-5xl md:text-6xl font-light text-white tracking-[0.25em] uppercase">
            Client Stories
          </h2>
          
          <p className="text-amber-100/60 text-sm tracking-[0.2em] uppercase font-light max-w-2xl mx-auto">
            Discover why discerning individuals worldwide choose our collection
          </p>

          <div className="flex items-center justify-center gap-6 pt-6">
            <div className="text-center">
              <div className="text-5xl font-light text-white mb-2">4.9</div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-amber-100/50 text-xs tracking-wider">Based on 1,247 reviews</p>
            </div>
          </div>
        </div>

        <div className="relative mb-12">
          <div className="relative overflow-hidden">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`transition-all duration-700 ${
                  index === activeReview
                    ? 'opacity-100 relative'
                    : 'opacity-0 absolute inset-0 pointer-events-none'
                }`}
              >
                <div className="bg-gradient-to-br from-[#1a2540]/80 to-[#0f1629]/80 backdrop-blur-xl rounded-2xl p-10 md:p-14 border border-amber-200/10 shadow-2xl">
                  
                  <Quote className="w-16 h-16 text-amber-500/20 mb-6" />
                  
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-4 tracking-wide">
                    {review.title}
                  </h3>

                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 fill-amber-400 text-amber-400 animate-pulse" 
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>

                  <p className="text-amber-50/80 text-lg md:text-xl leading-relaxed font-light mb-8 italic">
                    {review.review}
                  </p>

                  <div className="inline-block bg-amber-500/10 border border-amber-500/30 rounded-full px-6 py-2 mb-8">
                    <p className="text-amber-300 text-xs tracking-widest uppercase">
                      {review.product}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-amber-200/10">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-amber-400/30"
                        />
                        {review.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                            <Verified className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-medium tracking-wide">
                            {review.name}
                          </h4>
                          {review.verified && (
                            <span className="text-blue-400 text-xs">Verified</span>
                          )}
                        </div>
                        <p className="text-amber-100/50 text-sm">
                          {review.location}
                        </p>
                        <p className="text-amber-100/40 text-xs mt-1">
                          {review.date}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleLike(review.id)}
                      className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/30 transition-all duration-300"
                    >
                      <ThumbsUp 
                        className={`w-5 h-5 transition-all duration-300 ${
                          likedReviews.has(review.id)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-amber-100/50 group-hover:text-amber-400'
                        }`}
                      />
                      <span className="text-amber-100/70 text-sm font-light">
                        {review.likes + (likedReviews.has(review.id) ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === activeReview
                    ? 'w-12 h-3 bg-gradient-to-r from-amber-500 to-amber-600'
                    : 'w-3 h-3 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {reviews.slice(0, 3).map((review, index) => (
            <div
              key={review.id}
              className="group bg-gradient-to-b from-[#1a2540]/60 to-[#0f1629]/60 backdrop-blur-md rounded-xl p-6 border border-amber-200/10 hover:border-amber-400/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-amber-50/70 text-sm leading-relaxed font-light mb-6 line-clamp-3">
                {review.review}
              </p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-amber-200/10">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-400/30"
                />
                <div>
                  <p className="text-white text-sm font-medium">{review.name}</p>
                  <p className="text-amber-100/50 text-xs">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 mt-16 pt-16 border-t border-amber-200/10">
          <div className="text-center">
            <div className="text-3xl font-light text-white mb-2">1000+</div>
            <p className="text-amber-100/60 text-xs tracking-wider uppercase">5-Star Reviews</p>
          </div>
          <div className="h-12 w-px bg-amber-200/20" />
          <div className="text-center">
            <div className="text-3xl font-light text-white mb-2">98%</div>
            <p className="text-amber-100/60 text-xs tracking-wider uppercase">Satisfaction Rate</p>
          </div>
          <div className="h-12 w-px bg-amber-200/20" />
          <div className="text-center">
            <div className="text-3xl font-light text-white mb-2">50K+</div>
            <p className="text-amber-100/60 text-xs tracking-wider uppercase">Happy Clients</p>
          </div>
        </div>

      </div>
    </div>
  );
}