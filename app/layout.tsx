import type { Metadata } from 'next'
import { Bebas_Neue, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { siteUrl } from '@/lib/site-url'
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
  metadataBase: siteUrl,
  title: {
    default: 'Salida Pedagógica UPTC de Geografía Humana | Desmontar la Cordillera',
    template: '%s | Desmontar la Cordillera',
  },
  description:
    'Bitácora académica de una salida pedagógica UPTC por la cordillera, el río Magdalena, Medellín y Urabá: relatos, mapas y análisis de geografía humana.',
  applicationName: 'Desmontar la Cordillera',
  authors: [{ name: 'Expedicionarios UPTC' }],
  creator: 'Expedicionarios UPTC',
  publisher: 'Expedicionarios UPTC',
  keywords: [
    'salida pedagogica UPTC',
    'salida de campo geografia humana',
    'geografia humana UPTC',
    'desmontar la cordillera',
    'guia salida pedagogica cordillera',
    'transecto Tunja Uraba',
    'bitacora salida de campo',
    'cordillera Colombia',
    'Uraba geografia humana',
    'rio Magdalena territorio',
    'altiplano cundiboyacense',
    'salidas pedagogicas Colombia',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: '/',
    siteName: 'Desmontar la Cordillera',
    title: 'Salida Pedagógica UPTC de Geografía Humana | Desmontar la Cordillera',
    description:
      'Bitácora académica de una salida pedagógica UPTC por la cordillera, el río Magdalena, Medellín y Urabá: relatos, mapas y análisis de geografía humana.',
    images: [
      {
        url: '/assets/Collage/collage-1.png',
        width: 1200,
        height: 630,
        alt: 'Salida pedagógica UPTC de geografía humana por la cordillera y Urabá',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salida Pedagógica UPTC de Geografía Humana | Desmontar la Cordillera',
    description:
      'Bitácora académica de una salida pedagógica UPTC por la cordillera, el río Magdalena, Medellín y Urabá.',
    images: ['/assets/Collage/collage-1.png'],
  },
  category: 'education',
  classification: 'Educación, geografía humana, salidas pedagógicas',
}

export const viewport = {
  themeColor: '#1c1710',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${siteUrl.origin}/#article`,
  url: siteUrl.origin,
  name: 'Desmontar la Cordillera',
  headline: 'Salida Pedagógica UPTC de Geografía Humana',
  description:
    'Bitácora académica de una salida pedagógica UPTC por la cordillera, el río Magdalena, Medellín y Urabá, con relatos, mapas y análisis territorial.',
  inLanguage: 'es-CO',
  isAccessibleForFree: true,
  educationalLevel: 'Universitario',
  learningResourceType: 'Bitácora académica',
  about: [
    'Geografía humana',
    'Salida pedagógica',
    'Cordillera colombiana',
    'Río Magdalena',
    'Urabá',
    'Altiplano cundiboyacense',
    'Ordenamiento territorial',
  ],
  keywords:
    'salida pedagógica UPTC, salida de campo geografía humana, cordillera Colombia, transecto Tunja Urabá, bitácora académica, guía salida pedagógica',
  image: `${siteUrl.origin}/assets/Collage/collage-1.png`,
  author: {
    '@type': 'Organization',
    name: 'Expedicionarios UPTC',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Expedicionarios UPTC',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': siteUrl.origin,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${bebas.variable} ${grotesk.variable}`}>
      <body className="font-sans antialiased" style={{ background: 'hsl(36, 29%, 10%)' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
