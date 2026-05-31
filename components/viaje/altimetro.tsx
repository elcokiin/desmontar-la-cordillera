"use client"

import { useScrollProgress } from "@/hooks/use-scroll-progress"
import { lugaresOrdenados } from "@/lib/viaje-data"

/**
 * Panel fijo al borde de la pantalla.
 * A medida que el usuario hace scroll, recorre la lista de lugares ordenada
 * del más alto y frío (Tunja) al más bajo y caliente (Turbo / Urabá),
 * mostrando en cada paso el lugar actual con su altura y temperatura.
 */
export function Altimetro() {
  const progress = useScrollProgress()

  const total = lugaresOrdenados.length
  // Mapea el progreso (0–1) a un índice dentro de la lista de lugares.
  const indice = Math.min(
    total - 1,
    Math.max(0, Math.floor(progress * total)),
  )
  const lugar = lugaresOrdenados[indice]

  return (
    <aside className="altimetro" aria-label="Lugar, altura y temperatura del descenso">
      <p className="altimetro-titulo">
        {lugar.nombre}
        <span className="altimetro-paso">
          {"  "}
          {indice + 1}/{total}
        </span>
      </p>

      <div className="altimetro-bloque">
        <span className="altimetro-num altitud">{lugar.altura.toLocaleString("es-CO")}</span>
        <span className="altimetro-lbl">m s. n. m.</span>
      </div>

      <div className="altimetro-barra" aria-hidden="true">
        <div
          className="altimetro-barra-fill"
          style={{ width: `${Math.round(((indice + 1) / total) * 100)}%` }}
        />
      </div>

      <div className="altimetro-bloque">
        <span className="altimetro-num temp">{lugar.temperatura}°C</span>
        <span className="altimetro-lbl">Temperatura</span>
      </div>
    </aside>
  )
}
