"use client"

import { useEffect } from "react"
import { useScrollProgress } from "@/hooks/use-scroll-progress"

// Gradiente de clima del descenso (frío -> selva -> mar):
//  arena (frío de Boyacá) -> verde (cordillera y selva) -> azul (ríos/golfo) -> coral (litoral)
const STOPS: { pos: number; color: [number, number, number] }[] = [
  { pos: 0, color: [249, 224, 118] }, // --arena #F9E076
  { pos: 0.4, color: [50, 112, 40] }, // --verde #327028
  { pos: 0.8, color: [2, 132, 199] }, // --azul  #0284C7
  { pos: 1, color: [196, 114, 133] }, // --coral #C47285
]

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t)
}

function colorEn(progreso: number): string {
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i]
    const b = STOPS[i + 1]
    if (progreso >= a.pos && progreso <= b.pos) {
      const span = b.pos - a.pos
      const t = span === 0 ? 0 : (progreso - a.pos) / span
      const r = lerp(a.color[0], b.color[0], t)
      const g = lerp(a.color[1], b.color[1], t)
      const bl = lerp(a.color[2], b.color[2], t)
      return `rgb(${r}, ${g}, ${bl})`
    }
  }
  const last = STOPS[STOPS.length - 1].color
  return `rgb(${last[0]}, ${last[1]}, ${last[2]})`
}

/**
 * Mantiene el fondo oscuro original pero desplaza el color de --acento
 * (bordes, botones, líneas de tiempo, sombras) según el avance del scroll.
 */
export function ViajeTheme() {
  const progress = useScrollProgress()

  useEffect(() => {
    document.documentElement.style.setProperty("--acento", colorEn(progress))
  }, [progress])

  return null
}
