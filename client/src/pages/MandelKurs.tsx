/*
 * SALES PAGE – Mandel-Mini-Kurs
 * Preis: Early Bird €99, danach €149
 * Ziel: Conversions von der Danke-Seite & direktem Traffic
 */

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, Star, Shield, Clock, Play,
  ChevronDown, Mail, Instagram
} from "lucide-react";
import { Link } from "wouter";

const IMAGES = {
  logo: "/manus-storage/2005_c8546e59.png",
  franzi: "/manus-storage/41011_e7fd04a1.jpg",
  franziPraxis: "/manus-storage/34064_f75ca546.jpg",
  ohrModell: "/manus-storage/23381_7a655dbd.jpg",
  kieferModell: "/manus-storage/34071_45aebcdd.jpg",
  brettspiel: "/manus-storage/40897_3218ab39.jpg",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ─── STICKY CTA BAR ─── */
function StickyBar() {
  const [visible, setVisible] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setVisible(window.scrollY > 600);
    }, { passive: true });
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-[#de6e27] text-white shadow-2xl transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}>
      <div className="container flex items-center justify-between py-3 gap-4">
        <div>
          <p className="font-serif font-bold text-base">Mandel-Mini-Kurs</p>
          <p className="text-white/70 text-xs">Early Bird: €99 statt €149</p>
        </div>
        <a
          href="#kaufen"
          className="bg-black text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-black/80 transition-all active:scale-[0.97] whitespace-nowrap flex items-center gap-2"
        >
          Jetzt starten <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}

