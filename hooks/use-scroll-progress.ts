"use client"

import { useSyncExternalStore } from "react"

/**
 * Devuelve el progreso de scroll de la página completa, entre 0 (arriba) y 1 (final).
 * Se usa para el altímetro, la barra de lectura y el cambio de color de acento.
 * Todas las llamadas comparten un solo listener de scroll para mantener los
 * indicadores sincronizados y evitar trabajo duplicado por frame.
 */
let progress = 0
let frame = 0
const listeners = new Set<() => void>()

function readProgress() {
  if (typeof window === "undefined") return 0

  const doc = document.documentElement
  const max = doc.scrollHeight - window.innerHeight
  const next = max > 0 ? window.scrollY / max : 0
  return Math.min(1, Math.max(0, next))
}

function publish(next: number) {
  if (Math.abs(next - progress) < 0.0005) return

  progress = next
  listeners.forEach((listener) => listener())
}

function update() {
  frame = 0
  publish(readProgress())
}

function scheduleUpdate() {
  if (!frame) frame = requestAnimationFrame(update)
}

function subscribe(listener: () => void) {
  listeners.add(listener)

  if (listeners.size === 1) {
    publish(readProgress())
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)
  }

  return () => {
    listeners.delete(listener)

    if (listeners.size === 0) {
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    }
  }
}

function getSnapshot() {
  return progress
}

function getServerSnapshot() {
  return 0
}

export function useScrollProgress() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
