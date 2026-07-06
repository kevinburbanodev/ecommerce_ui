import type { Metadata } from "next";
import { Space_Grotesk, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/features/cart/store/cart.context";
import { LanguageProvider } from "@/shared/i18n/language.context";
import { Header } from "@/shared/components/Header";
import { Footer } from "@/shared/components/Footer";
import { Toast } from "@/shared/components/Toast";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Shopfront",
  description: "A storefront demo built with Next.js, TypeScript, and the FakeStore API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${hankenGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LanguageProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toast />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
