"use client"

import { useState } from "react"
import { dias, paradas, type Dia } from "@/lib/viaje-data"
import { PullQuote } from "@/components/viaje/pull-quote"

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function DiaSection({
  dia,
  abierto,
  onToggle,
}: {
  dia: Dia
  abierto: boolean
  onToggle: () => void
}) {
  const tieneSidebar = dia.fotos.length > 0 || Boolean(dia.videoUrl)

  return (
    <div className="dia-section">
      <button
        type="button"
        className={`dia-header${abierto ? " active" : ""}`}
        id={`dia-header-${dia.numero}`}
        onClick={onToggle}
        aria-expanded={abierto}
        aria-controls={`dia-content-${dia.numero}`}
      >
        <div className="dia-num">{dia.numeroLabel}</div>
        <div className="dia-info">
          <h3>{dia.titulo}</h3>
          <p>
            {dia.lugar} &nbsp;·&nbsp; {dia.fecha}
          </p>
        </div>
        <div className="dia-toggle">+</div>
      </button>

      {abierto && (
        <div className="dia-content" id={`dia-content-${dia.numero}`}>
          <div className={`dia-body${tieneSidebar ? "" : " dia-body-solo"}`}>
            <div className="dia-texto">
              {dia.frase && <p className="frase">{dia.frase}</p>}
              {dia.parrafos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="dia-tags">
                {dia.tags.map((t, i) => (
                  <span
                    key={i}
                    className={
                      "tag" +
                      (t.variant && t.variant !== "default"
                        ? ` tag-${t.variant}`
                        : "")
                    }
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            </div>

            {tieneSidebar && (
              <div className="dia-sidebar">
                {dia.fotos.map((f, i) => (
                  <figure
                    className="dia-foto"
                    key={i}
                    style={f.aspect ? { aspectRatio: f.aspect } : undefined}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.src || "/placeholder.svg"} alt={f.alt} loading="lazy" />
                  </figure>
                ))}
                {dia.videoUrl && (
                  <a
                    className="video-placeholder"
                    href={dia.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="play-circle">
                      <PlayIcon />
                    </div>
                    <span className="video-label">
                      {dia.videoLabel ?? "Ver video en YouTube"}
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function Transecto() {
  // El día 1 inicia abierto y activo, igual que en el HTML original.
  const [abiertos, setAbiertos] = useState<Set<number>>(() => new Set([1]))
  const [activo, setActivo] = useState(1)

  const toggleDia = (n: number) => {
    setAbiertos((prev) => {
      const next = new Set(prev)
      if (next.has(n)) next.delete(n)
      else next.add(n)
      return next
    })
    setActivo(n)
  }

  const abrirDia = (n: number) => {
    setAbiertos((prev) => {
      if (prev.has(n)) return prev
      const next = new Set(prev)
      next.add(n)
      return next
    })
    setActivo(n)
    requestAnimationFrame(() => {
      document
        .getElementById(`dia-header-${n}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  return (
    <>
      <section className="timeline-strip" aria-label="Línea de tiempo del recorrido">
        <p className="section-eyebrow" style={{ marginBottom: "1.5rem" }}>
          Bitácora de Descenso
        </p>
        <div className="timeline-track">
          <div className="tl-track-line" aria-hidden="true" />
          {paradas.map((p) => (
            <button
              type="button"
              key={p.dia}
              className={`tl-stop${activo === p.dia ? " activo" : ""}`}
              onClick={() => abrirDia(p.dia)}
              aria-label={`Ir al día ${p.dia}: ${p.lugar}`}
            >
              <div className="tl-circle">{p.circulo}</div>
              <span className="tl-stop-dia">{p.fecha}</span>
              <span className="tl-stop-lugar">{p.lugar}</span>
            </button>
          ))}
        </div>
      </section>

      <div id="dias">
        <div className="dias-header">
          <h2>El Transecto</h2>
          <span>Haz clic en cada día para expandir el reporte</span>
        </div>

        {dias.slice(0, 4).map((dia) => (
          <DiaSection
            key={dia.numero}
            dia={dia}
            abierto={abiertos.has(dia.numero)}
            onToggle={() => toggleDia(dia.numero)}
          />
        ))}

        <PullQuote />

        {dias.slice(4).map((dia) => (
          <DiaSection
            key={dia.numero}
            dia={dia}
            abierto={abiertos.has(dia.numero)}
            onToggle={() => toggleDia(dia.numero)}
          />
        ))}
      </div>
    </>
  )
}
