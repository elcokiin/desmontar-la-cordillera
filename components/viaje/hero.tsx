import { heroStats } from "@/lib/viaje-data"

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-text" aria-hidden="true">
        URABÁ
      </div>
      <p className="hero-meta">
        Geografía Humana de Colombia &nbsp;·&nbsp; [Universidad] &nbsp;·&nbsp; [Año]
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
        Siete días descendiendo por las grietas de Cundinamarca y Antioquia para
        entender qué pasa con la tierra y la gente cuando el frío de Tunja se
        rinde ante el calor del Urabá.
      </p>
      <div className="hero-stats">
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
