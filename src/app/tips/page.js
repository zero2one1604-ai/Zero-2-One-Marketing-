'use client'

import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import LuxuryFooter from '../components/Footer';

export default function TipsPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNotify = () => {
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <>
      <div className="bg-[#F6F4EF] flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center space-y-12">
          
      

          <div className="space-y-4">
            <h1 className="text-2xl the-seasons md:text-6xl font-light text-[#1C1C1A] tracking-[0.3em] uppercase">
              Coming Soon
            </h1>
            <p className="text-sm md:text-xl text-[#6E6A61] font-light tracking-wide leading-relaxed max-w-xl mx-auto">
              We are crafting something extraordinary for you. Expert tips, guides, and insights will be available soon.
            </p>
          </div>

          {/* Notify Form */}
          {!isSubmitted ? (
            <div className="space-y-4 max-w-md mx-auto">
              <p className="text-sm text-[#6E6A61] tracking-wide uppercase font-light">
                Be the first to know
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white border border-[#d4af37]/20 rounded-lg text-[#1C1C1A] placeholder-[#6E6A61]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30 focus:border-transparent transition-all duration-300"
                />
                <button
                  onClick={handleNotify}
                  className="px-8 py-4 bg-gradient-to-br from-[#d4af37] via-[#f4e5c2] to-[#d4af37] text-[#1a1a1a] text-sm tracking-[0.15em] uppercase font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:from-[#f0d678] hover:via-[#fff5dc] hover:to-[#f0d678] active:scale-[0.98] relative overflow-hidden border border-[#b8941f] whitespace-nowrap"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/20 pointer-events-none" />
                  <span className="relative z-10">Notify Me</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg text-[#1C1C1A] font-light">
                Thank you! We will notify you soon.
              </p>
            </div>
          )}

          
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>

      <LuxuryFooter />
    </>
  );
}