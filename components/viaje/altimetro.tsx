"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Minus, Plus, Move } from "lucide-react"
import { useScrollProgress } from "@/hooks/use-scroll-progress"
import { lugaresOrdenados } from "@/lib/viaje-data"

/**
 * Panel del descenso.
 * - Se puede arrastrar a cualquier punto de la pantalla (drag con pointer events).
 * - Se puede minimizar/expandir con el botón de control.
 * A medida que el usuario hace scroll, recorre la lista de lugares ordenada
 * del más alto y frío (Tunja) al más bajo y caliente (Turbo / Urabá),
 * mostrando en cada paso el lugar actual con su altura y temperatura.
 */
export function Altimetro() {
  const progress = useScrollProgress()
  const [minimizado, setMinimizado] = useState(false)
  // posición personalizada (null = posición por defecto del CSS)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const panelRef = useRef<HTMLElement>(null)
  const arrastre = useRef<{ dx: number; dy: number } | null>(null)

  const total = lugaresOrdenados.length
  const indice = Math.min(total - 1, Math.max(0, Math.floor(progress * total)))
  const lugar = lugaresOrdenados[indice]

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!arrastre.current || !panelRef.current) return
    const { dx, dy } = arrastre.current
    const ancho = panelRef.current.offsetWidth
    const alto = panelRef.current.offsetHeight
    // mantener el panel dentro del viewport
    const x = Math.min(Math.max(8, e.clientX - dx), window.innerWidth - ancho - 8)
    const y = Math.min(Math.max(8, e.clientY - dy), window.innerHeight - alto - 8)
    setPos({ x, y })
  }, [])

  const onPointerUp = useCallback(() => {
    arrastre.current = null
    window.removeEventListener("pointermove", onPointerMove)
    window.removeEventListener("pointerup", onPointerUp)
  }, [onPointerMove])

  const onPointerDown = (e: React.PointerEvent) => {
    if (!panelRef.current) return
    const rect = panelRef.current.getBoundingClientRect()
    arrastre.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top }
    // al empezar a arrastrar, fija la posición actual para evitar saltos
    setPos({ x: rect.left, y: rect.top })
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
  }

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }
  }, [onPointerMove, onPointerUp])

  const estilo = pos
    ? { left: pos.x, top: pos.y, right: "auto", bottom: "auto", transform: "none" }
    : undefined

  return (
    <aside
      ref={panelRef}
      className={`altimetro${minimizado ? " minimizado" : ""}${pos ? " movido" : ""}`}
      style={estilo}
      aria-label="Lugar, altura y temperatura del descenso"
    >
      <div className="altimetro-barra-titulo" onPointerDown={onPointerDown}>
        <Move className="altimetro-mover-icon" aria-hidden="true" />
        <span className="altimetro-arrastre-lbl">Arrastra</span>
        <button
          type="button"
          className="altimetro-toggle"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setMinimizado((v) => !v)}
          aria-label={minimizado ? "Expandir termómetro" : "Minimizar termómetro"}
          aria-expanded={!minimizado}
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
