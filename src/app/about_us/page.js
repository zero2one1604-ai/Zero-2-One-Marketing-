'use client'

import React, { useState } from 'react';
import { Heart, Globe, Users, Award, Leaf, HandHeart, Package, Target, Shield } from 'lucide-react';
import Image from 'next/image';
import LuxuryFooter from '../components/Footer';
export default function AboutUsPage() {
  const [activeValue, setActiveValue] = useState(0);

  const values = [
    {
      icon: Package,
      title: "Small Batch Craftsmanship",
      description: "Every fragrance is meticulously crafted in limited quantities to ensure uncompromising quality and attention to detail."
    },
    {
      icon: HandHeart,
      title: "Handcrafted Excellence",
      description: "Our artisans pour their expertise and passion into each bottle, creating fragrances that are truly one-of-a-kind."
    },
    {
      icon: Users,
      title: "Women Empowerment",
      description: "We are committed to empowering women in our workforce and communities, creating opportunities for growth and leadership."
    },
    {
      icon: Award,
      title: "Premium Raw Materials",
      description: "We source only the finest natural ingredients from sustainable suppliers around the world."
    },
    {
      icon: Heart,
      title: "Personal Touch",
      description: "From formulation to packaging, every step carries the care and dedication of our family-run business."
    },
    {
      icon: Shield,
      title: "Dedicated Team",
      description: "Our passionate team shares a common vision: creating fragrances that transform everyday moments into extraordinary experiences."
    }
  ];

  const timeline = [
    { year: "2015", event: "A Family Solution", description: "Founded out of a personal need to address family skin sensitivities" },
    { year: "2017", event: "First Collection", description: "Launched our signature solid perfume line, safe for all skin types" },
    { year: "2019", event: "Growing Recognition", description: "Featured in major lifestyle publications for our child-friendly formulas" },
    { year: "2022", event: "Sustainable Commitment", description: "Achieved zero-waste packaging and carbon-neutral operations" },
    { year: "2024", event: "Global Expansion", description: "Now serving customers in 45+ countries worldwide" }
  ];

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1629] to-[#1a1f3a]">
      
      <div className="relative overflow-hidden border-b border-amber-200/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] to-[#1a2942] opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&h=600&fit=crop')] bg-cover bg-center opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-32 text-center">
          <Image
            src="/images/saavi_about_logo.png"
            alt="About Us"
            width={800}
            height={400}
            className="mx-auto mb-6 w-70 h-40"
          />

          <div className='w-[20%] mb-4 mx-auto h-1 rounded-4xl bg-gradient-to-l from-amber-100/80 via-amber-100 to-amber-100/80'></div>
          
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-[0.25em] uppercase mb-6">
            Our Story
          </h1>
          
          <p className="text-2xl text-amber-100/80 font-light leading-relaxed max-w-3xl mx-auto italic">
            Born from love, crafted with care, shared with the world
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">

        <div className="py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=1000&fit=crop"
                  alt="Our Story"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
              </div>
              
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-[#d4af37] via-[#f4e5c2] to-[#d4af37] p-8 rounded-xl shadow-2xl border border-[#b8941f]">
                <div className="relative">
                  <div className="relative z-10">
                    <div className="text-4xl font-light text-[#1a1a1a] mb-2">2015</div>
                    <p className="text-sm text-[#1a1a1a] tracking-wider uppercase font-semibold">Founded</p>
                  </div>
                 
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="inline-block mb-6">
                  <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6 text-amber-400" />
                    <span className="text-amber-300 text-sm tracking-[0.2em] uppercase font-medium">Brand Story</span>
                  </div>
                </div>
                
                <h2 className="text-4xl font-light text-white tracking-wide mb-6">
                  A Journey Born from <span className="text-amber-400">Love</span>
                </h2>
              </div>

              <div className="space-y-6 text-amber-100/80 leading-relaxed font-light text-lg">
                <p>
                  Our story began not in a laboratory or boardroom, but in a home filled with love and concern. As a family passionate about skincare, we found ourselves facing a challenge that many families encounter—sensitive skin that reacted to conventional fragrances.
                </p>
                
                <p>
                  When our children developed skin sensitivities, we knew we had to find a better solution. The market offered few options that were both luxurious and truly safe for delicate skin. So, we decided to create our own.
                </p>

                <p>
                  What started as a personal quest to protect our family became our life&apos;s mission. We spent countless hours researching, testing, and perfecting formulas that would be gentle enough for children yet sophisticated enough for adults.
                </p>

                <p>
                  Every product we create is one we use personally with our own families. This is not just business, it is personal. We understand that when you choose our fragrances, you are trusting us with the people you love most.
                </p>
              </div>

              <div className="pt-6">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-500/10 border border-amber-500/30 rounded-full">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-300 text-sm tracking-wider uppercase font-medium">
                    Family-Safe • Child-Friendly • Personally Tested
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-24 border-t border-amber-200/10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-amber-400" />
              <span className="text-amber-300 text-sm tracking-[0.2em] uppercase font-medium">Our Mission</span>
            </div>
            
            <h2 className="text-5xl font-light text-white tracking-[0.2em] uppercase mb-8">
              Going Global
            </h2>
            
            <p className="text-xl text-amber-100/80 font-light leading-relaxed max-w-4xl mx-auto">
              To become the world&apos;s most trusted luxury fragrance brand by making safe, sophisticated scents accessible to families everywhere, transforming the way people experience fragrance.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1a2540]/80 to-[#0f1629]/80 backdrop-blur-xl rounded-2xl p-12 border border-amber-200/10 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center mx-auto shadow-lg">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="text-5xl font-light text-amber-400 mb-2">45+</div>
                  <p className="text-amber-100/70 tracking-wider uppercase text-sm">Countries Served</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center mx-auto shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="text-5xl font-light text-amber-400 mb-2">50K+</div>
                  <p className="text-amber-100/70 tracking-wider uppercase text-sm">Happy Families</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center mx-auto shadow-lg">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="text-5xl font-light text-amber-400 mb-2">100+</div>
                  <p className="text-amber-100/70 tracking-wider uppercase text-sm">Countries by 2030</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-24 border-t border-amber-200/10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-amber-400" />
              <span className="text-amber-300 text-sm tracking-[0.2em] uppercase font-medium">Our Values</span>
            </div>
            
            <h2 className="text-5xl font-light text-white tracking-[0.2em] uppercase mb-8">
              What We Stand For
            </h2>
            
            <p className="text-xl text-amber-100/80 font-light leading-relaxed max-w-3xl mx-auto">
              Our values are not just words on a wall, they are the principles that guide every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveValue(index)}
                className={`group p-8 bg-gradient-to-b from-[#1a2540]/60 to-[#0f1629]/60 backdrop-blur-md rounded-2xl border transition-all duration-500 hover:scale-[1.02] cursor-pointer ${
                  activeValue === index
                    ? 'border-amber-500 shadow-2xl shadow-amber-500/20'
                    : 'border-amber-200/10 hover:border-amber-500/30'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                  activeValue === index
                    ? 'bg-gradient-to-br from-amber-600 to-amber-500 scale-110'
                    : 'bg-gradient-to-br from-amber-50 to-amber-100'
                }`}>
                  <value.icon className={`w-8 h-8 transition-colors duration-300 ${
                    activeValue === index ? 'text-white' : 'text-amber-600'
                  }`} />
                </div>

                <h3 className="text-white text-xl font-medium mb-3 tracking-wide">
                  {value.title}
                </h3>
                
                <p className="text-amber-100/70 font-light leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-24 border-t border-amber-200/10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light text-white tracking-[0.2em] uppercase mb-8">
              Our Journey
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-amber-500/50 via-amber-500 to-amber-500/50" />

            <div className="space-y-16">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="inline-block bg-gradient-to-b from-[#1a2540] to-[#0f1629] p-6 rounded-xl border border-amber-200/10 hover:border-amber-500/30 transition-all duration-300 hover:scale-[1.02]">
                      <div className="text-3xl font-light text-amber-400 mb-2">{item.year}</div>
                      <h4 className="text-white text-lg font-medium mb-2">{item.event}</h4>
                      <p className="text-amber-100/70 text-sm font-light">{item.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-600 to-amber-500 border-4 border-[#0f1629] shadow-lg" />
                  </div>

                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="py-24 border-t border-amber-200/10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <Leaf className="w-6 h-6 text-green-400" />
                  <span className="text-green-300 text-sm tracking-[0.2em] uppercase font-medium">Sustainability</span>
                </div>
                
                <h2 className="text-4xl font-light text-white tracking-wide mb-6">
                  Our Commitment to the <span className="text-green-400">Planet</span>
                </h2>
              </div>

              <div className="space-y-6 text-amber-100/80 leading-relaxed font-light text-lg">
                <p>
                  We believe that luxury and sustainability are not mutually exclusive. In fact, we see environmental responsibility as the ultimate luxury—caring for the planet we all call home.
                </p>
                
                <p>
                  Our commitment extends beyond just creating beautiful fragrances. We have implemented comprehensive sustainability practices across every aspect of our business.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                {[
                  { label: "Zero-Waste Packaging", status: "Achieved 2022" },
                  { label: "Carbon-Neutral Operations", status: "Achieved 2022" },
                  { label: "Sustainable Ingredient Sourcing", status: "100% Compliant" },
                  { label: "Recyclable Materials", status: "100% Usage" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                    <span className="text-white font-light">{item.label}</span>
                    <span className="text-green-400 text-sm tracking-wider uppercase font-medium">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=1000&fit=crop"
                  alt="Sustainability"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                    <p className="text-white text-lg font-light italic leading-relaxed">
                      "Every bottle we create is a step towards a more beautiful, sustainable future."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <LuxuryFooter/>
    </>
  );
}