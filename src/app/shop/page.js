import { Metadata } from 'next';
import LuxuryShopPage from '../components/ProductCategory';
import CorporateGifting from '../components/CorporateGifting';
import LuxuryFooter from '../components/Footer';
import products from '../data/products';

export const metadata = {
  title: 'Shop Luxury Solid Perfumes | Premium Fragrances Collection',
  description: 'Discover our curated collection of handcrafted solid perfumes. Premium, travel-friendly fragrances for men, women, and unisex. Free shipping on orders over ₹999.',
  keywords: 'solid perfumes, luxury fragrances, handcrafted perfumes, travel perfumes, natural fragrances, men perfumes, women perfumes, unisex perfumes',
  openGraph: {
    title: 'Shop Luxury Solid Perfumes | Premium Collection',
    description: 'Handcrafted solid perfumes for the discerning individual',
    type: 'website',
    images: ['/images/shop-banner.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop Luxury Solid Perfumes',
    description: 'Handcrafted solid perfumes for the discerning individual',
  },
};

export default function ShopPage() {
  const categoryCounts = {
    all: products.length,
    men: products.filter(p => p.category === 'men').length,
    women: products.filter(p => p.category === 'women').length,
    unisex: products.filter(p => p.category === 'unisex').length,
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Luxury Solid Perfumes Collection',
    description: 'Premium handcrafted solid perfumes for men, women, and unisex',
    url: 'https://yourwebsite.com/shop',
    numberOfItems: products.length,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: Math.min(...products.map(p => p.price)),
      highPrice: Math.max(...products.map(p => p.price)),
      offerCount: products.length,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen w-full">
        <LuxuryShopPage products={products} categoryCounts={categoryCounts} />
        <CorporateGifting />
      </div>
      <LuxuryFooter />
    </>
  );
}