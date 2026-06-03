import { EditBanner } from "@/components/viaje/edit-banner"
import { NavBar } from "@/components/viaje/nav-bar"
import { Hero } from "@/components/viaje/hero"
import { Intro } from "@/components/viaje/intro"
import { CasaCafetera } from "@/components/viaje/casa-cafetera"
import { Transecto } from "@/components/viaje/transecto"
import { Mapa } from "@/components/viaje/mapa"
import { Collage } from "@/components/viaje/collage"
import { Reflexiones } from "@/components/viaje/reflexiones"
import { Equipo } from "@/components/viaje/equipo"
import { SiteFooter } from "@/components/viaje/site-footer"
import { Altimetro } from "@/components/viaje/altimetro"
import { RadioBus } from "@/components/viaje/radio-bus"
import { ViajeTheme } from "@/components/viaje/viaje-theme"

export default function Page() {
  return (
    <div className="viaje-root">
      {/* Cambia el color de acento (bordes, botones, líneas) según el scroll */}
      <ViajeTheme />

      <EditBanner />
      <NavBar />

      <main>
        <Hero />
        <Intro />
        <CasaCafetera />
        <Transecto />
        <Mapa />
        <Collage />
        <Reflexiones />
        <Equipo />
      </main>

      <SiteFooter />

      {/* Paneles flotantes */}
      <Altimetro />
      <RadioBus />
    </div>
  )
}
