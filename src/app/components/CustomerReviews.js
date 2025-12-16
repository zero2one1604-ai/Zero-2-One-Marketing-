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
      name: "Priya Sharma",
      location: "Mumbai, MH",
      rating: 5,
      date: "September 2024",
      title: "Absolutely Divine",
      review: "The Midnight Essence has become my signature scent. The complexity of the oud and vanilla creates an intoxicating aura that lasts from morning meetings to evening parties. I have received countless compliments.",
      product: "Midnight Essence",
      verified: true,
      likes: 247,
      image: "https://images.unsplash.com/photo-1622038094167-a2e40e21df17?q=80&w=735&auto=format&fit=crop"},
    {
      id: 2,
      name: "Rohan Kapoor",
      location: "Delhi, DL",
      rating: 5,
      date: "August 2024",
      title: "Unparalleled Quality",
      review: "As someone who has collected fragrances for over 20 years, I can confidently say this rivals the finest houses. The longevity is exceptional and the sillage is perfectly balanced—sophisticated without being overpowering. *Superb!*",
      product: "Royal Oud",
      verified: true,
      likes: 189,
      image: "https://images.unsplash.com/photo-1729157661483-ed21901ed892?q=80&w=687&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Anjali Menon",
      location: "Bangalore, KA",
      rating: 5,
      date: "September 2024",
      title: "Pure Elegance",
      review: "Crystal Dawn is breathtaking. The white tea and iris blend creates such an ethereal, clean sophistication. It's become my daily luxury, understated yet unmistakably premium. *Paisa vasool* (worth every penny).",
      product: "Crystal Dawn",
      verified: true,
      likes: 312,
      image: "https://images.unsplash.com/photo-1726076581380-980193a75161?q=80&w=687&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Siddharth Reddy",
      location: "Hyderabad, TS",
      rating: 5,
      date: "July 2024",
      title: "Investment Worthy",
      review: "The craftsmanship is evident in every note. Noir Mystique has this incredible depth that evolves throughout the day. My wife says it is the best fragrance I have ever worn. The packaging alone feels like opening a luxury gift.",
      product: "Noir Mystique",
      verified: true,
      likes: 203,
      image: "https://plus.unsplash.com/premium_photo-1691030254390-aa56b22e6a45?q=80&w=687&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Meera Gupta",
      location: "Kolkata, WB",
      rating: 5,
      date: "August 2024",
      title: "Magnifique",
      review: "Velvet Rose captures the essence of a beautiful rose garden. The sandalwood base gives it such warmth and sensuality. I have always preferred high-end scents, and this is truly exceptional artistry.",
      product: "Velvet Rose",
      verified: true,
      likes: 428,
      image: "https://images.unsplash.com/photo-1672343567026-d1b5abb6f7f9?q=80&w=1470&auto=format&fit=crop"
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
    <div className="min-h-screen bg-[#F6F4EF] py-10 md:py-20 px-4 border-t-4 md:border-t-8 border-gold-texture">
      <div className="max-w-6xl mx-auto">
    
        <div className="text-center mb-5 md:mb-16 md:space-y-6">
          
          <h2 className="text-lg md:text-5xl font-light the-seasons text-[#1C1C1A] tracking-[0.25em] uppercase">
            Client Stories
          </h2>
          
          <p className="text-[#6E6A61] text-xs md:text-sm tracking-[0.2em] uppercase font-light max-w-2xl mx-auto">
            Discover why discerning individuals worldwide choose our collection
          </p>

          <div className="flex items-center justify-center gap-6 pt-6">
            <div className="text-center">
              <div className="text-5xl font-light text-amber-900 mb-2">4.9</div>
              <div className="flex gap-1 mb-2 items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[#1c1c1a] text-xs tracking-wider">Based on 08 reviews</p>
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
                <div className="bg-white backdrop-blur-xl rounded-2xl p-5 md:p-14 border border-amber-200/10 shadow-2xl">
                  
                  
                  <h3 className="text-lg md:text-3xl font-light text-[#1c1c1a] mb-4 tracking-wide">
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

                  <p className="text-[#6E6A61] text-sm md:text-xl text-justify leading-relaxed font-light mb-4 md:mb-8 italic">
                    {review.review}
                  </p>

                  <div className="inline-block bg-amber-500/10 border border-amber-500/30 rounded-full px-3 py-1 md:px-6 md:py-2 mb-2 md:mb-8">
                    <p className="text-amber-900 text-xs tracking-widest uppercase">
                      {review.product}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 md:pt-6 border-t border-amber-200/10">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="md:w-16 md:h-16 h-12 w-12 rounded-full object-cover border-2 border-amber-400/30"
                        />
                        {review.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                            <Verified className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-[#1c1c1a] text-sm md:text-base font-medium tracking-wide">
                            {review.name}
                          </h4>
                          {review.verified && (
                            <span className="text-blue-400 text-xs">Verified</span>
                          )}
                        </div>
                        <p className="text-[#6E6A61] text-xs md:text-sm">
                          {review.location}
                        </p>
                        <p className="text-[#6E6A61] text-xs mt-1">
                          {review.date}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleLike(review.id)}
                      className="group flex items-center gap-2 md:px-4 md:py-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/30 transition-all duration-300"
                    >
                      <ThumbsUp 
                        className={`md:w-5 md:h-5 w-4 h-4 transition-all duration-300 ${
                          likedReviews.has(review.id)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-[#6E6A61] group-hover:text-amber-400'
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

          <div className="flex justify-center gap-3 mt-4 md:mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === activeReview
                    ? 'md:w-12 md:h-3 w-8 h-2 bg-amber-900'
                    : 'md:w-3 md:h-3 h-2 w-2 bg-white/90 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="md:grid md:grid-cols-3 gap-6 mt-5 hidden md:mt-20">
          {reviews.slice(0, 3).map((review, index) => (
            <div
              key={review.id}
              className="group bg-white backdrop-blur-md rounded-xl p-6 border border-amber-200/10 hover:border-amber-400/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-[#1c1c1a] text-sm leading-relaxed font-light mb-6 line-clamp-3">
                {review.review}
              </p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-amber-200/10">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-400/30"
                />
                <div>
                  <p className="text-[#6E6A61] text-sm font-medium">{review.name}</p>
                  <p className="text-[#6E6A61] text-xs">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-8 md:gap-8 md:mt-16 pt-8 md:pt-16 border-t border-amber-200/10">
          <div className="text-center">
            <div className="text-sm md:text-3xl font-light text-amber-900 md:mb-2">1000+</div>
            <p className="text-[#6E6A61] text-[8px] md:text-xs tracking-wider uppercase">5-Star Reviews</p>
          </div>
          <div className="h-12 w-px bg-amber-500" />
          <div className="text-center">
            <div className="text-sm md:text-3xl font-light text-amber-900 md:mb-2">98%</div>
            <p className="text-[#6E6A61] text-[8px] md:text-xs tracking-wider uppercase">Satisfaction Rate</p>
          </div>
          <div className="h-12 w-px bg-amber-500" />
          <div className="text-center">
            <div className="text-sm md:text-3xl font-light text-amber-900 md:mb-2">50K+</div>
            <p className="text-[#6E6A61] text-[8px] md:text-xs tracking-wider uppercase">Happy Clients</p>
          </div>
        </div>

      </div>
      <style jsx global>{`
    .border-gold-texture {
        /* Complex gradient mimicking polished gold */
        border-image: linear-gradient(
            to right, 
            #bf953f,   /* Deep Gold/Brown */
            #fcf7c5,   /* Bright Highlight */
            #b38728,   /* Mid Gold */
            #fcf7c5,   /* Bright Highlight */
            #d4af37,   /* Standard Gold */
            #bf953f    /* Deep Gold/Brown */
        ) 1; /* Stretch the border image */
    }
`}</style>
    </div>
  );
}