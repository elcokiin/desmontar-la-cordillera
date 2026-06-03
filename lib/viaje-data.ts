// Datos del recorrido "Desmontar la cordillera" — contenido tomado del documento
// desmontando-la-cordillera.md. Las imágenes viven en /public/assets.

export type Tag = {
  label: string
  variant?: "verde" | "arena" | "azul" | "default"
}

export type Foto = {
  /** ruta servida desde /public, ej. "/assets/Days/image1.png" */
  src: string
  alt: string
  /** relación de aspecto opcional, ej. "1/1" */
  aspect?: string
}

export type Dia = {
  numero: number
  numeroLabel: string // "01"
  titulo: string
  lugar: string
  fecha: string
  frase?: string
  parrafos: string[]
  tags: Tag[]
  fotos: Foto[]
  videoId?: string
  videoLabel?: string
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
  /** ruta de la foto servida desde /public */
  foto: string
  nombre: string
  rol: string
}

export type FotoCollage = {
  src: string
  alt: string
}

export const heroStats = [
  { num: "7", lbl: "Días de campo" },
  { num: "13", lbl: "Lugares representativos" },
  { num: "1.123", lbl: "Km recorridos" },
  { num: "∞", lbl: "Relatos a ras de suelo" },
]

export const introCards = [
  { num: "3", lbl: "Pisos térmicos" },
  { num: "3", lbl: "Departamentos clave" },
  { num: "+100", lbl: "Picaduras en Urabá" },
  { num: "1", lbl: "Relatos de amor en el bus" },
]

export const introParrafos = [
  "Salimos del aula porque la teoría, aunque indispensable, nunca es suficiente. En la universidad recibimos las bases conceptuales, pero entender la geografía exige contrastar los libros con la realidad bajo una premisa innegociable, ya que nuestro verdadero laboratorio es el territorio. Dejamos los pupitres para ir a observar y documentar cómo las dinámicas sociales, las políticas de ordenamiento y los modelos económicos operan realmente en el espacio cotidiano, más allá de lo que muestran los mapas y las estadísticas.",
  "Para poner a prueba estos conceptos, esta salida de campo nos planteó recorrer un transecto muy específico: descender desde el altiplano cundiboyacense, cruzar la complejidad urbana del Valle de Aburrá, hasta alcanzar la frontera agroindustrial del Golfo de Urabá. El propósito académico fue claro: analizar sobre el terreno cómo cambian las formas de vida, el trabajo y el uso del suelo a medida que disminuye la altitud. Durante siete días analizamos estas tres regiones para comprobar, desde la geografía humana, cómo las condiciones del relieve moldean el desarrollo, la desigualdad y la ocupación del espacio en Colombia.",
]

export const paradas: ParadaLinea[] = [
  { dia: 1, circulo: "D1", fecha: "19 may 2026", lugar: "Tocancipá → Honda" },
  { dia: 2, circulo: "D2", fecha: "20 may 2026", lugar: "Occidente Antioqueño" },
  { dia: 3, circulo: "D3", fecha: "21 may 2026", lugar: "San José de Apartadó" },
  { dia: 4, circulo: "D4", fecha: "22 may 2026", lugar: "Urabá / Turbo" },
  { dia: 5, circulo: "D5", fecha: "23 may 2026", lugar: "Valle de Aburrá" },
  { dia: 6, circulo: "D6", fecha: "24 may 2026", lugar: "Guatapé / El Peñol" },
  { dia: 7, circulo: "D7", fecha: "25 may 2026", lugar: "Puerto Boyacá" },
]

