"use client";

import { useState } from "react";
import { ShoppingCartIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SaaviLogo from '../../../public/images/saavi logo.png';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "Customization", href: "/customization" },
    { name: "About Us", href: "/about" },
    { name: "Skincare Tips", href: "/tips" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
<div className="text-white text-center py-4 text-sm font-light tracking-[0.15em] bg-gradient-to-r from-[#0B1929] via-[#1B3A5F] to-[#0B1929] shadow-2xl border-y border-amber-200/20 backdrop-blur-sm">
  <span className="uppercase">First order 10% off • Buy 2 Get 1 Free • 500+ Shopping Tester Free</span>
</div>


      <div className="flex items-center justify-between px-8 py-4">
     <div className="flex items-center text-xl font-serif font-semibold text-gray-900 tracking-tight">
  <Link href="/" className="flex items-center">
    <img src={SaaviLogo.src} alt="Saavi Skincare Logo" className="mr-2 h-12" />

  </Link>
</div>

        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}

          <div className="flex items-center space-x-4 ml-4">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-700 hover:text-gray-900 cursor-pointer transition" />
            <ShoppingCartIcon className="w-5 h-5 text-gray-700 hover:text-gray-900 cursor-pointer transition" />
          </div>
        </nav>

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
    </header>
  );
}
