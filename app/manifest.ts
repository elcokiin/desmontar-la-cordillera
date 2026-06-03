import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Desmontar la Cordillera',
    short_name: 'Cordillera UPTC',
    description:
      'Bitácora académica de una salida pedagógica UPTC de geografía humana por la cordillera, el río Magdalena, Medellín y Urabá.',
    lang: 'es-CO',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#1c1710',
    theme_color: '#1c1710',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
