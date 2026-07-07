"use client"

import { useState } from "react"
import { X, Sparkles } from "lucide-react"

/**
 * Секция "Avant / Après" для главной страницы Studio.
 * При клике на кнопку открывается полноэкранный оверлей с before/after контентом.
 * 
 * Добавь этот компонент в app/page.tsx между любыми секциями, например после StudioServices:
 * 
 * import { AvantApres } from "@/components/avant-apres"
 * 
 * <StudioServices />
 * <AvantApres />
 * <StudioPricing />
 */

export function AvantApres() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Секция-тизер на странице */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="reveal" data-reveal="up">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="mt-5 text-sm uppercase tracking-[0.3em] text-primary">Motion Upgrade</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-balance sm:text-4xl">
              Avant / Après
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-pretty">
              Découvrez concrètement ce que notre upgrade d'animations apporte à votre site : fluidité mobile, révélations cinématiques et interactions premium.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="btn-anim mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Voir la comparaison
            </button>
          </div>
        </div>
      </section>

      {/* Fullscreen overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[200] flex flex-col"
          style={{ animation: "avantFadeIn 0.3s ease both" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Content */}
          <div
            className="relative z-[1] flex-1 overflow-y-auto"
            style={{ animation: "avantSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both" }}
          >
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
              {/* Header */}
              <div className="mb-12 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">Motion Upgrade</p>
                <h2 className="mt-3 font-serif text-3xl text-balance sm:text-4xl md:text-5xl">
                  Avant / <span className="text-primary">Après</span>
                </h2>
              </div>

              {/* Comparisons */}
              <div className="space-y-8">
                <CompBlock
                  num="01"
                  title="Scroll mobile"
                  before={{ label: "Freeze au retour", desc: "Lenis + parallax bloquent le scroll natif iOS/Android." }}
                  after={{ label: "Scroll natif fluide", desc: "Lenis off sur touch. Zéro freeze, 60 fps constant." }}
                />
                <CompBlock
                  num="02"
                  title="Animations desktop"
                  before={{ label: "Fade basique", desc: "Simple fadeIn + translateY court et linéaire." }}
                  after={{ label: "Reveal cinématique", desc: "Scale + translate + easing expo avec stagger progressif." }}
                />
                <CompBlock
                  num="03"
                  title="Cartes et widgets"
                  before={{ label: "Hover plat", desc: "Petit lift de 4px, ombre légère." }}
                  after={{ label: "Hover premium", desc: "Lift + rotating border glow + deep shadow + icon bounce." }}
                />
                <CompBlock
                  num="04"
                  title="Boutons CTA"
                  before={{ label: "Statique", desc: "Fond plat, le visiteur ne le remarque pas." }}
                  after={{ label: "Vivant", desc: "Lift + sheen sweep + halo glow pulsé. Pousse au clic." }}
                />
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <StatCard value="0" label="freezes mobile" />
                <StatCard value="60 fps" label="constant sur tout device" />
                <StatCard value="2×" label="impact visuel perçu" />
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes avantFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes avantSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}

function CompBlock({
  num,
  title,
  before,
  after,
}: {
  num: string
  title: string
  before: { label: string; desc: string }
  after: { label: string; desc: string }
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="border-b border-border bg-card/50 px-5 py-3">
        <span className="font-serif text-sm text-primary">{num}</span>
        <span className="ml-3 text-sm font-medium text-foreground">{title}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="border-b border-border bg-background/30 p-5 sm:border-b-0 sm:border-r">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#e05545]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e05545]" />
            Avant
          </span>
          <p className="mt-2 text-sm font-medium text-foreground">{before.label}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{before.desc}</p>
        </div>
        <div className="bg-card/40 p-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#4ecb71]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ecb71]" />
            Après
          </span>
          <p className="mt-2 text-sm font-medium text-foreground">{after.label}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{after.desc}</p>
        </div>
      </div>
    </div>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="card-hover flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center">
      <p className="font-serif text-3xl text-primary">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