export const dias: Dia[] = [
  {
    numero: 1,
    numeroLabel: "01",
    titulo:
      "Del altiplano al majestuoso río Magdalena, cuna de vida y eje articulador del territorio",
    lugar: "Tocancipá · La Vega · Villeta · Honda",
    fecha: "19 may 2026",
    parrafos: [
      "El 19 de mayo de 2026 emprendimos la ruta número uno, un recorrido que permitió observar diversas dinámicas territoriales, económicas y sociales presentes en el corredor que conecta el altiplano cundiboyacense con el valle del río Magdalena.",
      "Nuestro primer alto fue en Tocancipá, municipio que ha adquirido una creciente relevancia dentro de la articulación territorial entre Tunja y Bogotá. Su ubicación estratégica ha favorecido profundas transformaciones espaciales que responden a las exigencias de las dinámicas contemporáneas. En este contexto, Tocancipá se configura como un nodo de conexión entre la capital y los municipios circundantes, los cuales han experimentado procesos de urbanización e industrialización que los han convertido en centros de apoyo para la actividad económica y productiva de la gran urbe.",
      "Posteriormente, nos dirigimos hacia La Vega, en Cundinamarca. Allí fue posible aproximarnos a las dinámicas sociales y económicas que caracterizan la vida cotidiana de sus habitantes. Aunque se trató de una observación breve, permitió reconocer algunas de las particularidades que configuran el territorio y las formas en que la población interactúa con su entorno.",
      "Más adelante, el recorrido continuó hacia Villeta, municipio reconocido por su tradición panelera y su vocación turística. En este espacio se reflexionó sobre la importancia económica y cultural de la producción de panela, así como sobre las prácticas de ocio que han contribuido a consolidar su identidad local. Entre ellas destacan los reinados, las festividades y las geografías nocturnas que, cada fin de semana, atraen visitantes y dinamizan la economía regional.",
      "Finalmente, llegamos a Honda, Tolima, donde tuvimos un acercamiento directo con pescadores del río Magdalena. A través de sus relatos conocimos las experiencias acumuladas durante años de trabajo en una actividad fundamental para la subsistencia de numerosas familias, aunque frecuentemente invisibilizada por otros sectores de la sociedad. Este encuentro permitió comprender la profunda relación que estas comunidades han construido con el río Magdalena, concebido no solo como una fuente de sustento, sino también como un elemento estructurante de sus formas de habitar, de sus prácticas culturales y de su vínculo con el territorio.",
      "Análisis: a pesar de la relativa cercanía geográfica entre Tocancipá, La Vega, Villeta y Honda, cada municipio ha desarrollado dinámicas culturales y económicas particulares, determinadas en gran medida por sus características ambientales y su relación con el agua. Mientras Tocancipá se encuentra influenciado por los procesos de urbanización e industrialización derivados de su proximidad a Bogotá, La Vega y Villeta conservan una identidad más vinculada a la agricultura, el turismo y las tradiciones locales. Por su parte, en Honda la vida cotidiana gira alrededor del río Magdalena, cuya presencia ha moldeado históricamente las formas de trabajo, los saberes y las prácticas culturales de sus habitantes. Así, el recorrido permitió comprender que los caudales, ríos y fuentes hídricas no solo condicionan las actividades productivas, sino que también configuran distintas maneras de habitar el territorio, construir identidad y relacionarse con el entorno.",
    ],
    tags: [
      { label: "Corredor altiplano–Magdalena", variant: "verde" },
      { label: "Cundinamarca · Tolima", variant: "arena" },
      { label: "Río y territorio", variant: "azul" },
    ],
    fotos: [
      { src: "/assets/Days/image1.png", alt: "Día 1 — corredor del altiplano al río Magdalena" },
      { src: "/assets/Days/image2.png", alt: "Día 1 — pescadores del río Magdalena en Honda", aspect: "1/1" },
    ],
    videoId: "nIXdz-TmZ4Y",
    videoLabel: "Bitácora en video — Día 1",
  },
  {
    numero: 2,
    numeroLabel: "02",
    titulo:
      "Entre montañas y caminos: recorrido por las dinámicas territoriales del occidente antioqueño",
    lugar: "Santa Fe de Antioquia · Puente de Occidente",
    fecha: "20 may 2026",
    parrafos: [
      "Durante el segundo día de la práctica académica de Geografía Humana, el recorrido inició en la ciudad de Medellín y se dirigió hacia el occidente antioqueño, permitiendo observar diferentes formas de ocupación y transformación del territorio. La primera parada fue Santa Fe de Antioquia, municipio caracterizado por su importancia histórica y patrimonial. Posteriormente, se visitó el Puente de Occidente, una de las obras de ingeniería más representativas de la región, ubicada sobre el río Cauca. El recorrido continuó por la Ruta al Mar, donde fue posible apreciar cambios en el paisaje y en las dinámicas de uso del suelo, para finalizar con el paso por el Túnel de Occidente Fernando Gómez Martínez, infraestructura que conecta de manera más eficiente a Medellín con los municipios del occidente del departamento.",
      "Análisis: la jornada permitió reflexionar sobre la manera en que las relaciones entre sociedad y territorio se materializan en el espacio geográfico. Las infraestructuras observadas evidencian cómo las necesidades de movilidad y comunicación han impulsado profundas transformaciones del paisaje, reduciendo barreras naturales y fortaleciendo la integración entre distintas regiones. A su vez, la visita a Santa Fe de Antioquia mostró que el territorio también conserva huellas de procesos históricos que influyen en las dinámicas actuales de la población y en la construcción de identidades locales. Desde una perspectiva geográfica, el recorrido permitió comprender que el espacio no es un elemento estático, sino una construcción social en permanente cambio, resultado de la interacción entre factores físicos, económicos, culturales y políticos que configuran las formas de habitar y apropiarse del territorio.",
    ],
    tags: [
      { label: "Infraestructura y paisaje", variant: "verde" },
      { label: "Antioquia", variant: "arena" },
      { label: "Patrimonio histórico", variant: "default" },
    ],
    fotos: [
      { src: "/assets/Days/image3.png", alt: "Día 2 — Santa Fe de Antioquia" },
      { src: "/assets/Days/image4.png", alt: "Día 2 — Puente de Occidente sobre el río Cauca" },
    ],
  },
  {
    numero: 3,
    numeroLabel: "03",
    titulo: "Prohibido olvidar: Comunidad de Paz de San José de Apartadó",
    lugar: "San José de Apartadó · Finca La Holandita",
    fecha: "21 may 2026",
    parrafos: [
      "La Comunidad de Paz no solamente es un conjunto de personas: es un pueblo que lucha y resiste de una manera organizada, comunitaria y solidaria. Según su último censo son 350 habitantes en uno de sus lugares principales, la finca La Holandita, ubicada aproximadamente a 12 km de San José de Apartadó. En las 32 veredas del municipio tienen cerca de 11 fincas para el trabajo comunitario y solidario. Esta comunidad se cansó de la violencia desde su fundación, aquel 23 de marzo de 1997, a raíz de una masacre, e inició con banderas claras como la soberanía alimentaria y la tierra para su trabajo comunitario. Algunas de sus reglas más llamativas son no replicar ningún tipo de violencia —pues han sido víctimas de ella— y no plantar coca, porque el conflicto también ha girado en torno a ella. Aunque están rodeados de grupos al margen de la ley e incluso de la Brigada 17, viven con sabrosura: nunca dejan de soñar ni de construir su territorio.",
      "Análisis: una verdadera comunidad es aquella en la que todos se ayudan, y esta es un claro ejemplo. Los jueves hacen trabajo comunitario: arreglan la escuela, le hacen mantenimiento a su espacio y cuidan su hogar; también, por medio del arte y el teatro, recuerdan a sus muertos con honor y orgullo, porque hay muertos que no los mata ni la muerte. En palabras de la comunidad, “la paz la hacemos todos y todas en cada acción que hacemos”. En 2005, en Mulatos y La Resbalosa, una masacre apagó la vida de ocho personas, pero de allí también nació mucha esperanza: organizaciones internacionales han acompañado y ayudado a construir sus espacios, como el comedor comunitario, donde mujeres en embarazo, personas mayores y niños no pagan su alimentación. En 2024 recibieron su reconocimiento político. Hoy son 29 años de lucha y resistencia, de amor y verraquera: para muchos una utopía, pero ellos la caminaron y la hicieron realidad.",
      "Esperamos, con este texto, hacerle un honor a la comunidad y a su talento para el teatro y el fútbol, pero también invitarnos a reflexionar: aunque estés caminando y el mundo se caiga a pedazos, sigue caminando, pero nunca solo.",
      "Gracias por leernos, y esperamos que nos hayas leído con el corazón. Una vez más, gracias a los niños, adultos, mujeres y abuelos que nos abrieron su hogar y su corazón para enseñarnos la belleza de la Comunidad de Paz.",
    ],
    tags: [
      { label: "Memoria y resistencia", variant: "verde" },
      { label: "Urabá antioqueño", variant: "arena" },
      { label: "Comunidad de Paz", variant: "azul" },
    ],
    fotos: [
      { src: "/assets/Days/image5.png", alt: "Día 3 — Comunidad de Paz de San José de Apartadó" },
      { src: "/assets/Days/image6.png", alt: "Día 3 — trabajo comunitario en la Finca La Holandita" },
    ],
  },
  {
    numero: 4,
    numeroLabel: "04",
    titulo: "Del puerto al mar: el Urabá entre bananos, sueños y memoria",
    lugar: "Nueva Colonia · Turbo · Golfo de Urabá",
    fecha: "22 may 2026",
    parrafos: [
      "En nuestro cuarto día de práctica continuamos transitando el enorme Urabá. La emoción de conocer el Caribe por primera vez era, para muchos, motivo de grandes expectativas. Despedirnos de la Comunidad de Paz tuvo un costo emocional, pues nos habíamos acostumbrado a la compañía de sus habitantes, principalmente a la de los niños. En Nueva Colonia nos encontramos con un océano imponente, con un golfo que transpiraba desarrollo y esperanzas para toda una comunidad. Asimismo, en el colegio nos recibió una población estudiantil fiestera, alegre, llena de sueños y de cultura. Para finalizar, llegamos a las hermosas costas de Turbo, donde por la tarde despedimos nuestro paso por el Urabá, tomando ese mismo día el camino hacia Medellín, llevándonos en la memoria tanto el mar como a los niños de la Comunidad de Paz y de Nueva Colonia.",
      "Análisis: el Golfo de Urabá es una región que está cambiando progresivamente. Puerto Antioquia y el desarrollo portuario y logístico están transformando las dinámicas socioeconómicas de toda una región que históricamente ha estado en la invisibilidad de las instituciones públicas colombianas. Encontramos un tejido social profundo, donde el sentido comunitario está muy presente en los imaginarios de la población. Al lado de lo portuario aparecen los monocultivos de plátano y banano, que han sido motor del desarrollo económico de la región y, a su vez, de la violencia. Vemos una sociedad que transiciona de la violencia a la esperanza, y lo afirmamos en los sueños y metas de los niños y de los padres. Así, entre barcos, bananos y la memoria de la violencia, Urabá construye un futuro posible.",
    ],
    tags: [
      { label: "Frontera agroindustrial", variant: "arena" },
      { label: "Golfo de Urabá", variant: "azul" },
      { label: "Puerto y monocultivo", variant: "default" },
    ],
    fotos: [
      { src: "/assets/Days/image7.jpg", alt: "Día 4 — costas de Turbo y el Golfo de Urabá" },
      { src: "/assets/Days/image8.jpg", alt: "Día 4 — Nueva Colonia y el desarrollo portuario" },
    ],
  },
  {
    numero: 5,
    numeroLabel: "05",
    titulo:
      "El Valle de Aburrá explorado desde la memoria, el asfalto y las laderas de Medellín",
    lugar: "Cerro Nutibara · Comuna 13 · Casa de la Memoria",
    fecha: "23 may 2026",
    frase:
      "Detrás de la Medellín de Instagram y el maquillaje urbano, late una brújula rota: un sur que tiende al acaparamiento y un norte que lucha y resiste.",
    parrafos: [
      "Nuestro quinto día nos exigió mirar la ciudad desde arriba. Subimos al Cerro Nutibara (Pueblito Paisa) para entender la topografía de un valle que contiene a millones. Desde allí, el Plan de Ordenamiento Territorial (POT) de Medellín deja de ser un documento y se vuelve paisaje: analizamos el uso del suelo, el modelo de ocupación que trepa por las montañas y cómo el río Medellín actúa como la columna vertebral de la ciudad, antes de escapar hacia el norte para convertirse en el río Porce. Es un valle donde el relieve dicta las reglas y el Metro de Medellín se erige no solo como transporte, sino como un elemento geográfico que reconecta una urbe históricamente fragmentada.",
      "Análisis (conflicto, espacio y memoria): la geografía de Medellín también está escrita con cicatrices. Bajamos al centro para cruzar la Plaza Botero e ingresar a la Casa Museo de la Memoria. Allí, el espacio urbano se cruza con el conflicto armado. Entender Medellín implica dimensionar cómo la violencia reconfiguró sus barrios. Esto se hizo palpable al adentrarnos en la Comuna 13: un territorio de laderas empinadas donde la geografía del terror (marcada por la Operación Orión) se ha transformado en una geografía de resistencia, arte urbano y apropiación del espacio por parte de quienes antes fueron marginados.",
    ],
    tags: [
      { label: "Ordenamiento territorial", variant: "verde" },
      { label: "Valle de Aburrá", variant: "arena" },
      { label: "Memoria y resistencia", variant: "azul" },
    ],
    fotos: [],
  },
  {
    numero: 6,
    numeroLabel: "06",
    titulo: "Entre memoria, cultura y territorio: experiencias de campo",
    lugar: "El Peñol · Guatapé · Puerto Triunfo",
    fecha: "24 may 2026",
    parrafos: [
      "Durante esta ruta llena de nuevas experiencias fue posible observar las diferencias entre los espacios urbanos y rurales de cada municipio. Medellín se caracteriza por ser un centro urbano altamente desarrollado. Por su parte, El Peñol y Guatapé presentan una importante dinámica turística, mientras que Puerto Triunfo y Puerto Boyacá conservan una fuerte relación con las actividades agropecuarias y el aprovechamiento de los recursos asociados al río Magdalena.",
      "En cuanto al uso del suelo, se identificó que Antioquia mantiene una importante producción agrícola y ganadera, destacándose cultivos como el plátano, el banano, el maíz, el fríjol, la papa y las hortalizas, además de la ganadería lechera. Sin embargo, también se evidencian conflictos de uso del suelo debido al crecimiento urbano, industrial y turístico. En Guatapé y El Peñol, por ejemplo, el turismo ha impulsado la construcción de hoteles, restaurantes y fincas de recreo, reduciendo algunas áreas destinadas a la producción agrícola y aumentando el valor de la tierra. Esta situación refleja la tensión existente entre las actividades agrarias tradicionales y las nuevas dinámicas económicas asociadas al turismo.",
      "Finalmente, se analizaron aspectos socioeconómicos como los riesgos, la calidad de vida y los sistemas productivos. Entre las principales amenazas se encuentran los deslizamientos, las inundaciones y la contaminación ambiental derivada de algunas actividades económicas. Asimismo, se observó que Medellín y los municipios del oriente antioqueño presentan mejores condiciones de calidad de vida e infraestructura, mientras que Puerto Triunfo y Puerto Boyacá enfrentan mayores desafíos relacionados con la pobreza y el acceso a oportunidades.",
      "Análisis: la práctica permitió comprender que el territorio se transforma constantemente por la acción humana. Las diferencias entre los municipios evidencian cómo actividades como el turismo, la agricultura y la ganadería influyen en el uso del suelo, generando oportunidades de desarrollo, pero también conflictos y desafíos ambientales que afectan la calidad de vida de las comunidades.",
    ],
    tags: [
      { label: "Uso del suelo", variant: "verde" },
      { label: "Oriente antioqueño", variant: "arena" },
      { label: "Turismo vs. agro", variant: "default" },
    ],
    fotos: [
      { src: "/assets/Days/image9.png", alt: "Día 6 — Guatapé y El Peñol" },
      { src: "/assets/Days/image10.png", alt: "Día 6 — paisaje agropecuario del oriente antioqueño" },
    ],
  },
  {
    numero: 7,
    numeroLabel: "07",
    titulo:
      "Las diversas caras del Magdalena, de la pesca a la navegación: un viaje limítrofe entre Boyacá y Antioquia",
    lugar: "Puerto Boyacá · Puerto Perales",
    fecha: "25 may 2026",
    parrafos: [
      "Nuestro último día de práctica nos exigía la capacidad analítica de observar el cauce del río Magdalena en otra de sus diversas facetas. Habíamos visto en Honda (Tolima) la tranquilidad del pescador, quien con la paciencia de quien vive del río espera su presa; ahora nos encontrábamos con un río más inquieto y en movimiento, donde la navegación lo hacía verse apurado como sus corrientes. Un cuerpo de agua que no solo era el límite entre dos departamentos, sino más bien una conexión que permitía el intercambio económico y social: no es simplemente una barrera natural, sino una oportunidad. Es un río humanizado, dinámico, lleno de contrastes, donde la contemplación se reemplaza con la navegación.",
      "Análisis: el río es un elemento que ha estado presente en la historia de la humanidad, y esto nos permite entender cómo los habitantes del municipio de Puerto Boyacá y del corregimiento de Puerto Perales han desarrollado sus modos y estilos de vida con base en el río. El curso del agua no solo lleva caudal, sino también un cúmulo de relaciones sociales tejidas a lo largo del tiempo y el espacio. Puerto Boyacá es una oportunidad para analizar no solo la violencia o el extractivismo, sino también para entender cómo la naturaleza nos ofrece oportunidades para nuestro estar en el planeta.",
    ],
    tags: [
      { label: "Río humanizado", variant: "verde" },
      { label: "Límite Boyacá–Antioquia", variant: "arena" },
      { label: "Navegación", variant: "azul" },
    ],
    fotos: [
      { src: "/assets/Days/image11.png", alt: "Día 7 — navegación por el río Magdalena" },
      { src: "/assets/Days/image12.png", alt: "Día 7 — Puerto Boyacá y Puerto Perales" },
    ],
  },
]

