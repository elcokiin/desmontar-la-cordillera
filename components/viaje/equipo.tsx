import Image from "next/image"
import { equipo } from "@/lib/viaje-data"

export function Equipo() {
  return (
    <section className="equipo" id="equipo">
      <p className="section-eyebrow">Quiénes recorrieron la ruta</p>
      <h2>Los Expedicionarios</h2>
      <div className="equipo-grid">
        {equipo.map((p) => (
          <div className="equipo-card" key={p.nombre}>
            <div className="equipo-avatar">
              <Image
                src={p.foto || "/placeholder-user.jpg"}
                alt={`Retrato de ${p.nombre}`}
                fill
                loading="lazy"
                sizes="(max-width: 760px) 128px, 160px"
              />
            </div>
            <div>
              <span className="equipo-nombre">{p.nombre}</span>
              <span className="equipo-rol">{p.rol}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
