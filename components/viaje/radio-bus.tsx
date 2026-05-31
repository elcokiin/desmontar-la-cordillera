"use client"

import { useEffect, useRef, useState } from "react"
import { Radio, Pause, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PLAYLIST, rutaCancion } from "@/lib/musica"

/**
 * "La radio del bus" — la música NO suena automáticamente.
 * Un diálogo aparece al inicio invitando a encender la radio; al aceptar,
 * empieza a sonar y el botón flotante indica que está encendida.
 */
export function RadioBus() {
  const [dialogoAbierto, setDialogoAbierto] = useState(true)
  const [encendida, setEncendida] = useState(false)
  const [indice, setIndice] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const hayCanciones = PLAYLIST.length > 0
  const cancionActual = hayCanciones ? PLAYLIST[indice % PLAYLIST.length] : null

  // Reproducir / pausar según el estado.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (encendida) {
      audio.play().catch(() => {
        // El navegador puede bloquear la reproducción; se reintenta con el botón.
      })
    } else {
      audio.pause()
    }
  }, [encendida, indice])

  const encender = () => {
    setEncendida(true)
    setDialogoAbierto(false)
  }

  const alternar = () => setEncendida((v) => !v)

  const siguiente = () => {
    if (!hayCanciones) return
    setIndice((i) => (i + 1) % PLAYLIST.length)
    setEncendida(true)
  }

  const alTerminar = () => {
    if (PLAYLIST.length > 1) {
      setIndice((i) => (i + 1) % PLAYLIST.length)
    } else {
      setEncendida(false)
    }
  }

  return (
    <>
      {/* Audio real, alimentado desde la carpeta /musica */}
      {cancionActual && (
        <audio
          ref={audioRef}
          src={rutaCancion(cancionActual)}
          onEnded={alTerminar}
          preload="none"
        />
      )}

      {/* Diálogo de bienvenida */}
      <Dialog open={dialogoAbierto} onOpenChange={setDialogoAbierto}>
        <DialogContent className="border-[3px] border-[var(--acento)] bg-[var(--negro)] text-[var(--blanco)] sm:rounded-none">
          <DialogHeader>
            <DialogTitle className="font-bebas text-3xl tracking-wide text-[var(--arena)]">
              ¿Encender la radio del bus?
            </DialogTitle>
            <DialogDescription className="text-[var(--blanco)]/80">
              Vas a recorrer la carretera de Tunja al Urabá. Pon música de viaje
              para acompañar el descenso. Tú decides cuándo suena.
            </DialogDescription>
          </DialogHeader>
          {!hayCanciones && (
            <p className="border-l-4 border-[var(--coral)] bg-[var(--gris-tarjeta)] p-3 text-sm text-[var(--blanco)]/80">
              Aún no hay canciones. Copia tus archivos <code>.mp3</code> en la
              carpeta <strong>public/musica/</strong> y añade sus nombres en{" "}
              <strong>lib/musica.ts</strong>.
            </p>
          )}
          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              className="rounded-none border-2 border-[var(--blanco)] bg-transparent text-[var(--blanco)] hover:bg-[var(--blanco)] hover:text-[var(--negro)]"
              onClick={() => setDialogoAbierto(false)}
            >
              Ahora no
            </Button>
            <Button
              className="rounded-none border-2 border-[var(--negro)] bg-[var(--arena)] font-bold uppercase tracking-wide text-[var(--negro)] hover:bg-[var(--arena)]/90"
              onClick={encender}
              disabled={!hayCanciones}
            >
              <Radio className="size-4" />
              Encender la radio del bus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Botón flotante de control */}
      <div className="radio-fab flex items-center gap-2">
        <Button
          onClick={encendida ? alternar : encender}
          disabled={!hayCanciones}
          className={
            "rounded-none border-2 font-bold uppercase tracking-wide " +
            (encendida
              ? "border-[var(--negro)] bg-[var(--arena)] text-[var(--negro)] hover:bg-[var(--arena)]/90"
              : "border-[var(--acento)] bg-[var(--negro)] text-[var(--blanco)] hover:bg-[var(--gris-tarjeta)]")
          }
        >
          {encendida ? (
            <>
              <Pause className="size-4" />
              Radio encendida
            </>
          ) : (
            <>
              <Radio className="size-4" />
              Encender la radio del bus
            </>
          )}
        </Button>

        {encendida && PLAYLIST.length > 1 && (
          <Button
            size="icon"
            onClick={siguiente}
            aria-label="Siguiente canción"
            className="rounded-none border-2 border-[var(--acento)] bg-[var(--negro)] text-[var(--blanco)] hover:bg-[var(--gris-tarjeta)]"
          >
            <SkipForward className="size-4" />
          </Button>
        )}
      </div>
    </>
  )
}
