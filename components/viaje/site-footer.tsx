import { Github } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="viaje-footer">
      <blockquote className="footer-quote">
        <span className="footer-quote-mark" aria-hidden="true">
          “
        </span>
        <div>
          <p>
            No estudiamos con él propósito de acumular conocimientos estáticos y sin contenido
            humano, nuestra causa como estudiantes es la del conocimiento militante; refuta y
            transforma, revoluciona la realidad social, política, cultural y científica, no sé
            engañen las clases dominantes: somos una revolución, esa es nuestra bandera.
          </p>
          <cite>José Revueltas, 1968</cite>
        </div>
      </blockquote>
      <div className="footer-meta">
        <span className="footer-logo">Geografía Humana · UPTC</span>
        <span>
          Licenciatura en Ciencias Sociales &nbsp;·&nbsp; Geografía Humana &nbsp;·&nbsp; 2026
        </span>
        <span>Informe de salida de campo: Tunja - Urabá</span>
        <a
          className="footer-code-link"
          href="https://github.com/elcokiin/desmontar-la-cordillera"
          target="_blank"
          rel="noreferrer"
        >
          <span>El código de la página lo pueden encontrar aquí:</span>
          <Github aria-hidden="true" size={18} />
          <strong>github elcokiin</strong>
        </a>
      </div>
    </footer>
  )
}
