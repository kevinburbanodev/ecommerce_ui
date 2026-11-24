import type { Metadata } from 'next'
import { Encode_Sans, Shantell_Sans } from 'next/font/google'
import './globals.css'
import { EnvelopeProvider } from '@/features/envelope/envelope.context'
import { LanguageProvider } from '@/shared/i18n/language.context'
import { Header } from '@/shared/components/Header'
import { Footer } from '@/shared/components/Footer'
import { Toast } from '@/shared/components/Toast'

const encode = Encode_Sans({ variable: '--font-encode', subsets: ['latin'], axes: ['wdth'] })
const hand = Shantell_Sans({ variable: '--font-hand', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Café Remite: café de origen por correo (demo)',
  description: 'Demo de tienda en línea: seis cafés de Colombia, cada uno con su estampilla, molidos para tu cafetera.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${encode.variable} ${hand.variable}`}>
      <body>
        <LanguageProvider>
          <EnvelopeProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toast />
          </EnvelopeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
