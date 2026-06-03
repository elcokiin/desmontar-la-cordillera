import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { extname, join } from "node:path"

const sourceDir = join(process.cwd(), "assets/images/collage")
const publicDir = join(process.cwd(), "public/assets/collage-generated")
const outputFile = join(process.cwd(), "lib/collage-images.ts")
const supported = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"])

function slugifyName(name, index) {
  const ext = extname(name).toLowerCase()
  const base = name
    .slice(0, -ext.length)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return `${String(index + 1).padStart(2, "0")}-${base || "foto"}${ext}`
}

const files = existsSync(sourceDir)
  ? readdirSync(sourceDir)
      .filter((file) => supported.has(extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
  : []

rmSync(publicDir, { force: true, recursive: true })
mkdirSync(publicDir, { recursive: true })

const images = files.map((file, index) => {
  const publicName = slugifyName(file, index)
  copyFileSync(join(sourceDir, file), join(publicDir, publicName))

  return {
    src: `/assets/collage-generated/${publicName}`,
    alt: `Fragmento visual del recorrido - foto ${index + 1}`,
  }
})

writeFileSync(
  outputFile,
  `export type CollageImage = {\n  src: string\n  alt: string\n}\n\nexport const collageImages: CollageImage[] = ${JSON.stringify(images, null, 2)}\n`,
)

console.log(`Generated collage manifest with ${images.length} image(s).`)
