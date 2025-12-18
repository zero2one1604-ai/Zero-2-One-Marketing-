import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import products from '@/data/products';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} by Saavi | Luxury Solid Perfumes`,
    description: product.description,
    keywords: [
      product.brand,
      "Saavi",
      'solid perfume',
      'luxury fragrance',
      ...product.notes,
      ...product.mood,
      product.category
    ].join(', '),
    openGraph: {
      title: `${product.name} by ${product.brand}`,
      description: product.tagline,
      images: [product.image],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} by ${product.brand}`,
      description: product.tagline,
      images: [product.image],
    },
  };
}

export default function ProductPage({ params }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    brand: {
      '@type': 'Brand',
      name: "Saavi",
    },
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}