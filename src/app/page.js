import Image from 'next/image'
import Link from 'next/link'
import LuxuryPerfumeGallery from './components/FeaturedCollection'
import LuxuryReviews from './components/CustomerReviews'
import LuxuryFooter from './components/Footer'
import LuxuryNewsletterPopup from './components/NewsletterPopup'
import RoyalBanner from './components/Banner'

export const metadata = {
  title: 'Saavi: Luxury Solid Perfumes & Conscious Care',
  description:
    'Discover Saavi Skincare, a luxury fragrance and skincare house crafting solid perfumes with ethical sourcing, artisanal care, and modern elegance.',
  openGraph: {
    title: 'Saavi Skincare: Modern Luxury Perfumes',
    description:
      'Luxury solid perfumes crafted in small batches with conscious sourcing and timeless design.',
    url: 'https://saaviskincare.com',
    siteName: 'Saavi Skincare',
    images: [
      {
        url: '/images/og-home.jpg',
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
    images: ['/images/og-home.jpg']
  }
}


export default function Home () {
  return (
    <>
    <div className='relative w-full min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex flex-col'>
     <div className='relative w-full'>
    <Image
        src='/images/banner.webp'
        alt='Premium Perfumes'
        height={600}
        width={1920}
        priority
        className='hidden md:flex'
    />
    <Image
        src='/images/mobileabout.webp'
        alt='Premium Perfumes'
        height={300}
        width={768}
        priority
        className='flex md:hidden'
    />

</div>
<RoyalBanner />
      <LuxuryPerfumeGallery />
      <LuxuryReviews />
      <LuxuryNewsletterPopup/>
    </div>
    <LuxuryFooter />
    </>
  )
}
