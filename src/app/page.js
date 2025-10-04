import Image from 'next/image'
import Link from 'next/link'
import LuxuryPerfumeGallery from './components/FeaturedCollection'
import LuxuryReviews from './components/CustomerReviews'
import LuxuryFooter from './components/Footer'

export default function Home () {
  return (
    <>
    <div className='relative w-full min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex flex-col'>
      <div className='relative w-full'>
        <Image
          src='/images/banner.png'
          alt='Premium Perfumes'
          height={600}
          width={1920}
          priority
        />

        <div className='absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0e1a] to-transparent' />
      </div>

      <LuxuryPerfumeGallery />
      <LuxuryReviews />
    </div>
    <LuxuryFooter />
    </>
    
  )
}
