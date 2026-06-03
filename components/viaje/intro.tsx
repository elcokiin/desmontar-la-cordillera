import { introCards, introParrafos } from "@/lib/viaje-data"

export function Intro() {
  return (
    <section className="intro">
      <div className="intro-left">
        <p className="intro-label">Sobre la salida</p>
        <h2>¿Por qué salimos del aula?</h2>
        {introParrafos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="intro-right">
        {introCards.map((c) => (
          <div className="intro-card" key={c.lbl}>
            <span className="intro-card-num">{c.num}</span>
            <span className="intro-card-lbl">{c.lbl}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
