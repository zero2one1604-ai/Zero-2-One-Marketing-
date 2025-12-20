'use client'

import React from 'react'
import { Lock, Eye, Database, ShieldCheck, Cookie, Mail } from 'lucide-react'
import LuxuryFooter from '../components/Footer'

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <div className="max-w-4xl mx-auto md:px-6 pt-10 md:pt-24 pb-20">
        
        <header className="text-center px-6 mb-5 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-2 md:mb-6">
            <div className="h-[1px] w-10 bg-neutral-300"></div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-neutral-400 uppercase">
              Privacy & Trust
            </span>
            <div className="h-[1px] w-10 bg-neutral-300"></div>
          </div>
          <h1 className="text-lg md:text-6xl font-light tracking-tightest text-neutral-900 mb-2 md:mb-6">
            Privacy Statement
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 font-light max-w-lg mx-auto leading-relaxed">
            Your trust is our most valuable asset. We are dedicated to protecting your personal information with absolute transparency.
          </p>
        </header>

        <div className="grid px-2 grid-cols-3 md:grid-cols-3 md:gap-6 gap-2 mb-5 md:mb-20">
          <div className="p-2 md:p-6 bg-white border border-neutral-100 rounded-3xl text-center">
            <Eye className="w-5 h-5 mx-auto mb-1 md:mb-4 text-neutral-400" />
            <h3 className="text-[8px] md:text-[10px] text-black font-bold uppercase tracking-widest mb-1 md:mb-2">Transparency</h3>
            <p className="text-[6px] md:text-[11px] text-neutral-500 font-light">Know exactly what data we collect and why.</p>
          </div>
          <div className="p-2 md:p-6 bg-white border border-neutral-100 rounded-3xl text-center">
            <Lock className="w-5 h-5 mx-auto mb-1 md:mb-4 text-neutral-400" />
            <h3 className="text-[8px] md:text-[10px] text-black font-bold uppercase tracking-widest mb-1 md:mb-2">Security</h3>
            <p className="text-[6px] md:text-[11px] text-neutral-500 font-light">Industry-standard encryption for every transaction.</p>
          </div>
          <div className="p-2 md:p-6 bg-white border border-neutral-100 rounded-3xl text-center">
            <ShieldCheck className="w-5 h-5 mx-auto mb-1 md:mb-4 text-neutral-400" />
            <h3 className="text-[8px] md:text-[10px] text-black font-bold uppercase tracking-widest mb-1 md:mb-2">Control</h3>
            <p className="text-[6px] md:text-[11px] text-neutral-500 font-light">Your right to access or delete your data at any time.</p>
          </div>
        </div>

        <div className="space-y-5 px-6 md:space-y-20">
          
          <section className="group">
            <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-start">
              <div className="md:w-1/3">
                <h2 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-900">
                  01. Data Collection
                </h2>
                <div className="h-px w-full bg-neutral-200 mt-1 md:mt-4"></div>
              </div>
              <div className="md:w-2/3">
                <p className="text-xs md:text-sm text-neutral-600 font-light leading-relaxed mb-2 md:mb-4">
                  We collect information necessary to fulfill your orders and enhance your experience. This includes:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:gap-3">
                  {['Contact Details', 'Shipping Address', 'Order History', 'Device Information'].map((item) => (
                    <li key={item} className="flex items-center gap-1 md:gap-2 text-[10px] md:text-[13px] font-medium text-neutral-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="group">
            <div className="flex flex-col md:flex-row md:gap-8 items-start">
              <div className="md:w-1/3">
                <h2 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-900">
                  02. Usage & Purpose
                </h2>
                <div className="h-px w-full bg-neutral-200 mt-1 md:mt-4"></div>
              </div>
              <div className="md:w-2/3">
                <p className="text-xs md:text-sm mt-2 text-neutral-600 font-light leading-relaxed">
                  Your data allows us to process payments, ship your Saavi perfumes, and provide tailored skincare advice. We never sell your personal information to third-party marketers. Data shared with logistics partners (BlueDart/DHL) is strictly for delivery purposes.
                </p>
              </div>
            </div>
          </section>

          <section className="p-5 md:p-10 bg-white border border-neutral-100 rounded-2xl md:rounded-[3rem] shadow-sm">
            <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-6">
              <Cookie className="md:w-5 w-3 h-3 md:h-5 text-neutral-900" />
              <h2 className="text-[10px] md:text-[11px] font-bold text-black uppercase tracking-[0.2em]">Cookie Policy</h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-600 font-light leading-relaxed">
              We use &quot;cookies&quot; to remember your cart and understand how you interact with our boutique. These are small files stored on your device that help us provide a seamless journey. You may disable cookies in your browser settings, though some site features may become unavailable.
            </p>
          </section>

          <section className="group">
            <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-start">
              <div className="md:w-1/3">
                <h2 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-900">
                  03. Your Rights
                </h2>
                <div className="h-px w-full bg-neutral-200 mt-1 md:mt-4"></div>
              </div>
              <div className="md:w-2/3">
                <p className="text-xs md:text-sm text-neutral-600 font-light leading-relaxed mb-2 md:mb-6">
                  In accordance with Indian Digital Personal Data Protection (DPDP) standards, you have the right to:
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                     <Database className="w-4 h-4 text-neutral-400 shrink-0 mt-1" />
                     <p className="text-xs text-neutral-600 font-light leading-relaxed">
                       Request a copy of the personal information we hold about you or request its permanent deletion from our servers.
                     </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="p-5 md:p-10 bg-neutral-900 rounded-2xl md:rounded-[3rem] text-white">
            <div className="flex items-center gap-4 mb-3 md:mb-8">
              <Mail className="md:w-5 w-3 h-3 md:h-5 text-neutral-400" />
              <h2 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em]">Privacy Concerns</h2>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-8">
              <div className="space-y-2">
                <p className="text-xs md:text-sm font-light text-neutral-300 leading-relaxed">
                  For any privacy-related inquiries or to exercise your data rights, please contact our Grievance Officer:
                </p>
                <p className="text-sm md:text-lg font-medium">privacy@saaviskincare.com</p>
              </div>
              <button className="md:px-8 px-4 mx-auto md:mx-0 py-2 md:py-3 border cursor-pointer border-neutral-700 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Submit Request
              </button>
            </div>
          </section>

        </div>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-neutral-200 text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
            © 2025 Saavi Skincare • Crafted for Privacy
          </p>
        </footer>
      </div>
      <LuxuryFooter />
    </div>
  )
}