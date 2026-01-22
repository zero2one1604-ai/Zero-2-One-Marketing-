// app/components/Footer.js
'use client'

import React, { useState } from 'react';
import { Mail, Phone, Facebook, Instagram, Twitter, Linkedin, Send, Award, Shield, Bus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const WhatsAppIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.52 3.48A11.91 11.91 0 0 0 12.06 0C5.47 0 .12 5.35.12 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.59 0 11.94-5.35 11.94-11.94a11.86 11.86 0 0 0-3.49-8.46zM12.06 21.8a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98.99-3.64-.23-.38a9.86 9.86 0 1 1 8.37 4.63zm5.41-7.38c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.97 1.18-.18.2-.36.23-.66.08-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.69-1.65-.95-2.27-.25-.6-.5-.52-.69-.53l-.59-.01c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.17 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35z" />
  </svg>
);

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
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border placeholder:text-gray-600 text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
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
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1QYDTMN98K/",
      color: "group-hover:text-[#1877F2]",
      glow: "group-hover:shadow-[0_0_12px_#1877F2]",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/saaviskincareofficial",
      color: "group-hover:text-[#E4405F]",
      glow: "group-hover:shadow-[0_0_12px_#E4405F]",
    },
    {
      icon: WhatsAppIcon,
      href: "https://wa.me/918448444373",
      color: "group-hover:text-[#25D366]",
      glow: "group-hover:shadow-[0_0_12px_#25D366]",
    },
  ].map((social, index) => (
    <a
      key={index}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-300 group hover:border-amber-800 hover:bg-amber-50 ${social.glow}`}
    >
      <social.icon
        className={`w-4 h-4 text-gray-600 transition-all duration-300 ${social.color}`}
      />
    </a>
  ))}
</div>

          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4 sm:mb-6">
              Shop
            </h4>
          <ul className="grid grid-cols-2 md:flex flex-col gap-2 sm:gap-3">
  {[
    { label: "Collection", href: "/shop" },
    { label: "For Her", href: "/shop" },
    { label: "For Him", href: "/shop" },
  ].map((item) => (
    <li key={item.label}>
      <a
        href={item.href}
        className="text-sm text-gray-600 hover:text-amber-900 font-light inline-block transition-all duration-300 hover:translate-x-1"
      >
        {item.label}
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
  {[
    { label: 'Contact Us', href: '/contact' },
    { label: 'Shipping Policy', href: '/shipping-policy' },
    { label: 'Returns & Exchanges', href: '/return-refund-cancellation-policy' },
  ].map((item) => (
    <li key={item.label}>
      <Link
        href={item.href}
        className="text-sm text-gray-600 hover:text-amber-900 transition-colors duration-300 font-light inline-block hover:translate-x-1 transform transition-transform"
      >
        {item.label}
      </Link>
    </li>
  ))}
</ul>
          </div>

        <div className="text-center md:text-left max-w-xs mx-auto md:mx-0">
  {/* Section Header */}
<h4 className="text-xs sm:text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4 sm:mb-6">
              Contact
            </h4>

  <div className="space-y-6">
    <div className="flex flex-col md:items-start items-center gap-2 group">
      <div className="flex items-center gap-2 text-gray-400 group-hover:text-black transition-colors">
        <Phone className="w-3.5 h-3.5" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Call Us</span>
      </div>
      <div className="flex flex-col md:flex-row md:gap-4 gap-1">
        <a href="tel:+918448444373" className="text-sm text-gray-600 hover:text-black transition-colors font-light">
          +91 8448 444 373
        </a>
        <span className="hidden md:block text-gray-200">|</span>
        <a href="tel:+918800504373" className="text-sm text-gray-600 hover:text-black transition-colors font-light">
          +91 8800 504 373
        </a>
      </div>
    </div>

    {/* Email Section */}
    <div className="flex flex-col md:items-start items-center gap-2 group">
      <div className="flex items-center gap-2 text-gray-400 group-hover:text-black transition-colors">
        <Mail className="w-3.5 h-3.5" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Email</span>
      </div>
      <div className="flex flex-col gap-1">
        <a href="mailto:info@saaviskincare.com" className="text-sm text-gray-600 hover:text-black transition-colors font-light">
          info@saaviskincare.com
        </a>
        <a href="mailto:support@saaviskincare.com" className="text-sm text-gray-600 hover:text-black transition-colors font-light">
          support@saaviskincare.com
        </a>
      </div>
    </div>

    {/* Availability Footer */}
    <div className="pt-6 border-t border-gray-100">
      <div className="flex flex-col md:items-start items-center gap-1">
        <p className="text-[10px] font-bold text-gray-900 uppercase tracking-tight">Hours</p>
        <p className="text-[11px] text-gray-500 font-light leading-relaxed tracking-wide">
          Mon – Sat <span className="mx-1">/</span> 10:00 AM – 6:00 PM IST
        </p>
      </div>
    </div>
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
              <a href="/privacy-policy" className="text-[10px] sm:text-xs text-gray-500 hover:text-amber-900 transition-colors duration-300 font-light whitespace-nowrap">
                Privacy Policy
              </a>
              <a href="/terms-and-conditions" className="text-[10px] sm:text-xs text-gray-500 hover:text-amber-900 transition-colors duration-300 font-light whitespace-nowrap">
                Terms and Conditions
              </a>
            </div>

       <div className="flex items-center gap-1.5 sm:gap-2 order-1 md:order-3">
  {/* UPI Logo */}
  <div className="w-8 h-5 sm:w-10 sm:h-6 bg-white border border-gray-200 rounded flex items-center justify-center p-0.5">
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" 
      alt="UPI" 
      className="h-full object-contain"
    />
  </div>
  
  {/* Google Pay */}
  <div className="w-8 h-5 sm:w-10 sm:h-6 bg-white border border-gray-200 rounded flex items-center justify-center p-0.5">
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" 
      alt="GPay" 
      className="h-full object-contain"
    />
  </div>

  {/* PhonePe */}
  <div className="w-8 h-5 sm:w-10 sm:h-6 bg-white border border-gray-200 rounded flex items-center justify-center p-0.5">
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" 
      alt="PhonePe" 
      className="h-full object-contain"
    />
  </div>

  {/* Paytm */}
  <div className="w-8 h-5 sm:w-10 sm:h-6 bg-white border border-gray-200 rounded flex items-center justify-center p-0.5">
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" 
      alt="Paytm" 
      className="h-full object-contain"
    />
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