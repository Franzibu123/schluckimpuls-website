/*
 * VARIANTE D – "Volle Wucht, aber atembarer"
 * Design: Bold Brand mit mehr Weißraum-Pausen
 * Orange bleibt dominant und kraftvoll, aber mit eleganteren Übergängen,
 * mehr Luft zwischen den Sektionen und feineren typografischen Details.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Instagram, Menu, X, ChevronRight } from "lucide-react";

const IMAGES = {
  logo: "/manus-storage/2005_c8546e59.png",
  franzi: "/manus-storage/41011_e7fd04a1.jpg",
  franziPraxis: "/manus-storage/34064_f75ca546.jpg",
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663449529821/f4hDgj38kkpjFJ8D4dyL6T/hero-child-mouth-9aXdyG6FHqVwqPYeE2HLGs.webp",
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

function NavD() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#de6e27] shadow-md">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="/" className="flex items-center gap-3">
          <img src={IMAGES.logo} alt="Schluck.Impuls" className="h-10 w-10 rounded-lg shadow-sm" />
          <span className="font-serif font-bold text-white text-lg tracking-tight">Schluck.Impuls</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-white/90 text-sm font-medium">
          <a href="#saeulen" className="hover:text-white transition-colors">Die 5 S&auml;ulen</a>
          <a href="#sia" className="hover:text-white transition-colors">SIA Akademie</a>
          <a href="#ueber" className="hover:text-white transition-colors">&Uuml;ber mich</a>
          <a href="#beratung" className="hover:text-white transition-colors">Beratung</a>
          <a href="#blog" className="hover:text-white transition-colors">Blog</a>
          <a href="#kontakt" className="bg-white text-[#de6e27] px-5 py-2.5 rounded-lg font-bold hover:bg-white/90 transition-all active:scale-[0.97] shadow-sm">
            Beratung buchen
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-[#de6e27] border-t border-white/20 px-6 pb-6 pt-2">
          <div className="flex flex-col gap-4 text-white text-base font-medium">
            <a href="#saeulen" onClick={() => setOpen(false)}>Die 5 S&#228;ulen</a>
            <a href="#sia" onClick={() => setOpen(false)}>SIA Akademie</a>
            <a href="#ueber" onClick={() => setOpen(false)}>&#220;ber mich</a>
            <a href="#beratung" onClick={() => setOpen(false)}>Beratung</a>
            <a href="#blog" onClick={() => setOpen(false)}>Blog</a>
            <a href="#kontakt" className="bg-white text-[#de6e27] px-5 py-3 rounded-lg font-bold text-center mt-2">Beratung buchen</a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function HeroD() {
  return (
    <section className="relative bg-[#de6e27] pt-28 md:pt-36 pb-20 md:pb-32 overflow-hidden">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} custom={0} className="text-white/70 text-sm font-semibold uppercase tracking-[0.2em] mb-6">
              Ganzheitliche Myofunktion & Mundraumgesundheit
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] mb-8">
              Was w&#228;re, wenn der{" "}
              <span className="relative inline-block">Mund<span className="absolute left-0 right-0 bottom-[0.05em] h-[0.3em] bg-[#a2b8a2]/60 -z-10" /></span>{" "}
              deines Kindes der Schl&#252;ssel zu seiner Gesundheit w&#228;re?
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Entdecke, wie Zungenruhelage, Schluckmuster und Nasenatmung die gesamte Entwicklung deines Kindes beeinflussen.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4">
              <a href="#beratung" className="inline-flex items-center justify-center gap-2 bg-white text-[#de6e27] px-8 py-4 rounded-lg font-bold text-base hover:bg-white/90 transition-all active:scale-[0.97] shadow-xl">
                Beratung buchen <ArrowRight size={18} />
              </a>
              <a href="#sia" className="inline-flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white/50 px-8 py-4 rounded-lg font-bold text-base hover:border-white hover:bg-white/10 transition-all active:scale-[0.97]">
                Zur SIA Akademie
              </a>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" as const }} className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/10">
              <img src={IMAGES.hero} alt="Kindergesicht Nahaufnahme" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#de6e27]/30 to-transparent" />
            </div>
            <div className="absolute -bottom-4 left-8 bg-white text-[#1a1a1a] px-6 py-3 rounded-xl shadow-lg">
              <p className="font-serif font-bold text-sm">13 Jahre Erfahrung</p>
              <p className="text-[#1a1a1a]/50 text-xs">Logop&#228;din & Dentosophin</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatementD() {
  return (
    <section className="relative bg-[#faf8f5] py-24 md:py-36 overflow-hidden">
      <div className="absolute top-0 left-0 w-[120px] md:w-[200px] h-[300px] md:h-[500px] bg-[#de6e27] rounded-br-[50%] opacity-90" />
      <div className="absolute top-12 left-[50px] md:left-[80px] w-[40px] h-[3px] bg-[#a2b8a2] rounded-full" />
      <div className="container relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-full border-2 border-[#de6e27] flex items-center justify-center bg-white shadow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#de6e27" strokeWidth="2"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" /></svg>
              </div>
              <div>
                <span className="text-[#1a1a1a] text-xs font-bold uppercase tracking-widest">S&#228;ule 5</span>
                <span className="block text-[#1a1a1a]/50 text-xs mt-0.5">Medizinische Entscheidungen verstehen</span>
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] leading-[1.08] mb-8">
              Bevor du Ja sagst zu <span className="text-[#de6e27]">Paukenr&#246;hrchen</span>, Polypen oder <span className="text-[#de6e27]">Mandel-OP</span> &#8211; kennst du die Fragen, die niemand stellt?
            </motion.h2>
            <motion.div variants={fadeUp} custom={1.5} className="w-24 h-[3px] bg-gradient-to-r from-[#de6e27] to-[#a2b8a2] rounded-full mb-8" />
            <motion.p variants={fadeUp} custom={2} className="text-[#1a1a1a]/60 text-lg leading-relaxed mb-10 max-w-lg">
              Medizinische Entscheidungen betreffen dein Kind &#8211; aber du darfst die richtigen Fragen stellen. Wir helfen dir, die Antworten zu finden.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4">
              <a href="#blog" className="inline-flex items-center gap-3 bg-[#de6e27] text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-lg shadow-[#de6e27]/20">
                Zu den Antworten <ArrowRight size={18} />
              </a>
              <a href="#saeulen" className="inline-flex items-center gap-3 border-2 border-[#de6e27] text-[#de6e27] px-8 py-4 rounded-lg font-bold text-base hover:bg-[#de6e27]/5 transition-all active:scale-[0.97]">
                Mehr erfahren
              </a>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} custom={2} className="relative">
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border-2 border-[#a2b8a2]/30 hidden md:block" />
            <div className="absolute bottom-12 -left-6 w-24 h-24 rounded-full bg-[#de6e27]/10 hidden md:block" />
            <div className="rounded-2xl overflow-hidden shadow-xl mb-6 ring-1 ring-[#1a1a1a]/5">
              <img src={IMAGES.ohrModell} alt="Anatomisches Ohr-Modell" className="w-full h-[280px] object-cover" />
            </div>
            <div className="bg-white rounded-xl shadow-md p-7 border border-[#1a1a1a]/5">
              <p className="text-[#de6e27] text-xs font-bold uppercase tracking-widest mb-4">Die richtigen Fragen</p>
              <div className="space-y-3.5">
                {["Ist die OP wirklich notwendig?", "Welche Alternativen gibt es?", "Was sind die Langzeitfolgen?", "Welche Ursachen wurden abgekl\u00E4rt?", "Gibt es einen ganzheitlichen Weg?"].map((q, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded border-2 border-[#de6e27]/30 flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 rounded-sm bg-[#de6e27]" />
                    </span>
                    <p className="text-[#1a1a1a]/70 text-sm font-medium">{q}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-4 right-12 grid grid-cols-3 gap-2 hidden md:grid">
              {Array.from({length: 9}).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#a2b8a2]/50" />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const pillars = [
  { num: "01", title: "Myofunktion", desc: "Zungenruhelage, Schluckmuster und Kieferentwicklung \u2013 die Basis f\u00FCr eine gesunde orale Funktion.", icon: "\uD83D\uDC45" },
  { num: "02", title: "Mundraumgesundheit", desc: "Schleimh\u00E4ute, Mandeln, Nasenatmung \u2013 wie der Mundraum das Immunsystem deines Kindes beeinflusst.", icon: "\uD83E\uDEC1" },
  { num: "03", title: "N\u00E4hrstoffbasis", desc: "N\u00E4hrstoffreiches, naturbelassenes Essen als Fundament f\u00FCr Regeneration und gesunde Entwicklung.", icon: "\uD83C\uDF31" },
  { num: "04", title: "Alltag & Integration", desc: "Wie du Wissen zuhause umsetzt, ohne von Therapie zu Therapie zu fahren.", icon: "\uD83C\uDFE1" },
  { num: "05", title: "Medizinische Entscheidungen", desc: "Verstehe, was Eingriffe wirklich bedeuten, welche Alternativen es gibt und welche Fragen du stellen solltest.", icon: "\u2695\uFE0F" },
];

function PillarsD() {
  return (
    <section id="saeulen" className="bg-white py-24 md:py-32">
      <div className="container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center mb-16">
          <motion.p variants={fadeUp} custom={0} className="text-[#de6e27] text-sm font-bold uppercase tracking-[0.2em] mb-4">Das ganzheitliche System</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-6">Die f&#252;nf S&#228;ulen von Schluck.Impuls</motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-[#1a1a1a]/55 text-lg max-w-2xl mx-auto leading-relaxed">Jede S&#228;ule f&#252;r sich ist wichtig &#8211; zusammen bilden sie das Fundament f&#252;r die ganzheitliche Mundgesundheit deines Kindes.</motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((p, i) => (
            <motion.div key={p.num} variants={fadeUp} custom={i} className={`group relative p-8 rounded-2xl transition-all duration-300 hover:shadow-xl border ${i === 4 ? "bg-[#de6e27] text-white border-[#de6e27] md:col-span-2 lg:col-span-1 shadow-lg shadow-[#de6e27]/10" : "bg-[#faf8f5] text-[#1a1a1a] border-[#1a1a1a]/5 hover:border-[#de6e27]/30"}`}>
              <div className="flex items-start justify-between mb-5">
                <span className="text-3xl">{p.icon}</span>
                <span className={`font-mono text-xs font-bold ${i === 4 ? "text-white/40" : "text-[#de6e27]/30"}`}>{p.num}</span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">{p.title}</h3>
              <p className={`text-sm leading-relaxed ${i === 4 ? "text-white/80" : "text-[#1a1a1a]/55"}`}>{p.desc}</p>
              <div className={`mt-5 flex items-center gap-1 text-sm font-semibold ${i === 4 ? "text-white/70" : "text-[#de6e27]"}`}>
                <span>Mehr erfahren</span><ChevronRight size={14} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ForWhomD() {
  return (
    <section className="bg-[#de6e27] py-24 md:py-32">
      <div className="container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <motion.p variants={fadeUp} custom={0} className="text-white/60 text-sm font-semibold uppercase tracking-[0.2em] mb-4">F&#252;r wen ist das?</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-10">F&#252;r Eltern, die mehr wollen als Standardantworten.</motion.h2>
            <motion.div variants={fadeUp} custom={2} className="space-y-4">
              {[
                "Du bist offen f\u00FCr ganzheitliche Ans\u00E4tze und willst dein Kind selbst begleiten.",
                "Du willst Ursachen verstehen, statt nur Symptome zu behandeln.",
                "Du gibst dich nicht mit Standardma\u00DFnahmen als erste L\u00F6sung zufrieden.",
                "Du willst informierte Entscheidungen treffen \u2013 auch bei medizinischen Fragen.",
                "Du suchst fundiertes Wissen, das du im Alltag umsetzen kannst.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#de6e27] text-xs font-bold">{"\u2713"}</span>
                  </span>
                  <p className="text-white/90 text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div variants={fadeUp} custom={3} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/10">
                <img src={IMAGES.brettspiel} alt="Mundmotorik-Brettspiel" className="w-full h-[220px] object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/10 mt-8">
                <img src={IMAGES.zungenKarten} alt="Zungen&#252;bungs-Karten" className="w-full h-[220px] object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/10">
                <img src={IMAGES.kieferModell} alt="Kiefermodell" className="w-full h-[180px] object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/10 mt-[-20px]">
                <img src={IMAGES.franziPraxis} alt="Franzi in der Praxis" className="w-full h-[200px] object-cover object-top" />
              </div>
            </div>
            <div className="absolute -bottom-6 left-4 right-4 sm:left-8 sm:right-auto bg-white text-[#1a1a1a] p-5 rounded-xl shadow-xl max-w-[280px]">
              <p className="font-serif font-bold text-base leading-snug mb-1">{"\u201ESelbstverantwortung statt Delegation.\u201C"}</p>
              <p className="text-[#1a1a1a]/50 text-xs">{"\u2013 Franziska Bures"}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SIATeaserD() {
  return (
    <section id="sia" className="bg-[#faf8f5] py-24 md:py-32">
      <div className="container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <p className="text-[#de6e27] text-sm font-bold uppercase tracking-[0.2em] mb-4">Die Akademie</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-6">SIA &#8211; SchluckImpuls Akademie</h2>
            <p className="text-[#1a1a1a]/55 text-lg max-w-2xl mx-auto leading-relaxed">Die digitale Akademie f&#252;r Eltern, die ihre Kinder rund um Mundgesundheit begleiten wollen. Fundiertes Wissen, praxisnah aufbereitet.</p>
          </motion.div>
          <motion.div variants={fadeUp} custom={1} className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: "Mandel-Kurs", subtitle: "Mini-Kurs", desc: "Vergr\u00F6\u00DFerte Mandeln ganzheitlich verstehen und begleiten", status: "Verf\u00FCgbar", statusColor: "bg-green-500" },
              { title: "Zungenruhelage & Myo", subtitle: "Signature-Kurs", desc: "Mundatmung bei Kindern \u2013 Was du als Mama wissen und tun kannst", status: "In Vorbereitung", statusColor: "bg-[#de6e27]" },
              { title: "Myo-Elternausbildung", subtitle: "Winter 2026/2027", desc: "Tiefe Ausbildung f\u00FCr Eltern \u2013 mit Warteliste-Funktion", status: "Warteliste", statusColor: "bg-[#a2b8a2]" },
            ].map((course, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-[#1a1a1a]/5 hover:border-[#de6e27]/20">
                <div className="flex items-center gap-2 mb-5">
                  <span className={`${course.statusColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>{course.status}</span>
                  <span className="text-[#1a1a1a]/40 text-xs">{course.subtitle}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-3">{course.title}</h3>
                <p className="text-[#1a1a1a]/55 text-sm leading-relaxed mb-6">{course.desc}</p>
                <a href="#" className="inline-flex items-center gap-2 text-[#de6e27] font-semibold text-sm hover:gap-3 transition-all">Mehr erfahren <ArrowRight size={16} /></a>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutD() {
  return (
    <section id="ueber" className="bg-[#1a1a1a] py-24 md:py-32">
      <div className="container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div variants={fadeUp} custom={0} className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <img src={IMAGES.franzi} alt="Franziska Bures" className="w-full h-[520px] object-cover object-top" />
            </div>
            <div className="absolute bottom-6 right-6 bg-[#de6e27] text-white px-6 py-4 rounded-xl shadow-lg">
              <p className="font-serif font-bold text-base">Franziska Bures</p>
              <p className="text-white/70 text-xs mt-0.5">Logop&#228;din & Dentosophin</p>
            </div>
          </motion.div>
          <div>
            <motion.p variants={fadeUp} custom={0} className="text-[#de6e27] text-sm font-bold uppercase tracking-[0.2em] mb-4">&#220;ber mich</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl font-black text-white leading-tight mb-8">Hi, ich bin Franzi.</motion.h2>
            <motion.div variants={fadeUp} custom={2} className="space-y-5 text-white/70 text-base leading-relaxed">
              <p>Selbstst&#228;ndige Logop&#228;din mit eigener Praxis, Mutter von drei Kindern und &#252;berzeugt davon, dass der Mund der Schl&#252;ssel zur Gesundheit ist.</p>
              <p>Nach 13 Jahren in der Praxis und &#252;ber 20.000 &#8364; in Weiterbildungen &#8211; von Dentosophie bis zur ganzheitlichen Myofunktion &#8211; wei&#223; ich: <strong className="text-white">Ursachenarbeit schl&#228;gt Symptombehandlung. Immer.</strong></p>
              <p>Ich verbinde schulmedizinisches Fachwissen mit Pflanzenheilkunde und alten Heiltraditionen. Nicht als Ersatz, sondern als Erg&#228;nzung. F&#252;r Familien, die selbst Verantwortung &#252;bernehmen wollen.</p>
            </motion.div>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 mt-8 mb-8">
              {["13 Jahre Erfahrung", "Dentosophin", "Mutter von 3"].map((tag) => (
                <span key={tag} className="bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-medium border border-white/10">{tag}</span>
              ))}
            </motion.div>
            <motion.a variants={fadeUp} custom={4} href="#beratung" className="inline-flex items-center gap-2 bg-[#de6e27] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-lg">
              Mehr &#252;ber mich <ArrowRight size={18} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NewsletterD() {
  return (
    <section className="bg-[#a2b8a2] py-20 md:py-28">
      <div className="container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-2xl mx-auto text-center">
          <motion.h2 variants={fadeUp} custom={0} className="font-serif text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-5">Bleib dran &#8211; mit dem Schluck.Impuls Newsletter</motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-[#1a1a1a]/70 text-lg mb-10 leading-relaxed">Fundiertes Wissen, ehrliche Impulse und praktische Tipps direkt in dein Postfach. Kein Spam, versprochen.</motion.p>
          <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Deine E-Mail-Adresse" className="flex-1 px-5 py-4 rounded-lg bg-white text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 border-0 focus:ring-2 focus:ring-[#de6e27] outline-none shadow-sm" />
            <button className="bg-[#de6e27] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-lg whitespace-nowrap">Anmelden</button>
          </motion.div>
          <motion.p variants={fadeUp} custom={3} className="text-[#1a1a1a]/50 text-xs mt-5">Freebie-Inhalt wird erg&#228;nzt. Du kannst dich jederzeit abmelden.</motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function BlogPreviewD() {
  const posts = [
    { title: "Warum Mundatmung bei Kindern mehr als nur eine schlechte Angewohnheit ist", cat: "Myofunktion", date: "Bald verf\u00FCgbar" },
    { title: "Vergr\u00F6\u00DFerte Mandeln: Was Eltern wirklich wissen sollten", cat: "Medizinische Entscheidungen", date: "Bald verf\u00FCgbar" },
    { title: "Zungenruhelage \u2013 der stille Held der Kieferentwicklung", cat: "Mundraumgesundheit", date: "Bald verf\u00FCgbar" },
  ];
  return (
    <section id="blog" className="bg-white py-24 md:py-32">
      <div className="container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.div variants={fadeUp} custom={0} className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[#de6e27] text-sm font-bold uppercase tracking-[0.2em] mb-4">Blog</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1a1a1a]">Aktuelles aus dem Blog</h2>
            </div>
            <a href="#" className="hidden md:inline-flex items-center gap-2 text-[#de6e27] font-semibold hover:gap-3 transition-all">Alle Artikel <ArrowRight size={16} /></a>
          </motion.div>
          <motion.div variants={fadeUp} custom={1} className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post, i) => (
              <article key={i} className="group bg-[#faf8f5] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#1a1a1a]/5 hover:border-[#de6e27]/20">
                <div className="h-44 bg-gradient-to-br from-[#de6e27]/10 to-[#a2b8a2]/10 flex items-center justify-center relative overflow-hidden">
                  <span className="text-[#de6e27]/20 font-serif text-7xl font-black">{String(i + 1).padStart(2, "0")}</span>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#de6e27] to-[#a2b8a2]" />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#de6e27] text-xs font-bold uppercase">{post.cat}</span>
                    <span className="text-[#1a1a1a]/30 text-xs">{post.date}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1a1a1a] leading-snug group-hover:text-[#de6e27] transition-colors">{post.title}</h3>
                </div>
              </article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function BeratungCTAd() {
  return (
    <section id="beratung" className="bg-[#de6e27] py-24 md:py-32 relative overflow-hidden">
      <div className="container relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} custom={0} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">Dein Kind. Deine Fragen. Meine Expertise.</motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-white/80 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">Im 1:1-Online-Gespr&#228;ch analysieren wir die Situation deines Kindes und entwickeln einen individuellen Plan. Klar, fundiert und auf Augenh&#246;he.</motion.p>
          <motion.a variants={fadeUp} custom={2} href="#kontakt" className="inline-flex items-center gap-3 bg-white text-[#de6e27] px-10 py-5 rounded-lg font-bold text-lg hover:bg-white/90 transition-all active:scale-[0.97] shadow-xl">
            Erstgespr&#228;ch buchen <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function FooterD() {
  return (
    <footer id="kontakt" className="bg-[#1a1a1a] pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={IMAGES.logo} alt="Schluck.Impuls" className="h-10 w-10 rounded-lg" />
              <span className="font-serif font-bold text-white text-lg">Schluck.Impuls</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">Ganzheitliche Myofunktion & Mundraumgesundheit f&#252;r Kinder. Online-Kurse, Beratung und fundiertes Wissen f&#252;r Eltern.</p>
          </div>
          <div>
            <h4 className="font-serif font-bold text-white mb-4">Seiten</h4>
            <div className="flex flex-col gap-3 text-white/50 text-sm">
              <a href="#saeulen" className="hover:text-white transition-colors">Die 5 S&#228;ulen</a>
              <a href="#sia" className="hover:text-white transition-colors">SIA Akademie</a>
              <a href="#ueber" className="hover:text-white transition-colors">&#220;ber mich</a>
              <a href="#beratung" className="hover:text-white transition-colors">Beratung</a>
              <a href="#blog" className="hover:text-white transition-colors">Blog</a>
            </div>
          </div>
          <div>
            <h4 className="font-serif font-bold text-white mb-4">Kontakt</h4>
            <div className="flex flex-col gap-3 text-white/50 text-sm">
              <a href="mailto:kontakt@schluckimpuls.de" className="flex items-center gap-2 hover:text-white transition-colors"><Mail size={16} /> kontakt@schluckimpuls.de</a>
              <a href="https://instagram.com/schluck.impuls" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors"><Instagram size={16} /> @schluck.impuls</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">&copy; {new Date().getFullYear()} Schluck.Impuls &#8211; Franziska Bures. Alle Rechte vorbehalten.</p>
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

export default function VarianteD() {
  return (
    <div className="min-h-screen">
      <NavD />
      <HeroD />
      <StatementD />
      <PillarsD />
      <ForWhomD />
      <SIATeaserD />
      <AboutD />
      <NewsletterD />
      <BlogPreviewD />
      <BeratungCTAd />
      <FooterD />
    </div>
  );
}
