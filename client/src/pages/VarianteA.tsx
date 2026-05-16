/*
 * VARIANTE A – "Volle Wucht"
 * Design: Bold Manifesto – Activist Brand Design
 * Orange als dominante Flächenfarbe, große orangene Hero-Section,
 * orangene Statement-Blöcke, Schwarz für Typo, Salbei als Highlight-Balken.
 * Maximale Brand-Wucht, sofortige Wiedererkennbarkeit.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Instagram, Menu, X } from "lucide-react";

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
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

function SalbeiHighlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline">
      {children}
      <span className="absolute left-[-4px] right-[-4px] bottom-[0.08em] h-[0.35em] bg-[#a2b8a2]/50 -z-10" />
    </span>
  );
}

/* ─── NAVIGATION ─── */
function NavA() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#de6e27]/95 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="/" className="flex items-center gap-3">
          <img src={IMAGES.logo} alt="Schluck.Impuls" className="h-10 w-10 rounded-lg" />
          <span className="font-serif font-bold text-white text-lg tracking-tight">Schluck.Impuls</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-white/90 text-sm font-medium">
          <a href="#saeulen" className="hover:text-white transition-colors">Die 5 Säulen</a>
          <a href="#sia" className="hover:text-white transition-colors">SIA Akademie</a>
          <a href="#ueber" className="hover:text-white transition-colors">Über mich</a>
          <a href="#beratung" className="hover:text-white transition-colors">Beratung</a>
          <a href="#blog" className="hover:text-white transition-colors">Blog</a>
          <a href="#kontakt" className="bg-black text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-black/80 transition-all active:scale-[0.97]">
            Beratung buchen
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#de6e27] border-t border-white/20 px-6 pb-6 pt-2"
        >
          <div className="flex flex-col gap-4 text-white text-base font-medium">
            <a href="#saeulen" onClick={() => setOpen(false)}>Die 5 Säulen</a>
            <a href="#sia" onClick={() => setOpen(false)}>SIA Akademie</a>
            <a href="#ueber" onClick={() => setOpen(false)}>Über mich</a>
            <a href="#beratung" onClick={() => setOpen(false)}>Beratung</a>
            <a href="#blog" onClick={() => setOpen(false)}>Blog</a>
            <a href="#kontakt" className="bg-black text-white px-5 py-3 rounded-lg font-semibold text-center mt-2">
              Beratung buchen
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

