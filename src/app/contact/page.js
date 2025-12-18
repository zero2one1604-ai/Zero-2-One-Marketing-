'use client'

import React, { useState } from 'react';
import { Mail, Phone, Send, MessageCircle, Facebook, Instagram, Twitter, Linkedin, Youtube, Check, Sparkles, Headphones } from 'lucide-react';
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
    <div className="min-h-screen bg-[#F6F4EF]">
      
      <div className="relative overflow-hidden border-b border-amber-200/10">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-white to-amber-50 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&h=600&fit=crop')] bg-cover bg-center opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
      
          
          <h1 className="text-2xl md:text-7xl font-light text-[#1C1C1A] tracking-[0.25em] uppercase md:mb-6">
            Get In Touch
          </h1>
          
          <p className="text-xs md:text-xl text-[#6E6A61] font-light leading-relaxed max-w-3xl mx-auto">
            We would love to hear from you. Our team is here to answer any questions you may have.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">


        <div className="max-w-4xl mx-auto gap-12 mb-16">
          
          <div className="lg:col-span-3">
            <div className="bg-white backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-amber-200/10 shadow-2xl">
              
              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageCircle className="w-6 h-6 text-slate-700" />
                      <h2 className="text-lg md:text-3xl font-light text-[#1C1C1A] tracking-wide">
                        Send Us a Message
                      </h2>
                    </div>
                    <p className= "md:text-base text-sm text-[#6E6A61] font-light">
                      Fill out the form below and we will get back to you as soon as possible.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-black text-sm font-medium tracking-wider uppercase mb-2 block">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-white/5 border border-gray-400 rounded-lg text-black placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="text-black text-sm font-medium tracking-wider uppercase mb-2 block">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 bg-white/5 border border-gray-400 rounded-lg text-black placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-black text-sm font-medium tracking-wider uppercase mb-2 block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3 bg-white/5 border border-gray-400 rounded-lg text-black placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="text-black text-sm font-medium tracking-wider uppercase mb-2 block">
                          Subject
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-gray-400 rounded-lg text-black placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="order">Order Status</option>
                          <option value="product">Product Question</option>
                          <option value="corporate">Corporate Gifting</option>
                          <option value="feedback">Feedback</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-black text-sm font-medium tracking-wider uppercase mb-2 block">
                        Your Message *
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-400 rounded-lg text-black placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                         />
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full py-4 bg-gradient-to-br from-[#d4af37] via-[#f4e5c2] to-[#d4af37] text-[#1a1a1a] text-sm tracking-[0.15em] uppercase font-semibold rounded-lg shadow-xl shadow-black/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-700/50 hover:from-[#f0d678] hover:via-[#fff5dc] hover:to-[#f0d678] active:scale-[0.98] relative overflow-hidden border border-[#b8941f] flex items-center justify-center gap-2"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/20 pointer-events-none" />
                      <span className="relative z-10 flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Send Message
                      </span>
                    </button>

                    <p className="text-xs text-slate-700 text-center font-light">
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 animate-fadeIn">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mx-auto mb-6 animate-scaleIn">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-light text-white mb-4 tracking-wide">
                    Message Sent!
                  </h3>
                  <p className="text-amber-100/70 text-lg font-light mb-2">
                    Thank you for contacting us.
                  </p>
                  <p className="text-amber-100/60 font-light">
                    We will get back to you within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
      
        </div>

       <div className="flex flex-col mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-light text-[#1C1C1A] tracking-[0.2em] uppercase md:mb-4">
              Connect With Us
            </h2>
            <p className="text-[#6E6A61] font-light text-sm md:text-lg">
              Follow us on social media for the latest updates and exclusive offers
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center mb-16 md:space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 border-b border-amber-200/30">
              <div className="flex items-center gap-3 mb-2 md:mb-0">
                <Mail className="w-5 h-5 text-[#d4af37]" />
                <span className="text-sm text-[#6E6A61] tracking-wide uppercase font-light">General Inquiries</span>
              </div>
              <a href="mailto:info@saaviskincare.com" className="text-[#1C1C1A] hover:text-[#d4af37] transition-colors duration-300 font-light md:text-right">
                info@saaviskincare.com
              </a>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 border-b border-amber-200/30">
              <div className="flex items-center gap-3 mb-2 md:mb-0">
                <Mail className="w-5 h-5 text-[#d4af37]" />
                <span className="text-sm text-[#6E6A61] tracking-wide uppercase font-light">Customer Support</span>
              </div>
              <a href="mailto:support@saaviskincare.com" className="text-[#1C1C1A] hover:text-[#d4af37] transition-colors duration-300 font-light md:text-right">
                support@saaviskincare.com
              </a>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 border-b border-amber-200/30">
              <div className="flex items-center gap-3 mb-2 md:mb-0">
                <Phone className="w-5 h-5 text-[#d4af37]" />
                <span className="text-sm text-[#6E6A61] tracking-wide uppercase font-light">Sales Department</span>
              </div>
              <a href="tel:+918448444373" className="text-[#1C1C1A] hover:text-[#d4af37] transition-colors duration-300 font-light md:text-right">
                +91 8448 444 373
              </a>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 border-b border-amber-200/30">
              <div className="flex items-center gap-3 mb-2 md:mb-0">
                <Phone className="w-5 h-5 text-[#d4af37]" />
                <span className="text-sm text-[#6E6A61] tracking-wide uppercase font-light">Support Hotline</span>
              </div>
              <a href="tel:+918800504373" className="text-[#1C1C1A] hover:text-[#d4af37] transition-colors duration-300 font-light md:text-right">
            +91 8800 504 373
              </a>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg md:text-xl font-light text-[#1C1C1A] tracking-[0.15em] uppercase mb-8">
              Follow Us
            </h3>
            
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              <a 
                href="https://wa.me/15551234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[#6E6A61] hover:text-[#25D366] transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-light tracking-wide">WhatsApp</span>
              </a>

              <span className="text-amber-200/50">|</span>

              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[#6E6A61] hover:text-[#1877F2] transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
                <span className="text-sm font-light tracking-wide">Facebook</span>
              </a>

              <span className="text-amber-200/50">|</span>

              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[#6E6A61] hover:text-[#E4405F] transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm font-light tracking-wide">Instagram</span>
              </a>

              <span className="text-amber-200/50 hidden md:inline">|</span>

              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[#6E6A61] hover:text-[#1DA1F2] transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
                <span className="text-sm font-light tracking-wide">Twitter</span>
              </a>

              <span className="text-amber-200/50 hidden md:inline">|</span>

              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[#6E6A61] hover:text-[#0A66C2] transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-sm font-light tracking-wide">LinkedIn</span>
              </a>

              <span className="text-amber-200/50 hidden md:inline">|</span>

              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[#6E6A61] hover:text-[#FF0000] transition-colors duration-300"
              >
                <Youtube className="w-5 h-5" />
                <span className="text-sm font-light tracking-wide">YouTube</span>
              </a>
            </div>
          </div>
         
        </div>
       

      </div>

      <style>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
    <LuxuryFooter />
   </>
  );
}