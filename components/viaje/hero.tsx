import { heroStats } from "@/lib/viaje-data"

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-text" aria-hidden="true">
        URABÁ
      </div>
      <p className="hero-meta">
        Geografía Humana de Colombia &nbsp;·&nbsp; UPTC &nbsp;·&nbsp; 2026
      </p>
      <h1>
        Desmontar la
        <br />
        <em>cordillera</em>
      </h1>
      <p className="hero-sub">
        <strong>RELATOS DE RUANA, ASFALTO Y BANANO.</strong>
        <br />
        <br />
        De la cuna del <em>sumercé</em> a la tierra del banano y el plátano. Un
        transecto de siete días por las venas del noroccidente colombiano: una
        bitácora viva para leer el mapa y a su gente, justo cuando el frío se
        apaga, la cordillera cede y el país desemboca de golpe en el calor del
        Golfo.
      </p>
      <div className="hero-stats p-6">
        {heroStats.map((s) => (
          <div key={s.lbl}>
            <span className="hero-stat-num">{s.num}</span>
            <span className="hero-stat-lbl">{s.lbl}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
