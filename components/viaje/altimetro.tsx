"use client"

import { useCallback, useRef, useState } from "react"
import { Move, Minus, Plus } from "lucide-react"
import { useScrollProgress } from "@/hooks/use-scroll-progress"
import { lugaresOrdenados } from "@/lib/viaje-data"

/**
 * Panel del termómetro/altímetro.
 * - A medida que el usuario hace scroll, recorre la lista de lugares ordenada
 *   del más alto y frío (Tunja) al más bajo y caliente (Turbo / Urabá).
 * - Se puede ARRASTRAR a cualquier parte de la pantalla (pointer events).
 * - Se puede MINIMIZAR a un resumen compacto y restaurar.
 */
export function Altimetro() {
  const progress = useScrollProgress()

  const total = lugaresOrdenados.length
  const indice = Math.min(total - 1, Math.max(0, Math.floor(progress * total)))
  const lugar = lugaresOrdenados[indice]

  // Arranca minimizado y compacto al cargar la página.
  const [minimizado, setMinimizado] = useState(true)
  // pos = null => usa la posición por defecto del CSS (borde derecho, bajo el header).
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const arrastre = useRef<{ dx: number; dy: number } | null>(null)

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Solo arrastrar desde la barra de título, no desde el botón de minimizar.
    if ((e.target as HTMLElement).closest(".altimetro-toggle")) return
    const panel = e.currentTarget.closest(".altimetro") as HTMLElement | null
    if (!panel) return
    const rect = panel.getBoundingClientRect()
    arrastre.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top }
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!arrastre.current) return
    const panel = e.currentTarget.closest(".altimetro") as HTMLElement | null
    if (!panel) return
    const w = panel.offsetWidth
    const h = panel.offsetHeight
    // Clampea dentro del viewport para que nunca quede inalcanzable.
    const x = Math.min(Math.max(0, e.clientX - arrastre.current.dx), window.innerWidth - w)
    const y = Math.min(Math.max(0, e.clientY - arrastre.current.dy), window.innerHeight - h)
    setPos({ x, y })
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    arrastre.current = null
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* noop */
    }
  }, [])

  const estiloMovido = pos ? { left: pos.x, top: pos.y, right: "auto" as const } : undefined

  return (
    <aside
      className={`altimetro${pos ? " movido" : ""}${minimizado ? " minimizado" : ""}`}
      style={estiloMovido}
      aria-label="Lugar, altura y temperatura del descenso"
    >
      <div
        className="altimetro-barra-titulo"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        role="button"
        tabIndex={0}
        aria-label="Arrastra para mover el termómetro"
      >
        <Move className="altimetro-mover-icon" aria-hidden="true" />
        <span className="altimetro-arrastre-lbl">Arrastra</span>
        <button
          type="button"
          className="altimetro-toggle"
          onClick={() => setMinimizado((m) => !m)}
          aria-expanded={!minimizado}
          aria-label={minimizado ? "Expandir termómetro" : "Minimizar termómetro"}
        >
          {minimizado ? <Plus size={14} /> : <Minus size={14} />}
        </button>
      </div>

      {minimizado ? (
        <div className="altimetro-resumen">
          <span className="altimetro-resumen-lugar">{lugar.nombre}</span>
          <span className="altimetro-resumen-datos">
            {lugar.altura.toLocaleString("es-CO")} m · {lugar.temperatura}°C
          </span>
        </div>
      ) : (
        <>
          <p className="altimetro-titulo">
            {lugar.nombre}
            <span className="altimetro-paso ml-0.5">
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
        </>
      )}
    </aside>
  )
}
