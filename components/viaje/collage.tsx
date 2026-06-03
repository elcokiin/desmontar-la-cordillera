"use client"

import Image from "next/image"
import { useMemo, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Download, RefreshCcw } from "lucide-react"
import { toPng } from "html-to-image"

import { collageImages } from "@/lib/collage-images"
import { scheduleImagePreviewPrefetch } from "@/lib/image-prefetch"
import { ImageLightbox } from "@/components/viaje/image-lightbox"
import styles from "./collage.module.css"

gsap.registerPlugin(ScrollTrigger)

const PHOTO_COUNT = 22
const shapes = ["classic", "rounded", "ticket", "soft", "wide"] as const
const shapeClassNames: Record<(typeof shapes)[number], string> = {
  classic: "",
  rounded: styles.shapeRounded,
  ticket: styles.shapeTicket,
  soft: styles.shapeSoft,
  wide: styles.shapeWide,
}
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
  const cancelPrefetchRef = useRef<(() => void) | null>(null)
  const photos = useMemo(() => generateLayout(seed), [seed])

  useGSAP(
    () => {
      if (photos.length === 0) return

      const items = gsap.utils.toArray<HTMLElement>(`.${styles.photo}`)

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

  function refreshCollage() {
    cancelPrefetchRef.current?.()
    cancelPrefetchRef.current = null
    setSelectedPhoto(null)
    setSeed(`cordillera-${Date.now()}-${Math.random()}`)
  }

  function prefetchPhoto(src: string) {
    cancelPrefetchRef.current?.()
    cancelPrefetchRef.current = scheduleImagePreviewPrefetch(src)
  }

  function cancelPrefetch() {
    cancelPrefetchRef.current?.()
    cancelPrefetchRef.current = null
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
    <section className={styles.section} id="collage" aria-labelledby="collage-title" ref={sectionRef}>
      <div className={styles.heading}>
        <div>
          <p className="section-eyebrow">Memoria visual</p>
          <h2 id="collage-title">El mosaico del descenso</h2>
          <p className={styles.intro}>
            Fragmentos de siete días entre la ruana y el banano: rostros, ríos,
            laderas y caminos que dibujan el transecto de la cordillera al Golfo.
          </p>
        </div>
        <div className={styles.actions} aria-label="Controles del mosaico">
          <button className={styles.action} type="button" onClick={refreshCollage}>
            <RefreshCcw aria-hidden="true" size={18} />
            Nuevo mosaico
          </button>
          <button
            className={`${styles.action} ${styles.actionPrimary}`}
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
        <div className={styles.stage} ref={boardRef} aria-label="Collage generado con fotos del recorrido">
          <div className={styles.paper} aria-hidden="true" />
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
                className={`${styles.photo} ${shapeClassNames[photo.shape]}`}
                key={`${seed}-${photo.src}`}
                style={style}
              >
                <button
                  className={styles.photoButton}
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                  onPointerEnter={() => prefetchPhoto(photo.src)}
                  onPointerLeave={cancelPrefetch}
                  aria-label={`Ampliar ${photo.alt}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={430}
                    height={320}
                    loading={index < 4 ? "eager" : "lazy"}
                    fetchPriority={index < 4 ? "low" : "auto"}
                    sizes="(max-width: 560px) 220px, (max-width: 900px) 280px, 430px"
                  />
                </button>
              </figure>
            )
          })}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>Agrega fotos en assets/images/collage y vuelve a ejecutar el proyecto.</p>
        </div>
      )}

      <ImageLightbox image={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </section>
  )
}
