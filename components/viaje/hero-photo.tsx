"use client"

import type { CSSProperties, PointerEvent } from "react"

type HeroPhotoStyle = CSSProperties & {
  "--hero-photo-x"?: string
  "--hero-photo-y"?: string
  "--hero-photo-tilt-x"?: string
  "--hero-photo-tilt-y"?: string
}

export function HeroPhoto() {
  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const frame = event.currentTarget
    const rect = frame.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    const tiltY = (x - 0.5) * 8
    const tiltX = (0.5 - y) * 8

    frame.style.setProperty("--hero-photo-x", `${x * 100}%`)
    frame.style.setProperty("--hero-photo-y", `${y * 100}%`)
    frame.style.setProperty("--hero-photo-tilt-x", `${tiltX}deg`)
    frame.style.setProperty("--hero-photo-tilt-y", `${tiltY}deg`)
  }

  function handlePointerLeave(event: PointerEvent<HTMLElement>) {
    const frame = event.currentTarget

    frame.style.setProperty("--hero-photo-x", "50%")
    frame.style.setProperty("--hero-photo-y", "48%")
    frame.style.setProperty("--hero-photo-tilt-x", "0deg")
    frame.style.setProperty("--hero-photo-tilt-y", "0deg")
  }

  const style: HeroPhotoStyle = {
    "--hero-photo-x": "50%",
    "--hero-photo-y": "48%",
    "--hero-photo-tilt-x": "0deg",
    "--hero-photo-tilt-y": "0deg",
  }

  return (
    <figure
      className="hero-image"
      aria-label="Registro fotográfico del transecto"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={style}
    >
      <span className="hero-image-depth" aria-hidden="true" />
      <span className="hero-image-stage">
        <span className="hero-image-glow" aria-hidden="true" />
        <img src="/assets/hero/cordillera-hero.png" alt="Grupo reunido con la Comunidad de Paz" />
      </span>
    </figure>
  )
}
