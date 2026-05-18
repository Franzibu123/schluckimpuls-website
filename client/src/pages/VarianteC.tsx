/*
 * VARIANTE C – "Dezent + Stylisch mit Türkis"
 * Design: Bold Manifesto meets Modern Curation
 * Cremeweiß als Grundton, Orange knallig als Hauptakzent,
 * Türkis als zweite Akzentfarbe, Salbei zurückhaltend.
 * Modern, kuratiert, mutig.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Instagram, Menu, X, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const IMAGES = {
  logo: "/manus-storage/2005_c8546e59.png",
  franzi: "/manus-storage/41011_e7fd04a1.jpg",
  franziPraxis: "/manus-storage/34064_f75ca546.jpg",
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663449529821/f4hDgj38kkpjFJ8D4dyL6T/hero-child-mouth-9aXdyG6FHqVwqPYeE2HLGs.webp",
  pillars: "https://d2xsxph8kpxj0f.cloudfront.net/310519663449529821/f4hDgj38kkpjFJ8D4dyL6T/five-pillars-bg-JiDnXyruj7qEiGrMtQLYZR.webp",
  mundmodellBalancer: "/manus-storage/mundmodell-balancer_6d2e2c93.jpg",
  saefte: "/manus-storage/saefte_31dd7bb7.jpg",
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

/* ─── NAVIGATION ─── */
function NavC() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#1a1a1a]/5">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="/" className="flex items-center gap-3">
          <img src={IMAGES.logo} alt="Schluck.Impuls" className="h-10 w-10 rounded-lg" />
          <span className="font-serif font-bold text-[#1a1a1a] text-lg tracking-tight">Schluck.Impuls</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-[#1a1a1a]/60 text-sm font-medium">
          <a href="#saeulen-c" className="hover:text-[#1a1a1a] transition-colors">Die 5 Säulen</a>
          <a href="#sia-c" className="hover:text-[#1a1a1a] transition-colors">SIA Akademie</a>
          <Link href="/ueber-mich" className="hover:text-[#1a1a1a] transition-colors">Über mich</Link>
          <a href="#beratung-c" className="hover:text-[#1a1a1a] transition-colors">Beratung</a>
          <a href="#blog-c" className="hover:text-[#1a1a1a] transition-colors">Blog</a>
          <a href="#kontakt-c" className="bg-[#de6e27] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#c55a18] transition-all active:scale-[0.97]">
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
            <a href="#saeulen-c" onClick={() => setOpen(false)}>Die 5 Säulen</a>
            <a href="#sia-c" onClick={() => setOpen(false)}>SIA Akademie</a>
            <Link href="/ueber-mich" onClick={() => setOpen(false)}>Über mich</Link>
            <a href="#beratung-c" onClick={() => setOpen(false)}>Beratung</a>
            <a href="#blog-c" onClick={() => setOpen(false)}>Blog</a>
            <a href="#kontakt-c" className="bg-[#de6e27] text-white px-5 py-3 rounded-lg font-semibold text-center mt-2">
              Beratung buchen
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

/* ─── HERO ─── */
function HeroC() {
  return (
    <section className="relative bg-[#faf8f5] pt-28 md:pt-36 pb-20 md:pb-32 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#4fa8a0]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#de6e27]/6 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#4fa8a0]" />
              <span className="text-[#4fa8a0] text-sm font-semibold uppercase tracking-widest">Ganzheitliche Myofunktion & Mundraumgesundheit</span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#1a1a1a] leading-[1.05] mb-6">
              Was wäre, wenn der{" "}
              <span className="relative inline">
                Mund
                <span className="absolute left-[-4px] right-[-4px] bottom-[0.08em] h-[0.35em] bg-[#de6e27]/30 -z-10" />
              </span>{" "}
              deines Kindes der{" "}
              <span className="text-[#de6e27]">Schlüssel</span>{" "}
              zu seiner Gesundheit wäre?
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-[#1a1a1a]/60 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              Entdecke, wie Zungenruhelage, Schluckmuster und Nasenatmung die gesamte Entwicklung deines Kindes beeinflussen.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4">
              <a href="#beratung-c" className="inline-flex items-center justify-center gap-2 bg-[#de6e27] text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-lg shadow-[#de6e27]/20">
                Beratung buchen <ArrowRight size={18} />
              </a>
              <a href="#sia-c" className="inline-flex items-center justify-center gap-2 bg-[#4fa8a0] text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-[#3d8a84] transition-all active:scale-[0.97] shadow-lg shadow-[#4fa8a0]/20">
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
            <div className="relative">
              {/* Türkis accent shape behind image */}
              <div className="absolute -top-6 -right-6 w-full h-full bg-[#4fa8a0]/15 rounded-2xl" />
              {/* Orange accent shape */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#de6e27]/20 rounded-2xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={IMAGES.hero} alt="Kindergesicht Nahaufnahme" className="w-full h-[480px] object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── STATEMENT SÄULE 5 ─── */
function StatementC() {
  return (
    <section className="relative bg-[#faf8f5] py-20 md:py-32 overflow-hidden">
      {/* Decorative türkis circle top-right */}
      <div className="absolute -top-12 -right-12 w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full bg-[#4fa8a0]/25 -z-0 hidden md:block" />
      {/* Decorative orange blob bottom-right */}
      <div className="absolute bottom-0 right-0 w-[250px] h-[300px] bg-[#de6e27]/10 rounded-tl-[60%] -z-0 hidden md:block" />
      {/* Salbei accent bar top */}
      <div className="absolute top-12 left-8 md:left-16 w-[80px] h-[6px] bg-[#a2b8a2] rounded-full opacity-60" />

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
              <div className="w-12 h-12 rounded-full bg-[#4fa8a0]/10 border-2 border-[#4fa8a0] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4fa8a0" strokeWidth="2">
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
                </svg>
              </div>
              <div>
                <span className="bg-[#a2b8a2]/20 text-[#1a1a1a] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">SÄULE 5: MEDIZINISCHE ENTSCHEIDUNGEN VERSTEHEN</span>
              </div>
            </motion.div>

            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-black text-[#1a1a1a] leading-[1.05] mb-6">
              Bevor du Ja sagst zu{" "}
              <span className="text-[#de6e27]">Paukenröhrchen</span>, Polypen oder{" "}
              <span className="text-[#de6e27]">Mandel-OP</span> –{" "}
              kennst du die Fragen, die niemand stellt?
            </motion.h2>

            {/* Orange underline accent like mockup */}
            <motion.div variants={fadeUp} custom={1.5} className="relative w-48 h-1.5 mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#de6e27] via-[#de6e27] to-[#a2b8a2] rounded-full" />
              <svg className="absolute -right-2 -top-1 w-4 h-4 text-[#a2b8a2]" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 2c2 0 4 1 5 3s1 4 0 6-3 3-5 3-4-1-5-3-1-4 0-6 3-3 5-3z" />
              </svg>
            </motion.div>

            <motion.p variants={fadeUp} custom={2} className="text-[#1a1a1a]/60 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Medizinische Entscheidungen betreffen dein Kind – aber du darfst die richtigen Fragen stellen. Wir beleuchten die wahren Zusammenhänge und zeigen dir Alternativen auf, die Ärzte oft nicht nennen.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4">
              <a href="#blog-c" className="inline-flex items-center gap-2 bg-[#de6e27] text-white px-7 py-3.5 rounded-lg font-bold hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-lg shadow-[#de6e27]/20">
                Zu den Antworten <ArrowRight size={18} />
              </a>
              <a href="#sia-c" className="inline-flex items-center gap-2 border-2 border-[#4fa8a0] text-[#4fa8a0] px-7 py-3.5 rounded-lg font-bold hover:bg-[#4fa8a0]/5 transition-all active:scale-[0.97]">
                Mehr erfahren
              </a>
            </motion.div>
          </div>

          {/* Right: Collage layout like mockup */}
          <motion.div variants={fadeUp} custom={2} className="relative">
            {/* Türkis circle accent */}
            <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-[#4fa8a0]/20 -z-10 hidden md:block" />
            {/* Dots pattern */}
            <div className="absolute -top-2 right-12 grid grid-cols-4 gap-1.5 hidden md:grid">
              {Array.from({length: 16}).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#4fa8a0]/40" />
              ))}
            </div>

            {/* Ohr image with circular crop effect */}
            <div className="rounded-2xl overflow-hidden shadow-xl mb-6 border border-[#1a1a1a]/5">
              <img src={IMAGES.ohrModell} alt="Anatomisches Ohr-Modell" className="w-full h-[260px] object-cover" />
            </div>

            {/* Checklist card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-[#4fa8a0]/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-[#4fa8a0]/10 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4fa8a0" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <span className="text-[#1a1a1a]/50 text-xs font-bold uppercase tracking-wider">Deine Checkliste</span>
              </div>
              <div className="space-y-3">
                {["Ist die OP wirklich notwendig?", "Welche Alternativen gibt es?", "Was sind die Langzeitfolgen?", "Welche Ursachen wurden abgeklärt?", "Gibt es einen ganzheitlichen Weg?"].map((q, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded border-2 border-[#4fa8a0]/40 flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 rounded-sm bg-[#4fa8a0]" />
                    </span>
                    <p className="text-[#1a1a1a]/70 text-sm font-medium">{q}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Small leaf decoration */}
            <div className="absolute -bottom-4 left-4 text-[#a2b8a2]/40 hidden md:block">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" /></svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 5 SÄULEN ─── */
const pillars = [
  { num: "01", title: "Myofunktion", desc: "Zungenruhelage, Schluckmuster und Kieferentwicklung – die Basis für eine gesunde orale Funktion.", color: "#de6e27", icon: "👅" },
  { num: "02", title: "Mundraumgesundheit", desc: "Schleimhäute, Mandeln, Nasenatmung – wie der Mundraum das Immunsystem deines Kindes beeinflusst.", color: "#4fa8a0", icon: "🫁" },
  { num: "03", title: "Nährstoffbasis", desc: "Nährstoffreiches, naturbelassenes Essen als Fundament für Regeneration und gesunde Entwicklung.", color: "#a2b8a2", icon: "🌱" },
  { num: "04", title: "Alltag & Integration", desc: "Wie du Wissen zuhause umsetzt, ohne von Therapie zu Therapie zu fahren.", color: "#de6e27", icon: "🏡" },
  { num: "05", title: "Medizinische Entscheidungen", desc: "Verstehe, was Eingriffe wirklich bedeuten, welche Alternativen es gibt und welche Fragen du stellen solltest.", color: "#4fa8a0", icon: "⚕️" },
];

function PillarsC() {
  return (
    <section id="saeulen-c" className="bg-[#faf8f5] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#4fa8a0]" />
            <span className="text-[#4fa8a0] text-sm font-bold uppercase tracking-widest">Das ganzheitliche System</span>
            <span className="h-px w-8 bg-[#4fa8a0]" />
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-6">
            Die fünf Säulen von Schluck.Impuls
          </motion.h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              variants={fadeUp}
              custom={i}
              className="group relative bg-white rounded-xl p-6 border border-[#1a1a1a]/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl">{p.icon}</span>
                <span className="font-mono text-xs font-bold" style={{ color: `${p.color}40` }}>{p.num}</span>
              </div>
              <h3 className="font-serif text-base font-bold text-[#1a1a1a] mb-2">{p.title}</h3>
              <p className="text-[#1a1a1a]/50 text-xs leading-relaxed">{p.desc}</p>
              <div className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: p.color }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FÜR WEN ─── */
function ForWhomC() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <div>
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#de6e27]" />
              <span className="text-[#de6e27] text-sm font-bold uppercase tracking-widest">Für dich gemacht</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] leading-tight mb-8">
              Für wen ist Schluck.Impuls?
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="space-y-3">
              {[
                "Du bist offen für ganzheitliche Ansätze und willst dein Kind selbst begleiten.",
                "Du willst Ursachen verstehen, statt nur Symptome zu behandeln.",
                "Du gibst dich nicht mit Standardlösungen als erste Antwort zufrieden.",
                "Du willst informierte Entscheidungen treffen – auch bei medizinischen Fragen.",
                "Du suchst fundiertes Wissen, das du im Alltag umsetzen kannst.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: i % 2 === 0 ? "#de6e27" : "#4fa8a0" }}>
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-[#1a1a1a]/70 text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div variants={fadeUp} custom={3} className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={IMAGES.brettspiel} alt="Mundmotorik-Brettspiel" className="w-full h-[200px] object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={IMAGES.zungenKarten} alt="Zungenübungs-Karten" className="w-full h-[200px] object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={IMAGES.saefte} alt="Frische Säfte" className="w-full h-[200px] object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={IMAGES.mundmodellBalancer} alt="Mundmodell mit Balancern" className="w-full h-[200px] object-cover" />
              </div>
            </div>
            {/* Tuerkis quote card */}
            <div className="absolute -bottom-6 -left-6 bg-[#4fa8a0] text-white p-6 rounded-xl shadow-lg max-w-[260px] z-10">
              <p className="font-serif font-bold text-base leading-snug">
                "Selbstverantwortung statt Abwarten."
              </p>
              <p className="text-white/60 text-xs mt-2">{"–"} Franziska Bures</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SIA TEASER ─── */
function SIATeaserC() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [waitlistCourse, setWaitlistCourse] = useState("");

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail.trim()) {
      setWaitlistSubmitted(true);
      setTimeout(() => {
        setWaitlistOpen(false);
        setWaitlistSubmitted(false);
        setWaitlistEmail("");
      }, 3000);
    }
  };

  const courses = [
    { title: "Mandel-Kurs", subtitle: "Mini-Kurs · Early Bird €99", desc: "Vergrößerte Mandeln ganzheitlich verstehen und begleiten – wann eine OP nötig ist und welche Alternativen es gibt.", status: "Jetzt verfügbar", statusColor: "#16a34a", hasWaitlist: false, href: "/mandel-kurs" },
    { title: "Zungenruhelage & Myo", subtitle: "Signature-Kurs", desc: "Mundatmung bei Kindern – Was du als Mama wissen und tun kannst", status: "In Vorbereitung", statusColor: "#de6e27", hasWaitlist: false, href: null },
    { title: "Myo-Elternausbildung", subtitle: "Winter 2026/2027", desc: "Tiefe Ausbildung für Eltern – mit Warteliste-Funktion", status: "Warteliste", statusColor: "#a2b8a2", hasWaitlist: true, href: null },
  ];

  return (
    <section id="sia-c" className="bg-[#faf8f5] py-20 md:py-28">
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
              <span className="text-[#4fa8a0] text-sm font-bold uppercase tracking-widest">Die Akademie</span>
              <span className="h-px w-8 bg-[#4fa8a0]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-6">
              SIA – SchluckImpuls Akademie
            </h2>
            <p className="text-[#1a1a1a]/60 text-lg max-w-2xl mx-auto">
              Die digitale Akademie für Eltern, die ihre Kinder rund um Mundgesundheit begleiten wollen.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} custom={1} className="grid md:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <div
                key={i}
                className={`group bg-white rounded-2xl p-8 border border-[#1a1a1a]/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${course.hasWaitlist || course.href ? "cursor-pointer" : ""}`}
                onClick={() => {
                  if (course.href) {
                    window.location.href = course.href;
                  } else if (course.hasWaitlist) {
                    setWaitlistCourse(course.title);
                    setWaitlistOpen(true);
                  }
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: course.statusColor }}>
                    {course.status}
                  </span>
                  <span className="text-[#1a1a1a]/40 text-xs">{course.subtitle}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-3">{course.title}</h3>
                <p className="text-[#1a1a1a]/60 text-sm leading-relaxed mb-6">{course.desc}</p>
                {course.href ? (
                  <a
                    href={course.href}
                    className="inline-flex items-center gap-2 text-[#de6e27] font-semibold text-sm hover:gap-3 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Jetzt starten <ArrowRight size={16} />
                  </a>
                ) : course.hasWaitlist ? (
                  <button
                    className="inline-flex items-center gap-2 text-[#de6e27] font-semibold text-sm hover:gap-3 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      setWaitlistCourse(course.title);
                      setWaitlistOpen(true);
                    }}
                  >
                    Auf die Warteliste <Mail size={16} />
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-2 text-[#1a1a1a]/30 text-sm">
                    Bald verfügbar
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Warteliste Modal */}
      <Dialog open={waitlistOpen} onOpenChange={setWaitlistOpen}>
        <DialogContent className="bg-[#faf8f5] border-none shadow-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-black text-[#1a1a1a]">
              {waitlistCourse} – Warteliste
            </DialogTitle>
            <DialogDescription className="text-[#1a1a1a]/60 text-sm">
              Trag dich ein und erfahre als Erste, wenn der Kurs verfügbar ist. Kein Spam, versprochen.
            </DialogDescription>
          </DialogHeader>

          {!waitlistSubmitted ? (
            <form onSubmit={handleWaitlistSubmit} className="space-y-4 mt-2">
              <div>
                <label htmlFor="waitlist-email" className="block text-sm font-semibold text-[#1a1a1a] mb-1.5">
                  Deine E-Mail-Adresse
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  placeholder="mama@beispiel.de"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#1a1a1a]/10 bg-white text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 focus:outline-none focus:ring-2 focus:ring-[#4fa8a0]/40 focus:border-[#4fa8a0] transition-all text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#de6e27] text-white px-6 py-3.5 rounded-lg font-bold hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-lg shadow-[#de6e27]/20"
              >
                Auf die Warteliste setzen <ArrowRight size={16} />
              </button>
              <p className="text-[#1a1a1a]/30 text-xs text-center">
                Du kannst dich jederzeit wieder abmelden.
              </p>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#4fa8a0]/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-[#4fa8a0]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-2">Du bist dabei!</h3>
              <p className="text-[#1a1a1a]/60 text-sm">
                Wir benachrichtigen dich, sobald der {waitlistCourse} verfügbar ist.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ─── ÜBER MICH ─── */
function AboutC() {
  return (
    <section id="ueber-c" className="bg-white py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <motion.div variants={fadeUp} custom={0} className="relative order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-[#4fa8a0]/10 rounded-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#de6e27]/15 rounded-xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src={IMAGES.franzi} alt="Franziska Bures" className="w-full h-[500px] object-cover object-top" />
                {/* Name overlay */}
                <div className="absolute bottom-0 right-0 bg-[#de6e27] text-white px-6 py-4 rounded-tl-2xl">
                  <p className="font-serif font-bold text-lg">Franziska Bures</p>
                  <p className="text-white/80 text-xs">Logopädin & Dentosophin</p>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="order-1 lg:order-2">
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#de6e27]" />
              <span className="text-[#de6e27] text-sm font-bold uppercase tracking-widest">Über mich</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl font-black text-[#1a1a1a] leading-tight mb-6">
              Hi, ich bin Franzi.
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="space-y-4 text-[#1a1a1a]/60 text-base leading-relaxed">
              <p>
                Selbstständige Logopädin mit eigener Praxis, Mutter von drei Kindern und überzeugt davon, dass der Mund das Tor zur Gesundheit ist.
              </p>
              <p>
                Nach 13 Jahren in der Praxis und über 20.000 Euro in Weiterbildungen – von Dentosophie bis zur ganzheitlichen Myofunktion – weiß ich: <strong className="text-[#1a1a1a]">Ursachenarbeit schlägt Symptombehandlung. Immer.</strong>
              </p>
              <p>
                Ich verbinde schulmedizinisches Fachwissen mit Pflanzenheilkunde und alten Heiltraditionen. Nicht als Ersatz, sondern als Ergänzung.
              </p>
              <p>
                Ich setze mich dafür ein, Eltern in die Eigenverantwortung zu bringen und die Wartezeit aktiv zu nutzen – sei es auf einen Logopädie-Termin in einer Praxis oder die Zeit zwischen Nasenspray und OP beim HNO.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} custom={3} className="flex gap-3 mt-8">
              <span className="inline-flex items-center gap-1.5 bg-[#de6e27]/10 text-[#de6e27] text-xs font-bold px-3 py-1.5 rounded-full">13 Jahre Erfahrung</span>
              <span className="inline-flex items-center gap-1.5 bg-[#4fa8a0]/10 text-[#4fa8a0] text-xs font-bold px-3 py-1.5 rounded-full">Dentosophin</span>
              <span className="inline-flex items-center gap-1.5 bg-[#a2b8a2]/20 text-[#5a6b5a] text-xs font-bold px-3 py-1.5 rounded-full">Mutter von 3</span>
            </motion.div>
            <motion.div variants={fadeUp} custom={4}>
              <Link
                href="/ueber-mich"
                className="inline-flex items-center gap-2 mt-8 bg-[#de6e27] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-lg shadow-[#de6e27]/20"
              >
                Mehr über mich <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── NEWSLETTER / FREEBIE ─── */
function NewsletterC() {
  return (
    <section className="relative bg-[#1a1a1a] py-20 md:py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#4fa8a0]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#de6e27]/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-[#de6e27]/15 text-[#de6e27] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            ✨ Kostenlos herunterladen
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl font-black text-white mb-4">
            5 Fragen, die du deinem HNO stellen musst – bevor du Ja zur OP sagst
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-white/55 text-lg mb-8">
            Die kostenlose Checkliste für Eltern, die informierte Entscheidungen treffen wollen.
          </motion.p>
          <motion.a
            variants={fadeUp}
            custom={3}
            href="/checkliste"
            className="inline-flex items-center gap-3 bg-[#de6e27] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-xl shadow-[#de6e27]/20"
          >
            Jetzt kostenlos herunterladen <ArrowRight size={20} />
          </motion.a>
          <motion.p variants={fadeUp} custom={4} className="text-white/25 text-xs mt-4">
            Kein Spam · Jederzeit abmeldbar · Sofortiger Versand
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── BLOG PREVIEW ─── */
function BlogPreviewC() {
  const posts = [
    { title: "Warum Mundatmung bei Kindern mehr als nur eine schlechte Angewohnheit ist", cat: "Myofunktion", color: "#de6e27" },
    { title: "Vergrößerte Mandeln: Was Eltern wirklich wissen sollten", cat: "Medizinische Entscheidungen", color: "#4fa8a0" },
    { title: "Zungenruhelage – der stille Held der Kieferentwicklung", cat: "Mundraumgesundheit", color: "#a2b8a2" },
  ];
  return (
    <section id="blog-c" className="bg-[#faf8f5] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-[#4fa8a0]" />
                <span className="text-[#4fa8a0] text-sm font-bold uppercase tracking-widest">Blog</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1a1a1a]">Aktuelles aus dem Blog</h2>
            </div>
            <a href="#" className="hidden md:inline-flex items-center gap-2 text-[#de6e27] font-semibold hover:gap-3 transition-all">
              Alle Artikel <ArrowRight size={16} />
            </a>
          </motion.div>
          <motion.div variants={fadeUp} custom={1} className="grid md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <article key={i} className="group bg-white rounded-2xl overflow-hidden border border-[#1a1a1a]/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#de6e27]/10 via-[#4fa8a0]/10 to-[#a2b8a2]/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-7xl font-black" style={{ color: `${post.color}20` }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="text-white text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: post.color }}>
                      {post.cat}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#1a1a1a]/30 text-xs mb-2">Bald verfügbar</p>
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
function BeratungCTAc() {
  return (
    <section id="beratung-c" className="relative bg-white py-20 md:py-28 overflow-hidden">
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
            Dein Kind. Deine Fragen. Meine Expertise.
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-[#1a1a1a]/60 text-lg mb-10 max-w-2xl mx-auto">
            Im 1:1-Online-Gespräch analysieren wir die Situation deines Kindes und entwickeln einen individuellen Plan. Klar, fundiert und auf Augenhöhe.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#kontakt-c" className="inline-flex items-center justify-center gap-3 bg-[#de6e27] text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-xl shadow-[#de6e27]/20">
              Erstgespräch buchen <ArrowRight size={20} />
            </a>
            <a href="#sia-c" className="inline-flex items-center justify-center gap-3 bg-[#4fa8a0] text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-[#3d8a84] transition-all active:scale-[0.97] shadow-xl shadow-[#4fa8a0]/20">
              Oder: Zur Akademie
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function FooterC() {
  return (
    <footer id="kontakt-c" className="bg-[#1a1a1a] pt-16 pb-8">
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
              <a href="#saeulen-c" className="hover:text-white transition-colors">Die 5 Säulen</a>
              <a href="#sia-c" className="hover:text-white transition-colors">SIA Akademie</a>
              <Link href="/ueber-mich" className="hover:text-white transition-colors">Über mich</Link>
              <a href="#beratung-c" className="hover:text-white transition-colors">Beratung</a>
              <a href="#blog-c" className="hover:text-white transition-colors">Blog</a>
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
export default function VarianteC() {
  return (
    <div className="min-h-screen">
      <NavC />
      <HeroC />
      <StatementC />
      <PillarsC />
      <ForWhomC />
      <SIATeaserC />
      <AboutC />
      <NewsletterC />
      <BlogPreviewC />
      <BeratungCTAc />
      <FooterC />

    </div>
  );
}
