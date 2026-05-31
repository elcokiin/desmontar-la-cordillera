// Datos del recorrido — edita los textos entre [corchetes] con el contenido real de tu salida de campo.

export type Tag = {
  label: string
  variant?: "verde" | "arena" | "azul" | "default"
}

export type Foto = {
  label: string
  /** relación de aspecto opcional, ej. "1/1" */
  aspect?: string
}

export type Dia = {
  numero: number
  numeroLabel: string // "01"
  titulo: string
  lugar: string
  fecha: string
  frase: string
  parrafos: string[]
  tags: Tag[]
  fotos: Foto[]
  videoLabel: string
  videoNota?: string
}

export type ParadaLinea = {
  dia: number
  circulo: string // "D1"
  fecha: string
  lugar: string
}

export type Reflexion = {
  numero: string
  titulo: string
  texto: string
}

export type Integrante = {
  avatar: string
  nombre: string
  rol: string
}

export const heroStats = [
  { num: "7", lbl: "Días de campo" },
  { num: "[N]", lbl: "Lugares visitados" },
  { num: "[N]", lbl: "Km recorridos" },
  { num: "[N]", lbl: "Voces escuchadas" },
]

export const introCards = [
  { num: "[N]", lbl: "Municipios" },
  { num: "[N]", lbl: "Pisos Térmicos" },
  { num: "[N]", lbl: "Entrevistas" },
  { num: "[N]", lbl: "Fotografías" },
]

export const paradas: ParadaLinea[] = [
  { dia: 1, circulo: "D1", fecha: "[Fecha 1]", lugar: "Tunja / Boyacá" },
  { dia: 2, circulo: "D2", fecha: "[Fecha 2]", lugar: "[Lugar día 2]" },
  { dia: 3, circulo: "D3", fecha: "[Fecha 3]", lugar: "[Lugar día 3]" },
  { dia: 4, circulo: "D4", fecha: "[Fecha 4]", lugar: "[Lugar día 4]" },
  { dia: 5, circulo: "D5", fecha: "[Fecha 5]", lugar: "[Lugar día 5]" },
  { dia: 6, circulo: "D6", fecha: "[Fecha 6]", lugar: "[Lugar día 6]" },
  { dia: 7, circulo: "D7", fecha: "[Fecha 7]", lugar: "Urabá / Mar" },
]

export const dias: Dia[] = [
  {
    numero: 1,
    numeroLabel: "01",
    titulo: '[Título del día 1 — ej: "La salida desde el altiplano"]',
    lugar: "Tunja",
    fecha: "[Fecha]",
    frase:
      "[Frase o cita memorable del día 1 — algo que alguien dijo, algo que vieron, una primera impresión poderosa. Esta primera oración debe enganchar al lector.]",
    parrafos: [
      "[Párrafo descriptivo del día. ¿Qué recorrieron? ¿Qué observaron desde la geografía humana? ¿Qué patrones de poblamiento encontraron? Sé específico con nombres de lugares, comunidades, paisajes.]",
      "[Párrafo de análisis. Conecta lo observado con conceptos de la asignatura: territorios, fronteras, movilidad, identidad, etc.]",
    ],
    tags: [
      { label: "[Concepto geográfico 1]", variant: "verde" },
      { label: "[Región]", variant: "arena" },
      { label: "[Tipo de paisaje]", variant: "default" },
    ],
    fotos: [
      { label: "Foto principal del día 1" },
      { label: "Foto secundaria", aspect: "1/1" },
    ],
    videoLabel: "Video del día 1",
    videoNota: "Pegar link de YouTube",
  },
  {
    numero: 2,
    numeroLabel: "02",
    titulo: "[Título del día 2]",
    lugar: "[Municipio / región]",
    fecha: "[Fecha]",
    frase: "[Frase o cita memorable del día 2]",
    parrafos: [
      "[Descripción del día 2 — lugares, actividades, personas que conocieron, observaciones de campo.]",
      "[Análisis geográfico del día 2]",
    ],
    tags: [
      { label: "[Concepto]", variant: "verde" },
      { label: "[Región]", variant: "arena" },
      { label: "[Tema especial]", variant: "azul" },
    ],
    fotos: [{ label: "Foto principal del día 2" }],
    videoLabel: "Video del día 2",
  },
  {
    numero: 3,
    numeroLabel: "03",
    titulo: "[Título del día 3]",
    lugar: "[Municipio / región]",
    fecha: "[Fecha]",
    frase: "[Frase memorable del día 3]",
    parrafos: ["[Descripción del día 3]", "[Análisis geográfico]"],
    tags: [
      { label: "[Concepto]", variant: "verde" },
      { label: "[Región]", variant: "default" },
    ],
    fotos: [{ label: "Foto día 3" }],
    videoLabel: "Video del día 3",
  },
  {
    numero: 4,
    numeroLabel: "04",
    titulo: "[Título del día 4]",
    lugar: "[Municipio / región]",
    fecha: "[Fecha]",
    frase: "[Frase memorable del día 4]",
    parrafos: ["[Descripción del día 4]", "[Análisis geográfico]"],
    tags: [
      { label: "[Concepto]", variant: "arena" },
      { label: "[Región]", variant: "default" },
    ],
    fotos: [{ label: "Foto día 4" }],
    videoLabel: "Video del día 4",
  },
  {
    numero: 5,
    numeroLabel: "05",
    titulo: "[Título del día 5]",
    lugar: "[Municipio / región]",
    fecha: "[Fecha]",
    frase: "[Frase memorable del día 5]",
    parrafos: ["[Descripción del día 5]", "[Análisis geográfico]"],
    tags: [
      { label: "[Concepto]", variant: "verde" },
      { label: "[Región]", variant: "default" },
    ],
    fotos: [{ label: "Foto día 5" }],
    videoLabel: "Video del día 5",
  },
  {
    numero: 6,
    numeroLabel: "06",
    titulo: "[Título del día 6]",
    lugar: "[Municipio / región]",
    fecha: "[Fecha]",
    frase: "[Frase memorable del día 6]",
    parrafos: ["[Descripción del día 6]", "[Análisis geográfico]"],
    tags: [
      { label: "[Concepto]", variant: "azul" },
      { label: "[Región]", variant: "default" },
    ],
    fotos: [{ label: "Foto día 6" }],
    videoLabel: "Video del día 6",
  },
  {
    numero: 7,
    numeroLabel: "07",
    titulo: '[Título del día 7 — ej: "El nivel del mar y lo que nos llevamos"]',
    lugar: "Urabá",
    fecha: "[Fecha]",
    frase:
      "[Frase con la que cerrar la salida — algo que sintetice el choque térmico y social al llegar al Urabá]",
    parrafos: [
      "[Descripción del último día]",
      "[Reflexión final del día 7 y cierre de la narrativa]",
    ],
    tags: [
      { label: "Síntesis", variant: "verde" },
      { label: "Urabá", variant: "arena" },
    ],
    fotos: [{ label: "Foto día 7" }],
    videoLabel: "Video del día 7",
  },
]

