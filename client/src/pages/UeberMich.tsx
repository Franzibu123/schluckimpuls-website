/*
 * ÜBER MICH – Unterseite für Franziska Bures
 * Design: Variante C – Cremeweiß, Orange, Türkis, Salbei
 * Eigenständige Seite mit geteilter Navigation & Footer
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Instagram, Menu, X, Heart, BookOpen, Award, Users, Sparkles, GraduationCap } from "lucide-react";
import { Link } from "wouter";

const IMAGES = {
  logo: "/manus-storage/2005_c8546e59.png",
  franzi: "/manus-storage/41011_e7fd04a1.jpg",
  franziPraxis: "/manus-storage/34064_f75ca546.jpg",
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

/* ─── NAVIGATION (Subpage-Variante) ─── */
function NavSubpage() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#1a1a1a]/5">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-3">
          <img src={IMAGES.logo} alt="Schluck.Impuls" className="h-10 w-10 rounded-lg" />
          <span className="font-serif font-bold text-[#1a1a1a] text-lg tracking-tight">Schluck.Impuls</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-[#1a1a1a]/60 text-sm font-medium">
          <Link href="/" className="hover:text-[#1a1a1a] transition-colors">Startseite</Link>
          <Link href="/ueber-mich" className="text-[#de6e27] font-semibold">Über mich</Link>
          <a href="/#sia-c" className="hover:text-[#1a1a1a] transition-colors">SIA Akademie</a>
          <a href="/#beratung-c" className="hover:text-[#1a1a1a] transition-colors">Beratung</a>
          <a href="/#blog-c" className="hover:text-[#1a1a1a] transition-colors">Blog</a>
          <a href="/#kontakt-c" className="bg-[#de6e27] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#c55a18] transition-all active:scale-[0.97]">
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
          className="md:hidden bg-[#faf8f5] border-t border-[#1a1a1a]/5 px-6 pb-6 pt-2"
        >
          <div className="flex flex-col gap-4 text-[#1a1a1a] text-base font-medium">
            <Link href="/" onClick={() => setOpen(false)}>Startseite</Link>
            <Link href="/ueber-mich" onClick={() => setOpen(false)} className="text-[#de6e27]">Über mich</Link>
            <a href="/#sia-c" onClick={() => setOpen(false)}>SIA Akademie</a>
            <a href="/#beratung-c" onClick={() => setOpen(false)}>Beratung</a>
            <a href="/#blog-c" onClick={() => setOpen(false)}>Blog</a>
            <a href="/#kontakt-c" className="bg-[#de6e27] text-white px-5 py-3 rounded-lg font-semibold text-center mt-2">
              Beratung buchen
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

/* ─── HERO: Persönliche Vorstellung ─── */
function HeroAbout() {
  return (
    <section className="relative bg-[#faf8f5] pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-[#4fa8a0]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#de6e27]/6 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#de6e27]" />
              <span className="text-[#de6e27] text-sm font-bold uppercase tracking-widest">Über mich</span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#1a1a1a] leading-[1.05] mb-6">
              Hi, ich bin{" "}
              <span className="text-[#de6e27]">Franzi.</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-[#1a1a1a]/60 text-lg md:text-xl leading-relaxed mb-4">
              Logopädin, Dentosophin, Mutter von drei Kindern – und überzeugt davon, dass der Mund das Tor zur Gesundheit ist.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-[#1a1a1a]/60 text-base md:text-lg leading-relaxed mb-8">
              Mit Schluck.Impuls bringe ich mein Wissen aus 13 Jahren Praxis, über 20.000 Euro in Weiterbildungen und einer tiefen Leidenschaft für ganzheitliche Mundgesundheit zu dir nach Hause.
            </motion.p>
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 bg-[#de6e27]/10 text-[#de6e27] text-xs font-bold px-4 py-2 rounded-full">
                <Award size={14} /> 13 Jahre Erfahrung
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#4fa8a0]/10 text-[#4fa8a0] text-xs font-bold px-4 py-2 rounded-full">
                <GraduationCap size={14} /> Dentosophin
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#a2b8a2]/20 text-[#5a6b5a] text-xs font-bold px-4 py-2 rounded-full">
                <Heart size={14} /> Mutter von 3
              </span>
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" as const }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-full h-full bg-[#4fa8a0]/15 rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#de6e27]/20 rounded-2xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={IMAGES.franzi} alt="Franziska Bures" className="w-full h-[520px] object-cover object-top" />
                <div className="absolute bottom-0 right-0 bg-[#de6e27] text-white px-6 py-4 rounded-tl-2xl">
                  <p className="font-serif font-bold text-lg">Franziska Bures</p>
                  <p className="text-white/80 text-xs">Logopädin & Dentosophin</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── MEIN WEG ─── */
function MeinWeg() {
  const milestones = [
    {
      year: "2013",
      title: "Start in die Logopädie",
      desc: "Abschluss als Logopädin und Beginn der klinischen Arbeit mit Kindern – der Grundstein für alles, was folgen sollte.",
      color: "#de6e27",
    },
    {
      year: "2016",
      title: "Eigene Praxis",
      desc: "Gründung der eigenen logopädischen Praxis. Endlich die Freiheit, ganzheitlich zu arbeiten und eigene Wege zu gehen.",
      color: "#4fa8a0",
    },
    {
      year: "2019",
      title: "Dentosophie-Ausbildung",
      desc: "Entdeckung der Dentosophie – die Verbindung von Mundraum, Körperhaltung und emotionaler Entwicklung hat mein Denken grundlegend verändert.",
      color: "#a2b8a2",
    },
    {
      year: "2021",
      title: "Ganzheitliche Myofunktion",
      desc: "Intensive Weiterbildung in myofunktioneller Therapie mit Fokus auf Ursachenarbeit statt Symptombehandlung.",
      color: "#de6e27",
    },
    {
      year: "2024",
      title: "Schluck.Impuls entsteht",
      desc: "Die Idee, mein Wissen online zugänglich zu machen – für alle Eltern, nicht nur die in meiner Praxis.",
      color: "#4fa8a0",
    },
    {
      year: "2026",
      title: "SIA Akademie",
      desc: "Launch der SchluckImpuls Akademie: Online-Kurse, Beratung und eine wachsende Community für ganzheitliche Mundgesundheit.",
      color: "#de6e27",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#4fa8a0]" />
              <span className="text-[#4fa8a0] text-sm font-bold uppercase tracking-widest">Mein Weg</span>
              <span className="h-px w-8 bg-[#4fa8a0]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-6">
              Von der Praxis in die digitale Welt
            </h2>
            <p className="text-[#1a1a1a]/60 text-lg max-w-2xl mx-auto">
              Mein Weg war nie geradlinig – aber jeder Schritt hat mich näher zu dem gebracht, was ich heute tue.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[#1a1a1a]/10 -translate-x-1/2" />

            {milestones.map((m, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: m.color }}
                  >
                    <span className="text-white text-xs font-bold">{m.year}</span>
                  </div>
                </div>

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                  i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:ml-auto"
                }`}>
                  <div className="bg-[#faf8f5] rounded-xl p-6 border border-[#1a1a1a]/5 hover:shadow-md transition-shadow">
                    <h3 className="font-serif text-lg font-bold text-[#1a1a1a] mb-2">{m.title}</h3>
                    <p className="text-[#1a1a1a]/60 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── MEINE PHILOSOPHIE ─── */
function Philosophie() {
  const principles = [
    {
      icon: <Sparkles size={24} />,
      title: "Ursachen statt Symptome",
      desc: "Ich frage nicht nur 'Was ist das Problem?', sondern 'Warum ist es entstanden?' – und genau dort setze ich an.",
      color: "#de6e27",
    },
    {
      icon: <Heart size={24} />,
      title: "Ganzheitlich denken",
      desc: "Der Mund ist kein isoliertes Organ. Atmung, Haltung, Ernährung und emotionale Entwicklung hängen zusammen.",
      color: "#4fa8a0",
    },
    {
      icon: <Users size={24} />,
      title: "Eltern stärken",
      desc: "Ich bringe Eltern in die Eigenverantwortung – mit Wissen, das sie befähigt, selbst aktiv zu werden.",
      color: "#a2b8a2",
    },
    {
      icon: <BookOpen size={24} />,
      title: "Wissen verbinden",
      desc: "Schulmedizin trifft Pflanzenheilkunde und alte Heiltraditionen. Nicht als Ersatz, sondern als Ergänzung.",
      color: "#de6e27",
    },
  ];

  return (
    <section className="bg-[#faf8f5] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#de6e27]" />
              <span className="text-[#de6e27] text-sm font-bold uppercase tracking-widest">Meine Philosophie</span>
              <span className="h-px w-8 bg-[#de6e27]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-6">
              Woran ich glaube
            </h2>
            <p className="text-[#1a1a1a]/60 text-lg max-w-2xl mx-auto">
              Vier Grundsätze, die meine Arbeit leiten – in der Praxis, in der Akademie und in jedem Gespräch mit Eltern.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {principles.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="group bg-white rounded-xl p-8 border border-[#1a1a1a]/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${p.color}15`, color: p.color }}
                >
                  {p.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-3">{p.title}</h3>
                <p className="text-[#1a1a1a]/60 text-sm leading-relaxed">{p.desc}</p>
                <div
                  className="h-0.5 w-12 rounded-full mt-5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: p.color }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── QUALIFIKATIONEN ─── */
function Qualifikationen() {
  const qualifications = [
    { category: "Grundausbildung", items: ["Staatlich geprüfte Logopädin", "Schwerpunkt: Myofunktion & Dysphagie (Schluckstörungen)"] },
    { category: "Ganzheitliche Methoden", items: ["Dentosophie (zertifiziert)", "Ganzheitliche Myofunktionelle Therapie", "Pflanzenheilkunde & Naturheilverfahren"] },
    { category: "Spezialisierungen", items: ["Mundatmung & Nasenatmung bei Kindern", "Zungenruhelage & Schluckmuster", "Kieferentwicklung & orofaziale Dysfunktion", "Vergrößerte Mandeln, Adenoide & Polypen", "Paukenschnitt & Paukenröhrchen"] },
    { category: "Beratung & Coaching", items: ["Elternberatung (online & Praxis)", "Ganzheitliche Gesundheitsberatung", "Kurskonzeption & digitale Wissensvermittlung"] },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#4fa8a0]" />
              <span className="text-[#4fa8a0] text-sm font-bold uppercase tracking-widest">Qualifikationen</span>
              <span className="h-px w-8 bg-[#4fa8a0]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-6">
              Fundament & Expertise
            </h2>
            <p className="text-[#1a1a1a]/60 text-lg max-w-2xl mx-auto">
              Über 20.000 Euro in Weiterbildungen, hunderte Stunden Praxis und ein nie endendes Interesse an der Verbindung von Mund und Gesundheit.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualifications.map((q, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="bg-[#faf8f5] rounded-xl p-6 border border-[#1a1a1a]/5"
              >
                <h3 className="font-serif text-base font-bold text-[#1a1a1a] mb-4 pb-3 border-b border-[#1a1a1a]/10">
                  {q.category}
                </h3>
                <ul className="space-y-2.5">
                  {q.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[#1a1a1a]/60 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4fa8a0] mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PRAXIS-EINBLICK (Bildergalerie) ─── */
function PraxisEinblick() {
  const images = [
    { src: IMAGES.franziPraxis, alt: "Franzi mit Kiefermodell in der Praxis", span: "col-span-2 row-span-2" },
    { src: IMAGES.brettspiel, alt: "Therapeutisches Brettspiel", span: "" },
    { src: IMAGES.zungenKarten, alt: "Zungenübungs-Karten", span: "" },
    { src: IMAGES.kieferModell, alt: "Kiefermodell mit Schiene", span: "" },
    { src: IMAGES.ohrModell, alt: "Ohr-Anatomiemodell", span: "" },
  ];

  return (
    <section className="bg-[#faf8f5] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#a2b8a2]" />
              <span className="text-[#5a6b5a] text-sm font-bold uppercase tracking-widest">Einblicke</span>
              <span className="h-px w-8 bg-[#a2b8a2]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-6">
              Aus meiner Praxis
            </h2>
            <p className="text-[#1a1a1a]/60 text-lg max-w-2xl mx-auto">
              Spielerisch, fundiert und mit echtem Material – so sieht meine tägliche Arbeit mit Kindern aus.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {images.map((img, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover min-h-[180px]"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PERSÖNLICHES ZITAT ─── */
function PersoenlichesZitat() {
  return (
    <section className="relative bg-[#1a1a1a] py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#4fa8a0]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-[#de6e27]/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <span className="font-serif text-6xl md:text-8xl text-[#de6e27]/30 leading-none">"</span>
          </motion.div>
          <motion.blockquote variants={fadeUp} custom={1} className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug mb-8">
            Ich setze mich dafür ein, Eltern in die Eigenverantwortung zu bringen und die Wartezeit aktiv zu nutzen – sei es auf einen Logopädie-Termin oder die Zeit zwischen Nasenspray und OP beim HNO.
          </motion.blockquote>
          <motion.div variants={fadeUp} custom={2} className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#de6e27]">
              <img src={IMAGES.franzi} alt="Franzi" className="w-full h-full object-cover object-top" />
            </div>
            <div className="text-left">
              <p className="text-white font-serif font-bold">Franziska Bures</p>
              <p className="text-white/50 text-sm">Gründerin von Schluck.Impuls</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CTA: Zusammenarbeiten ─── */
function CTAZusammenarbeit() {
  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#de6e27]/5 via-transparent to-[#4fa8a0]/5" />
      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2 variants={fadeUp} custom={0} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-6">
            Lass uns zusammenarbeiten.
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-[#1a1a1a]/60 text-lg mb-10 max-w-2xl mx-auto">
            Ob im 1:1-Gespräch, in der SIA Akademie oder über meinen Blog – ich freue mich, dich und dein Kind auf eurem Weg zu begleiten.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#beratung-c" className="inline-flex items-center justify-center gap-3 bg-[#de6e27] text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-xl shadow-[#de6e27]/20">
              Erstgespräch buchen <ArrowRight size={20} />
            </a>
            <a href="/#sia-c" className="inline-flex items-center justify-center gap-3 bg-[#4fa8a0] text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-[#3d8a84] transition-all active:scale-[0.97] shadow-xl shadow-[#4fa8a0]/20">
              Zur Akademie
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER (Subpage-Variante) ─── */
function FooterSubpage() {
  return (
    <footer className="bg-[#1a1a1a] pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img src={IMAGES.logo} alt="Schluck.Impuls" className="h-10 w-10 rounded-lg" />
              <span className="font-serif font-bold text-white text-lg">Schluck.Impuls</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Ganzheitliche Myofunktion & Mundraumgesundheit für Kinder. Online-Kurse, Beratung und fundiertes Wissen für Eltern.
            </p>
          </div>
          <div>
            <h4 className="font-serif font-bold text-white mb-4">Seiten</h4>
            <div className="flex flex-col gap-2 text-white/50 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
              <Link href="/ueber-mich" className="hover:text-white transition-colors text-white">Über mich</Link>
              <a href="/#sia-c" className="hover:text-white transition-colors">SIA Akademie</a>
              <a href="/#beratung-c" className="hover:text-white transition-colors">Beratung</a>
              <a href="/#blog-c" className="hover:text-white transition-colors">Blog</a>
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
export default function UeberMich() {
  return (
    <div className="min-h-screen">
      <NavSubpage />
      <HeroAbout />
      <MeinWeg />
      <Philosophie />
      <Qualifikationen />
      <PraxisEinblick />
      <PersoenlichesZitat />
      <CTAZusammenarbeit />
      <FooterSubpage />
    </div>
  );
}
