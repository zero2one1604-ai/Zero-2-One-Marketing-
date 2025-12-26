import "./globals.css";
import Navbar from "@/app/components/Navbar";
import localFont from "next/font/local";
import { AuthModalProvider } from "@/app/components/AuthModalProvider";
import ClientReveal from "./components/ClientReveal";

const theSeasons = localFont({
  src: "../../public/fonts/theseasons.otf",
  variable: "--font-the-seasons",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Saavi Skincare: Solid Perfumes & Gentle Skincare",
    template: "%s | Saavi",
  },

  description:
    "Saavi is a family-rooted solid perfume and skincare brand born from care and lived experience. Crafted in small batches using skin-friendly ingredients, our products are made to nourish, restore and protect the whole family.",

  keywords: [
    "Saavi",
    "solid perfume",
    "solid perfume India",
    "natural solid perfume",
    "gentle skincare",
    "family skincare brand",
    "skin friendly perfume",
    "hydrating creams",
    "small batch skincare",
  ],

  authors: [{ name: "Saavi" }],
  creator: "Saavi",

  metadataBase: new URL("https://www.saaviskincare.com"),

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },

  openGraph: {
    title: "Saavi Skincare: Solid Perfumes & Gentle Skincare",
    description:
      "From our home to yours. Saavi creates solid perfumes and skincare products prepared in small batches with trust, truth and care.",
    url: "https://www.saaviskincare.com",
    siteName: "Saavi",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Saavi Solid Perfume and Skincare",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Saavi Skincare: Solid Perfumes & Gentle Skincare",
    description:
      "A family-born brand creating solid perfumes and gentle skincare with care, trust and skin-safe ingredients.",
    images: ["/images/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={theSeasons.variable}>
      <body>
   <AuthModalProvider>
        <ClientReveal>
            <Navbar />
            {children}
          </ClientReveal>
        </AuthModalProvider>
      </body>
    </html>
  );
}