/* ─── NAVIGATION ─── */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#1a1a1a]/5">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5">
          <img src={IMAGES.logo} alt="Schluck.Impuls" className="h-9 w-9 rounded-lg" />
          <span className="font-serif font-bold text-[#1a1a1a] text-base tracking-tight">Schluck.Impuls</span>
        </Link>
        <a
          href="#kaufen"
          className="bg-[#de6e27] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#c55a18] transition-all active:scale-[0.97] flex items-center gap-2"
        >
          Jetzt für €99 starten <ArrowRight size={14} />
        </a>
      </div>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="relative bg-[#1a1a1a] pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#de6e27]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4fa8a0]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-[#de6e27]/15 text-[#de6e27] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <Clock size={12} /> Early Bird · Nur €99 statt €149
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[3.8rem] font-black text-white leading-[1.05] mb-6">
            Vergrößerte Mandeln bei Kindern –{" "}
            <span className="text-[#de6e27]">ganzheitlich</span> verstehen & begleiten
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="text-white/65 text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
            Der kompakte Online-Kurs für Eltern, die wissen wollen: Was bedeutet das wirklich? Was kann ich tun? Und wann ist eine OP tatsächlich notwendig?
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: <Play size={14} />, label: "ca. 3 Stunden Video" },
              { icon: <CheckCircle size={14} />, label: "Sofortiger Zugang" },
              { icon: <Shield size={14} />, label: "14 Tage Garantie" },
              { icon: <Star size={14} />, label: "50+ Teilnehmerinnen" },
            ].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm px-4 py-2 rounded-full">
                {item.icon} {item.label}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#kaufen"
              className="inline-flex items-center justify-center gap-3 bg-[#de6e27] text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-xl"
            >
              Jetzt für €99 starten <ArrowRight size={22} />
            </a>
            <a
              href="#inhalt"
              className="inline-flex items-center justify-center gap-3 bg-white/10 text-white border border-white/20 px-10 py-5 rounded-xl font-bold text-xl hover:bg-white/15 transition-all"
            >
              Kurs-Inhalt ansehen <ChevronDown size={20} />
            </a>
          </motion.div>

          <motion.p variants={fadeUp} custom={5} className="text-white/35 text-sm mt-5">
            Einmalzahlung · Kein Abo · Lebenslanger Zugang
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PROBLEM-AGITATION ─── */
function Problem() {
  return (
    <section className="bg-[#faf8f5] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
            <p className="text-[#de6e27] text-sm font-bold uppercase tracking-widest mb-4">Kommt dir das bekannt vor?</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1a1a1a] leading-tight">
              Dein Kind hat vergrößerte Mandeln – und der Arzt empfiehlt eine OP?
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { emoji: "😫", text: "Dein Kind schnarcht, schläft schlecht oder hat ständig den Mund offen – und du weißt nicht warum." },
              { emoji: "🏥", text: "Der HNO sagt: \"Mandeln raus\" – aber irgendwie fühlt sich das nicht wie die ganze Wahrheit an." },
              { emoji: "🔍", text: "Du googelst stundenlang und findest nur gegensätzliche Meinungen und Angst-Artikel." },
              { emoji: "😔", text: "Du willst das Beste für dein Kind – aber fühlst dich allein gelassen mit dieser schweren Entscheidung." },
              { emoji: "💡", text: "Du ahnst, dass es vielleicht noch andere Wege gibt – weißt aber nicht, wo du anfangen sollst." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="flex items-start gap-4 bg-white rounded-xl p-5 border border-[#1a1a1a]/5"
              >
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <p className="text-[#1a1a1a]/70 text-base leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} custom={5} className="mt-10 bg-[#de6e27]/10 rounded-2xl p-8 text-center border border-[#de6e27]/20">
            <p className="font-serif text-xl font-bold text-[#1a1a1a] mb-3">
              Du bist nicht allein – und du musst das nicht allein entscheiden.
            </p>
            <p className="text-[#1a1a1a]/60 text-base leading-relaxed">
              Genau für diese Situation habe ich den Mandel-Mini-Kurs entwickelt.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── COURSE CONTENT ─── */
function CourseContent() {
  const modules = [
    {
      num: "01",
      title: "Was sind Mandeln – und warum wachsen sie?",
      desc: "Du verstehst die Funktion der Mandeln im Immunsystem, warum sie sich vergrößern und was das über die Gesundheit deines Kindes aussagt.",
      duration: "ca. 25 min",
      color: "#de6e27",
    },
    {
      num: "02",
      title: "Wann ist eine OP wirklich notwendig?",
      desc: "Die medizinischen Kriterien, die tatsächlich für eine OP sprechen – und die häufigsten Situationen, in denen zuerst andere Wege sinnvoller sind.",
      duration: "ca. 30 min",
      color: "#4fa8a0",
    },
    {
      num: "03",
      title: "Ganzheitliche Alternativen im Überblick",
      desc: "Von myofunktioneller Therapie über Ernährungsanpassungen bis hin zu Pflanzenheilkunde: Was wirklich hilft, was Hype ist – und wie du unterscheidest.",
      duration: "ca. 35 min",
      color: "#a2b8a2",
    },
    {
      num: "04",
      title: "Ernährung & Entzündungshemmung",
      desc: "Welche Lebensmittel Entzündungen im Körper fördern – und welche gezielt entgegenwirken. Mit konkretem Wochenplan für Kinder.",
      duration: "ca. 25 min",
      color: "#de6e27",
    },
    {
      num: "05",
      title: "Atemübungen & Myofunktion für zuhause",
      desc: "Schritt-für-Schritt-Übungen, die du mit deinem Kind täglich machen kannst – spielerisch, ohne Vorkenntnisse, mit sofortiger Wirkung.",
      duration: "ca. 30 min",
      color: "#4fa8a0",
    },
    {
      num: "06",
      title: "Dein Aktionsplan & die richtigen Fragen",
      desc: "Was tust du jetzt? Der konkrete Plan für die nächsten 4 Wochen – plus die Fragen, die du bei deinem nächsten HNO-Termin stellen solltest.",
      duration: "ca. 20 min",
      color: "#a2b8a2",
    },
  ];

  return (
    <section id="inhalt" className="bg-white py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <p className="text-[#de6e27] text-sm font-bold uppercase tracking-widest mb-4">Was dich erwartet</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-6">
              Dein Kurs-Inhalt im Überblick
            </h2>
            <p className="text-[#1a1a1a]/60 text-lg max-w-2xl mx-auto">
              6 kompakte Module. Direkt auf den Punkt. Ohne Füllmaterial.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {modules.map((mod, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="flex gap-5 p-6 rounded-xl border border-[#1a1a1a]/8 hover:shadow-md transition-shadow bg-[#faf8f5]"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-serif font-black text-white text-xs"
                  style={{ backgroundColor: mod.color }}
                >
                  {mod.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-lg font-bold text-[#1a1a1a] leading-snug">{mod.title}</h3>
                    <span className="text-[#1a1a1a]/35 text-xs whitespace-nowrap flex items-center gap-1 flex-shrink-0">
                      <Clock size={10} /> {mod.duration}
                    </span>
                  </div>
                  <p className="text-[#1a1a1a]/60 text-sm leading-relaxed">{mod.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bonuses */}
          <motion.div variants={fadeUp} custom={6} className="mt-10 max-w-5xl mx-auto">
            <div className="bg-[#de6e27]/8 rounded-2xl p-8 border border-[#de6e27]/20">
              <p className="text-[#de6e27] text-sm font-bold uppercase tracking-widest mb-6">Bonus-Materialien inklusive</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: "📄", title: "Druckbare Checkliste", desc: "Für den nächsten HNO-Termin" },
                  { icon: "🥗", title: "Ernährungsplan", desc: "7-Tage-Plan für Kinder (entzündungshemmend)" },
                  { icon: "🎯", title: "Übungskarten", desc: "Atemübungen & Myofunktion als Karten zum Ausdrucken" },
                ].map((bonus, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-2xl">{bonus.icon}</span>
                    <div>
                      <p className="font-semibold text-[#1a1a1a] text-sm">{bonus.title}</p>
                      <p className="text-[#1a1a1a]/50 text-xs">{bonus.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
function Testimonials() {
  const testimonials = [
    {
      text: "Ich hatte Angst, den falschen Entscheid zu treffen. Nach dem Kurs hatte ich endlich Klarheit – und das Selbstbewusstsein, mit dem HNO auf Augenhöhe zu sprechen. Wir haben die OP verschoben und sind so froh darüber.",
      name: "Sandra M.",
      detail: "Mama von Jonas (5), Zürich",
      stars: 5,
    },
    {
      text: "Franziskas Art zu erklären ist so klar und verständlich. Keine Panikmache, keine Überforderung – einfach fundiertes Wissen, das ich sofort anwenden konnte. Mein Sohn schläft jetzt viel besser.",
      name: "Katharina B.",
      detail: "Mutter von zwei Söhnen, Berlin",
      stars: 5,
    },
    {
      text: "Endlich jemand, der nicht einfach sagt 'vertrauen Sie dem Arzt'. Ich fühle mich als Mutter ernst genommen. Der Kurs war das Beste, was ich für mein Kind tun konnte.",
      name: "Lisa R.",
      detail: "Erzieherin & Mama, Wien",
      stars: 5,
    },
    {
      text: "Für €99 hätte ich nicht erwartet, so viel Tiefe zu bekommen. Ich habe gelernt, was wirklich hinter vergrößerten Mandeln steckt – und konkrete Schritte, die ich ab sofort umsetze.",
      name: "Miriam T.",
      detail: "Mama von Emilia (7), München",
      stars: 5,
    },
  ];

  return (
    <section className="bg-[#faf8f5] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
            <p className="text-[#4fa8a0] text-sm font-bold uppercase tracking-widest mb-4">Stimmen aus dem Kurs</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1a1a1a]">Was andere Mamas sagen</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-[#1a1a1a]/5"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={16} className="text-[#de6e27] fill-[#de6e27]" />
                  ))}
                </div>
                <p className="text-[#1a1a1a]/70 text-base leading-relaxed mb-5 italic">"{t.text}"</p>
                <div>
                  <p className="text-[#1a1a1a] font-bold text-sm">{t.name}</p>
                  <p className="text-[#1a1a1a]/40 text-xs">{t.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── ÜBER FRANZI ─── */
function UeberFranzi() {
  return (
    <section className="bg-[#1a1a1a] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} custom={0} className="relative">
            <div className="absolute -top-4 -right-4 w-full h-full bg-[#de6e27]/15 rounded-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={IMAGES.franziPraxis} alt="Franziska Bures" className="w-full h-[440px] object-cover object-top" />
              <div className="absolute bottom-0 right-0 bg-[#de6e27] text-white px-5 py-4 rounded-tl-xl">
                <p className="font-serif font-bold text-sm">Franziska Bures</p>
                <p className="text-white/80 text-xs">Logopädin & Dentosophin</p>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.p variants={fadeUp} custom={0} className="text-[#de6e27] text-sm font-bold uppercase tracking-widest mb-4">
              Deine Expertin
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl font-black text-white mb-6">
              Hi, ich bin Franzi.
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="space-y-4 text-white/65 text-base leading-relaxed">
              <p>
                Ich bin staatlich geprüfte Logopädin mit 13 Jahren Erfahrung, Dentosophin und Mama von drei Kindern. In meiner Praxis habe ich Hunderte Familien mit genau dieser Frage begleitet.
              </p>
              <p>
                Was mich antreibt: Eltern sollen nicht allein mit medizinischen Entscheidungen dastehen. Mit über 20.000 Euro in Weiterbildungen und tiefer Überzeugung in ganzheitliche Ansätze gebe ich dir das Wissen, das du brauchst.
              </p>
              <p>
                <strong className="text-white">Dieser Kurs ist das, was ich jeder Mama mitgeben würde, bevor sie Ja zu einer Mandel-OP sagt.</strong>
              </p>
            </motion.div>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 mt-6">
              {["13 Jahre Erfahrung", "Dentosophin (zert.)", "Mutter von 3", "Myofunktionstherapeutin", "Pflanzenheilkunde"].map((tag) => (
                <span key={tag} className="inline-flex items-center text-white/60 text-xs font-semibold px-4 py-2 rounded-full border border-white/15">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── KAUFEN (PRICING) ─── */
function Kaufen() {
  return (
    <section id="kaufen" className="bg-[#faf8f5] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="max-w-2xl mx-auto"
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
            <p className="text-[#de6e27] text-sm font-bold uppercase tracking-widest mb-4">Dein Zugang</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1a1a1a]">Jetzt starten</h2>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="relative">
            <div className="absolute -top-3 -right-3 w-full h-full bg-[#de6e27]/8 rounded-2xl" />
            <div className="relative bg-white rounded-2xl p-8 border-2 border-[#de6e27]/20 shadow-2xl">

              {/* Early Bird Badge */}
              <div className="bg-[#de6e27] text-white text-sm font-bold px-5 py-2 rounded-full inline-flex items-center gap-2 mb-6">
                <Clock size={14} /> Early Bird Preis – begrenzte Zeit
              </div>

              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-serif text-6xl font-black text-[#1a1a1a]">€99</span>
                <div>
                  <span className="text-[#1a1a1a]/40 text-2xl line-through">€149</span>
                  <p className="text-[#4fa8a0] text-sm font-bold">Du sparst €50</p>
                </div>
              </div>
              <p className="text-[#1a1a1a]/50 text-sm mb-8">Einmalzahlung · Kein Abo · Lebenslanger Zugang</p>

              {/* What's included */}
              <div className="space-y-3 mb-8">
                {[
                  "6 Video-Module (ca. 3 Stunden)",
                  "Druckbare Checkliste für den HNO-Termin",
                  "7-Tage-Ernährungsplan (entzündungshemmend)",
                  "Atemübungen & Myofunktions-Karten",
                  "Lebenslanger Zugang inkl. Updates",
                  "Zugang auf Smartphone, Tablet & Desktop",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#4fa8a0] flex-shrink-0" />
                    <span className="text-[#1a1a1a]/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Stars */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} className="text-[#de6e27] fill-[#de6e27]" />
                  ))}
                </div>
                <span className="text-[#1a1a1a]/50 text-sm">50+ zufriedene Teilnehmerinnen</span>
              </div>

              {/* CTA */}
              <a
                href="https://schluckimpuls.de/mandel-kurs-kauf"
                className="w-full bg-[#de6e27] text-white px-8 py-5 rounded-xl font-bold text-xl hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-xl shadow-[#de6e27]/20 flex items-center justify-center gap-3 mb-4"
              >
                Jetzt für €99 kaufen <ArrowRight size={22} />
              </a>

              <p className="text-center text-[#1a1a1a]/40 text-xs mb-6">
                Sichere Zahlung · Sofortiger Zugang · Später €149
              </p>

              {/* Guarantee */}
              <div className="bg-[#4fa8a0]/8 rounded-xl p-5 flex items-start gap-4">
                <Shield size={24} className="text-[#4fa8a0] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#1a1a1a] font-bold text-sm mb-1">14-Tage-Rückgabe-Garantie</p>
                  <p className="text-[#1a1a1a]/60 text-sm leading-relaxed">
                    Wenn du nach 14 Tagen nicht überzeugt bist, bekommst du dein Geld vollständig zurück. Kein Wenn und Aber, keine Erklärung nötig.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQ() {
  const faqs = [
    {
      q: "Für wen ist dieser Kurs gemacht?",
      a: "Für Eltern (vor allem Mamas), deren Kinder vergrößerte Mandeln haben und die vor der Frage stehen: OP oder nicht? Kein Vorwissen nötig.",
    },
    {
      q: "Wie lange habe ich Zugang zum Kurs?",
      a: "Lebenslang. Du kannst dir die Inhalte so oft ansehen, wie du willst – auch noch in einem Jahr. Alle Updates sind inklusive.",
    },
    {
      q: "Kann ich den Kurs auf dem Handy ansehen?",
      a: "Ja, auf jedem Gerät. Smartphone, Tablet, Desktop – alles funktioniert problemlos.",
    },
    {
      q: "Ersetzt der Kurs einen Arztbesuch?",
      a: "Nein. Der Kurs gibt dir Wissen und Orientierung, damit du informierte Entscheidungen treffen kannst. Er ersetzt keine medizinische Diagnose.",
    },
    {
      q: "Was ist, wenn mir der Kurs nicht gefällt?",
      a: "Dann bekommst du dein Geld zurück – innerhalb von 14 Tagen, ohne Fragen. Versprochen.",
    },
    {
      q: "Wann bekomme ich Zugang zum Kurs?",
      a: "Sofort nach dem Kauf. Du bekommst eine E-Mail mit deinen Zugangsdaten – innerhalb von wenigen Minuten.",
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1a1a1a]">Häufige Fragen</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="border border-[#1a1a1a]/8 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#faf8f5] transition-colors"
                >
                  <span className="font-serif font-bold text-[#1a1a1a]">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#de6e27] flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                  />
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-[#1a1a1a]/65 text-sm leading-relaxed border-t border-[#1a1a1a]/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ─── */
function FinalCTA() {
  return (
    <section className="bg-[#de6e27] py-20 md:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2 variants={fadeUp} custom={0} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-6 leading-tight">
            Dein Kind verdient fundiertes Wissen – und du verdienst Klarheit.
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-white/85 text-xl mb-10">
            Starte jetzt – lebenslanger Zugang, 14-Tage-Garantie, sofort verfügbar.
          </motion.p>
          <motion.a
            variants={fadeUp}
            custom={2}
            href="#kaufen"
            className="inline-flex items-center gap-3 bg-black text-white px-12 py-5 rounded-xl font-bold text-xl hover:bg-black/80 transition-all active:scale-[0.97] shadow-xl"
          >
            Jetzt für €99 starten <ArrowRight size={22} />
          </motion.a>
          <motion.div variants={fadeUp} custom={3} className="flex items-center justify-center gap-6 mt-8 text-black/50 text-sm">
            <span className="flex items-center gap-1.5"><Shield size={14} /> 14-Tage-Garantie</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> Sofortiger Zugang</span>
            <span>·</span>
            <span>Einmalzahlung</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="bg-[#1a1a1a] py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <img src={IMAGES.logo} alt="Schluck.Impuls" className="h-8 w-8 rounded-lg" />
          <span className="font-serif font-bold text-white text-sm">Schluck.Impuls</span>
        </Link>
        <div className="flex gap-6 text-white/30 text-xs">
          <a href="/impressum" className="hover:text-white/60 transition-colors">Impressum</a>
          <a href="/datenschutz" className="hover:text-white/60 transition-colors">Datenschutz</a>
          <a href="mailto:kontakt@schluckimpuls.de" className="flex items-center gap-1.5 hover:text-white/60 transition-colors">
            <Mail size={12} /> kontakt@schluckimpuls.de
          </a>
          <a href="https://instagram.com/schluck.impuls" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white/60 transition-colors">
            <Instagram size={12} /> @schluck.impuls
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN ─── */
export default function MandelKurs() {
  return (
    <div className="min-h-screen">
      <StickyBar />
      <Nav />
      <Hero />
      <Problem />
      <CourseContent />
      <Testimonials />
      <UeberFranzi />
      <Kaufen />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
