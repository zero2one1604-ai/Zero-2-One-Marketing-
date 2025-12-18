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
      <div className="min-h-screen bg-[#F6F4EF]">
        
        <header className="relative overflow-hidden border-b border-amber-200/10">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-white to-amber-50 opacity-90" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&h=600&fit=crop')] bg-cover bg-center opacity-20" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 text-center">
            <Image
              src="/images/logo.png"
              alt="Saavi Perfumes - About Us"
              width={800}
              height={400}
              className="mx-auto mb-4 w-fit h-20 md:w-70 md:h-fit"
              priority
            />

            <div className="w-1/2 sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4 mx-auto h-0.5 sm:h-1 rounded-full bg-gradient-to-l from-amber-100/80 via-amber-100 to-amber-100/80" />
            
            <h1 className="text-2xl md:text-5xl the-seasons lg:text-6xl xl:text-7xl font-light text-[#1C1C1A] tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] uppercase mb-4 sm:mb-6">
              Our Story
            </h1>
            
            <p className="text-sm md:text-2xl text-[#6E6A61] font-light leading-relaxed max-w-3xl mx-auto italic px-20 md:px-4">
              Born from love, crafted with care, shared with the world
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <section className="py-12 sm:py-16 md:py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              
              <div className="relative order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/savicover.jpg"
                    alt="Saavi Perfumes Story - Family Business Since 2015"
                    width={800}
                    height={600}
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
                </div>
                
              </div>

              <div className="sm:space-y-8 order-1 lg:order-2">
                <div className='flex flex-col'>
                  <div className="inline-block mb-2 md:mb-4 mx-auto md:mx-0 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-amber-900" />
                      <span className="text-amber-900 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium">Brand Story</span>
                    </div>
                  </div>

                  <h2 className="text-lg text-center md:text-left md:text-4xl font-light text-[#1C1C1A] tracking-wide mb-4 sm:mb-6">
                    A Journey Born from <span className="text-amber-900">Love</span>
                  </h2>
                </div>

                <div className="space-y-4 sm:space-y-6 text-[#1C1C1A] leading-relaxed font-light text-justify text-base sm:text-lg">
                  <p>
                   The journey began at home - an unforced desire to care for the family’s skin concerns. The solution
