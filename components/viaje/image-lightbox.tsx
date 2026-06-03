"use client"

import { useEffect, useState } from "react"
import { Download, X } from "lucide-react"

import styles from "./image-lightbox.module.css"

export type LightboxImage = {
  src: string
  alt: string
}

type ImageLightboxProps = {
  image: LightboxImage | null
  onClose: () => void
  downloadName?: string
}

function fileNameFromSrc(src: string) {
  return decodeURIComponent(src.split("/").pop() ?? "foto")
}

export function ImageLightbox({ image, onClose, downloadName }: ImageLightboxProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    if (!image) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [image, onClose])

  async function downloadImage() {
    if (!image || isDownloading) return

    setIsDownloading(true)

    try {
      const response = await fetch(image.src)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.download = downloadName ?? fileNameFromSrc(image.src)
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    } finally {
      setIsDownloading(false)
    }
  }

  if (!image) return null

  return (
    <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Foto ampliada">
      <button className={styles.backdrop} type="button" onClick={onClose} />
      <figure className={styles.frame}>
        <div className={styles.controls}>
          <button
            className={styles.iconButton}
            type="button"
            onClick={downloadImage}
            disabled={isDownloading}
          >
            <Download aria-hidden="true" size={21} />
            <span className="sr-only">Descargar foto ampliada</span>
          </button>
          <button className={styles.iconButton} type="button" onClick={onClose}>
            <X aria-hidden="true" size={22} />
            <span className="sr-only">Cerrar foto ampliada</span>
          </button>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} />
      </figure>
    </div>
  )
}
