'use client'

import React, { useState } from 'react';
import { Gift, Briefcase, Package, Sparkles, Check, ChevronRight, Users, Award, Palette, MessageSquare } from 'lucide-react';

export default function CorporateGifting() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    quantity: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const packages = [
    {
      id: 1,
      name: "Executive Collection",
      price: "Starting at $150",
      icon: Briefcase,
      description: "Premium selection for corporate leadership",
      features: [
        "Minimum order: 25 units",
        "Custom branded packaging",
        "Personalized gift cards",
        "Priority production",
        "Dedicated account manager"
      ],
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Team Celebration",
      price: "Starting at $95",
      icon: Users,
      description: "Perfect for employee appreciation",
      features: [
        "Minimum order: 50 units",
        "Multiple fragrance options",
        "Elegant gift wrapping",
        "Custom thank you notes",
        "Flexible delivery scheduling"
      ],
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Prestige Experience",
      price: "Starting at $250",
      icon: Award,
      description: "Ultimate luxury for special occasions",
      features: [
        "Minimum order: 10 units",
        "Bespoke fragrance selection",
        "Premium gift boxes",
        "Handwritten messages",
        "White glove delivery service"
      ],
      image: "https://images.unsplash.com/photo-1603400521630-9f2de124b33b?w=600&h=400&fit=crop"
    }
  ];

  const customizationOptions = [
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Add your company logo to packaging and products"
    },
    {
      icon: MessageSquare,
      title: "Personalized Messages",
      description: "Include custom notes with each gift"
    },
    {
      icon: Package,
      title: "Luxury Packaging",
      description: "Choose from our premium packaging options"
    },
    {
      icon: Gift,
      title: "Curated Selection",
      description: "We will help you choose the perfect fragrances"
    }
  ];

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.company) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', company: '', quantity: '', message: '' });
        setSelectedPackage(null);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1629] to-[#1a1f3a]">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-amber-200/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] to-[#1a2942] opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464566558090-22f750fec8b2?w=1600&h=600&fit=crop')] bg-cover bg-center opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
         
          
          <h1 className="text-5xl md:text-6xl font-light text-white tracking-[0.25em] uppercase mb-6">
            Corporate Gifting
          </h1>
          
          <p className="text-xl text-amber-100/80 font-light leading-relaxed max-w-3xl mx-auto mb-8">
            Elevate your corporate relationships with bespoke fragrance gifts that leave a lasting impression
          </p>

          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-4xl font-light text-amber-400 mb-2">500+</div>
              <p className="text-amber-100/60 text-sm tracking-wider uppercase">Companies Trust Us</p>
            </div>
            <div className="h-16 w-px bg-amber-200/20" />
            <div className="text-center">
              <div className="text-4xl font-light text-amber-400 mb-2">10K+</div>
              <p className="text-amber-100/60 text-sm tracking-wider uppercase">Gifts Delivered</p>
            </div>
            <div className="h-16 w-px bg-amber-200/20" />
            <div className="text-center">
              <div className="text-4xl font-light text-amber-400 mb-2">98%</div>
              <p className="text-amber-100/60 text-sm tracking-wider uppercase">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        
        {/* Packages Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-white tracking-[0.2em] uppercase mb-4">
              Gifting Packages
            </h2>
            <p className="text-amber-100/70 text-lg font-light">
              Choose the perfect package for your corporate needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`group relative bg-gradient-to-b from-[#1a2540] to-[#0f1629] rounded-2xl overflow-hidden border cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
                  selectedPackage === pkg.id
                    ? 'border-amber-500 shadow-2xl shadow-amber-500/30'
                    : 'border-amber-200/10 hover:border-amber-500/30'
                }`}
              >
                {/* Selected Badge */}
                {selectedPackage === pkg.id && (
                  <div className="absolute top-4 right-4 z-10 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center animate-scaleIn">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1629] via-transparent to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center shadow-lg">
                      <pkg.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-light text-white tracking-wide mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-amber-300 text-lg font-light mb-3">
                      {pkg.price}
                    </p>
                    <p className="text-amber-100/60 text-sm font-light leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 pt-4 border-t border-amber-200/10">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-amber-100/70 font-light">
                        <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-white tracking-[0.2em] uppercase mb-4">
              Customization Options
            </h2>
            <p className="text-amber-100/70 text-lg font-light">
              Make every gift uniquely yours
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customizationOptions.map((option, index) => (
              <div
                key={index}
                className="group p-6 bg-gradient-to-b from-[#1a2540]/60 to-[#0f1629]/60 backdrop-blur-md rounded-xl border border-amber-200/10 hover:border-amber-500/30 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <option.icon className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-white text-lg font-medium mb-2 tracking-wide">
                  {option.title}
                </h3>
                <p className="text-amber-100/60 text-sm font-light leading-relaxed">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gradient-to-br from-[#1a2540]/80 to-[#0f1629]/80 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-amber-200/10 shadow-2xl">
          <div className="max-w-3xl mx-auto">
            
            {!isSubmitted ? (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-light text-white tracking-[0.2em] uppercase mb-4">
                    Request a Quote
                  </h2>
                  <p className="text-amber-100/70 font-light">
                    Our gifting specialists will contact you within 24 hours
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
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-amber-100/30 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-white text-sm font-medium tracking-wider uppercase mb-2 block">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        placeholder="Your Company"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-amber-100/30 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="text-white text-sm font-medium tracking-wider uppercase mb-2 block">
                        Estimated Quantity
                      </label>
                      <input
                        type="text"
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                        placeholder="50-100 units"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-amber-100/30 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium tracking-wider uppercase mb-2 block">
                      Tell Us About Your Project
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Share details about your gifting needs, timeline, and any specific requirements..."
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-amber-100/30 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full py-4 cursor-pointer bg-gradient-to-br from-[#d4af37] via-[#f4e5c2] to-[#d4af37] text-[#1a1a1a] text-sm tracking-[0.15em] uppercase font-semibold rounded-lg shadow-xl shadow-black/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-700/50 hover:from-[#f0d678] hover:via-[#fff5dc] hover:to-[#f0d678] active:scale-[0.98] relative overflow-hidden border border-[#b8941f] flex items-center justify-center gap-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/20 pointer-events-none" />
                    <span className="relative z-10 flex items-center gap-2">
                      Submit Request
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </button>

                  <p className="text-xs text-amber-100/50 text-center font-light">
                    By submitting, you agree to our privacy policy and terms of service
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-12 animate-fadeIn">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mx-auto mb-6 animate-scaleIn">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-light text-white mb-4 tracking-wide">
                  Thank You!
                </h3>
                <p className="text-amber-100/70 text-lg font-light">
                  We have received your request and will contact you shortly.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Volume Discounts",
              description: "Special pricing for bulk orders starting at 25 units"
            },
            {
              title: "Fast Turnaround",
              description: "Most orders ready within 2-3 weeks from approval"
            },
            {
              title: "Dedicated Support",
              description: "Personal account manager for all your gifting needs"
            }
          ].map((item, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:border-amber-500/30 transition-all duration-300"
            >
              <h3 className="text-white text-xl font-medium mb-3 tracking-wide">
                {item.title}
              </h3>
              <p className="text-amber-100/60 font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
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
  );
}