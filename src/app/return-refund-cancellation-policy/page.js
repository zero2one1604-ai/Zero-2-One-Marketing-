'use client'

import React from 'react'
import { ShieldAlert, RefreshCcw, XCircle, Camera, Clock, HelpCircle } from 'lucide-react'
import LuxuryFooter from '../components/Footer'

export default function ReturnRefundPolicy() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <div className="max-w-5xl mx-auto md:px-6 px-2 pt-10 pb-5 md:pt-24 md:pb-20">
        
        <header className="text-center mb-5 md:mb-24 px-6">
          <div className="flex items-center justify-center gap-3 mb-2 md:mb-6">
            <div className="h-[1px] w-10 bg-neutral-300"></div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-neutral-400 uppercase">
              Saavi Care
            </span>
            <div className="h-[1px] w-10 bg-neutral-300"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tightest text-neutral-900 mb-2 md:mb-6">
            Returns <span className="font-serif italic text-neutral-400">&</span> Refunds
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 font-light max-w-lg mx-auto leading-relaxed italic">
            &quot;At Saavi, we are committed to delivering the finest experience. We believe in transparency and clarity in every interaction.&quot;
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <nav className="flex flex-col gap-6 border-l border-neutral-200 pl-6">
              <a href="#returns" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">Returns</a>
              <a href="#refunds" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">Refund Process</a>
              <a href="#cancellation" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">Cancellations</a>
            </nav>
          </aside>

          <div className="lg:col-span-9 space-y-10 md:space-y-24">
            
            <section id="returns" className="scroll-mt-32">
              <div className="flex items-center md:justify-start justify-center gap-1 md:gap-4 mb-2 md:mb-8">
                <RefreshCcw className="md:w-5 w-3 h-3 md:h-5 text-neutral-900" />
                <h2 className="text-sm md:text-2xl font-light tracking-tight text-neutral-900">Return Policy</h2>
              </div>
              
              <div className="space-y-4 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
                  <div className="p-4 md:p-8 bg-white border border-neutral-100 rounded-xl md:rounded-[2rem]">
                    <h3 className="text-[10px] md:text-[11px] font-bold text-black uppercase tracking-widest mb-2 md:mb-4 flex items-center gap-2">
                      <XCircle className="w-3 h-3 text-red-400" /> Hygiene Note
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-600 font-light leading-relaxed">
                      Due to the intimate nature of skincare and hygiene standards, we do not accept returns for opened or used products once delivered.
                    </p>
                  </div>
                  <div className="p-4 md:p-8 bg-neutral-900 text-white rounded-xl md:rounded-[2rem]">
                    <h3 className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest mb-2 md:mb-4 flex items-center gap-2">
                      <ShieldAlert className="w-3 h-3 text-amber-400" /> Defective Items
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-300 font-light leading-relaxed">
                      Entitled to exchange or refund if the product is damaged, broken, or defective. Claims must be reported within <span className="text-white font-medium">24 hours</span> of receipt.
                    </p>
                  </div>
                </div>
                
                <div className="p-4 md:p-8 bg-amber-50/50 border border-amber-100 rounded-2xl md:rounded-3xl">
                   <p className="text-xs text-amber-800 font-medium leading-relaxed">
                     <span className="font-bold">Sensitivities:</span> Our products contain natural extracts. We are not responsible for reactions to specific ingredients. Please conduct a patch test as recommended.
                   </p>
                </div>
              </div>
            </section>

            <section id="refunds" className="scroll-mt-32">
              <div className="flex items-center gap-1 md:justify-start justify-center md:gap-4 mb-4 md:mb-8">
                <Camera className="md:w-5 w-3 h-3 md:h-5 text-neutral-900" />
                <h2 className="text-sm md:text-2xl font-light tracking-tight text-neutral-900">Refund Guidelines</h2>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl md:rounded-[2.5rem] overflow-hidden">
                <div className="px-10 md:p-10 py-5 border-b border-neutral-100">
                  <h3 className="text-sm md:text-lg font-medium mb-1 md:mb-4 text-black italic">The Unboxing Requirement</h3>
                  <p className= "text-xs md:text-sm text-neutral-600 font-light leading-relaxed mb-2 md:mb-6">
                    To maintain the integrity of our claims process, a <span className="font-bold text-black underline underline-offset-4">clear unboxing video</span> is mandatory for any refund or replacement requests involving damaged or missing items.
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-neutral-50 rounded-full text-[10px] font-bold uppercase text-neutral-500">
                      <Clock className="w-3 h-3" /> Claim within 24 Hours
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-neutral-50 rounded-full text-[10px] font-bold uppercase text-neutral-500">
                      <Camera className="w-3 h-3" /> Original Packaging Required
                    </div>
                  </div>
                </div>

                <div className="px-10 py-5 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <div>
                    <h4 className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2 md:mb-4">Refund Timelines</h4>
                    <ul className="space-y-2 md:space-y-4 text-xs md:text-sm font-light text-neutral-700">
                      <li className="flex justify-between"><span>Verification:</span> <span className="font-medium text-black">3-4 Days</span></li>
                      <li className="flex justify-between"><span>Processing:</span> <span className="font-medium text-black">5-6 Days</span></li>
                      <li className="flex justify-between"><span>COD Refunds:</span> <span className="font-medium text-black">Bank Transfer</span></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-1 md:mb-4">Contact for Claims</h4>
                    <p className="text-xs md:text-sm font-medium text-black md:mb-1">+91 99300 63303</p>
                    <p className="text-xs md:text-sm font-light text-neutral-600 mb-1 md:mb-4">support@nha-world.com</p>
                    <p className="text-[10px] text-neutral-400 italic">Subject: Refund for [Order Number]</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="cancellation" className="scroll-mt-32">
              <div className="flex items-center md:justify-start justify-center  gap-1 md:gap-4 mb-4 md:mb-8">
                <XCircle className="md:w-5 w-3 h-3 md:h-5 text-neutral-900" />
                <h2 className="text-sm md:text-2xl font-light tracking-tight text-neutral-900">Cancellation Policy</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="space-y-1 md:space-y-4">
                  <h4 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">Pre-Dispatch</h4>
                  <p className="text-xs md:text-sm font-light text-neutral-600 leading-relaxed">
                    Orders can be cancelled anytime before they leave our warehouse. Please note a <span className="font-medium text-black">2% gateway fee</span> applies to prepaid cancellations.
                  </p>
                </div>
                <div className="space-y-1 md:space-y-4">
                  <h4 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">Post-Dispatch</h4>
                  <p className="text-xs md:text-sm font-light text-neutral-600 leading-relaxed">
                    Once dispatched, cancellations are no longer possible. Returned prepaid orders will incur a <span className="font-medium text-black">₹75 handling fee</span>.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>

        <footer className="md:mt-32 mb-10 mt-5 pt-5 md:pt-16 border-t border-neutral-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-8 text-center md:text-left">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-1 md:mb-2">Still Have Questions?</p>
              <h4 className="text-lg md:text-xl font-light text-neutral-900">We are here to help you.</h4>
            </div>
            <button className="md:px-10 px-4 py-2 md:py-4 cursor-pointer bg-black text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-neutral-800 transition-all">
              Contact Concierge
            </button>
          </div>
        </footer>
      </div>
      <LuxuryFooter />
    </div>
  )
}