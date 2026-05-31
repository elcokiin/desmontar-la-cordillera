"use client"

import { useEffect, useMemo, useState } from "react"
import { MapContainer, TileLayer, Polyline, Marker, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { lugares } from "@/lib/viaje-data"

// Colores del tema (deben ser literales: Leaflet no entiende variables CSS).
const ARENA = "#f9e076"
const NEGRO = "#1a160f"

// Ruta circular: el orden del array + regreso a Tunja (índice 0).
const ruta: [number, number][] = [
  ...lugares.map((l) => l.coords),
  lugares[0].coords,
]

// Distancia geográfica (haversine) en km entre dos coordenadas [lat, lng].
function distanciaKm(a: [number, number], b: [number, number]) {
  const R = 6371 // radio terrestre en km
  const rad = (d: number) => (d * Math.PI) / 180
  const dLat = rad(b[0] - a[0])
  const dLng = rad(b[1] - a[1])
  const lat1 = rad(a[0])
  const lat2 = rad(b[0])
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2)
  return 2 * R * Math.asin(Math.sqrt(h))
}

// Tramos de la ruta circular: cada lugar -> el siguiente (el último vuelve a Tunja).
const tramos = lugares.map((lugar, i) => {
  const destino = lugares[(i + 1) % lugares.length]
  return {
    origen: lugar.nombre,
    destino: destino.nombre,
    km: distanciaKm(lugar.coords, destino.coords),
  }
})

// Kilómetros totales recorridos en la ruta circular.
const kmTotales = tramos.reduce((acc, t) => acc + t.km, 0)

const fmtKm = (km: number) =>
  km.toLocaleString("es-CO", { maximumFractionDigits: 0 }) + " km"

// Marcador cuadrado brutalista numerado, generado como divIcon.
function crearIcono(numero: number, activo: boolean) {
  return L.divIcon({
    className: "mapa-pin-wrapper",
    html: `<span class="mapa-pin${activo ? " activo" : ""}">${numero}</span>`,
    iconSize: [activo ? 40 : 32, activo ? 40 : 32],
    iconAnchor: [activo ? 20 : 16, activo ? 20 : 16],
  })
}

// Controla el encuadre del mapa cuando cambia la selección.
function Controlador({ activo }: { activo: number | null }) {
  const map = useMap()
  useEffect(() => {
    if (activo == null) return
    map.flyTo(lugares[activo].coords, 9, { duration: 0.8 })
  }, [activo, map])
  return null
}

export default function MapaLeaflet() {
  const [activo, setActivo] = useState<number | null>(null)
  const bounds = useMemo(
    () => L.latLngBounds(lugares.map((l) => l.coords)).pad(0.15),
    [],
  )

  return (
    <div className="mapa-interactivo">
      <div className="mapa-canvas">
        <MapContainer
          bounds={bounds}
          scrollWheelZoom={false}
          className="mapa-leaflet"
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            // Atribución requerida por OSM/CARTO.
            // eslint-disable-next-line react/no-unknown-property
            attribution='&copy; OpenStreetMap &copy; CARTO'
          />

          {/* Sombra de la línea para el efecto "doble trazo" tipo Uber */}
          <Polyline
            positions={ruta}
            pathOptions={{ color: NEGRO, weight: 9, opacity: 0.9, lineCap: "round", lineJoin: "round" }}
          />
          <Polyline
            positions={ruta}
            pathOptions={{ color: ARENA, weight: 4, opacity: 1, lineCap: "round", lineJoin: "round" }}
          />

          {lugares.map((lugar, i) => (
            <Marker
              key={`${lugar.nombre}-${i}`}
              position={lugar.coords}
              icon={crearIcono(i + 1, activo === i)}
              eventHandlers={{
                click: () => setActivo(i),
                mouseover: () => setActivo(i),
              }}
            />
          ))}

          <Controlador activo={activo} />
        </MapContainer>

        {/* Tarjeta flotante con datos del lugar seleccionado */}
        {activo != null && (
          <div className="mapa-popup" role="status">
            <span className="mapa-popup-num">{String(activo + 1).padStart(2, "0")}</span>
            <div>
              <p className="mapa-popup-nombre">{lugares[activo].nombre}</p>
              <p className="mapa-popup-datos">
                {lugares[activo].altura.toLocaleString("es-CO")} m · {lugares[activo].temperatura}°C
              </p>
              <p className="mapa-popup-tramo">
                → {tramos[activo].destino}: {fmtKm(tramos[activo].km)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Leyenda / control con el look & feel existente */}
      <aside className="mapa-leyenda" aria-label="Paradas del recorrido">
        <p className="mapa-leyenda-titulo">Ruta circular · 13 paradas</p>
        <ol className="mapa-leyenda-lista">
          {lugares.map((lugar, i) => (
            <li key={`leg-${lugar.nombre}-${i}`}>
              <button
                type="button"
                className={`mapa-leyenda-item${activo === i ? " activo" : ""}`}
                onMouseEnter={() => setActivo(i)}
                onClick={() => setActivo(i)}
              >
                <span className="mapa-leyenda-num">{i + 1}</span>
                <span className="mapa-leyenda-nombre">
                  {lugar.nombre}
                  <span className="mapa-leyenda-tramo">
                    → {tramos[i].destino} · {fmtKm(tramos[i].km)}
                  </span>
                </span>
                <span className="mapa-leyenda-alt">{lugar.altura.toLocaleString("es-CO")} m</span>
              </button>
            </li>
          ))}
        </ol>
        <p className="mapa-leyenda-total">
          <span className="mapa-leyenda-total-lbl">Total recorrido</span>
          <span className="mapa-leyenda-total-km">{fmtKm(kmTotales)}</span>
        </p>
        <p className="mapa-leyenda-pie">
          <span className="mapa-leyenda-marca" /> Salida y llegada: Tunja
        </p>
      </aside>
    </div>
  )
}
