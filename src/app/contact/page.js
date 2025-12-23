import LuxuryFooter from '../components/Footer'
import ContactClient from './ContactClient'

export const metadata = {
  title: 'Contact Us | Saavi – Luxury Solid Perfumes & Skincare',
  description:
    'Get in touch with Saavi for product inquiries, order support, or corporate gifting. Our team responds within 24 hours.',
  keywords: [
    'contact saavi',
    'saavi perfume support',
    'luxury perfume contact',
    'solid perfume brand india',
    'corporate gifting perfume'
  ],
  openGraph: {
    title: 'Contact Saavi – We’re Here to Help',
    description:
      'Reach out to Saavi for inquiries, support, or collaborations. Personalized assistance within 24 hours.',
    url: 'https://saaviskincare.com/contact',
    siteName: 'Saavi',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'Contact Saavi',
    description:
      'Luxury solid perfume brand. Reach out for support, orders, or partnerships.'
  }
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Saavi',
            url: 'https://saaviskincare.com',
            contactPoint: [
              {
                '@type': 'ContactPoint',
                telephone: '+91-8448-444-373',
                contactType: 'customer support',
                areaServed: 'IN',
                availableLanguage: ['English', 'Hindi']
              }
            ],
            email: 'support@saaviskincare.com'
          })
        }}
      />

      <div>
        <ContactClient />
      </div>

      <LuxuryFooter />
    </>
  )
}
