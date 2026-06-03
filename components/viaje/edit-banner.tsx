"use client"

import { useEffect, useState } from "react"

const FECHA_LIMITE = new Date("2026-06-21T00:00:00-05:00").getTime()

export function EditBanner() {
  const [mostrar, setMostrar] = useState(false)

  useEffect(() => {
    setMostrar(Date.now() < FECHA_LIMITE)
  }, [])

  if (!mostrar) return null

  return (
    <div className="edit-banner">
      <div className="edit-dot" aria-hidden="true" />
      <blockquote className="edit-quote">
        <p>
          "Caminemos, caminemos la palabra para decirle al país y al mundo que
          aquí hay un pueblo digno. Ha llegado el tiempo de los pueblos."
        </p>
        <cite>Aída Marina Quilcué</cite>
        <span className="edit-secret" aria-hidden="true">
          <span>Continuemos con el cambio</span>
          <span>en segunda vuelta.</span>
        </span>
      </blockquote>
    </div>
  )
}
