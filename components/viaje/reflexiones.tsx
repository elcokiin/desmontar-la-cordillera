import { reflexiones } from "@/lib/viaje-data"

export function Reflexiones() {
  return (
    <section className="reflexiones" id="reflexiones">
      <p className="section-eyebrow">Cierre analítico</p>
      <h2>Cicatrices en el terreno</h2>
      <div className="reflexion-grid">
        {reflexiones.map((r) => (
          <div className="reflexion-card" key={r.numero}>
            <span className="reflexion-num">{r.numero}</span>
            <h3>{r.titulo}</h3>
            <p>{r.texto}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