export const pullQuote = {
  cita: "Se vive para la construcción de la vida y la paz. [...] La relación con nuestro territorio forja la historia de la comunidad y la importancia de nuestras memorias.",
  autor: "— Comunidad de Paz de San José de Apartadó (CDP)",
}

export const collage: FotoCollage[] = [
  { src: "/assets/Collage/collage-1.png", alt: "Mosaico de la salida de campo — imagen 1" },
  { src: "/assets/Collage/collage-2.png", alt: "Mosaico de la salida de campo — imagen 2" },
  { src: "/assets/Collage/collage-3.png", alt: "Mosaico de la salida de campo — imagen 3" },
  { src: "/assets/Collage/collage-4.png", alt: "Mosaico de la salida de campo — imagen 4" },
]

export const reflexiones: Reflexion[] = [
  {
    numero: "01 —",
    titulo: "Sentir-pensar y vivir los lugares",
    texto:
      "La práctica de campo fue una experiencia enriquecedora que permitió conocer de cerca las distintas realidades que viven las comunidades de los territorios visitados. A lo largo del recorrido se pudieron observar las diferencias entre los espacios urbanos y rurales, así como la forma en que actividades como el turismo, la agricultura y la ganadería influyen en la vida cotidiana de las personas. Más allá de los datos y conceptos aprendidos en clase, la experiencia permitió comprender cómo las oportunidades, los desafíos y las problemáticas sociales y ambientales se manifiestan en cada lugar.",
  },
  {
    numero: "02 —",
    titulo: "Más que lugares, las personas que les dan sentido",
    texto:
      "Entendimos que conocer un territorio no significa únicamente observar sus paisajes, carreteras o actividades económicas. Cada lugar que visitamos estuvo marcado por las historias de las personas que lo habitan, sus luchas, sus sueños y su manera de relacionarse con el entorno. Escuchar a los pescadores del río Magdalena, compartir con los habitantes de la Comunidad de Paz de San José de Apartadó y conocer las experiencias de diferentes comunidades nos permitió acercarnos a realidades que difícilmente pueden comprenderse desde un salón de clases. Más que visitar lugares, aprendimos a reconocer el valor de las personas que les dan sentido.",
  },
  {
    numero: "03 —",
    titulo: "Lecciones que solo se aprenden caminando",
    texto:
      "Esta práctica nos recordó que algunas lecciones solo pueden aprenderse cuando se recorren los caminos y se vive el territorio de manera directa. Cada conversación, cada paisaje y cada experiencia se convirtió en una oportunidad para reflexionar sobre el país que habitamos y sobre nuestro papel en él. Como futuros docentes, comprendimos que enseñar también implica despertar la curiosidad, promover la sensibilidad frente a las realidades de los demás y construir conocimiento a partir de la experiencia. Regresamos con nuevos aprendizajes académicos, pero también con una mirada más humana sobre Colombia y sobre la responsabilidad que tenemos de contribuir a su comprensión y transformación desde la educación.",
  },
]

export const equipo: Integrante[] = [
  { foto: "/assets/Expedicionarios/dayis.png", nombre: "Dayis", rol: "Geografía Humana" },
  { foto: "/assets/Expedicionarios/duvancho.jpg", nombre: "Duván", rol: "Geografía Humana" },
  { foto: "/assets/Expedicionarios/maicol.jpg", nombre: "Maicol", rol: "Geografía Humana" },
  { foto: "/assets/Expedicionarios/maleja.jpg", nombre: "Maleja", rol: "Geografía Humana" },
  { foto: "/assets/Expedicionarios/mar.jpg", nombre: "Mar", rol: "Geografía Humana" },
]

// Geografía del descenso: usado por el altímetro y el cambio de color.
export const ALTITUD_INICIAL = 2820 // metros — Tunja
export const ALTITUD_FINAL = 0 // metros — nivel del mar, Urabá
export const TEMP_INICIAL = 12 // °C — frío de Boyacá
export const TEMP_FINAL = 43 // °C — calor del Urabá

// Lugares del recorrido con su respectiva información.
// `altura` en metros sobre el nivel del mar, `temperatura` en °C.
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
