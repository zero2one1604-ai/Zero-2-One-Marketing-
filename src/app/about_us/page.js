'use client'

import React, { useState } from 'react';
import { Heart, Globe, Users, Award, Leaf, HandHeart, Package, Target, Shield, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import LuxuryFooter from '../components/Footer';

export default function AboutUsPage() {
  const [activeValue, setActiveValue] = useState(0);

  const values = [
    { icon: Package, title: "Small Batch", description: "Meticulously crafted in limited quantities to ensure uncompromising quality." },
    { icon: HandHeart, title: "Artisan Made", description: "Our artisans pour expertise into each tin, creating unique olfactory experiences." },
    { icon: Users, title: "Empowerment", description: "Dedicated to creating leadership opportunities for women in our community." },
    { icon: Award, title: "Pure Sourcing", description: "Finest natural ingredients from sustainable, ethical suppliers worldwide." },
    { icon: Heart, title: "Personal Care", description: "Family-run dedication from our laboratory to your home." },
    { icon: Shield, title: "Verified Safe", description: "Personally tested formulas that prioritize skin health and integrity." }
  ];

  return (
    <>
      <div className="min-h-screen bg-[#FAF9F6]">
        
        {/* --- LUXURY HERO SECTION --- */}
        <header className="relative pt-32 pb-20 px-6 border-b border-neutral-100">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-[1px] w-12 bg-neutral-300"></div>
              <span className="text-[10px] font-bold tracking-[0.5em] text-neutral-400 uppercase">Since 2015</span>
              <div className="h-[1px] w-12 bg-neutral-300"></div>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-light text-neutral-900 tracking-tightest uppercase mb-8">
              Our <span className="font-serif italic text-neutral-400">Story</span>
            </h1>
            
            <p className="text-sm md:text-xl text-neutral-500 font-light max-w-2xl mx-auto leading-relaxed italic">
              "A journey born from love, crafted with care, and shared with the world."
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-24">
          
          {/* --- BRAND STORY: ASYMMETRIC GRID --- */}
          <section className="mb-40">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7 relative">
                <div className="relative aspect-[4/5] md:aspect-[16/9] overflow-hidden rounded-[3rem] shadow-2xl">
                  <Image
                    src="/images/savicover.jpg"
                    alt="Saavi Heritage"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Floating Detail */}
                <div className="absolute -bottom-10 -right-6 hidden md:block bg-white p-8 rounded-[2rem] shadow-xl border border-neutral-100 max-w-xs">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2">The Philosophy</p>
                  <p className="text-sm font-light text-neutral-800 leading-relaxed">
                    Skincare should be easy, reliable, and focused purely on care.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-8">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-neutral-900" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-900">The Genesis</span>
                </div>
                <h2 className="text-4xl font-light tracking-tight text-neutral-900 leading-tight">
                  Crafted by <span className="font-serif italic text-neutral-400">Family</span> for the Family.
                </h2>
                <div className="space-y-6 text-neutral-600 font-light leading-relaxed text-base md:text-lg">
                  <p>
                    Our journey began at home—an unforced desire to care for our family’s skin concerns. What started as a personal solution swiftly unfolded into a brand entrenched in trust and truth.
                  </p>
                  <p>
                    Every product we create is lovingly examined by the family before it is introduced to the world. We produce in small batches to ensure that every solid perfume and hydrating cream nourishes and protects.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* --- GLOBAL IMPACT: STATS --- */}
          <section className="mb-40 py-20 border-y border-neutral-100">
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold tracking-[0.4em] text-neutral-400 uppercase">Our Reach</span>
              <h2 className="text-4xl font-light text-neutral-900 mt-4 tracking-tightest uppercase">Going Global</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {[
                { val: "45+", label: "Countries Served", icon: Globe },
                { val: "50K+", label: "Happy Families", icon: Users },
                { val: "100+", label: "Target 2030", icon: Target }
              ].map((stat, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center mx-auto mb-6 group-hover:bg-black transition-colors">
                    <stat.icon className="w-6 h-6 text-neutral-400" />
                  </div>
                  <div className="text-5xl font-light text-neutral-900 tracking-tighter">{stat.val}</div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* --- VALUES: INTERACTIVE CARDS --- */}
          <section className="mb-40">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl">
                <span className="text-[10px] font-bold tracking-[0.4em] text-neutral-400 uppercase">Core Values</span>
                <h2 className="text-4xl font-light text-neutral-900 mt-4 tracking-tightest uppercase">The Saavi Standards</h2>
              </div>
              <p className="text-sm text-neutral-500 font-light max-w-xs md:text-right leading-relaxed">
                Principles that guide every formulation and every connection we build.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <div 
                  key={i} 
                  onMouseEnter={() => setActiveValue(i)}
                  className={`p-10 rounded-[2.5rem] border transition-all duration-500 cursor-pointer ${
                    activeValue === i ? 'bg-white border-neutral-200 shadow-xl scale-[1.02]' : 'bg-transparent border-transparent grayscale opacity-60'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center mb-8 text-white">
                    <v.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">{v.title}</h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* --- JOURNEY VIDEO: THE REEL --- */}
          <section className="mb-40 text-center">
            <h2 className="text-4xl font-light text-neutral-900 uppercase tracking-tightest mb-16">The Journey <span className="font-serif italic text-neutral-400">in Motion</span></h2>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-[3rem] border-8 border-white shadow-2xl">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                  <source src="/Video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </section>

          {/* --- SUSTAINABILITY: THE PACT --- */}
          <section className="bg-neutral-900 rounded-[4rem] p-10 md:p-20 text-white overflow-hidden relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-green-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">Planet Commitment</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-light leading-tight tracking-tight">
                  Luxury with <br /><span className="font-serif italic text-green-400">Conscience.</span>
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {["Zero-Waste Packaging", "Carbon-Neutral Operations", "Sustainable Sourcing"].map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all group">
                      <span className="text-sm font-light text-neutral-300">{p}</span>
                      <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Achieved</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-[3rem]">
                <Image 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800"
                  alt="Nature"
                  fill
                  className="object-cover opacity-60"
                />
              </div>
            </div>
            {/* Massive Background Text */}
            <div className="absolute -bottom-10 left-10 text-[180px] font-black text-white/[0.03] select-none pointer-events-none">PLANET</div>
          </section>

        </main>
      </div>
      <LuxuryFooter />
    </>
  );
}