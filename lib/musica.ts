// Radio del bus — lista de reproducción.
//
// Coloca tus archivos .mp3 dentro de la carpeta:  public/musica/
// Luego escribe aquí abajo el nombre EXACTO de cada archivo (con su extensión).
// Ejemplo: si guardas "public/musica/carretera.mp3", agrega "carretera.mp3" a la lista.

export const CARPETA_MUSICA = "/musica"

export const PLAYLIST: string[] = [
  // "cancion-1.mp3",
  // "cancion-2.mp3",
  // "cancion-3.mp3",
]

/** Devuelve la ruta pública completa de una canción de la carpeta /musica. */
export function rutaCancion(nombreArchivo: string): string {
  return `${CARPETA_MUSICA}/${nombreArchivo}`
}