export const pullQuote = {
  cita: "[Cita memorable de la salida de campo — algo que dijo un habitante, una reflexión del grupo, o una frase que resumió la cruda realidad del territorio]",
  autor: "— [Quién lo dijo]  ·  [Lugar], día [N]",
}

export const reflexiones: Reflexion[] = [
  {
    numero: "01 —",
    titulo: "[Título de la primera reflexión]",
    texto:
      "[Escribe aquí 3-4 oraciones sobre este hallazgo académico. ¿Qué aprendieron sobre el poblamiento? ¿Qué teorías geográficas se confirmaron o contradijeron?]",
  },
  {
    numero: "02 —",
    titulo: "[Título de la segunda reflexión]",
    texto:
      "[Segunda reflexión. Puede ser sobre la relación entre geografía y cultura, entre territorio y comunidad, o sobre algo inesperado que encontraron en campo.]",
  },
  {
    numero: "03 —",
    titulo: "[Título de la tercera reflexión]",
    texto:
      "[Tercera reflexión. Idealmente el cierre más potente: ¿qué cambia en cómo entienden Colombia después de esta salida desde la montaña al mar?]",
  },
]

export const equipo: Integrante[] = [
  { avatar: "01", nombre: "[Nombre Integrante 1]", rol: "[Rol o código estudiantil]" },
  { avatar: "02", nombre: "[Nombre Integrante 2]", rol: "[Rol o código estudiantil]" },
  { avatar: "03", nombre: "[Nombre Integrante 3]", rol: "[Rol o código estudiantil]" },
  { avatar: "04", nombre: "[Nombre Integrante 4]", rol: "[Rol o código estudiantil]" },
]

// Geografía del descenso: usado por el altímetro y el cambio de color.
export const ALTITUD_INICIAL = 2820 // metros — Tunja
export const ALTITUD_FINAL = 0 // metros — nivel del mar, Urabá
export const TEMP_INICIAL = 12 // °C — frío de Boyacá
export const TEMP_FINAL = 43 // °C — calor del Urabá

// Lugares del recorrido con su respectiva información.
// `altura` en metros sobre el nivel del mar, `temperatura` en °C.
// Valores de ejemplo: ajústalos con tus datos reales de campo.
export type Lugar = {
  nombre: string
  altura: number // m s. n. m.
  temperatura: number // °C
  coords: [number, number] // [lat, lng] — usado por el mapa interactivo
}

export const lugares: Lugar[] = [
  { nombre: "Tunja", altura: 2820, temperatura: 12, coords: [5.5353, -73.3678] },
  { nombre: "Tocancipá", altura: 2606, temperatura: 14, coords: [4.9667, -73.9117] },
  { nombre: "Villeta", altura: 842, temperatura: 28, coords: [5.0103, -74.4717] },
  { nombre: "La Honda", altura: 229, temperatura: 31, coords: [5.1989, -74.7339] },
  { nombre: "Puerto Triunfo", altura: 150, temperatura: 32, coords: [5.8722, -74.6411] },
  { nombre: "Medellín", altura: 1495, temperatura: 22, coords: [6.2442, -75.5812] },
  { nombre: "Santafé de Antioquia", altura: 550, temperatura: 29, coords: [6.5569, -75.8267] },
  { nombre: "Río Cauca", altura: 50, temperatura: 33, coords: [7.0847, -75.8893] },
  { nombre: "Apartadó", altura: 25, temperatura: 34, coords: [7.8836, -76.6256] },
  { nombre: "Turbo (Antioquia)", altura: 2, temperatura: 35, coords: [8.0922, -76.7281] },
  { nombre: "Medellín", altura: 1495, temperatura: 22, coords: [6.2442, -75.5812] },
  { nombre: "Guatapé", altura: 1925, temperatura: 18, coords: [6.2336, -75.1592] },
  { nombre: "Puerto Boyacá", altura: 110, temperatura: 33, coords: [5.9756, -74.5883] },
]

/**
 * Lugares ordenados del más alto y frío al más bajo y caliente.
 * Ranking: primero por altura (descendente) y, como desempate,
 * por temperatura (ascendente).
 */
export const lugaresOrdenados: Lugar[] = [...lugares].sort((a, b) => {
  if (b.altura !== a.altura) return b.altura - a.altura
  return a.temperatura - b.temperatura
})
