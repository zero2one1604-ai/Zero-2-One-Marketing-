import "./globals.css";
import Navbar from "@/app/components/Navbar";
import localFont from "next/font/local";

const theSeasons = localFont({
  src: "../../public/fonts/theseasons.otf",
  variable: "--font-the-seasons",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={theSeasons.variable}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