which was used for treating personal skin problems swiftly unfolded into a brand intrenched in trust
and truth. Each of our product, we create has been personally used and believe to be lovingly
prepared, examined by the family which further has been introduced with the outside world. From
us to your home, we got you a delicate, efficient skincare which has been made with love and care.
Our simple belief is that skincare should be easy, reliable and focus should be towards care. The
articulations regard to the product are prepared in such small batches and being careful about the
ingredients which specifically helps the skin to nourish, restore and protect. Each of our product
hydrating creams to solid perfumes, each one of them has been designed in a way that are skin
friendly and safe to be used by the whole family. </p>
                </div>

                <div className="pt-4 sm:pt-6">
                  <div className="inline-flex items-center gap-2 sm:gap-3 px-2 sm:px-6 py-1 sm:py-3 bg-amber-800/30 border border-amber-500 rounded-full">
                    <Shield className="w-3 h-3 sm:w-5 sm:h-5 text-amber-900 flex-shrink-0" />
                    <span className="text-amber-900 text-[8px] sm:text-sm tracking-wider uppercase font-medium">
                      Family-Safe • Child-Friendly • Personally Tested
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 sm:py-16 md:py-20 lg:py-24 border-t border-gray-900">
            <div className="text-center mb-4 sm:mb-16">
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-amber-900" />
                <span className="text-amber-900 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium">Our Mission</span>
              </div>
              
              <h2 className="text-2xl the-seasons sm:text-4xl md:text-5xl font-light text-[#1C1C1A] tracking-[0.15em] sm:tracking-[0.2em] uppercase md:mb-6 sm:mb-8 px-4">
                Going Global
              </h2>
              
              <p className="text-xs sm:text-lg md:text-xl text-[#6E6A61] font-light leading-relaxed max-w-4xl mx-auto px-4">
                To become the world&apos;s most trusted luxury fragrance brand by making safe, sophisticated scents accessible to families everywhere, transforming the way people experience fragrance.
              </p>
            </div>

            <div className="bg-white backdrop-blur-xl rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border border-amber-200/10 shadow-2xl">
              <div className="grid grid-cols-3 sm:gap-8 text-center">
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-900 to-amber-800 flex items-center justify-center mx-auto shadow-lg">
                    <Globe className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-4xl md:text-5xl font-light text-[#1C1C1A] md:mb-2">45+</div>
                    <p className="text-[#6E6A61] tracking-wider uppercase text-[8px] sm:text-sm">Countries Served</p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-900 to-amber-800 flex items-center justify-center mx-auto shadow-lg">
                    <Users className="w-6` h-6 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-4xl md:text-5xl font-light text-[#1C1C1A] md:mb-2">50K+</div>
                    <p className="text-[#6E6A61] tracking-wider uppercase text-[8px] sm:text-sm">Happy Families</p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-900 to-amber-800 flex items-center justify-center mx-auto shadow-lg">
                    <Target className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-4xl md:text-5xl font-light text-[#1C1C1A] md:mb-2">100+</div>
                    <p className="text-[#6E6A61] tracking-wider uppercase text-[8px] sm:text-sm">Countries by 2030</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 sm:py-16 md:py-20 lg:py-24 border-t border-gray-900">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-900" />
                <span className="text-amber-900 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium">Our Values</span>
              </div>
              
              <h2 className="text-2xl the-seasons sm:text-4xl md:text-5xl font-light text-[#1C1C1A] tracking-[0.15em] sm:tracking-[0.2em] uppercase sm:mb-8 px-4">
                What We Stand For
              </h2>
              
              <p className="text-xs sm:text-lg md:text-xl text-[#6E6A61] font-light leading-relaxed max-w-3xl mx-auto px-4">
                Our values are not just words on a wall, they are the principles that guide every decision we make.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 lg:gap-8">
              {values.map((value, index) => (
                <article
                  key={index}
                  onMouseEnter={() => setActiveValue(index)}
                  className={`group p-3 sm:p-8 bg-white backdrop-blur-md rounded-2xl border transition-all duration-500 hover:scale-[1.02] cursor-pointer ${
                    activeValue === index
                      ? 'border-gray-500 shadow-2xl shadow-amber-500/20'
                      : 'border-amber-200/10 hover:border-amber-500/30'
                  }`}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 ${
                    activeValue === index
                      ? 'bg-gradient-to-br from-amber-800 to-amber-900 scale-110'
                      : 'bg-gradient-to-br from-amber-50 to-amber-100'
                  }`}>
                    <value.icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-colors duration-300 ${
                      activeValue === index ? 'text-white' : 'text-amber-900'
                    }`} />
                  </div>

                  <h3 className="text-[#1C1C1A] text-sm sm:text-xl font-medium mb-2 sm:mb-3 tracking-wide">
                    {value.title}
                  </h3>

                  <p className="text-[#6E6A61] font-light leading-relaxed text-xs sm:text-base">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="py-12 sm:py-16 md:py-20 lg:py-24 border-t border-gray-900">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl the-seasons sm:text-4xl md:text-5xl font-light text-[#1C1C1A] tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-6 sm:mb-8 px-4">
                Our Journey
              </h2>
            </div>

            <div className="relative">

              <div className="hidden md:block">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-amber-800 via-amber-500 to-amber-900" />

                <div className="space-y-12 lg:space-y-16">
                  {timeline.map((item, index) => (
                    <div key={index} className={`flex items-center gap-6 lg:gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <div className="inline-block bg-white p-4 sm:p-6 rounded-xl border border-amber-200/10 hover:border-amber-500/30 transition-all duration-300 hover:scale-[1.02]">
                          <time className="text-2xl sm:text-3xl font-light text-amber-900 mb-2 block">{item.year}</time>
                          <h3 className="text-[#1C1C1A] text-base sm:text-lg font-medium mb-2">{item.event}</h3>
                          <p className="text-[#6E6A61] text-sm font-light">{item.description}</p>
                        </div>
                      </div>
                      <div className="relative z-10">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-amber-900 to-amber-800 border-2 border-[#0f1629] shadow-lg" />
                      </div>
                      <div className="flex-1" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:hidden space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="relative pl-8">
                    <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-gradient-to-br from-amber-900 to-amber-800 border-2 border-[#0f1629] shadow-lg" />
                    {index < timeline.length - 1 && (
                      <div className="absolute left-2.5 top-5 w-px h-full bg-amber-500/50" />
                    )}
                    <div className="bg-white p-4 rounded-xl border border-amber-200/10">
                      <time className="text-lg font-light text-amber-900 mb-2 block">{item.year}</time>
                      <h3 className="text-[#1C1C1A] text-sm font-medium mb-2">{item.event}</h3>
                      <p className="text-[#6E6A61] text-xs font-light">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 sm:py-16 md:py-20 lg:py-24 border-t border-gray-900">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              
              <div className="sm:space-y-8 order-2 lg:order-1">
                <div className='flex flex-col'>
                  <div className="inline-flex items-center mx-auto gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-green-700" />
                    <span className="text-green-700 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium">Sustainability</span>
                  </div>
                  
                  <h2 className="text-2xl the-seasons text-center sm:text-3xl md:text-4xl font-light text-[#1C1C1A] tracking-wide mb-4 sm:mb-6">
                    Our Commitment to the <span className="text-green-700">Planet</span>
                  </h2>
                </div>

                <div className="space-y-4 sm:space-y-6 text-[#1C1C1A] leading-relaxed font-light text-sm sm:text-lg">
                  <p>
                    We believe that luxury and sustainability are not mutually exclusive. In fact, we see environmental responsibility as the ultimate luxury—caring for the planet we all call home.
                  </p>
                  
                  <p>
                    Our commitment extends beyond just creating beautiful fragrances. We have implemented comprehensive sustainability practices across every aspect of our business.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4 pt-4">
                  {[
                    { label: "Zero-Waste Packaging", status: "Achieved 2022" },
                    { label: "Carbon-Neutral Operations", status: "Achieved 2022" },
                    { label: "Sustainable Ingredient Sourcing", status: "100% Compliant" },
                    { label: "Recyclable Materials", status: "100% Usage" }
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 sm:p-4 bg-white/5 rounded-lg border border-green-700 hover:border-green-500/40 transition-all duration-300">
                      <span className="text-amber-900 font-light text-sm sm:text-base">{item.label}</span>
                      <span className="text-green-700 text-xs sm:text-sm tracking-wider uppercase font-medium">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=1000&fit=crop"
                    alt="Sustainable Fragrance Production - Eco-Friendly Practices"
                    width={800}
                    height={1000}
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8">
                    <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-white/20">
                      <p className="text-white text-sm sm:text-base md:text-lg font-light italic leading-relaxed">
                        &quot;Every bottle we create is a step towards a more beautiful, sustainable future.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
      <LuxuryFooter/>
    </>
  );
}