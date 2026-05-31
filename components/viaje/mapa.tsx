export function Mapa() {
  return (
    <section className="mapa-section" id="mapa">
      <p className="section-eyebrow">Cartografía del trayecto</p>
      <h2>El mapa del descenso</h2>
      <div className="mapa-embed">
        <svg
          className="mapa-embed-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-3V7m6 16l4.553-2.276A1 1 0 0021 19.382V8.618a1 1 0 00-.553-.894L15 5m0 15V5M9 7l6-2" />
        </svg>
        <p>
          Mapa interactivo del recorrido
          <br />
          <span style={{ fontSize: "0.75rem", color: "var(--arena)" }}>
            Pega aquí el código de Google My Maps
          </span>
        </p>
        <code>{'<iframe src="TU_LINK_AQUI" ...></iframe>'}</code>
      </div>
    </section>
  )
}
