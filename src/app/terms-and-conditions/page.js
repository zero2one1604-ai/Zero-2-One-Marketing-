'use client'

import React from 'react'
import { Scale, ShieldCheck, Gavel, AlertCircle, Globe } from 'lucide-react'
import LuxuryFooter from '../components/Footer'

export default function TermsConditions() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-20">
        
        {/* Header Section */}
        <header className="text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-10 bg-neutral-300"></div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-neutral-400 uppercase">
              Legal Framework
            </span>
            <div className="h-[1px] w-10 bg-neutral-300"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tightest text-neutral-900 mb-6">
            Terms <span className="font-serif italic text-neutral-400">&</span> Conditions
          </h1>
          <p className="text-xs text-neutral-500 font-bold tracking-widest uppercase">
            Last Updated: December 2025
          </p>
        </header>

        {/* Essential Integration Clause - Highlighted */}
        <div className="mb-20 p-8 md:p-12 bg-white border border-neutral-200 rounded-[3rem] text-center shadow-sm">
          <AlertCircle className="w-6 h-6 text-neutral-900 mx-auto mb-6" />
          <p className="text-lg md:text-xl font-light text-neutral-900 leading-relaxed italic">
            “All orders placed on <span className="font-medium text-black">Saavi Skincare</span> are subject to our 
            <a href="/shipping-policy" className="mx-2 underline underline-offset-4 decoration-neutral-200 hover:decoration-black transition-all">Shipping Policy</a> 
            and 
            <a href="/return-refund-cancellation-policy" className="mx-2 underline underline-offset-4 decoration-neutral-200 hover:decoration-black transition-all">Return, Refund & Cancellation Policy</a>.”
          </p>
        </div>

        {/* Detailed Clauses */}
        <div className="space-y-16">
          
          {/* 01. Acceptance of Terms */}
          <section className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <span className="text-[10px] font-mono text-neutral-400">01 / Agreement</span>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900 mt-2">Acceptance</h2>
            </div>
            <div className="md:w-3/4">
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                By accessing this website and placing an order, you confirm your acceptance of these Terms and Conditions. If you do not agree to these terms, please refrain from using our services. We reserve the right to update these terms at our discretion without prior notice.
              </p>
            </div>
          </section>

          {/* 02. Product Usage Disclaimer */}
          <section className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <span className="text-[10px] font-mono text-neutral-400">02 / Safety</span>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900 mt-2">Product Usage</h2>
            </div>
            <div className="md:w-3/4">
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Saavi Skincare products are for external use only. While we use premium natural extracts, it is the user&apos;s responsibility to check for allergen sensitivities. We recommend a patch test before regular application. We are not liable for adverse reactions resulting from improper use or known sensitivities.
              </p>
            </div>
          </section>

          {/* 03. Limitation of Liability */}
          <section className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <span className="text-[10px] font-mono text-neutral-400">03 / Indemnity</span>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900 mt-2">Liability</h2>
            </div>
            <div className="md:w-3/4">
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Saavi Skincare shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our maximum liability to you for any product purchased shall be limited to the purchase price of said product.
              </p>
            </div>
          </section>

          {/* 04. Force Majeure */}
          <section className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <span className="text-[10px] font-mono text-neutral-400">04 / Logistics</span>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-900 mt-2">Force Majeure</h2>
            </div>
            <div className="md:w-3/4">
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                We are not responsible for delays or failure to perform resulting from causes outside our reasonable control, including but not limited to acts of God, war, terrorism, riots, embargos, acts of civil or military authorities, fire, floods, accidents, or strikes.
              </p>
            </div>
          </section>

          {/* 05. Governing Law & Jurisdiction */}
          <section className="p-8 md:p-12 bg-neutral-900 rounded-[2.5rem] text-white">
            <div className="flex items-center gap-4 mb-8">
              <Globe className="w-5 h-5 text-neutral-400" />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.3em]">Governing Law & Jurisdiction</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="text-neutral-400 text-[10px] font-bold uppercase">Primary Law</h3>
                <p className="text-sm font-light leading-relaxed text-neutral-200">
                  These terms are governed by and construed in accordance with the <span className="text-white font-medium underline underline-offset-4 decoration-neutral-700">Laws of India</span>.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-neutral-400 text-[10px] font-bold uppercase">Legal Venue</h3>
                <p className="text-sm font-light leading-relaxed text-neutral-200">
                  Any disputes arising in relation hereto shall be subject to the exclusive jurisdiction of the courts of <span className="text-white font-medium">New Delhi, India</span>.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer Note */}
        <footer className="mt-32 pt-12 border-t border-neutral-200 text-center">
          <p className="text-xs text-neutral-400 font-light italic leading-relaxed">
            By continuing your journey with Saavi Skincare, you acknowledge that you have read and understood these terms in their entirety.
          </p>
        </footer>
      </div>
      <LuxuryFooter />
    </div>
  )
}