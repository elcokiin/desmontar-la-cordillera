"use client"

import type React from "react"

const enlaces = [
  { href: "#dias", label: "Días" },
  { href: "#mapa", label: "Mapa" },
  { href: "#reflexiones", label: "Reflexiones" },
  { href: "#equipo", label: "Equipo" },
]

export function NavBar() {
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
      <a href="#" className="nav-logo" onClick={(e) => handleClick(e, "#")}>
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
    </nav>
  )
}
