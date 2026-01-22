import React from 'react'
import products from '../../data/products'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

const SolidPerfumeCombos = () => {
  const combos = products
    .filter(product => product.category === 'combo')
    .map(product => ({
      ...product,
      accentColor: 'bg-stone-900'
    }))

  return (
    <section className='w-full py-10 text-stone-900'>
      <div className='max-w-7xl mx-auto'>
      <div className='text-center mb-6 md:mb-16 md:space-y-4'>
             <div className='flex items-center justify-center gap-2 md:mb-4'>
               <h1 className='text-lg md:text-5xl font-light text-[#1C1C1A] tracking-[0.2em] the-seasons uppercase'>
                 Curated Pairings
               </h1>
             </div>
             <p className='text-[#6E6A61] text-xs md:text-sm tracking-wider uppercase font-light'>
               Signature Combos
             </p>
           </div>

        <div className='grid px-2 grid-cols-2 md:grid-cols-2 gap-2 lg:gap-12'>
          {combos.map(combo => (
            <div
              key={combo.id}
              className='group relative rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col'
            >
              <Link href={`/product/${combo.slug}`} className='block'>
              <div className='relative aspect-square w-full overflow-hidden '>
                <Image
                  src={combo.image}
                  alt={combo.name}
                  width={600}
                  height={600}
                  className='h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out'
                />
              </div>

              <div className='p-4 md:p-10 flex flex-col flex-grow text-center items-center'>
                <h3 className='text-sm md:text-2xl font-serif text-stone-900 '>
                  {combo.name}
                </h3>

                <div className='mt-auto flex items-baseline gap-3'>
                  <span className='text-lg md:text-3xl font-serif text-stone-900'>
                    ₹{combo.price}
                  </span>
                </div>

                <button
                  className='
w-full py-2 mt-2 md:py-3.5 cursor-pointer
bg-gradient-to-br from-[#C9A43B] via-[#F1DB8A] to-[#9C7A22]
text-[#1A1405]
transition-all duration-300
hover:shadow-[0_10px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-2px_0_rgba(0,0,0,0.35)]
hover:from-[#B08D2A] hover:via-[#E6C96A] hover:to-[#8A6A1C]
active:scale-[0.98]
focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/40 focus:ring-offset-2
border border-[#8F7220]
relative overflow-hidden rounded-xl
flex items-center justify-center gap-2
'
                >
                  <div className='absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/20 pointer-events-none' />

                  <span className='relative z-10 flex text-xs md:text-base items-center gap-2'>
                    <ShoppingBag className='w-3 h-3 md:w-4 md:h-4' />
                    <span>Get Details</span>
                  </span>
                </button>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SolidPerfumeCombos
