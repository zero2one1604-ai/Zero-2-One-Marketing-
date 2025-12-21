import Image from 'next/image'
import Link from 'next/link'
import LuxuryPerfumeGallery from './components/FeaturedCollection'
import LuxuryReviews from './components/CustomerReviews'
import LuxuryFooter from './components/Footer'
import LuxuryNewsletterPopup from './components/NewsletterPopup'
import RoyalBanner from './components/Banner'

export default function Home () {
  return (
    <>
    <div className='relative w-full min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex flex-col'>
     <div className='relative w-full'>
    <Image
        src='/images/banner.jpg'
        alt='Premium Perfumes'
        height={600}
        width={1920}
        priority
        className='hidden md:flex'
    />
    <Image
        src='/images/mobileabout.png'
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
