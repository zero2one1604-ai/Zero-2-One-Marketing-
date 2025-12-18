// app/shop/CorporateGifting.js
'use client';

import React, { useState } from 'react';
import { Gift, Briefcase, Package, Check, ChevronRight, Users, Award, Palette, MessageSquare } from 'lucide-react';
import Image from 'next/image';

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
      price: "Starting at ₹3,750",
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
      price: "Starting at ₹2,375",
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
      price: "Starting at ₹6,250",
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
    <div className="min-h-screen bg-[#F6F4EF]">
      
      <div className="relative overflow-hidden border-b hidden border-amber-200/10">
        <div className="absolute inset-0 bg-amber-50 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464566558090-22f750fec8b2?w=1600&h=600&fit=crop')] bg-cover bg-center opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 text-center">
          <h1 className="text-2xl the-seasons sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#3D2F1F] tracking-[0.2em] sm:tracking-[0.25em] uppercase md:mb-4 sm:mb-6">
            Corporate Gifting
          </h1>
          
          <p className="text-xs sm:text-lg lg:text-xl text-[#6E6A61] font-light leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8 px-20 md:px-4 sm:px-0">
            Elevate your corporate relationships with bespoke fragrance gifts that leave a lasting impression
          </p>

          <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-8 md:pt-6 sm:pt-8">
            <div className="text-center">
              <div className="text-sm md:text-4xl font-light text-amber-900 md:not-[]:mb-2">500+</div>
              <p className="text-[#3D2F1F] text-[8px] md:text-sm tracking-wider uppercase">Companies Trust Us</p>
            </div>
            <div className="hidden sm:block h-12 sm:h-16 w-px bg-amber-600" />
            <div className="text-center">
              <div className="text-sm md:text-4xl font-light text-amber-900 md:mb-2">10K+</div>
              <p className="text-[#3D2F1F] text-[8px] md:text-sm tracking-wider uppercase">Gifts Delivered</p>
            </div>
            <div className="hidden sm:block h-12 sm:h-16 w-px bg-amber-600" />
            <div className="text-center">
              <div className="text-sm md:text-4xl font-light text-amber-900 md:mb-2">98%</div>
              <p className="text-[#3D2F1F] text-[8px] md:text-sm tracking-wider uppercase">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
        
        <div className="mb-12 hidden sm:mb-16 lg:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl the-seasons md:text-4xl font-light text-[#3D2F1F] tracking-[0.15em] sm:tracking-[0.2em] uppercase md:not-first:mb-3 sm:mb-4">
              Gifting Packages
            </h2>
            <p className="text-[#6E6A61] text-xs md:text-base lg:text-lg font-light px-4 sm:px-0">
              Choose the perfect package for your corporate needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
                  selectedPackage === pkg.id
                    ? 'border-amber-500 shadow-2xl shadow-amber-500/30'
                    : 'border-amber-200/10 hover:border-amber-500/30'
                }`}
              >
                {selectedPackage === pkg.id && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-7 h-7 sm:w-8 sm:h-8 bg-amber-500 rounded-full flex items-center justify-center animate-scaleIn">
                    <Check className="w-3 h-3 md:w-5 md:h-5 text-white" />
                  </div>
                )}

                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1629] via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center shadow-lg">
                      <pkg.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-2 sm:space-y-4">
                  <div>
                    <h3 className="text-sm md:text-2xl font-light text-black tracking-wide md:mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-amber-900 text-xs md:text-lg font-light mb-2 sm:mb-3">
                      {pkg.price}
                    </p>
                    <p className="text-[#6E6A61] text-xs sm:text-sm font-light leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  <ul className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-amber-200/10">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-black font-light">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-amber-900 flex-shrink-0 mt-0.5" />
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

        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl the-seasons lg:text-4xl font-light text-[#3D2F1F] tracking-[0.15em] sm:tracking-[0.2em] uppercase md:mb-3 sm:mb-4">
              Customization Options
            </h2>
            <p className="text-[#6E6A61] text-xs sm:text-base lg:text-lg font-light px-4 sm:px-0">
              Make every gift uniquely yours
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {customizationOptions.map((option, index) => (
              <div
                key={index}
                className="group p-5 sm:p-6 bg-white backdrop-blur-md rounded-xl border border-amber-200/10 hover:border-amber-500/30 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="w-12 h-12 mx-auto sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <option.icon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600" />
                </div>
                <h3 className="text-[#3D2F1F] text-center text-sm md:text-lg font-medium md:mb-2 tracking-wide">
                  {option.title}
                </h3>
                <p className="text-[#6E6A61] text-center text-xs md:text-sm font-light leading-relaxed">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      <div className="bg-white backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 border border-neutral-200 shadow-2xl">
  <div className="max-w-3xl mx-auto">
    {!isSubmitted ? (
      <>
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl the-seasons sm:text-3xl font-light text-[#3D2F1F] tracking-[0.15em] sm:tracking-[0.2em] uppercase md:mb-3 sm:mb-4">
            Request a Quote
          </h2>
          <p className="text-[#6B655C] text-xs md:text-base font-light px-4 sm:px-0">
            Our gifting specialists will contact you within 24 hours
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="text-[#2A2722] text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 block">
                Your Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Type your full name here..."
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#FAFAFA] border border-neutral-300 rounded-lg text-[#1E1C18] placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-neutral-400 transition-all duration-300"
              />
            </div>

            <div>
              <label className="text-[#2A2722] text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 block">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="abc@company.com"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#FAFAFA] border border-neutral-300 rounded-lg text-[#1E1C18] placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-neutral-400 transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="text-[#2A2722] text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 block">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Your Company"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#FAFAFA] border border-neutral-300 rounded-lg text-[#1E1C18] placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-neutral-400 transition-all duration-300"
              />
            </div>

            <div>
              <label className="text-[#2A2722] text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 block">
                Estimated Quantity
              </label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="50-100 units"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#FAFAFA] border border-neutral-300 rounded-lg text-[#1E1C18] placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-neutral-400 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="text-[#2A2722] text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 block">
              Tell Us About Your Project
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Share details about your gifting needs, timeline, and any specific requirements..."
              rows={5}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#FAFAFA] border border-neutral-300 rounded-lg text-[#1E1C18] placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-neutral-400 transition-all duration-300 resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 sm:py-4 cursor-pointer bg-gradient-to-br from-[#C9A43B] via-[#F1DB8A] to-[#9C7A22] text-[#1A1405] text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.15em] uppercase font-semibold rounded-lg shadow-xl shadow-black/40 transition-all duration-300 hover:shadow-2xl active:scale-[0.98] relative overflow-hidden border border-[#8F7220] flex items-center justify-center gap-2"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-black/25 pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2">
              Submit Request
              <ChevronRight className="w-4 h-4" />
            </span>
          </button>

          <p className="text-[10px] sm:text-xs text-[#8C867C] text-center font-light">
            By submitting, you agree to our privacy policy and terms of service
          </p>
        </div>
      </>
    ) : (
      <div className="text-center py-8 sm:py-12 animate-fadeIn">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-scaleIn">
          <Check className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-light text-[#1E1C18] mb-3 sm:mb-4 tracking-wide">
          Thank You!
        </h3>
        <p className="text-[#6F6A60] text-base sm:text-lg font-light px-4 sm:px-0">
          We have received your request and will contact you shortly.
        </p>
      </div>
    )}
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
  );
}