/* ─── HERO ─── */
function HeroA() {
  return (
    <section className="relative bg-[#de6e27] pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} custom={0} className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-4">
              Ganzheitliche Myofunktion & Mundraumgesundheit
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-black leading-[1.05] mb-6">
              Was wäre, wenn der <SalbeiHighlight>Mund</SalbeiHighlight> deines Kindes der <SalbeiHighlight>Schlüssel</SalbeiHighlight> zu seiner Gesundheit wäre?
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              Entdecke, wie Zungenruhelage, Schluckmuster und Nasenatmung die gesamte Entwicklung deines Kindes beeinflussen – und was du als Mama oder Papa tun kannst.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4">
              <a href="#beratung" className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-black/80 transition-all active:scale-[0.97] shadow-xl">
                Beratung buchen <ArrowRight size={18} />
              </a>
              <a href="#sia" className="inline-flex items-center justify-center gap-2 bg-white/20 text-white border-2 border-white px-8 py-4 rounded-lg font-bold text-base hover:bg-white/30 transition-all active:scale-[0.97]">
                Zur SIA Akademie
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" as const }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={IMAGES.hero} alt="Kindergesicht Nahaufnahme" className="w-full h-[480px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#de6e27]/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto">
          <path d="M0,40 C360,80 720,0 1440,40 L1440,80 L0,80 Z" fill="#1a1a1a" />
        </svg>
      </div>
    </section>
  );
}

/* ─── STATEMENT SÄULE 5 ─── */
function StatementA() {
  return (
    <section className="relative bg-[#faf8f5] py-20 md:py-32 overflow-hidden">
      {/* Decorative orange blob top-left like mockup */}
      <div className="absolute top-0 left-0 w-[200px] md:w-[300px] h-[400px] md:h-[600px] bg-[#de6e27] rounded-br-[60%] -z-0" />
      {/* Salbei accent bar */}
      <div className="absolute top-8 left-[60px] md:left-[100px] w-[60px] h-[4px] bg-[#a2b8a2] rounded-full" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left: Text content */}
          <div>
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full border-2 border-[#de6e27] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#de6e27" strokeWidth="2">
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
                </svg>
              </div>
              <div>
                <span className="text-[#1a1a1a] text-xs font-bold uppercase tracking-widest">S\u00c4ULE 5</span>
                <span className="block text-[#1a1a1a]/50 text-xs">Medizinische Entscheidungen verstehen</span>
              </div>
            </motion.div>

            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-black text-[#1a1a1a] leading-[1.05] mb-6">
              Bevor du Ja sagst zu{" "}
              <span className="text-[#de6e27]">Paukenr\u00F6hrchen</span>, Polypen oder{" "}
              <span className="text-[#de6e27]">Mandel-OP</span> \u2013{" "}
              kennst du die Fragen, die niemand stellt?
            </motion.h2>

            {/* Salbei underline accent */}
            <motion.div variants={fadeUp} custom={1.5} className="w-32 h-1 bg-gradient-to-r from-[#de6e27] to-[#a2b8a2] rounded-full mb-6" />

            <motion.p variants={fadeUp} custom={2} className="text-[#1a1a1a]/60 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Wir beleuchten die wahren Zusammenh\u00E4nge und zeigen dir Alternativen auf, die \u00C4rzte oft nicht nennen.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4">
              <a href="#blog" className="inline-flex items-center gap-3 bg-[#de6e27] text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-lg shadow-[#de6e27]/20">
                Zu den Antworten <ArrowRight size={18} />
              </a>
            </motion.div>
          </div>

          {/* Right: Collage layout like mockup */}
          <motion.div variants={fadeUp} custom={2} className="relative">
            {/* Türkis circle behind ohr image */}
            <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-[#4fa8a0]/30 -z-10 hidden md:block" />
            {/* Orange blob behind checklist */}
            <div className="absolute bottom-8 -left-4 w-48 h-48 rounded-full bg-[#de6e27]/15 -z-10 hidden md:block" />

            {/* Ohr image */}
            <div className="rounded-2xl overflow-hidden shadow-xl mb-6 border border-[#1a1a1a]/5">
              <img src={IMAGES.ohrModell} alt="Anatomisches Ohr-Modell" className="w-full h-[260px] object-cover" />
            </div>

            {/* Checklist card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-[#1a1a1a]/5">
              <div className="space-y-3">
                {["Ist die OP wirklich notwendig?", "Welche Alternativen gibt es?", "Was sind die Langzeitfolgen?", "Welche Ursachen wurden abgekl\u00E4rt?", "Gibt es einen ganzheitlichen Weg?"].map((q, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded border-2 border-[#de6e27]/40 flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 rounded-sm bg-[#de6e27]" />
                    </span>
                    <p className="text-[#1a1a1a]/70 text-sm font-medium">{q}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative dots pattern */}
            <div className="absolute -top-4 right-8 grid grid-cols-4 gap-1.5 hidden md:grid">
              {Array.from({length: 12}).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#4fa8a0]/40" />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 5 SÄULEN ─── */
const pillars = [
  { num: "01", title: "Myofunktion", desc: "Zungenruhelage, Schluckmuster und Kieferentwicklung – die Basis für eine gesunde orale Funktion.", icon: "👅" },
  { num: "02", title: "Mundraumgesundheit", desc: "Schleimhäute, Mandeln, Nasenatmung – wie der Mundraum das Immunsystem deines Kindes beeinflusst.", icon: "🫁" },
  { num: "03", title: "Nährstoffbasis", desc: "Nährstoffreiches, naturbelassenes Essen als Fundament für Regeneration und gesunde Entwicklung.", icon: "🌱" },
  { num: "04", title: "Alltag & Integration", desc: "Wie du Wissen zuhause umsetzt, ohne von Therapie zu Therapie zu fahren.", icon: "🏡" },
  { num: "05", title: "Medizinische Entscheidungen", desc: "Verstehe, was Eingriffe wirklich bedeuten, welche Alternativen es gibt und welche Fragen du stellen solltest.", icon: "⚕️" },
];

function PillarsA() {
  return (
    <section id="saeulen" className="bg-[#faf8f5] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} custom={0} className="text-[#de6e27] text-sm font-bold uppercase tracking-widest mb-4">
            Das ganzheitliche System
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-6">
            Die fünf Säulen von Schluck.Impuls
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-[#1a1a1a]/60 text-lg max-w-2xl mx-auto">
            Jede Säule für sich ist wichtig – zusammen bilden sie das Fundament für die ganzheitliche Mundgesundheit deines Kindes.
          </motion.p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              variants={fadeUp}
              custom={i}
              className={`group relative p-8 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                i === 4
                  ? "bg-[#de6e27] text-white md:col-span-2 lg:col-span-1"
                  : "bg-white text-[#1a1a1a] hover:bg-[#de6e27]/5"
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{p.icon}</span>
                <span className={`font-serif text-sm font-bold ${i === 4 ? "text-white/50" : "text-[#de6e27]/40"}`}>
                  {p.num}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">{p.title}</h3>
              <p className={`text-sm leading-relaxed ${i === 4 ? "text-white/80" : "text-[#1a1a1a]/60"}`}>
                {p.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FÜR WEN ─── */
function ForWhomA() {
  return (
    <section className="bg-[#de6e27] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <div>
            <motion.h2 variants={fadeUp} custom={0} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-tight mb-8">
              Für wen ist Schluck.Impuls?
            </motion.h2>
            <motion.div variants={fadeUp} custom={1} className="space-y-4">
              {[
                "Du bist offen für ganzheitliche Ansätze und willst dein Kind selbst begleiten.",
                "Du willst Ursachen verstehen, statt nur Symptome zu behandeln.",
                "Du gibst dich nicht mit Standardma\u00DFnahmen als erste L\u00F6sung zufrieden.",
                "Du willst informierte Entscheidungen treffen – auch bei medizinischen Fragen.",
                "Du suchst fundiertes Wissen, das du im Alltag umsetzen kannst.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-black/10 rounded-xl p-4">
                  <span className="text-black font-bold text-lg mt-0.5">✓</span>
                  <p className="text-white text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div variants={fadeUp} custom={2} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src={IMAGES.brettspiel} alt="Mundmotorik-Brettspiel - spielerisch üben" className="w-full h-[250px] object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src={IMAGES.zungenKarten} alt="Zungenübungs-Karten für Kinder" className="w-full h-[250px] object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl col-span-2">
                <img src={IMAGES.kieferModell} alt="Kiefermodell mit Schiene" className="w-full h-[180px] object-cover" />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#a2b8a2] text-[#1a1a1a] p-6 rounded-xl shadow-lg max-w-[240px]">
              <p className="font-serif font-bold text-lg leading-snug">
                „Selbstverantwortung statt Delegation.“
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SIA TEASER ─── */
function SIATeaserA() {
  return (
    <section id="sia" className="bg-[#faf8f5] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <p className="text-[#de6e27] text-sm font-bold uppercase tracking-widest mb-4">Die Akademie</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-6">
              SIA – SchluckImpuls Akademie
            </h2>
            <p className="text-[#1a1a1a]/60 text-lg max-w-2xl mx-auto">
              Die digitale Akademie für Eltern, die ihre Kinder ganzheitlich begleiten wollen. Fundiertes Wissen, praxisnah aufbereitet.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} custom={1} className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Mandel-Kurs", subtitle: "Mini-Kurs", desc: "Vergrößerte Mandeln ganzheitlich verstehen und begleiten", status: "Verfügbar", statusColor: "bg-green-500" },
              { title: "Zungenruhelage & Myo", subtitle: "Signature-Kurs", desc: "Mundatmung bei Kindern – Was du als Mama wissen und tun kannst", status: "In Vorbereitung", statusColor: "bg-[#de6e27]" },
              { title: "Myo-Elternausbildung", subtitle: "Winter 2026/2027", desc: "Tiefe Ausbildung für Eltern – mit Warteliste-Funktion", status: "Warteliste", statusColor: "bg-[#a2b8a2]" },
            ].map((course, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-[#1a1a1a]/5">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`${course.statusColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {course.status}
                  </span>
                  <span className="text-[#1a1a1a]/40 text-xs">{course.subtitle}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-3">{course.title}</h3>
                <p className="text-[#1a1a1a]/60 text-sm leading-relaxed mb-6">{course.desc}</p>
                <a href="#" className="inline-flex items-center gap-2 text-[#de6e27] font-semibold text-sm hover:gap-3 transition-all">
                  Mehr erfahren <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── ÜBER MICH ─── */
function AboutA() {
  return (
    <section id="ueber" className="bg-[#1a1a1a] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <motion.div variants={fadeUp} custom={0} className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={IMAGES.franziPraxis} alt="Franziska Bures mit Kiefermodell in der Praxis" className="w-full h-[500px] object-cover object-top" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#de6e27] text-white p-5 rounded-xl shadow-lg">
              <p className="font-serif font-bold text-sm">13 Jahre Erfahrung</p>
              <p className="text-white/70 text-xs">Logopädin & Dentosophin</p>
            </div>
          </motion.div>
          <div>
            <motion.p variants={fadeUp} custom={0} className="text-[#de6e27] text-sm font-bold uppercase tracking-widest mb-4">
              Über mich
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl font-black text-white leading-tight mb-6">
              Hi, ich bin Franzi.
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="space-y-4 text-white/70 text-base leading-relaxed">
              <p>
                Selbstständige Logopädin mit eigener Praxis, Mutter von drei Kindern und überzeugt davon, dass der Mund der Schlüssel zur Gesundheit ist.
              </p>
              <p>
                Nach 13 Jahren in der Praxis und über 20.000 € in Weiterbildungen – von Dentosophie bis zur ganzheitlichen Myofunktion – weiß ich: <strong className="text-white">Ursachenarbeit schlägt Symptombehandlung. Immer.</strong>
              </p>
              <p>
                Ich verbinde schulmedizinisches Fachwissen mit Pflanzenheilkunde und alten Heiltraditionen. Nicht als Ersatz, sondern als Ergänzung. Für Familien, die selbst Verantwortung übernehmen wollen.
              </p>
            </motion.div>
            <motion.a
              variants={fadeUp} custom={3}
              href="#beratung"
              className="inline-flex items-center gap-2 mt-8 bg-[#de6e27] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#c55a18] transition-all active:scale-[0.97]"
            >
              Mehr über mich <ArrowRight size={18} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── NEWSLETTER ─── */
function NewsletterA() {
  return (
    <section className="bg-[#a2b8a2] py-20 md:py-24">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2 variants={fadeUp} custom={0} className="font-serif text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-4">
            Bleib dran – mit dem Schluck.Impuls Newsletter
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-[#1a1a1a]/70 text-lg mb-8">
            Fundiertes Wissen, ehrliche Impulse und praktische Tipps direkt in dein Postfach. Kein Spam, versprochen.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Deine E-Mail-Adresse"
              className="flex-1 px-5 py-4 rounded-lg bg-white text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 border-0 focus:ring-2 focus:ring-[#de6e27] outline-none"
            />
            <button className="bg-[#de6e27] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-lg whitespace-nowrap">
              Anmelden
            </button>
          </motion.div>
          <motion.p variants={fadeUp} custom={3} className="text-[#1a1a1a]/50 text-xs mt-4">
            Freebie-Inhalt wird ergänzt. Du kannst dich jederzeit abmelden.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── BLOG PREVIEW ─── */
function BlogPreviewA() {
  const posts = [
    { title: "Warum Mundatmung bei Kindern mehr als nur eine schlechte Angewohnheit ist", cat: "Myofunktion", date: "Bald verfügbar" },
    { title: "Vergrößerte Mandeln: Was Eltern wirklich wissen sollten", cat: "Medizinische Entscheidungen", date: "Bald verfügbar" },
    { title: "Zungenruhelage – der stille Held der Kieferentwicklung", cat: "Mundraumgesundheit", date: "Bald verfügbar" },
  ];
  return (
    <section id="blog" className="bg-[#faf8f5] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#de6e27] text-sm font-bold uppercase tracking-widest mb-4">Blog</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1a1a1a]">Aktuelles aus dem Blog</h2>
            </div>
            <a href="#" className="hidden md:inline-flex items-center gap-2 text-[#de6e27] font-semibold hover:gap-3 transition-all">
              Alle Artikel <ArrowRight size={16} />
            </a>
          </motion.div>
          <motion.div variants={fadeUp} custom={1} className="grid md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <article key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#1a1a1a]/5">
                <div className="h-48 bg-gradient-to-br from-[#de6e27]/20 to-[#a2b8a2]/20 flex items-center justify-center">
                  <span className="text-[#de6e27]/30 font-serif text-6xl font-black">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#de6e27] text-xs font-bold uppercase">{post.cat}</span>
                    <span className="text-[#1a1a1a]/30 text-xs">{post.date}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1a1a1a] leading-snug group-hover:text-[#de6e27] transition-colors">
                    {post.title}
                  </h3>
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
function BeratungCTAa() {
  return (
    <section id="beratung" className="bg-[#de6e27] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2 variants={fadeUp} custom={0} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-6">
            Dein Kind. Deine Fragen. Meine Expertise.
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            Im 1:1-Online-Gespräch analysieren wir die Situation deines Kindes und entwickeln einen individuellen Plan. Klar, fundiert und auf Augenhöhe.
          </motion.p>
          <motion.a
            variants={fadeUp} custom={2}
            href="#kontakt"
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-black/80 transition-all active:scale-[0.97] shadow-xl"
          >
            Erstgespräch buchen <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function FooterA() {
  return (
    <footer id="kontakt" className="bg-[#1a1a1a] pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={IMAGES.logo} alt="Schluck.Impuls" className="h-10 w-10 rounded-lg" />
              <span className="font-serif font-bold text-white text-lg">Schluck.Impuls</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Ganzheitliche Myofunktion & Mundraumgesundheit für Kinder. Online-Kurse, Beratung und fundiertes Wissen für Eltern.
            </p>
          </div>
          <div>
            <h4 className="font-serif font-bold text-white mb-4">Seiten</h4>
            <div className="flex flex-col gap-2 text-white/50 text-sm">
              <a href="#saeulen" className="hover:text-white transition-colors">Die 5 Säulen</a>
              <a href="#sia" className="hover:text-white transition-colors">SIA Akademie</a>
              <a href="#ueber" className="hover:text-white transition-colors">Über mich</a>
              <a href="#beratung" className="hover:text-white transition-colors">Beratung</a>
              <a href="#blog" className="hover:text-white transition-colors">Blog</a>
            </div>
          </div>
          <div>
            <h4 className="font-serif font-bold text-white mb-4">Kontakt</h4>
            <div className="flex flex-col gap-3 text-white/50 text-sm">
              <a href="mailto:kontakt@schluckimpuls.de" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={16} /> kontakt@schluckimpuls.de
              </a>
              <a href="https://instagram.com/schluck.impuls" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <Instagram size={16} /> @schluck.impuls
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Schluck.Impuls – Franziska Bures. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-white/30 text-xs">
            <a href="#" className="hover:text-white/60 transition-colors">Impressum</a>
            <a href="#" className="hover:text-white/60 transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-white/60 transition-colors">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN PAGE ─── */
export default function VarianteA() {
  return (
    <div className="min-h-screen">
      <NavA />
      <HeroA />
      <StatementA />
      <PillarsA />
      <ForWhomA />
      <SIATeaserA />
      <AboutA />
      <NewsletterA />
      <BlogPreviewA />
      <BeratungCTAa />
      <FooterA />
    </div>
  );
}
