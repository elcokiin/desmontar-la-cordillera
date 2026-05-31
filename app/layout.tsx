import type { Metadata } from 'next'
import { Bebas_Neue, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
})

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-grotesk',
})

export const metadata: Metadata = {
  title: 'Desmontar la Cordillera — Salida de Campo Geografía Humana',
  description:
    'Relatos de ruana, asfalto y banano. Siete días descendiendo de Tunja al Urabá para entender la tierra y la gente.',
  generator: 'v0.app',
}

export const viewport = {
  themeColor: '#1c1710',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${bebas.variable} ${grotesk.variable}`}>
      <body className="font-sans antialiased" style={{ background: 'hsl(36, 29%, 10%)' }}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
