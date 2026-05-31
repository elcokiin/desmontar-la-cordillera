const enlaces = [
  { href: "#dias", label: "Días" },
  { href: "#mapa", label: "Mapa" },
  { href: "#reflexiones", label: "Reflexiones" },
  { href: "#equipo", label: "Equipo" },
]

export function NavBar() {
  return (
    <nav className="nav-bar">
      <a href="#" className="nav-logo">
        Geografía Humana · Colombia
      </a>
      <ul className="nav-links">
        {enlaces.map((e) => (
          <li key={e.href}>
            <a href={e.href}>{e.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
