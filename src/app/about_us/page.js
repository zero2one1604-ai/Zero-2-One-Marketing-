import Image from 'next/image'
import LuxuryFooter from '../components/Footer'
import AboutClient from './AboutClient'

export const metadata = {
  title: 'About Us | Saavi, Luxury Solid Perfumes Crafted with Care',
  description:
    'Discover the story behind Saavi, a family-founded luxury perfume brand focused on small-batch craftsmanship, ethical sourcing, and skin-safe formulations.',
  keywords: [
    'Saavi perfume',
    'luxury solid perfume',
    'artisan perfume brand',
    'ethical beauty brand India',
    'small batch skincare'
  ],
  openGraph: {
    title: 'About Saavi – Crafted by Family, Made for Care',
    description:
      'A family-run luxury perfume brand creating small-batch, skin-safe fragrances using ethically sourced ingredients.',
    url: 'https://saaviskincare.com/about_us',
    siteName: 'Saavi',
    images: [
      {
        url: '/images/savicover.jpg',
        width: 1200,
        height: 630,
        alt: 'Saavi brand heritage'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Saavi – Luxury with Conscience',
    description:
      'Learn about Saavi’s journey, values, and commitment to ethical luxury.',
    images: ['/images/savicover.jpg']
  }
}

export default function AboutUsPage() {
  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Saavi',
            url: 'https://saaviskincare.com',
            logo: 'https://saaviskincare.com/logo.png',
            description:
              'Saavi is a family-founded luxury perfume brand crafting small-batch solid perfumes using ethical, skin-safe ingredients.',
            foundingDate: '2015',
            sameAs: [
              'https://instagram.com/saaviskincare',
              'https://facebook.com/saaviskincare'
            ]
          })
        }}
      />

      {/* Page content */}
      <div className="">
        <AboutClient />
      </div>

      <LuxuryFooter />
    </>
  )
}
