/*
 * Übersichtsseite /reels – Galerie der vier medizinischen Erklär-Reels
 * mit Live-Vorschau und Links zu den randlosen Einzelansichten.
 */

import { ArrowLeft, ArrowRight, Clapperboard } from "lucide-react";
import { Link } from "wouter";
import { REELS } from "@/components/reels";

export default function Reels() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="container py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a]/60 transition-colors hover:text-[#1a1a1a]"
        >
          <ArrowLeft size={16} /> Zurück zur Startseite
        </Link>

        <div className="mb-10 mt-6 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#4fa8a0]" />
            <span className="text-sm font-semibold uppercase tracking-widest text-[#4fa8a0]">
              Erklär-Animationen für Instagram
            </span>
          </div>
          <h1 className="font-serif text-4xl font-black leading-[1.05] text-[#1a1a1a] sm:text-5xl">
            Vier Eingriffe, <span className="text-[#de6e27]">klar erklärt</span>.
          </h1>
          <p className="mt-4 flex items-center gap-2 text-base text-[#1a1a1a]/60">
            <Clapperboard size={18} className="shrink-0 text-[#de6e27]" />
            Für Instagram: Einzelansicht öffnen und Bildschirm im Hochformat aufnehmen (7 Sek.).
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {REELS.map(({ slug, title, teaser, Component }) => (
            <Link
              key={slug}
              href={`/reels/${slug}`}
              className="group block"
              aria-label={`${title} – Einzelansicht öffnen`}
            >
              <div className="overflow-hidden rounded-2xl border border-[#1a1a1a]/10 shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                <div className="pointer-events-none">
                  <Component />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#1a1a1a]">{title}</h2>
                  <p className="mt-1 text-sm leading-snug text-[#1a1a1a]/60">{teaser}</p>
                </div>
                <span className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#de6e27] text-white transition-transform group-hover:translate-x-1">
                  <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
