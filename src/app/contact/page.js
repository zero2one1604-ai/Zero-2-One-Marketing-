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
      <div className="min-h-screen pb-10 bg-[#FAF9F6]">
        
        <div className="relative pt-10  md:pt-32 mb-10 md:pb-20 px-6 border-b border-neutral-100">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-2 md:mb-6">
              <div className="h-[1px] w-8 bg-neutral-300"></div>
              <span className= "text-[8px] md:text-[10px] font-bold tracking-[0.4em] text-neutral-400 uppercase italic">Concierge</span>
              <div className="h-[1px] w-8 bg-neutral-300"></div>
            </div>
            <h1 className="text-2xl md:text-8xl font-light text-neutral-900 tracking-tightest uppercase mb-2 md:mb-8">
              Get In <span className="font-serif italic text-neutral-400">Touch</span>
            </h1>
            <p className="text-xs md:text-lg text-neutral-500 font-light leading-relaxed max-w-2xl mx-auto">
              Whether it is a question about our solid perfumes or a corporate inquiry, our team provides a bespoke response within 24 hours.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:py-20">
          <div className="grid lg:grid-cols-12 md:gap-20 items-start">
            
            <div className="lg:col-span-4 md:space-y-16">
              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-8">Contact Channels</p>
                <div className="md:space-y-10 space-y-5">
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

             <div className="pt-10 border-t mb-10 border-neutral-100">
  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 md:mb-6">Social Presence</p>
  <div className="flex flex-wrap gap-8 items-center">
    
    {/* Instagram */}
    <a href="#" className="group transition-all duration-300 transform hover:scale-110" aria-label="Instagram">
      <svg className="w-5 h-5 text-neutral-400 group-hover:text-[#E4405F] transition-colors" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    </a>

    {/* WhatsApp */}
    <a href="#" className="group transition-all duration-300 transform hover:scale-110" aria-label="WhatsApp">
      <svg className="w-5 h-5 text-neutral-400 group-hover:text-[#25D366] transition-colors" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.589.943 3.385 1.44 5.216 1.441 5.399 0 9.794-4.395 9.796-9.796.001-2.615-1.017-5.074-2.868-6.927s-4.312-2.871-6.927-2.871c-5.402 0-9.798 4.396-9.8 9.798-.001 1.838.482 3.633 1.397 5.215l1.091 1.888-1.013 3.698 3.791-.994 1.313.778zm10.592-7.145c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.199.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.371-.025-.52-.075-.148-.67-1.611-.917-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.273-.198-.57-.347z"/>
      </svg>
    </a>

    {/* LinkedIn */}
    <a href="#" className="group transition-all duration-300 transform hover:scale-110" aria-label="LinkedIn">
      <svg className="w-5 h-5 text-neutral-400 group-hover:text-[#0A66C2] transition-colors" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    </a>

  </div>
</div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-white rounded-[1rem] p-5 md:p-16 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.04)] border border-neutral-100">
                {!isSubmitted ? (
                  <div className="space-y-2 md:space-y-10">
                    <div className="grid md:grid-cols-2 gap-4 md:gap-10">
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

                    <div className="grid md:grid-cols-2 gap-4 md:gap-10">
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
                      className="group flex md:mx-0 cursor-pointer mx-auto items-center gap-4 md:py-5 py-2 px-6 md:px-10 bg-black text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] rounded-full overflow-hidden relative transition-all active:scale-95"
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
                    <p className="text-neutral-500 font-light italic">Our team will be with you shortly.</p>
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