"use client"

import { useScrollProgress } from "@/hooks/use-scroll-progress"
import {
  ALTITUD_INICIAL,
  ALTITUD_FINAL,
  TEMP_INICIAL,
  TEMP_FINAL,
} from "@/lib/viaje-data"

/**
 * Panel fijo al borde de la pantalla. Al bajar por la página:
 *  - la altitud desciende de 2820 m (Tunja) a 0 m (nivel del mar, Urabá)
 *  - la temperatura sube de 12 °C (frío de Boyacá) a 30 °C (calor del Urabá)
 */
export function Altimetro() {
  const progress = useScrollProgress()

  const altitud = Math.round(
    ALTITUD_INICIAL + (ALTITUD_FINAL - ALTITUD_INICIAL) * progress,
  )
  const temperatura = Math.round(
    TEMP_INICIAL + (TEMP_FINAL - TEMP_INICIAL) * progress,
  )

  return (
    <aside className="altimetro" aria-label="Altímetro y temperatura del descenso">
      <p className="altimetro-titulo">Descenso Tunja → Urabá</p>

      <div className="altimetro-bloque">
        <span className="altimetro-num altitud">{altitud.toLocaleString("es-CO")}</span>
        <span className="altimetro-lbl">m s. n. m.</span>
      </div>

      <div className="altimetro-barra" aria-hidden="true">
        <div
          className="altimetro-barra-fill"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      <div className="altimetro-bloque">
        <span className="altimetro-num temp">{temperatura}°C</span>
        <span className="altimetro-lbl">Temperatura</span>
      </div>
    </aside>
  )
}
