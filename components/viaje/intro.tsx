import { introCards } from "@/lib/viaje-data"

export function Intro() {
  return (
    <section className="intro">
      <div className="intro-left">
        <p className="intro-label">Sobre la salida</p>
        <h2>¿Por qué salimos del aula?</h2>
        <p>
          [Escribe aquí una introducción de 2-3 párrafos sobre el propósito
          académico de la salida de campo. ¿Qué preguntas buscaban responder?
          ¿Qué teorías geográficas pusieron a prueba? ¿Qué regiones recorrieron y
          por qué esas y no otras?]
        </p>
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
