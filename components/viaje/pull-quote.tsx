import { pullQuote } from "@/lib/viaje-data"

export function PullQuote() {
  return (
    <div className="pull-quote">
      <blockquote>{`"${pullQuote.cita}"`}</blockquote>
      <cite>{pullQuote.autor}</cite>
    </div>
  )
}
