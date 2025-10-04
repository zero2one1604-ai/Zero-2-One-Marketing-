'use client'

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Send, Award, Shield, Truck, CreditCard } from 'lucide-react';
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
    <footer className="bg-white border-t border-gray-200">
      
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 tracking-wide">Free Shipping</h4>
                <p className="text-xs text-gray-500 mt-0.5">On orders over $100</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 tracking-wide">Secure Payment</h4>
                <p className="text-xs text-gray-500 mt-0.5">100% protected</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 tracking-wide">Authentic Products</h4>
                <p className="text-xs text-gray-500 mt-0.5">Guaranteed genuine</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 tracking-wide">Easy Returns</h4>
                <p className="text-xs text-gray-500 mt-0.5">30-day guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Image
                src="/images/saavi logo.png"
                alt="Luxe Fragrances Logo"
                width={150}
                height={50}
                className="mb-4"
                />
              <p className="text-gray-600 leading-relaxed text-sm font-light max-w-md">
                Curating the world's finest fragrances since 1985. Each scent in our collection tells a story of craftsmanship, elegance, and timeless sophistication.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Join Our Circle
              </h4>
              <p className="text-xs text-gray-500 mb-4">
                Receive exclusive offers and discover new fragrances first.
              </p>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 pr-12 border placeholder:text-black/20 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  disabled={subscribed}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={subscribed}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 rounded-md flex items-center justify-center transition-all duration-300 hover:scale-105 disabled:from-green-600 disabled:to-green-500"
                >
                  {subscribed ? (
                    <span className="text-white text-sm">✓</span>
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-amber-500 hover:bg-amber-50 transition-all duration-300 group"
                >
                  <social.icon className="w-4 h-4 text-gray-600 group-hover:text-amber-600 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
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

          <div>
            <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-6">
              Support
            </h4>
            <ul className="space-y-3">
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

          <div>
            <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600 font-light leading-relaxed">
                  B-12, PVR Cinema<br />
                  Saket, Delhi-110016
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <a href="tel:+12125551234" className="text-sm text-gray-600 hover:text-amber-600 transition-colors duration-300 font-light">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <a href="mailto:hello@saavi.com" className="text-sm text-gray-600 hover:text-amber-600 transition-colors duration-300 font-light">
                  hello@saavi.com
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Available Mon-Fri<br />
                9:00 AM - 6:00 PM IST
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 font-light">
              © 2025 Saavi. All rights reserved. | Designed and Curated by Zero2One Marketing
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <a href="#" className="text-xs text-gray-500 hover:text-amber-600 transition-colors duration-300 font-light">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-gray-500 hover:text-amber-600 transition-colors duration-300 font-light">
                Terms of Service
              </a>
              <a href="#" className="text-xs text-gray-500 hover:text-amber-600 transition-colors duration-300 font-light">
                Cookie Policy
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[8px] font-semibold text-gray-600">
                VISA
              </div>
              <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[8px] font-semibold text-gray-600">
                MC
              </div>
              <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[8px] font-semibold text-gray-600">
                AMEX
              </div>
              <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[8px] font-semibold text-gray-600">
                PayPal
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}