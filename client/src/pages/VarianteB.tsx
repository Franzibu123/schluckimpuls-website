/*
 * VARIANTE B – "Dezent & Klar"
 * Design: Botanical Editorial – Print-inspiriert, ruhig, zeitlos
 * Cremeweiß (#faf8f5) als dominanter Grundton, viel Weißraum,
 * Orange nur als gezielter Akzent (Buttons, Highlights),
 * Salbei als sekundäre Farbe, feine Linien statt harte Kontraste.
 * Fokus auf Lesbarkeit, Ruhe und Vertrauen.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Instagram, Menu, X, ChevronRight } from "lucide-react";

const IMAGES = {
  logo: "/manus-storage/2005_c8546e59.png",
  franzi: "/manus-storage/41011_e7fd04a1.jpg",
  franziPraxis: "/manus-storage/34064_f75ca546.jpg",
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663449529821/f4hDgj38kkpjFJ8D4dyL6T/hero-child-mouth-9aXdyG6FHqVwqPYeE2HLGs.webp",
  pillars: "https://d2xsxph8kpxj0f.cloudfront.net/310519663449529821/f4hDgj38kkpjFJ8D4dyL6T/five-pillars-bg-JiDnXyruj7qEiGrMtQLYZR.webp",
  nature: "https://d2xsxph8kpxj0f.cloudfront.net/310519663449529821/f4hDgj38kkpjFJ8D4dyL6T/nature-detail-UWTvwCwdxTp83vZMBCY5u8.webp",
  childHands: "https://d2xsxph8kpxj0f.cloudfront.net/310519663449529821/f4hDgj38kkpjFJ8D4dyL6T/child-hands-nature-fvtNWCBS2rUQC6JoKoTSxE.webp",
  brettspiel: "/manus-storage/40897_3218ab39.jpg",
  zungenKarten: "/manus-storage/40869_852e81a3.jpg",
  kieferModell: "/manus-storage/34071_45aebcdd.jpg",
  ohrModell: "/manus-storage/23381_7a655dbd.jpg",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const }
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─── NAVIGATION ─── */
function NavB() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-[#1a1a1a]/5">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="/variante-b" className="flex items-center gap-3">
          <img src={IMAGES.logo} alt="Schluck.Impuls" className="h-9 w-9 rounded-lg" />
          <span className="font-serif font-bold text-[#1a1a1a] text-lg tracking-tight">Schluck.Impuls</span>
        </a>
        <div className="hidden md:flex items-center gap-10 text-[#1a1a1a]/50 text-sm font-medium">
          <a href="#saeulen-b" className="hover:text-[#1a1a1a] transition-colors duration-300">Die 5 Säulen</a>
          <a href="#sia-b" className="hover:text-[#1a1a1a] transition-colors duration-300">SIA Akademie</a>
          <a href="#ueber-b" className="hover:text-[#1a1a1a] transition-colors duration-300">Über mich</a>
          <a href="#beratung-b" className="hover:text-[#1a1a1a] transition-colors duration-300">Beratung</a>
          <a href="#blog-b" className="hover:text-[#1a1a1a] transition-colors duration-300">Blog</a>
          <a href="#kontakt-b" className="bg-[#de6e27] text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#c55a18] transition-all active:scale-[0.97]">
            Beratung buchen
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-[#1a1a1a]">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-[#1a1a1a]/5 px-6 pb-6 pt-4"
        >
          <div className="flex flex-col gap-4 text-[#1a1a1a] text-base font-medium">
            <a href="#saeulen-b" onClick={() => setOpen(false)}>Die 5 Säulen</a>
            <a href="#sia-b" onClick={() => setOpen(false)}>SIA Akademie</a>
            <a href="#ueber-b" onClick={() => setOpen(false)}>Über mich</a>
            <a href="#beratung-b" onClick={() => setOpen(false)}>Beratung</a>
            <a href="#blog-b" onClick={() => setOpen(false)}>Blog</a>
            <a href="#kontakt-b" className="bg-[#de6e27] text-white px-5 py-3 rounded-full font-semibold text-center mt-2">
              Beratung buchen
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

/* ─── HERO ─── */
function HeroB() {
  return (
    <section className="relative bg-white pt-32 md:pt-40 pb-24 md:pb-36 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(162,184,162,0.06)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(222,110,39,0.04)_0%,_transparent_50%)]" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-7">
            <motion.p variants={fadeUp} custom={0} className="text-[#a2b8a2] text-xs font-semibold uppercase tracking-[0.25em] mb-6">
              Ganzheitliche Myofunktion & Mundraumgesundheit
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[4.2rem] font-black text-[#1a1a1a] leading-[1.08] mb-8">
              Was wäre, wenn der Mund deines Kindes der{" "}
              <span className="relative inline">
                Schlüssel
                <span className="absolute left-0 right-0 bottom-[0.05em] h-[0.12em] bg-[#de6e27]/40" />
              </span>{" "}
              zu seiner Gesundheit wäre?
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-[#1a1a1a]/50 text-lg leading-relaxed mb-10 max-w-lg">
              Entdecke, wie Zungenruhelage, Schluckmuster und Nasenatmung die gesamte Entwicklung deines Kindes beeinflussen.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4">
              <a href="#beratung-b" className="inline-flex items-center justify-center gap-2 bg-[#de6e27] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-sm">
                Beratung buchen <ArrowRight size={16} />
              </a>
              <a href="#sia-b" className="inline-flex items-center justify-center gap-2 border border-[#1a1a1a]/15 text-[#1a1a1a]/70 px-7 py-3.5 rounded-full font-semibold text-sm hover:border-[#1a1a1a]/30 hover:text-[#1a1a1a] transition-all active:scale-[0.97]">
                Zur SIA Akademie
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" as const }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative">
              <div className="rounded-3xl overflow-hidden">
                <img src={IMAGES.hero} alt="Kindergesicht Nahaufnahme" className="w-full h-[520px] object-cover" />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-8 bg-white border border-[#1a1a1a]/5 p-5 rounded-2xl shadow-lg">
                <p className="text-[#de6e27] font-serif font-bold text-2xl">5 Säulen</p>
                <p className="text-[#1a1a1a]/40 text-xs mt-0.5">Ganzheitliches System</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── STATEMENT SÄULE 5 ─── */
function StatementB() {
  return (
    <section className="bg-[#faf8f5] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-4xl"
        >
          <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-8">
            <span className="w-8 h-8 rounded-full bg-[#a2b8a2]/20 flex items-center justify-center">
              <span className="text-[#a2b8a2] text-xs font-bold">05</span>
            </span>
            <span className="text-[#1a1a1a]/40 text-sm font-medium tracking-wide">Säule 5 – Medizinische Entscheidungen</span>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl lg:text-[2.8rem] font-black text-[#1a1a1a] leading-[1.15] mb-8">
            Bevor du Ja sagst zu Paukenröhrchen, Polypen oder Mandel-OP –{" "}
            <span className="text-[#1a1a1a]/40">kennst du die Fragen, die niemand stellt?</span>
          </motion.h2>
          <motion.div variants={fadeUp} custom={2} className="grid lg:grid-cols-2 gap-12 mt-12">
            <div>
              <p className="text-[#1a1a1a]/50 text-base leading-relaxed mb-8">
                Medizinische Entscheidungen betreffen dein Kind – aber du darfst die richtigen Fragen stellen. Wir helfen dir, die Antworten zu finden.
              </p>
              <div className="space-y-4">
                {["Ist die OP wirklich notwendig?", "Welche Alternativen gibt es?", "Was sind die Langzeitfolgen?", "Welche Ursachen wurden abgeklärt?", "Gibt es einen ganzheitlichen Weg?"].map((q, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#de6e27] flex-shrink-0" />
                    <p className="text-[#1a1a1a]/70 text-sm font-medium group-hover:text-[#1a1a1a] transition-colors">{q}</p>
                  </div>
                ))}
              </div>
              <a href="#blog-b" className="inline-flex items-center gap-2 mt-8 text-[#de6e27] font-semibold text-sm hover:gap-3 transition-all">
                Zu den Antworten <ArrowRight size={16} />
              </a>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img src={IMAGES.ohrModell} alt="Anatomisches Ohr-Modell" className="w-full h-[320px] object-cover" />
              </div>
              <p className="text-[#1a1a1a]/30 text-xs mt-3 italic">Anatomie verstehen – informiert entscheiden</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 5 SÄULEN ─── */
const pillarsData = [
  { num: "01", title: "Myofunktion", desc: "Zungenruhelage, Schluckmuster und Kieferentwicklung – die Basis für eine gesunde orale Funktion." },
  { num: "02", title: "Mundraumgesundheit", desc: "Schleimhäute, Mandeln, Nasenatmung – wie der Mundraum das Immunsystem deines Kindes beeinflusst." },
  { num: "03", title: "Nährstoffbasis", desc: "Nährstoffreiches, naturbelassenes Essen als Fundament für Regeneration und gesunde Entwicklung." },
  { num: "04", title: "Alltag & Integration", desc: "Wie du Wissen zuhause umsetzt, ohne von Therapie zu Therapie zu fahren." },
  { num: "05", title: "Medizinische Entscheidungen", desc: "Verstehe, was Eingriffe wirklich bedeuten und welche Fragen du stellen solltest." },
];

function PillarsB() {
  return (
    <section id="saeulen-b" className="bg-white py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-16"
        >
          <motion.p variants={fadeUp} custom={0} className="text-[#a2b8a2] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Das ganzheitliche System
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] max-w-2xl">
            Die fünf Säulen von Schluck.Impuls
          </motion.h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="space-y-0 divide-y divide-[#1a1a1a]/5"
        >
          {pillarsData.map((p, i) => (
            <motion.div
              key={p.num}
              variants={fadeUp}
              custom={i}
              className="group grid grid-cols-12 gap-6 py-8 items-center hover:bg-[#faf8f5] transition-colors duration-300 px-4 -mx-4 rounded-lg cursor-pointer"
            >
              <div className="col-span-1">
                <span className="font-serif text-sm font-bold text-[#de6e27]/40 group-hover:text-[#de6e27] transition-colors">{p.num}</span>
              </div>
              <div className="col-span-3">
                <h3 className="font-serif text-lg font-bold text-[#1a1a1a] group-hover:text-[#de6e27] transition-colors">{p.title}</h3>
              </div>
              <div className="col-span-7">
                <p className="text-[#1a1a1a]/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
              <div className="col-span-1 text-right">
                <ChevronRight size={16} className="text-[#1a1a1a]/20 group-hover:text-[#de6e27] group-hover:translate-x-1 transition-all inline-block" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FÜR WEN ─── */
function ForWhomB() {
  return (
    <section className="bg-[#faf8f5] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          <div>
            <motion.p variants={fadeUp} custom={0} className="text-[#a2b8a2] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
              Für dich gemacht
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] leading-tight mb-10">
              Für wen ist Schluck.Impuls?
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="space-y-5">
              {[
                "Du bist offen für ganzheitliche Ansätze und willst dein Kind selbst begleiten.",
                "Du willst Ursachen verstehen, statt nur Symptome zu behandeln.",
                "Du gibst dich nicht mit Standardlösungen als erste Antwort zufrieden.",
                "Du willst informierte Entscheidungen treffen – auch bei medizinischen Fragen.",
                "Du suchst fundiertes Wissen, das du im Alltag umsetzen kannst.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="w-5 h-5 rounded-full border-2 border-[#de6e27]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#de6e27]" />
                  </span>
                  <p className="text-[#1a1a1a]/60 text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div variants={fadeUp} custom={3}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden">
                <img src={IMAGES.brettspiel} alt="Mundmotorik-Brettspiel" className="w-full h-[200px] object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img src={IMAGES.zungenKarten} alt="Zungenübungs-Karten" className="w-full h-[200px] object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img src={IMAGES.kieferModell} alt="Kiefermodell mit Schiene" className="w-full h-[200px] object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img src={IMAGES.franziPraxis} alt="Franziska mit Kiefermodell" className="w-full h-[200px] object-cover" />
              </div>
            </div>
            <div className="mt-6 border-l-2 border-[#a2b8a2] pl-5">
              <p className="font-serif text-base font-bold text-[#1a1a1a]/80 italic leading-snug">
                „Selbstverantwortung statt Delegation."
              </p>
              <p className="text-[#1a1a1a]/30 text-xs mt-2">– Franziska Bures</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SIA TEASER ─── */
function SIATeaserB() {
  return (
    <section id="sia-b" className="bg-white py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="mb-16">
            <p className="text-[#a2b8a2] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Die Akademie</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-4">
              SIA – SchluckImpuls Akademie
            </h2>
            <p className="text-[#1a1a1a]/40 text-lg max-w-xl">
              Die digitale Akademie für Eltern, die ihre Kinder rund um Mundgesundheit begleiten wollen.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} custom={1} className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Mandel-Kurs", subtitle: "Mini-Kurs", desc: "Vergrößerte Mandeln ganzheitlich verstehen und begleiten", status: "Verfügbar", dotColor: "#a2b8a2" },
              { title: "Zungenruhelage & Myo", subtitle: "Signature-Kurs", desc: "Mundatmung bei Kindern – Was du als Mama wissen und tun kannst", status: "In Vorbereitung", dotColor: "#de6e27" },
              { title: "Myo-Elternausbildung", subtitle: "Winter 2026/2027", desc: "Tiefe Ausbildung für Eltern – mit Warteliste-Funktion", status: "Warteliste", dotColor: "#1a1a1a" },
            ].map((course, i) => (
              <div key={i} className="group">
                <div className="border-t-2 border-[#1a1a1a]/5 group-hover:border-[#de6e27] transition-colors pt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: course.dotColor }} />
                    <span className="text-[#1a1a1a]/40 text-xs font-medium">{course.status} · {course.subtitle}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-3 group-hover:text-[#de6e27] transition-colors">{course.title}</h3>
                  <p className="text-[#1a1a1a]/50 text-sm leading-relaxed mb-6">{course.desc}</p>
                  <a href="#" className="inline-flex items-center gap-2 text-[#de6e27] font-semibold text-sm hover:gap-3 transition-all">
                    Mehr erfahren <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── ÜBER MICH ─── */
function AboutB() {
  return (
    <section id="ueber-b" className="bg-[#faf8f5] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center"
        >
          <motion.div variants={fadeUp} custom={0} className="lg:col-span-2 relative">
            <div className="rounded-2xl overflow-hidden">
              <img src={IMAGES.franzi} alt="Franziska Bures" className="w-full h-[560px] object-cover object-top" />
            </div>
            {/* Name overlay */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-sm">
              <p className="font-serif font-bold text-[#1a1a1a] text-sm">Franziska Bures</p>
              <p className="text-[#1a1a1a]/40 text-xs">Logopädin & Dentosophin</p>
            </div>
          </motion.div>
          <div className="lg:col-span-3">
            <motion.p variants={fadeUp} custom={0} className="text-[#a2b8a2] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
              Über mich
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl font-black text-[#1a1a1a] leading-tight mb-8">
              Hi, ich bin Franzi.
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="space-y-5 text-[#1a1a1a]/50 text-base leading-[1.8]">
              <p>
                Selbstständige Logopädin mit eigener Praxis, Mutter von drei Kindern und überzeugt davon, dass der Mund der Schlüssel zur Gesundheit ist.
              </p>
              <p>
                Nach 13 Jahren in der Praxis und über 20.000 Euro in Weiterbildungen – von Dentosophie bis zur ganzheitlichen Myofunktion – weiß ich: <strong className="text-[#1a1a1a]">Ursachenarbeit schlägt Symptombehandlung. Immer.</strong>
              </p>
              <p>
                Ich verbinde schulmedizinisches Fachwissen mit Pflanzenheilkunde und alten Heiltraditionen. Nicht als Ersatz, sondern als Ergänzung.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 mt-8">
              <span className="inline-flex items-center gap-1.5 border border-[#1a1a1a]/10 text-[#1a1a1a]/60 text-xs font-medium px-4 py-2 rounded-full">13 Jahre Erfahrung</span>
              <span className="inline-flex items-center gap-1.5 border border-[#1a1a1a]/10 text-[#1a1a1a]/60 text-xs font-medium px-4 py-2 rounded-full">Dentosophin</span>
              <span className="inline-flex items-center gap-1.5 border border-[#1a1a1a]/10 text-[#1a1a1a]/60 text-xs font-medium px-4 py-2 rounded-full">Mutter von 3</span>
            </motion.div>
            <motion.a
              variants={fadeUp} custom={4}
              href="#beratung-b"
              className="inline-flex items-center gap-2 mt-8 text-[#de6e27] font-semibold text-sm hover:gap-3 transition-all"
            >
              Mehr über mich <ArrowRight size={16} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── NEWSLETTER ─── */
function NewsletterB() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} custom={0} className="w-12 h-12 rounded-full bg-[#a2b8a2]/10 flex items-center justify-center mx-auto mb-6">
            <Mail size={20} className="text-[#a2b8a2]" />
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="font-serif text-2xl sm:text-3xl font-black text-[#1a1a1a] mb-3">
            Bleib dran
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-[#1a1a1a]/40 text-base mb-8">
            Fundiertes Wissen, ehrliche Impulse und praktische Tipps direkt in dein Postfach.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Deine E-Mail-Adresse"
              className="flex-1 px-5 py-3.5 rounded-full bg-[#faf8f5] text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 border border-[#1a1a1a]/10 focus:ring-2 focus:ring-[#de6e27]/30 focus:border-[#de6e27]/30 outline-none text-sm"
            />
            <button className="bg-[#de6e27] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#c55a18] transition-all active:scale-[0.97] whitespace-nowrap">
              Anmelden
            </button>
          </motion.div>
          <motion.p variants={fadeUp} custom={4} className="text-[#1a1a1a]/20 text-xs mt-4">
            Freebie-Inhalt wird ergänzt. Du kannst dich jederzeit abmelden.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── BLOG PREVIEW ─── */
function BlogPreviewB() {
  const posts = [
    { title: "Warum Mundatmung bei Kindern mehr als nur eine schlechte Angewohnheit ist", cat: "Myofunktion" },
    { title: "Vergrößerte Mandeln: Was Eltern wirklich wissen sollten", cat: "Medizinische Entscheidungen" },
    { title: "Zungenruhelage – der stille Held der Kieferentwicklung", cat: "Mundraumgesundheit" },
  ];
  return (
    <section id="blog-b" className="bg-[#faf8f5] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[#a2b8a2] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Blog</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1a1a1a]">Aktuelles aus dem Blog</h2>
            </div>
            <a href="#" className="hidden md:inline-flex items-center gap-2 text-[#de6e27] font-semibold text-sm hover:gap-3 transition-all">
              Alle Artikel <ArrowRight size={14} />
            </a>
          </motion.div>
          <motion.div variants={fadeUp} custom={1} className="space-y-0 divide-y divide-[#1a1a1a]/5">
            {posts.map((post, i) => (
              <article key={i} className="group grid grid-cols-12 gap-6 py-8 items-center hover:bg-white transition-colors duration-300 px-4 -mx-4 rounded-lg cursor-pointer">
                <div className="col-span-1">
                  <span className="font-serif text-3xl font-black text-[#1a1a1a]/5 group-hover:text-[#de6e27]/20 transition-colors">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[#1a1a1a]/30 text-xs font-medium">{post.cat}</span>
                </div>
                <div className="col-span-8">
                  <h3 className="font-serif text-lg font-bold text-[#1a1a1a] leading-snug group-hover:text-[#de6e27] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#1a1a1a]/30 text-xs mt-1">Bald verfügbar</p>
                </div>
                <div className="col-span-1 text-right">
                  <ArrowRight size={16} className="text-[#1a1a1a]/10 group-hover:text-[#de6e27] group-hover:translate-x-1 transition-all inline-block" />
                </div>
              </article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── BERATUNG CTA ─── */
function BeratungCTAb() {
  return (
    <section id="beratung-b" className="bg-white py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div variants={fadeUp} custom={0} className="w-16 h-px bg-[#de6e27] mx-auto mb-8" />
          <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-6 leading-tight">
            Dein Kind. Deine Fragen. Meine Expertise.
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-[#1a1a1a]/40 text-lg mb-10">
            Im 1:1-Online-Gespräch analysieren wir die Situation deines Kindes und entwickeln einen individuellen Plan. Klar, fundiert und auf Augenhöhe.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#kontakt-b" className="inline-flex items-center justify-center gap-2 bg-[#de6e27] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-sm">
              Erstgespräch buchen <ArrowRight size={18} />
            </a>
            <a href="#sia-b" className="inline-flex items-center justify-center gap-2 border border-[#1a1a1a]/15 text-[#1a1a1a]/60 px-8 py-4 rounded-full font-semibold hover:border-[#1a1a1a]/30 hover:text-[#1a1a1a] transition-all active:scale-[0.97]">
              Oder: Zur Akademie
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function FooterB() {
  return (
    <footer id="kontakt-b" className="bg-[#1a1a1a] pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={IMAGES.logo} alt="Schluck.Impuls" className="h-9 w-9 rounded-lg" />
              <span className="font-serif font-bold text-white text-lg">Schluck.Impuls</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Ganzheitliche Myofunktion & Mundraumgesundheit für Kinder. Online-Kurse, Beratung und fundiertes Wissen für Eltern.
            </p>
          </div>
          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-4">Seiten</h4>
            <div className="flex flex-col gap-2 text-white/40 text-sm">
              <a href="#saeulen-b" className="hover:text-white transition-colors">Die 5 Säulen</a>
              <a href="#sia-b" className="hover:text-white transition-colors">SIA Akademie</a>
              <a href="#ueber-b" className="hover:text-white transition-colors">Über mich</a>
              <a href="#beratung-b" className="hover:text-white transition-colors">Beratung</a>
              <a href="#blog-b" className="hover:text-white transition-colors">Blog</a>
            </div>
          </div>
          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-4">Kontakt</h4>
            <div className="flex flex-col gap-3 text-white/40 text-sm">
              <a href="mailto:kontakt@schluckimpuls.de" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={14} /> kontakt@schluckimpuls.de
              </a>
              <a href="https://instagram.com/schluck.impuls" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <Instagram size={14} /> @schluck.impuls
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} Schluck.Impuls – Franziska Bures. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-white/20 text-xs">
            <a href="#" className="hover:text-white/50 transition-colors">Impressum</a>
            <a href="#" className="hover:text-white/50 transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-white/50 transition-colors">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN PAGE ─── */
export default function VarianteB() {
  return (
    <div className="min-h-screen bg-white">
      <NavB />
      <HeroB />
      <StatementB />
      <PillarsB />
      <ForWhomB />
      <SIATeaserB />
      <AboutB />
      <NewsletterB />
      <BlogPreviewB />
      <BeratungCTAb />
      <FooterB />
    </div>
  );
}
