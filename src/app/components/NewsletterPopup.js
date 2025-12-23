'use client'

import React, { useState, useEffect } from 'react'
import { X, Mail, Gift } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

const DISMISS_DAYS = 7
const DELAY_MS = 4000

export default function LuxuryNewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const subscribed = localStorage.getItem('newsletter_subscribed')
    if (subscribed === 'true') return

    const dismissedUntil = localStorage.getItem('newsletter_dismissed_until')
    if (dismissedUntil && Date.now() < Number(dismissedUntil)) return

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, DELAY_MS)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    const until =
      Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000

    localStorage.setItem(
      'newsletter_dismissed_until',
      String(until)
    )

    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
    }, 400)
  }

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) return

    setLoading(true)

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email })

    if (!error || error.code === '23505') {
      localStorage.setItem('newsletter_subscribed', 'true')
      setIsSubscribed(true)

      setTimeout(() => {
        handleClose()
      }, 2000)
    }

    setLoading(false)
  }

  if (!isVisible) return null

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
        <div 
          className={`relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden pointer-events-auto transition-all duration-500 ${
            isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
          style={{
            animation: isClosing ? 'none' : 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            maxHeight: 'calc(100vh - 24px)'
          }}
        >
          <button
            onClick={handleClose}
            className="absolute cursor-pointer top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-gray-100 hover:scale-110 transition-all duration-300 group shadow-lg"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
          </button>

          <div className="grid md:grid-cols-2 max-h-[calc(100vh-24px)] overflow-y-auto">
            <div className="relative h-48 sm:h-64 md:h-auto overflow-hidden bg-gradient-to-br from-[#0a0e1a] via-[#1a2942] to-[#0a1628]">
              <img
                src="/images/welcome.jpg"
                alt="Luxury Perfume"
                className="w-full h-full object-cover "
              />
              

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            </div>

            <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
              {!isSubscribed ? (
                <>
                  <div className="hidden md:inline-flex items-center gap-2 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                      <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-amber-200 to-transparent" />
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-2 sm:mb-3 tracking-wide">
                    Join Our Circle
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 font-light">
                    Subscribe to receive exclusive access to new fragrances, insider stories, and a special welcome gift.
                  </p>

                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {[
                      '15% off your first order',
                      'Early access to new collections',
                      'Exclusive member-only events',
                      'Personalized fragrance recommendations'
                    ].map((benefit, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 group"
                        style={{ 
                          animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` 
                        }}
                      >
                        <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-amber-600 text-xs font-semibold">✓</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 font-light">{benefit}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border placeholder:text-black/50 text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                      />
                    </div>

                    <button
                      onClick={handleSubscribe}
                      className="w-full cursor-pointer py-3 sm:py-4 bg-gradient-to-br from-[#d4af37] via-[#f4e5c2] to-[#d4af37] text-[#1a1a1a] text-xs sm:text-sm tracking-[0.15em] uppercase font-semibold rounded-lg shadow-xl shadow-black/20 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-700/30 hover:from-[#f0d678] hover:via-[#fff5dc] hover:to-[#f0d678] active:scale-[0.98] relative overflow-hidden border border-[#b8941f]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/20 pointer-events-none" />
                        <span className="relative z-10">
                        {loading ? 'Subscribing…' : 'Claim Your Gift'}
                      </span>
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 text-center mt-4 sm:mt-6 font-light">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </>
              ) : (
                <div className="text-center py-6 sm:py-8 animate-fadeIn">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-scaleIn">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-2 sm:mb-3 tracking-wide">
                    Welcome to Saavi!
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-light">
                    Check your email for your exclusive welcome gift.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}