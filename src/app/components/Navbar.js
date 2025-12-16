"use client";

import { useState } from "react";
import { ShoppingCartIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SaaviLogo from '../../../public/images/logo.png';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about_us" },
    { name: "Skincare Tips", href: "/tips" },
    { name: "Contact", href: "/contact" },
  ];

  const marqueeText = "First order 10% off";
  const repeatedContent = Array(15).fill(marqueeText).join(" \u2022 ");


  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      <div className="py-2 overflow-hidden bg-gradient-to-br border-[#bfbfbf] from-[#f8f8f8] via-[#dcdcdc] to-[#f1f1f1] shadow-2xl border-y  backdrop-blur-sm">
        <div className="marquee-container">
          <span className="marquee-content uppercase text-[#1a1a1a] text-xs md:text-sm font-light tracking-[0.15em] whitespace-nowrap">
            {repeatedContent}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4">
        <div className="flex items-center text-xl font-serif font-semibold text-gray-900 tracking-tight">
          <Link href="/" className="flex items-center">
  
            <img 
              src={SaaviLogo.src} 
              alt="Saavi Skincare Logo" 
              className="mr-2 h-10 sm:h-12 w-auto" 
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}

          <div className="flex items-center space-x-4 lg:ml-4">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-700 hover:text-gray-900 cursor-pointer transition" />
            <ShoppingCartIcon className="w-5 h-5 text-gray-700 hover:text-gray-900 cursor-pointer transition" />
          </div>
        </nav>

        {/* Mobile Icons and Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-700 cursor-pointer" />
          <ShoppingCartIcon className="w-5 h-5 text-gray-700 cursor-pointer" />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <nav className="flex flex-col space-y-3 px-6 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 font-medium text-base transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Custom CSS for Marquee Animation */}
      <style jsx global>{`
        /* Define the animation keyframes */
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            /* Move the width of a single repetition + the gap */
            transform: translateX(-20%); /* Adjusted value to account for 5 repetitions */
          }
        }

        /* Container to hide overflow and set animation properties */
        .marquee-container {
          display: flex;
          overflow: hidden;
          width: 100%;
          /* Remove padding/margin that would break the effect */
        }

        /* Content that gets animated */
        .marquee-content {
          display: inline-block;
          animation: marquee 15s linear infinite; /* Adjust duration (15s) for speed */
          padding-right: 5vw; /* Adds a bit of justified gap between repetitions */
        }
      `}</style>
    </header>
  );
}