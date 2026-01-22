import Image from 'next/image'
import LuxuryPerfumeGallery from './components/FeaturedCollection'
import LuxuryReviews from './components/CustomerReviews'
import LuxuryFooter from './components/Footer'
import LuxuryNewsletterPopup from './components/NewsletterPopup'
import RoyalBanner from './components/Banner'
import SolidPerfumeCombos from './components/SolidPerfumeCombos'

export const metadata = {
  title: 'Saavi Skincare: Solid Perfumes & Gentle Skincare',
  description:
    'Discover Saavi Skincare, a luxury fragrance and skincare house crafting solid perfumes with ethical sourcing, artisanal care, and modern elegance.',
  openGraph: {
    title: 'Saavi Skincare: Modern Solid Perfumes',
    description:
      'Luxury solid perfumes crafted in small batches with conscious sourcing and timeless design.',
    url: 'https://saaviskincare.com',
    siteName: 'Saavi Skincare',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Saavi Skincare Luxury Perfumes'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saavi Skincare',
    description:
      'Luxury solid perfumes crafted with conscience and care.',
    images: ['/images/logo.png']
  }
}


export default function Home () {
  return (
    <>
    <div className='relative w-full min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex flex-col'>
     <div className="relative w-full">
          
          <div className="hidden md:block">
           <Image
  src="/images/banner.webp"
  priority
  sizes="(min-width: 768px) 100vw"
width={1920}
height={600}
              className="w-full h-auto"
            />
          </div>
          <div className="block md:hidden">
     <Image
  src="/images/mobileabout.webp"
  width={767}
  height={600}
  sizes="(max-width: 767px) 100vw"
              className="w-full h-auto"
            />
          </div>

        </div>
<RoyalBanner />
      <LuxuryPerfumeGallery />
      <SolidPerfumeCombos />
      <LuxuryReviews />
      <LuxuryNewsletterPopup/>
    </div>
    <LuxuryFooter />
    </>
  )
}
