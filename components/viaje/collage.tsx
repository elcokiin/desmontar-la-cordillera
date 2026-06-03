import { collage } from "@/lib/viaje-data"

export function Collage() {
  return (
    <section className="collage-section" id="collage" aria-labelledby="collage-title">
      <p className="section-eyebrow">Memoria visual</p>
      <h2 id="collage-title">El mosaico del descenso</h2>
      <p className="collage-intro">
        Fragmentos de siete días entre la ruana y el banano: rostros, ríos,
        laderas y caminos que dibujan el transecto de la cordillera al Golfo.
      </p>
      <div className="collage-grid">
        {collage.map((foto, i) => (
          <figure className={`collage-item collage-item-${i + 1}`} key={foto.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={foto.src || "/placeholder.svg"} alt={foto.alt} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  )
}
