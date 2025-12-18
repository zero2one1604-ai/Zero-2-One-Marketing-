// app/components/Footer.js
'use client'

import React, { useState } from 'react';
import { Mail, Phone, Facebook, Instagram, Twitter, Linkedin, Send, Award, Shield, Bus } from 'lucide-react';
import Image from 'next/image';

export default function LuxuryFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-white border-t-4 md:border-t-8 border-gold-texture">
      
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
    <div className="grid grid-cols-3 gap-2 lg:gap-8">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:items-start gap-2 sm:gap-4 text-center group">
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <Shield className="w-4 h-4 md:w-6 md:h-6 text-amber-600" /> 
            </div>
            <div>
                <h4 className="text-[10px] md:text-sm font-semibold text-gray-900 tracking-wide">Secure Payment</h4>
                <p className="text-[8px] md:text-xs text-gray-500 md:mt-0.5">100% protected</p>
            </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center sm:items-start gap-2 sm:gap-4 text-center group">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              
                <Award className="w-4 h-4 md:w-6 md:h-6 text-amber-600" />
            </div>
            <div>
                <h4 className="text-[10px] md:text-sm font-semibold text-gray-900 tracking-wide">Authentic Products</h4>
                <p className="text-[8px] md:text-xs text-gray-500 md:mt-0.5">Guaranteed genuine</p>
            </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center sm:items-start gap-2 sm:gap-4 text-center group">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
          
                <Bus className="w-4 h-4 md:w-6 md:h-6 text-amber-600" />
            </div>
            <div>
                <h4 className="text-[10px] md:text-sm font-semibold text-gray-900 tracking-wide">Quick Shipping</h4>
                <p className="text-[8px] md:text-xs text-gray-500 md:mt-0.5">1-2 Day Delivery</p>
            </div>
        </div>
        
    </div>
</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 md:py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div>
               <Image
                  src="/images/logo.png"
                  alt="Luxe Fragrances Logo"
                  width={120}
                  height={40}
                  className="md:w-[150px] w-[90px] h-fit mx-auto md:mx-0 md:h-fit"
                />
              <p className="text-gray-600 leading-relaxed mt-4 text-xs text-center md:text-left md:text-sm font-light max-w-md">
                Curating the world&apos;s finest fragrances. Each scent in our collection tells a story of craftsmanship, elegance, and timeless sophistication.
              </p>
            </div>

            <div className="md:space-y-3">
              <h4 className="text-xs text-center md:text-left sm:text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Join Our Circle
              </h4>
              <p className="text-xs text-center md:text-left text-gray-500 mb-3 sm:mb-4">
                Receive exclusive offers and discover new fragrances first.
              </p>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border placeholder:text-black/20 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  disabled={subscribed}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={subscribed}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 rounded-md flex items-center justify-center transition-all duration-300 hover:scale-105 disabled:from-green-600 disabled:to-green-500"
                >
                  {subscribed ? (
                    <span className="text-white text-xs sm:text-sm">✓</span>
                  ) : (
                    <Send className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3 justify-center sm:justify-start">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: 'https://www.instagram.com/saaviskincareofficial' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-amber-500 hover:bg-amber-50 transition-all duration-300 group"
                >
                  <social.icon className="w-4 h-4 text-gray-600 group-hover:text-amber-600 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4 sm:mb-6">
              Shop
            </h4>
            <ul className="grid grid-cols-2 md:flex flex-col gap-2 sm:gap-3">
              {['New Arrivals', 'Best Sellers', 'For Her', 'For Him', 'Gift Sets', 'Limited Edition'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-sm text-gray-600 hover:text-amber-600 transition-colors duration-300 font-light inline-block hover:translate-x-1 transform transition-transform"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4 sm:mb-6">
              Support
            </h4>
            <ul className="grid grid-cols-2 md:flex flex-col gap-2 sm:gap-3">
              {['Contact Us', 'FAQs', 'Shipping Info', 'Returns & Exchanges', 'Size Guide', 'Track Order'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-sm text-gray-600 hover:text-amber-600 transition-colors duration-300 font-light inline-block hover:translate-x-1 transform transition-transform"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4 sm:mb-6">
              Contact
            </h4>
            <ul className="space-y-3 sm:space-y-4">
             
              <li className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 group">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                <a href="tel:+918448444373" className="text-sm text-gray-600 hover:text-amber-600 transition-colors duration-300 font-light">
                  +91 8448 444 373
                </a>
                 <a href="tel:+918800504373" className="text-sm text-gray-600 hover:text-amber-600 transition-colors duration-300 font-light">
                  +91 8800 504 373
                </a>
              </li>
              <li className="flex flex-col items-center justify-center sm:justify-start gap-2 sm:gap-3 group">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                <a href="mailto:info@saaviskincare.com" className="text-sm text-gray-600 hover:text-amber-600 transition-colors duration-300 font-light break-all">
                  info@saaviskincare.com
                </a>
                <a href="mailto:support@saaviskincare.com" className="text-sm text-gray-600 hover:text-amber-600 transition-colors duration-300 font-light break-all">
                  support@saaviskincare.com
                </a>
              </li>
            </ul>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 font-light leading-relaxed text-center sm:text-left">
                Available Mon-Sat<br />
                10:00 AM - 6:00 PM IST
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-[10px] sm:text-xs text-gray-500 font-light text-center md:text-left order-2 md:order-1">
              © 2025 Saavi. All rights reserved. | Designed and Curated by Zero2One Marketing
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 order-3 md:order-2">
              <a href="#" className="text-[10px] sm:text-xs text-gray-500 hover:text-amber-600 transition-colors duration-300 font-light whitespace-nowrap">
                Privacy Policy
              </a>
              <a href="#" className="text-[10px] sm:text-xs text-gray-500 hover:text-amber-600 transition-colors duration-300 font-light whitespace-nowrap">
                Terms of Service
              </a>
              <a href="#" className="text-[10px] sm:text-xs text-gray-500 hover:text-amber-600 transition-colors duration-300 font-light whitespace-nowrap">
                Cookie Policy
              </a>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 order-1 md:order-3">
              <div className="w-8 h-5 sm:w-10 sm:h-6 bg-gray-200 rounded flex items-center justify-center text-[7px] sm:text-[8px] font-semibold text-gray-600">
                VISA
              </div>
              <div className="w-8 h-5 sm:w-10 sm:h-6 bg-gray-200 rounded flex items-center justify-center text-[7px] sm:text-[8px] font-semibold text-gray-600">
                MC
              </div>
              <div className="w-8 h-5 sm:w-10 sm:h-6 bg-gray-200 rounded flex items-center justify-center text-[7px] sm:text-[8px] font-semibold text-gray-600">
                AMEX
              </div>
              <div className="w-8 h-5 sm:w-10 sm:h-6 bg-gray-200 rounded flex items-center justify-center text-[7px] sm:text-[8px] font-semibold text-gray-600">
                PayPal
              </div>
            </div>
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

    </footer>
  );
}