"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useScrollProgress } from "@/hooks/use-scroll-progress"

const enlaces = [
  { href: "#dias", label: "Días" },
  { href: "#mapa", label: "Mapa" },
  { href: "#collage", label: "Mosaico" },
  { href: "#reflexiones", label: "Reflexiones" },
  { href: "#equipo", label: "Equipo" },
]

export function NavBar() {
  const scrollProgress = useScrollProgress()
  // Barra de progreso de lectura: arranca en 10% y se completa al llegar al final del scroll.
  const progreso = 10 + scrollProgress * 90
  // Alto del header para anclar la línea de progreso justo sobre su borde inferior.
  const [navAltura, setNavAltura] = useState(64)

  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".nav-bar")

    function actualizarAltura() {
      if (nav) setNavAltura(nav.offsetHeight)
    }

    actualizarAltura()
    const observer = nav ? new ResizeObserver(actualizarAltura) : null
    if (nav) observer?.observe(nav)
    window.addEventListener("resize", actualizarAltura)

    return () => {
      observer?.disconnect()
      window.removeEventListener("resize", actualizarAltura)
    }
  }, [])

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    // Solo interceptamos anclas internas
    if (!href.startsWith("#")) return
    e.preventDefault()

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const behavior: ScrollBehavior = prefersReduced ? "auto" : "smooth"

    // "#" => volver al inicio de la página
    if (href === "#") {
      window.scrollTo({ top: 0, behavior })
      return
    }

    const target = document.querySelector<HTMLElement>(href)
    if (!target) return

    // Compensamos la altura de la barra de navegación fija
    const nav = document.querySelector<HTMLElement>(".nav-bar")
    const offset = nav ? nav.offsetHeight : 0
    const top = target.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({ top, behavior })
  }

  return (
    <nav className="nav-bar">
      <a href="#" className="nav-logo flex flex-row items-center gap-2" onClick={(e) => handleClick(e, "#")}>
        <svg
          className="nav-logo-icon"
          viewBox="0 0 32 32"
          width="24"
          height="24"
          role="img"
          aria-label="Logo planeta Tierra"
        >
          <circle cx="16" cy="16" r="14" fill="#0284c7" stroke="#f9e076" strokeWidth="2" />
          <clipPath id="navLogoGlobe">
            <circle cx="16" cy="16" r="13" />
          </clipPath>
          <g clipPath="url(#navLogoGlobe)" fill="#327028">
            <path d="M5 11c3-1 6 0 7 2s-1 4-3 4-3-1-4-3-1-2 0-3Z" />
            <path d="M17 5c3 0 5 2 6 4s-1 4-3 4-2-2-4-3-2-5 1-5Z" />
            <path d="M13 18c3-1 7 0 9 3s0 5-3 6-6-1-7-4 0-4 1-5Z" />
          </g>
        </svg>
        Geografía Humana · Colombia
      </a>
      <ul className="nav-links">
        {enlaces.map((e) => (
          <li key={e.href}>
            <a href={e.href} onClick={(ev) => handleClick(ev, e.href)}>
              {e.label}
            </a>
          </li>
        ))}
      </ul>
      <div
        className="nav-progreso"
        style={{ transform: `scaleX(${progreso / 100})`, top: `${navAltura}px` }}
        role="progressbar"
        aria-label="Progreso de lectura"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progreso)}
      />
    </nav>
  )
}
