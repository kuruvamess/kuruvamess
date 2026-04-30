import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/contexts/CartContext";
import { HydrationFix } from "@/components/HydrationFix";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Add display swap to prevent flash of unstyled text
});

export const metadata: Metadata = {
  title: "Kuruva Mess House - Authentic Kerala Cuisine Near Kuruva Island",
  description: "Experience the rich flavors of traditional Kerala food at Kuruva Mess House. Famous for our Biryani, Nadan Sadhya, and fresh river fish delicacies. Open 5 AM - 10 PM daily.",
  keywords: "Kerala food, restaurant near Kuruva Island, biryani, nadan sadhya, river fish, authentic Kerala cuisine",
  openGraph: {
    title: "Kuruva Mess House - Authentic Kerala Cuisine",
    description: "Experience the rich flavors of traditional Kerala food near the beautiful Kuruva Island",
    type: "website",
    locale: "en_IN",
    siteName: "Kuruva Mess House",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning={true}>
        <HydrationFix />
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}