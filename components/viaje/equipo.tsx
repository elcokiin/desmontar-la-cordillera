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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.foto || "/placeholder-user.jpg"} alt={`Retrato de ${p.nombre}`} />
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
