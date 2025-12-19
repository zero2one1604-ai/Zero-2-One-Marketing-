'use client'

import React from 'react'
import { Truck, Globe, MapPin, Package } from 'lucide-react'
import LuxuryFooter from '../components/Footer'

export default function ShippingPolicy() {
  return (
    <div className="bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
    
        <header className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-10 bg-neutral-300"></div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-neutral-400 uppercase">
              Saavi Logistics
            </span>
            <div className="h-[1px] w-10 bg-neutral-300"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-light tracking-tightest text-neutral-900 mb-6">
            Shipping Policy
          </h1>
          <p className="text-sm text-neutral-500 font-light max-w-md mx-auto leading-relaxed">
            Ensuring your essence arrives with the care and precision it was crafted with.
          </p>
        </header>

        {/* Content Grid */}
        <div className="space-y-16">
          
          {/* Section 1: Dispatch */}
          <section className="group">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              <div className="w-full md:w-1/3">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-4 h-4 text-neutral-400" />
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">
                    Dispatch Timeline
                  </h2>
                </div>
                <div className="h-px w-full bg-neutral-200"></div>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-lg font-light text-neutral-800 leading-relaxed mb-4">
                  All orders are meticulously prepared and dispatched within <span className="font-medium text-black">2-3 business days</span> from our warehouse.
                </p>
                <div className="bg-white border border-neutral-100 p-6 rounded-2xl">
                  <p className="text-sm text-neutral-500 italic font-light">
                    Note: During special sales or exclusive offer events, shipping may experience slight delays due to the high volume of orders. We appreciate your patience.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Charges */}
          <section className="group">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              <div className="w-full md:w-1/3">
                <div className="flex items-center gap-3 mb-4">
                  <Truck className="w-4 h-4 text-neutral-400" />
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">
                    Shipping Charges
                  </h2>
                </div>
                <div className="h-px w-full bg-neutral-200"></div>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-lg font-light text-neutral-800 leading-relaxed">
                  We are pleased to offer <span className="font-medium text-black underline underline-offset-8 decoration-neutral-200">Complimentary Shipping</span> to most of our customers.
                </p>
                <p className="mt-6 text-sm text-neutral-500 font-light leading-relaxed">
                  Remote locations may incur a nominal fee. To view specific rates for your area, please consult the checkout page before completing your order.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Partners */}
          <section className="group">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              <div className="w-full md:w-1/3">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900">
                    Tracking & Logistics
                  </h2>
                </div>
                <div className="h-px w-full bg-neutral-200"></div>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-sm text-neutral-600 font-light leading-relaxed mb-8">
                  To ensure maximum security and speed, we partner exclusively with global leaders in logistics:
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-neutral-100 rounded-xl flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500">
                    <span className="text-xl font-black text-blue-900 tracking-tighter">BlueDart</span>
                  </div>
                  <div className="p-4 bg-white border border-neutral-100 rounded-xl flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500">
                    <span className="text-xl font-black text-red-600 tracking-tighter italic">DHL</span>
                  </div>
                </div>

                <p className="mt-8 text-xs text-neutral-400 font-light italic">
                  *In cases where our primary partners are non-operational in your specific region, we utilize the most reliable alternative available at that time.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Support Footer */}
        <footer className="mt-32 pt-12 border-t border-neutral-200 text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-800 uppercase mb-4">Need Assistance?</p>
          <a href="mailto:support@saaviskincare.com" className="text-sm text-neutral-600 font-medium hover:underline underline-offset-4">
            support@saaviskincare.com
          </a>
        </footer>
      </div>
      <LuxuryFooter />
    </div>
  )
}