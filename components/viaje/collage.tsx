"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Download, RefreshCcw, X } from "lucide-react"
import { toPng } from "html-to-image"

import { collageImages } from "@/lib/collage-images"

gsap.registerPlugin(ScrollTrigger)

const PHOTO_COUNT = 22
const shapes = ["classic", "rounded", "ticket", "soft", "wide"] as const
const anchors = [
  [0, 1, 27],
  [16, 4, 24],
  [34, 0, 28],
  [57, 3, 25],
  [76, 2, 25],
  [6, 20, 23],
  [25, 18, 29],
  [48, 19, 26],
  [68, 20, 29],
  [86, 24, 22],
  [0, 40, 28],
  [19, 40, 25],
  [41, 39, 30],
  [63, 43, 25],
  [79, 43, 27],
  [7, 56, 25],
  [28, 57, 22],
  [48, 55, 25],
  [70, 58, 23],
  [86, 59, 20],
  [17, 70, 23],
  [55, 70, 25],
] as const

type LayoutPhoto = {
  src: string
  alt: string
  x: number
  y: number
  width: number
  rotation: number
  zIndex: number
  shape: (typeof shapes)[number]
  tone: number
}

function hashSeed(seed: string) {
  let hash = 2166136261
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function seededRandom(seed: string) {
  let value = hashSeed(seed)

  return () => {
    value += 0x6d2b79f5
    let next = value
    next = Math.imul(next ^ (next >>> 15), next | 1)
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61)
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296
  }
}

function generateLayout(seed: string): LayoutPhoto[] {
  const random = seededRandom(seed)
  const pool = [...collageImages]

  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }

  return pool.slice(0, Math.min(PHOTO_COUNT, pool.length)).map((image, index) => {
    const anchor = anchors[index % anchors.length]
    const wide = anchor[2] + (random() - 0.5) * 4

    return {
      ...image,
      x: anchor[0] + (random() - 0.5) * 4,
      y: anchor[1] + (random() - 0.5) * 4,
      width: wide,
      rotation: -11 + random() * 22,
      zIndex: 10 + Math.floor(random() * 25) + index,
      shape: shapes[Math.floor(random() * shapes.length)],
      tone: random(),
    }
  })
}

export function Collage() {
  const sectionRef = useRef<HTMLElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const [seed, setSeed] = useState("cordillera-collage")
  const [isDownloading, setIsDownloading] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<LayoutPhoto | null>(null)
  const photos = useMemo(() => generateLayout(seed), [seed])

  useGSAP(
    () => {
      if (photos.length === 0) return

      const items = gsap.utils.toArray<HTMLElement>(".collage-photo")

      gsap.set(items, { willChange: "transform, opacity" })

      const tl = gsap.timeline({
        defaults: { ease: "back.out(1.45)", duration: 0.82 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
          once: true,
        },
      })

      tl.fromTo(
        items,
        {
          autoAlpha: 0,
          scale: 0.62,
          x: () => gsap.utils.random(-130, 130),
          y: () => gsap.utils.random(90, 210),
          rotate: () => gsap.utils.random(-35, 35),
        },
        {
          autoAlpha: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotate: (index) => photos[index]?.rotation ?? 0,
          stagger: { each: 0.075, from: "random" },
          onComplete: () => {
            gsap.set(items, { willChange: "auto" })
          },
        },
      )

      return () => tl.kill()
    },
    { dependencies: [seed, photos.length], scope: sectionRef },
  )

  useEffect(() => {
    if (!selectedPhoto) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedPhoto(null)
      }
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [selectedPhoto])

  function refreshCollage() {
    setSelectedPhoto(null)
    setSeed(`cordillera-${Date.now()}-${Math.random()}`)
  }

  async function downloadCollage() {
    if (!boardRef.current || isDownloading) return

    setIsDownloading(true)

    try {
      const dataUrl = await toPng(boardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#1f1710",
      })
      const link = document.createElement("a")
      link.download = "mosaico-del-descenso.png"
      link.href = dataUrl
      link.click()
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <section className="collage-section" id="collage" aria-labelledby="collage-title" ref={sectionRef}>
      <div className="collage-heading">
        <div>
          <p className="section-eyebrow">Memoria visual</p>
          <h2 id="collage-title">El mosaico del descenso</h2>
          <p className="collage-intro">
            Fragmentos de siete días entre la ruana y el banano: rostros, ríos,
            laderas y caminos que dibujan el transecto de la cordillera al Golfo.
          </p>
        </div>
        <div className="collage-actions" aria-label="Controles del mosaico">
          <button className="collage-action" type="button" onClick={refreshCollage}>
            <RefreshCcw aria-hidden="true" size={18} />
            Nuevo mosaico
          </button>
          <button
            className="collage-action collage-action-primary"
            type="button"
            onClick={downloadCollage}
            disabled={photos.length === 0 || isDownloading}
          >
            <Download aria-hidden="true" size={18} />
            {isDownloading ? "Preparando" : "Descargar"}
          </button>
        </div>
      </div>

      {photos.length > 0 ? (
        <div className="collage-stage" ref={boardRef} aria-label="Collage generado con fotos del recorrido">
          <div className="collage-paper" aria-hidden="true" />
          {photos.map((photo, index) => {
            const style = {
              "--x": `${photo.x}%`,
              "--y": `${photo.y}%`,
              "--w": `${photo.width}%`,
              "--r": `${photo.rotation}deg`,
              "--tone": photo.tone.toFixed(3),
              zIndex: photo.zIndex,
            } as CSSProperties

            return (
              <figure
                className={`collage-photo collage-shape-${photo.shape}`}
                key={`${seed}-${photo.src}`}
                style={style}
              >
                <button
                  className="collage-photo-button"
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                  aria-label={`Ampliar ${photo.alt}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.src} alt={photo.alt} loading={index < 6 ? "eager" : "lazy"} />
                </button>
              </figure>
            )
          })}
        </div>
      ) : (
        <div className="collage-empty">
          <p>Agrega fotos en assets/images/collage y vuelve a ejecutar el proyecto.</p>
        </div>
      )}

      {selectedPhoto ? (
        <div className="collage-lightbox" role="dialog" aria-modal="true" aria-label="Foto ampliada">
          <button className="collage-lightbox-backdrop" type="button" onClick={() => setSelectedPhoto(null)} />
          <figure className="collage-lightbox-frame">
            <button className="collage-lightbox-close" type="button" onClick={() => setSelectedPhoto(null)}>
              <X aria-hidden="true" size={22} />
              <span className="sr-only">Cerrar foto ampliada</span>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
          </figure>
        </div>
      ) : null}
    </section>
  )
}
