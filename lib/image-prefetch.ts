const prefetched = new Set<string>()

const nextImageWidths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]

function optimizedImageUrl(src: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`
}

function closestNextImageWidth(targetWidth: number) {
  return nextImageWidths.find((width) => width >= targetWidth) ?? nextImageWidths[nextImageWidths.length - 1]
}

function previewWidth() {
  if (typeof window === "undefined") return 1200

  const viewportWidth = Math.min(window.innerWidth, 1120)
  return closestNextImageWidth(viewportWidth * Math.min(window.devicePixelRatio || 1, 2))
}

export function scheduleImagePreviewPrefetch(src: string, delay = 180) {
  if (typeof window === "undefined" || src.endsWith(".svg")) return () => undefined

  const width = previewWidth()
  const url = optimizedImageUrl(src, width)

  if (prefetched.has(url)) return () => undefined

  let started = false
  const timeoutId = window.setTimeout(() => {
    started = true
    prefetched.add(url)

    const image = new window.Image()
    image.decoding = "async"
    image.src = url
  }, delay)

  return () => {
    if (!started) window.clearTimeout(timeoutId)
  }
}
