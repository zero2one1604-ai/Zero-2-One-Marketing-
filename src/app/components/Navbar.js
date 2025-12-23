"use client";

import { useState } from "react";
import { UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SaaviLogo from '../../../public/images/logo.png';
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import UserMenu from "./UserMenu";
import { useAuthModal } from "@/app/components/AuthModalProvider";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false)

const { openAuthModal } = useAuthModal();

useEffect(() => {
  supabase.auth.getUser().then(({ data }) => {
    setUser(data.user);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}, []);



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
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-700 hidden hover:text-gray-900 cursor-pointer transition" />
         {user?.user_metadata?.avatar_url ? (
<img
  src={user.user_metadata.avatar_url}
  className="w-10 h-10 rounded-full cursor-pointer"
  onClick={() => setMenuOpen(!menuOpen)}
/>

) : (
  <UserIcon
    className="w-5 h-5 text-gray-700 hover:text-gray-900 cursor-pointer transition"
    onClick={() => openAuthModal({ onSuccess: () => {} })}
  />
)}

          </div>
        </nav>

        <div className="md:hidden flex items-center space-x-4">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-700 hidden cursor-pointer" />
          {user?.user_metadata?.avatar_url ? (
  <img
    src={user.user_metadata.avatar_url}
    alt="User"
    className="w-8 h-8 rounded-full cursor-pointer"
    onClick={() => setMenuOpen(!menuOpen)}
  />
) : (
  <UserIcon
    className="w-5 h-5 text-gray-700 hover:text-gray-900 cursor-pointer transition"
    onClick={() => openAuthModal({ onSuccess: () => {} })}
  />
)}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

<div 
  className={`fixed left-0 right-0 z-[100] md:hidden bg-white transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
    isMenuOpen 
      ? 'top-0 h-screen opacity-100' 
      : 'top-[-100%] h-0 opacity-0 pointer-events-none'
  }`}
>
  <button 
    onClick={() => setIsMenuOpen(false)}
    className={`absolute top-6 right-8 z-[110] flex items-center justify-center w-12 h-12 rounded-full border border-gray-100 bg-white shadow-sm transition-all duration-500 ${
      isMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'
    } active:scale-90`}
  >
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L13 13M1 13L13 1" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  </button>
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

  <div className="relative h-full flex flex-col px-8 pt-24 pb-12">
    
    <div className="mb-12">
      <p className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">Navigation Menu</p>
      <div className="h-[1px] w-12 bg-black mt-2"></div>
    </div>

    <nav className="flex flex-col space-y-6">
      {navigation.map((item, index) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setIsMenuOpen(false)}
          className="group flex items-baseline gap-4"
        >
          <span className="text-[10px] font-mono text-gray-400 group-hover:text-black transition-colors">
            0{index + 1}
          </span>
          
          <div className="relative overflow-hidden">
            <span className={`block text-4xl the-seasons font-light tracking-tighter text-gray-900 transition-transform duration-500 ease-out group-hover:-translate-y-full ${isMenuOpen ? 'translate-y-0' : 'translate-y-12'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}>
              {item.name}
            </span>
            <span className="absolute top-0 left-0 block text-4xl font-medium tracking-tighter text-black translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
              {item.name}
            </span>
          </div>

          <div className="h-1.5 w-1.5 rounded-full bg-black opacity-0 group-hover:opacity-100 transition-opacity ml-auto"></div>
        </Link>
      ))}
    </nav>

    <div className="mt-auto grid grid-cols-2 gap-8 border-t border-gray-100 pt-10">
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Connect</p>
        <div className="flex text-black flex-col gap-2">
          <a href="#" className="text-sm font-medium hover:underline">Instagram</a>
          <a href="#" className="text-sm font-medium hover:underline">LinkedIn</a>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Contact</p>
        <p className="text-sm font-medium text-black">info@saaviskincare.com</p>
        <p className="text-xs text-gray-500 mt-1">Available 24/7</p>
      </div>
    </div>

    <div className="absolute bottom-[-20px] right-[-20px] text-[120px] font-black text-gray-50 select-none -z-10 leading-none">
      MENU
    </div>
  </div>
</div>

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

        /* Mobile menu slide-in animation */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      <UserMenu
  open={menuOpen}
  onClose={() => setMenuOpen(false)}
  user={user}
/>

    </header>
  );
}