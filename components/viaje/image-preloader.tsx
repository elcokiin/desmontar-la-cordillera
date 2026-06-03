"use client"

import { useEffect } from "react"

import { collageImages } from "@/lib/collage-images"
import { dias, equipo } from "@/lib/viaje-data"

type NetworkInformationLike = {
  effectiveType?: string
  saveData?: boolean
}

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformationLike
}

function optimizedImageUrl(src: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`
}

function unique(values: string[]) {
  return Array.from(new Set(values))
}

export function ImagePreloader() {
  useEffect(() => {
    const connection = (navigator as NavigatorWithConnection).connection

    if (connection?.saveData) return

    const dayPhotos = dias.flatMap((dia) => dia.fotos.map((foto) => optimizedImageUrl(foto.src, 828)))
    const teamPhotos = equipo.map((person) => optimizedImageUrl(person.foto, 384))
    const collagePhotos = collageImages.map((photo) => optimizedImageUrl(photo.src, 640))
    const queue = unique([...dayPhotos, ...teamPhotos, ...collagePhotos])
    const concurrency = connection?.effectiveType?.includes("2g") ? 1 : 2
    let cursor = 0
    let active = 0
    let cancelled = false

    function next() {
      if (cancelled) return

      while (active < concurrency && cursor < queue.length) {
        const src = queue[cursor]
        cursor += 1
        active += 1

        const image = new window.Image()
        image.decoding = "async"
        image.onload = image.onerror = () => {
          active -= 1
          next()
        }
        image.src = src
      }
    }

    const start = () => {
      window.setTimeout(next, 1400)
    }

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(start, { timeout: 3500 })
      return () => {
        cancelled = true
        window.cancelIdleCallback(idleId)
      }
    }

    const timeoutId = globalThis.setTimeout(start, 2500)
    return () => {
      cancelled = true
      globalThis.clearTimeout(timeoutId)
    }
  }, [])

  return null
}
