'use client'

import React, { useState } from 'react';
import { Mail, Phone, Send, MessageCircle, Instagram, Globe, Check, ArrowRight } from 'lucide-react';
import LuxuryFooter from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#FAF9F6]">
        
        {/* --- MINIMAL HERO SECTION --- */}
        <div className="relative pt-32 pb-20 px-6 border-b border-neutral-100">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-neutral-300"></div>
              <span className="text-[10px] font-bold tracking-[0.4em] text-neutral-400 uppercase italic">Concierge</span>
              <div className="h-[1px] w-8 bg-neutral-300"></div>
            </div>
            <h1 className="text-5xl md:text-8xl font-light text-neutral-900 tracking-tightest uppercase mb-8">
              Get In <span className="font-serif italic text-neutral-400">Touch</span>
            </h1>
            <p className="text-sm md:text-lg text-neutral-500 font-light leading-relaxed max-w-2xl mx-auto">
              Whether it’s a question about our solid perfumes or a corporate inquiry, our team provides a bespoke response within 24 hours.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-12 gap-20 items-start">
            
            {/* --- LEFT: CONTACT INFO (Architectural Style) --- */}
            <div className="lg:col-span-4 space-y-16">
              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-8">Contact Channels</p>
                <div className="space-y-10">
                  <div className="group">
                    <p className="text-[10px] font-bold text-neutral-900 uppercase tracking-tight mb-2">General Inquiry</p>
                    <a href="mailto:info@saaviskincare.com" className="text-lg font-light text-neutral-600 hover:text-black transition-colors block">
                      info@saaviskincare.com
                    </a>
                  </div>
                  <div className="group">
                    <p className="text-[10px] font-bold text-neutral-900 uppercase tracking-tight mb-2">Support & Assistance</p>
                    <a href="mailto:support@saaviskincare.com" className="text-lg font-light text-neutral-600 hover:text-black transition-colors block">
                      support@saaviskincare.com
                    </a>
                  </div>
                  <div className="group">
                    <p className="text-[10px] font-bold text-neutral-900 uppercase tracking-tight mb-2">Hotline</p>
                    <div className="space-y-1">
                      <a href="tel:+918448444373" className="text-lg font-light text-neutral-600 hover:text-black transition-colors block">
                        +91 8448 444 373
                      </a>
                      <a href="tel:+918800504373" className="text-lg font-light text-neutral-600 hover:text-black transition-colors block">
                        +91 8800 504 373
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-neutral-100">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-6">Social Presence</p>
                <div className="flex flex-wrap gap-6">
                  {['Instagram', 'WhatsApp', 'LinkedIn'].map((platform) => (
                    <a key={platform} href="#" className="text-xs font-medium hover:underline underline-offset-8 decoration-neutral-200 uppercase tracking-tighter transition-all">
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* --- RIGHT: FORM (Clean & Focused) --- */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.04)] border border-neutral-100">
                {!isSubmitted ? (
                  <div className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="relative group">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-focus-within:text-black transition-colors">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full py-4 bg-transparent border-b border-neutral-200 text-neutral-900 focus:outline-none focus:border-black transition-colors font-light"
                          placeholder="Ex. John Doe"
                        />
                      </div>
                      <div className="relative group">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-focus-within:text-black transition-colors">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full py-4 bg-transparent border-b border-neutral-200 text-neutral-900 focus:outline-none focus:border-black transition-colors font-light"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="relative group">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-focus-within:text-black transition-colors">Subject</label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full py-4 bg-transparent border-b border-neutral-200 text-neutral-900 focus:outline-none focus:border-black transition-colors font-light appearance-none cursor-pointer"
                        >
                          <option value="">Inquiry Type</option>
                          <option value="general">General</option>
                          <option value="order">Order Support</option>
                          <option value="corporate">Corporate Gifting</option>
                        </select>
                      </div>
                      <div className="relative group">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-focus-within:text-black transition-colors">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full py-4 bg-transparent border-b border-neutral-200 text-neutral-900 focus:outline-none focus:border-black transition-colors font-light"
                          placeholder="+91"
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-focus-within:text-black transition-colors">Your Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={4}
                        className="w-full py-4 bg-transparent border-b border-neutral-200 text-neutral-900 focus:outline-none focus:border-black transition-colors font-light resize-none"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="group flex items-center gap-4 py-5 px-10 bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-full overflow-hidden relative transition-all active:scale-95"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        Send Message <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-neutral-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                  </div>
                ) : (
                  <div className="py-12 text-center animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-light text-neutral-900 mb-2">Message Received</h3>
                    <p className="text-neutral-500 font-light italic">Our concierge will be with you shortly.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <LuxuryFooter />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
      `}</style>
    </>
  );
}