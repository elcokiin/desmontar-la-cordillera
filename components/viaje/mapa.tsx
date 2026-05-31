"use client"

import dynamic from "next/dynamic"

// El mapa usa Leaflet (window/document), así que se carga solo en cliente.
const MapaLeaflet = dynamic(() => import("@/components/viaje/mapa-leaflet"), {
  ssr: false,
  loading: () => (
    <div className="mapa-cargando" role="status">
      Cargando mapa del recorrido…
    </div>
  ),
})

export function Mapa() {
  return (
    <section className="mapa-section" id="mapa">
      <p className="section-eyebrow">Cartografía del trayecto</p>
      <h2>El mapa del descenso</h2>
      <MapaLeaflet />
    </section>
  )
}
