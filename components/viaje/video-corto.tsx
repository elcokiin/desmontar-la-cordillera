"use client"

import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    YT?: any
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<void> | null = null

// Carga (una sola vez) la API de IFrame de YouTube.
function cargarYouTubeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()
  if (window.YT && window.YT.Player) return Promise.resolve()
  if (apiPromise) return apiPromise

  apiPromise = new Promise<void>((resolve) => {
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve()
    }
    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script")
      tag.id = "youtube-iframe-api"
      tag.src = "https://www.youtube.com/iframe_api"
      document.head.appendChild(tag)
    }
  })
  return apiPromise
}

function formatearTiempo(seg: number): string {
  if (!Number.isFinite(seg) || seg < 0) seg = 0
  const m = Math.floor(seg / 60)
  const s = Math.floor(seg % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function VideoCorto({
  videoId,
  label,
}: {
  videoId: string
  label?: string
}) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<any>(null)
  const rafRef = useRef<number | null>(null)
  const arrastrandoRef = useRef(false)

  const [listo, setListo] = useState(false)
  const [reproduciendo, setReproduciendo] = useState(false)
  const [silenciado, setSilenciado] = useState(false)
  const [actual, setActual] = useState(0)
  const [duracion, setDuracion] = useState(0)
  // YouTube error 101/150 => el dueño del video desactivó la reproducción incrustada.
  const [bloqueado, setBloqueado] = useState(false)

  useEffect(() => {
    let cancelado = false

    cargarYouTubeAPI().then(() => {
      if (cancelado || !hostRef.current) return
      playerRef.current = new window.YT.Player(hostRef.current, {
        videoId,
        playerVars: {
          rel: 0,
          controls: 0, // ocultamos los controles nativos de YouTube
          modestbranding: 1,
          playsinline: 1,
          fs: 0,
          disablekb: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: (e: any) => {
            if (cancelado) return
            setDuracion(e.target.getDuration() || 0)
            setSilenciado(e.target.isMuted?.() ?? false)
            setListo(true)
          },
          onError: (err: any) => {
            if (cancelado) return
            // 101 y 150: reproducción incrustada no permitida por el autor.
            if (err?.data === 101 || err?.data === 150) setBloqueado(true)
          },
          onStateChange: (e: any) => {
            const YT = window.YT
            setReproduciendo(e.data === YT.PlayerState.PLAYING)
            if (e.data === YT.PlayerState.PLAYING) {
              setDuracion(playerRef.current?.getDuration?.() || 0)
            }
          },
        },
      })
    })

    function tick() {
      const p = playerRef.current
      if (p && p.getCurrentTime && !arrastrandoRef.current) {
        setActual(p.getCurrentTime() || 0)
        const d = p.getDuration?.() || 0
        if (d) setDuracion(d)
      }
      rafRef.current = window.requestAnimationFrame(tick)
    }
    rafRef.current = window.requestAnimationFrame(tick)

    return () => {
      cancelado = true
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      try {
        playerRef.current?.destroy?.()
      } catch {
        // noop
      }
    }
  }, [videoId])

  const alternarPlay = () => {
    const p = playerRef.current
    if (!p) return
    if (reproduciendo) p.pauseVideo()
    else p.playVideo()
  }

  const alternarMute = () => {
    const p = playerRef.current
    if (!p) return
    if (p.isMuted()) {
      p.unMute()
      setSilenciado(false)
    } else {
      p.mute()
      setSilenciado(true)
    }
  }

  const buscar = (clientX: number, barra: HTMLDivElement) => {
    const p = playerRef.current
    const d = duracion || p?.getDuration?.() || 0
    if (!p || !d) return
    const rect = barra.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    const t = ratio * d
    setActual(t)
    p.seekTo(t, true)
  }

  const progreso = duracion > 0 ? Math.min(100, (actual / duracion) * 100) : 0

  return (
    <figure className="dia-video">
      <div className="vc-marco">
        <div className="vc-player">
          <div ref={hostRef} className="vc-iframe-host" />
        </div>

        {bloqueado ? (
          <div className="vc-bloqueado">
            <span className="vc-bloqueado-rec" aria-hidden="true" />
            <p className="vc-bloqueado-titulo">Reproducción restringida</p>
            <p className="vc-bloqueado-texto">
              El autor desactivó la reproducción incrustada de este video.
            </p>
            <a
              className="vc-bloqueado-btn"
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver en YouTube
            </a>
          </div>
        ) : (
          <>
            {/* Capa de control superpuesta con la estética de la página */}
            <button
              type="button"
              className={`vc-overlay${reproduciendo ? " reproduciendo" : ""}`}
              onClick={alternarPlay}
              aria-label={reproduciendo ? "Pausar video" : "Reproducir video"}
            >
              <span className="vc-overlay-btn" aria-hidden="true">
                {reproduciendo ? <IconoPausa /> : <IconoPlay />}
              </span>
            </button>

            <div className="vc-barra-control" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="vc-mini-btn"
            onClick={alternarPlay}
            aria-label={reproduciendo ? "Pausar" : "Reproducir"}
          >
            {reproduciendo ? <IconoPausa small /> : <IconoPlay small />}
          </button>

          <span className="vc-tiempo">{formatearTiempo(actual)}</span>

          <div
            className="vc-progreso"
            role="slider"
            aria-label="Barra de reproducción"
            aria-valuemin={0}
            aria-valuemax={Math.round(duracion)}
            aria-valuenow={Math.round(actual)}
            tabIndex={0}
            onPointerDown={(e) => {
              arrastrandoRef.current = true
              e.currentTarget.setPointerCapture(e.pointerId)
              buscar(e.clientX, e.currentTarget)
            }}
            onPointerMove={(e) => {
              if (arrastrandoRef.current) buscar(e.clientX, e.currentTarget)
            }}
            onPointerUp={(e) => {
              arrastrandoRef.current = false
              e.currentTarget.releasePointerCapture(e.pointerId)
            }}
          >
            <div className="vc-progreso-track" />
            <div className="vc-progreso-fill" style={{ width: `${progreso}%` }} />
            <div className="vc-progreso-knob" style={{ left: `${progreso}%` }} />
          </div>

          <span className="vc-tiempo vc-tiempo-total">{formatearTiempo(duracion)}</span>

          <button
            type="button"
            className="vc-mini-btn"
            onClick={alternarMute}
            aria-label={silenciado ? "Activar sonido" : "Silenciar"}
          >
              {silenciado ? <IconoMute /> : <IconoSonido />}
              </button>
            </div>

            {!listo && <div className="vc-cargando" aria-hidden="true" />}
          </>
        )}
      </div>

      {label && (
        <figcaption className="dia-video-pie">
          <span className="dia-video-rec" aria-hidden="true" />
          {label}
        </figcaption>
      )}
    </figure>
  )
}

function IconoPlay({ small }: { small?: boolean }) {
  const s = small ? 16 : 34
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function IconoPausa({ small }: { small?: boolean }) {
  const s = small ? 16 : 34
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor" aria-hidden="true">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  )
}

function IconoSonido() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden="true">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" />
    </svg>
  )
}

function IconoMute() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden="true">
      <path d="M3 9v6h4l5 5V4L7 9H3zm18.5 3-2 2-2-2-1.5 1.5 2 2-2 2L17.5 19l2-2 2 2L23 17.5l-2-2 2-2z" />
    </svg>
  )
}
