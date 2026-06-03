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
      Cepeda Presi
    </div>
  )
}
