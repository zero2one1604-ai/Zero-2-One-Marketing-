'use client'

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Facebook, Instagram, Twitter, Linkedin, Youtube, Check, Sparkles, Headphones } from 'lucide-react';
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

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (212) 555-1234", "+1 (212) 555-5678"],
      subtitle: "Mon-Fri, 9AM-6PM EST",
      color: "blue"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@luxeperfumes.com", "support@luxeperfumes.com"],
      subtitle: "We reply within 24 hours",
      color: "amber"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Madison Avenue", "New York, NY 10016"],
      subtitle: "Monday - Saturday, 10AM-8PM",
      color: "green"
    },
    {
      icon: Headphones,
      title: "Live Chat",
      details: ["Available 24/7"],
      subtitle: "Instant support",
      color: "purple"
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", link: "#", followers: "125K", color: "bg-blue-600" },
    { icon: Instagram, name: "Instagram", link: "#", followers: "250K", color: "bg-pink-600" },
    { icon: Twitter, name: "Twitter", link: "#", followers: "85K", color: "bg-sky-500" },
    { icon: Linkedin, name: "LinkedIn", link: "#", followers: "45K", color: "bg-blue-700" },
    { icon: Youtube, name: "YouTube", link: "#", followers: "120K", color: "bg-red-600" }
  ];

  const faqs = [
    {
      question: "What are your business hours?",
      answer: "We're open Monday through Friday, 9AM-6PM EST. Our online store is available 24/7."
    },
    {
      question: "How quickly will I receive a response?",
      answer: "We typically respond to all inquiries within 24 hours during business days."
    },
    {
      question: "Do you offer customer support in other languages?",
      answer: "Yes, we provide support in English, Spanish, and French."
    }
  ];

  return (
   <>
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1629] to-[#1a1f3a]">
      
      <div className="relative overflow-hidden border-b border-amber-200/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] to-[#1a2942] opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&h=600&fit=crop')] bg-cover bg-center opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
      
          
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-[0.25em] uppercase mb-6">
            Get In Touch
          </h1>
          
          <p className="text-xl text-amber-100/80 font-light leading-relaxed max-w-3xl mx-auto">
            We would love to hear from you. Our team is here to answer any questions you may have.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="group p-6 bg-gradient-to-b from-[#1a2540]/60 to-[#0f1629]/60 backdrop-blur-md rounded-xl border border-amber-200/10 hover:border-amber-500/30 transition-all duration-500 hover:scale-[1.02] text-center"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                info.color === 'blue' ? 'from-blue-600 to-blue-500' :
                info.color === 'amber' ? 'from-amber-600 to-amber-500' :
                info.color === 'green' ? 'from-green-600 to-green-500' :
                'from-purple-600 to-purple-500'
              } flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <info.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-lg font-medium mb-3 tracking-wide">
                {info.title}
              </h3>
              {info.details.map((detail, i) => (
                <p key={i} className="text-amber-100/80 font-light mb-1">
                  {detail}
                </p>
              ))}
              <p className="text-amber-100/50 text-sm mt-2">
                {info.subtitle}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-[#1a2540]/80 to-[#0f1629]/80 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-amber-200/10 shadow-2xl">
              
              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageCircle className="w-6 h-6 text-amber-400" />
                      <h2 className="text-3xl font-light text-white tracking-wide">
                        Send Us a Message
                      </h2>
                    </div>
                    <p className="text-amber-100/70 font-light">
                      Fill out the form below and we will get back to you as soon as possible.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-white text-sm font-medium tracking-wider uppercase mb-2 block">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-amber-100/30 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="text-white text-sm font-medium tracking-wider uppercase mb-2 block">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-amber-100/30 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-white text-sm font-medium tracking-wider uppercase mb-2 block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-amber-100/30 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="text-white text-sm font-medium tracking-wider uppercase mb-2 block">
                          Subject
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
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
                      <label className="text-white text-sm font-medium tracking-wider uppercase mb-2 block">
                        Your Message *
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-amber-100/30 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
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

                    <p className="text-xs text-amber-100/50 text-center font-light">
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
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-gradient-to-b from-[#1a2540]/60 to-[#0f1629]/60 backdrop-blur-md rounded-xl p-6 border border-amber-200/10">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl font-light text-white tracking-wide">
                  Business Hours
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
                  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
                  { day: "Sunday", hours: "Closed" }
                ].map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-amber-100/80 font-light">{schedule.day}</span>
                    <span className="text-white font-medium">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#1a2540]/60 to-[#0f1629]/60 backdrop-blur-md rounded-xl p-6 border border-amber-200/10">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl font-light text-white tracking-wide">
                  Our Location
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-amber-100/80 leading-relaxed font-light">
                  123 Madison Avenue<br />
                  Floor 5, Suite 501<br />
                  New York, NY 10016<br />
                  United States
                </p>
                <button className="w-full py-3 bg-white/10 border border-white/20 rounded-lg text-white text-sm tracking-wider uppercase font-medium hover:bg-white/20 transition-all duration-300">
                  Get Directions
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#1a2540]/60 to-[#0f1629]/60 backdrop-blur-md rounded-xl p-6 border border-amber-200/10">
              <h3 className="text-xl font-light text-white tracking-wide mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                {["FAQ", "Shipping Info", "Returns Policy", "Track Order", "Size Guide"].map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-amber-100/70 hover:text-amber-400 transition-colors duration-300 font-light py-2 hover:translate-x-2 transform transition-transform"
                  >
                    → {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-white tracking-[0.2em] uppercase mb-4">
              Connect With Us
            </h2>
            <p className="text-amber-100/70 font-light text-lg">
              Follow us on social media for the latest updates and exclusive offers
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="group relative bg-gradient-to-b from-[#1a2540] to-[#0f1629] rounded-xl overflow-hidden border border-amber-200/10 hover:border-amber-500/30 transition-all duration-500 hover:scale-[1.05] cursor-pointer p-6 text-center"
              >
                <div className={`w-16 h-16 rounded-full ${social.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <social.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white font-medium mb-2 tracking-wide">
                  {social.name}
                </h4>
                <p className="text-amber-100/60 text-sm">
                  {social.followers} followers
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
              </a>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1a2540]/80 to-[#0f1629]/80 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-amber-200/10 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-white tracking-wide mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-amber-100/70 font-light">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-amber-500/30 transition-all duration-300"
              >
                <h3 className="text-white text-lg font-medium mb-3 tracking-wide">
                  {faq.question}
                </h3>
                <p className="text-amber-100/70 font-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-amber-100/70 mb-4">
              Still have questions?
            </p>
            <button className="px-8 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-sm tracking-wider uppercase font-medium hover:bg-white/20 transition-all duration-300">
              View All FAQs
            </button>
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