/*
 * DANKE-SEITE – nach Freebie-Opt-in
 * Ziel: Bestätigung + sofortiger Upsell zum Mandel-Mini-Kurs (Early Bird €99)
 */

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Download, Star, Shield, Clock } from "lucide-react";
import { Link } from "wouter";

const IMAGES = {
  logo: "/manus-storage/2005_c8546e59.png",
  franzi: "/manus-storage/41011_e7fd04a1.jpg",
  ohrModell: "/manus-storage/23381_7a655dbd.jpg",
  kieferModell: "/manus-storage/34071_45aebcdd.jpg",
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

/* ─── CONFIRMATION HERO ─── */
function Confirmation() {
  return (
    <section className="bg-[#faf8f5] pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div variants={fadeUp} custom={0} className="w-20 h-20 bg-[#4fa8a0]/15 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-[#4fa8a0]" />
          </motion.div>

          <motion.p variants={fadeUp} custom={1} className="text-[#4fa8a0] text-sm font-bold uppercase tracking-widest mb-4">
            Geschafft! 🎉
          </motion.p>

          <motion.h1 variants={fadeUp} custom={2} className="font-serif text-4xl sm:text-5xl font-black text-[#1a1a1a] mb-6 leading-tight">
            Deine Checkliste ist unterwegs!
          </motion.h1>

          <motion.p variants={fadeUp} custom={3} className="text-[#1a1a1a]/65 text-lg leading-relaxed mb-6">
            Schau bitte in dein Postfach – du bekommst die <strong>"5 Fragen vor der OP"-Checkliste</strong> in den nächsten Minuten zugeschickt. Bitte auch Spam-Ordner prüfen!
          </motion.p>

          <motion.div variants={fadeUp} custom={4} className="bg-[#4fa8a0]/10 rounded-xl p-5 flex items-start gap-3 text-left max-w-md mx-auto">
            <Download size={20} className="text-[#4fa8a0] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#1a1a1a] font-semibold text-sm">Checkliste: "5 Fragen vor der OP"</p>
              <p className="text-[#1a1a1a]/50 text-xs">PDF · Sofortiger E-Mail-Versand · Druckbar</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── UPSELL: MANDEL-KURS ─── */
function MandelUpsell() {
  const includes = [
    "Was vergrößerte Mandeln wirklich bedeuten (und was nicht)",
    "Wann eine OP sinnvoll ist – und wann nicht",
    "Welche ganzheitlichen Alternativen es gibt",
    "Ernährung, Pflanzenheilkunde & Atemübungen für dein Kind",
    "Konkrete Übungen für zuhause – sofort anwendbar",
    "Meine persönliche Empfehlung als Logopädin & Dentosophin",
    "Zugang zu Updates & neuen Inhalten",
  ];

  return (
    <section className="bg-white py-20 md:py-28 border-t-4 border-[#de6e27]">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-[#de6e27] text-white text-sm font-bold px-5 py-2.5 rounded-full">
              ⚡ Exklusiv für neue Abonnentinnen – nur heute
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Course info */}
            <div>
              <motion.p variants={fadeUp} custom={1} className="text-[#de6e27] text-sm font-bold uppercase tracking-widest mb-4">
                Der nächste Schritt
              </motion.p>
              <motion.h2 variants={fadeUp} custom={2} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] leading-tight mb-6">
                Mandel-Mini-Kurs: Vergrößerte Mandeln ganzheitlich verstehen
              </motion.h2>
              <motion.p variants={fadeUp} custom={3} className="text-[#1a1a1a]/65 text-lg leading-relaxed mb-8">
                Du weißt jetzt die richtigen Fragen – jetzt bekommst du die tieferen Antworten. Dieser kompakte Online-Kurs gibt dir alles, was du über vergrößerte Mandeln wirklich wissen musst.
              </motion.p>

              <motion.div variants={fadeUp} custom={4} className="space-y-3 mb-8">
                {includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-[#4fa8a0] flex-shrink-0 mt-0.5" />
                    <span className="text-[#1a1a1a]/70 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} custom={5} className="flex flex-wrap gap-3">
                {["Sofort Zugang", "Lebenslang verfügbar", "Auf jedem Gerät", "Mini-Kurs: ca. 3h"].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 bg-[#faf8f5] text-[#1a1a1a]/60 text-xs font-semibold px-4 py-2 rounded-full border border-[#1a1a1a]/10">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: Pricing Box */}
            <motion.div variants={fadeUp} custom={3} className="relative">
              <div className="absolute -top-3 -right-3 w-full h-full bg-[#de6e27]/8 rounded-2xl" />
              <div className="relative bg-[#faf8f5] rounded-2xl p-8 border-2 border-[#de6e27]/20 shadow-xl">

                {/* Early Bird Badge */}
                <div className="bg-[#de6e27] text-white text-xs font-bold px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-6">
                  <Clock size={12} /> Early Bird Preis – begrenzte Zeit
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-serif text-5xl font-black text-[#1a1a1a]">€99</span>
                    <span className="text-[#1a1a1a]/40 text-lg line-through">€149</span>
                  </div>
                  <p className="text-[#1a1a1a]/50 text-sm">Einmalzahlung · Kein Abo · Lebenslanger Zugang</p>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className="text-[#de6e27] fill-[#de6e27]" />
                    ))}
                  </div>
                  <span className="text-[#1a1a1a]/50 text-sm">Bereits über 50 Teilnehmerinnen</span>
                </div>

                {/* CTA */}
                <a
                  href="/mandel-kurs"
                  className="w-full bg-[#de6e27] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#c55a18] transition-all active:scale-[0.97] shadow-xl shadow-[#de6e27]/20 flex items-center justify-center gap-2 mb-4"
                >
                  Jetzt für €99 starten <ArrowRight size={20} />
                </a>

                <p className="text-center text-[#1a1a1a]/40 text-xs mb-5">
                  Später €149 · Preis gilt nur für kurze Zeit
                </p>

                {/* Guarantee */}
                <div className="border-t border-[#1a1a1a]/8 pt-5 flex items-start gap-3">
                  <Shield size={20} className="text-[#4fa8a0] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#1a1a1a] font-semibold text-sm">14-Tage Rückgabe-Garantie</p>
                    <p className="text-[#1a1a1a]/50 text-xs leading-relaxed">
                      Wenn der Kurs nicht hält, was er verspricht, erstattest du dein Geld – kein Wenn und Aber.
                    </p>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="mt-5 bg-[#4fa8a0]/10 rounded-xl p-4">
                  <p className="text-[#1a1a1a]/70 text-sm italic leading-relaxed">
                    "Ich habe verstanden, warum mein Sohn immer wieder Infekte hatte – und was ich tun kann. Das ist unbezahlbar."
                  </p>
                  <p className="text-[#1a1a1a]/50 text-xs mt-2 font-semibold">— Sandra M., Mama von Jonas (5)</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* "Nein danke" link */}
          <motion.div variants={fadeUp} custom={6} className="text-center mt-10">
            <Link href="/" className="text-[#1a1a1a]/30 text-sm hover:text-[#1a1a1a]/60 transition-colors underline underline-offset-4">
              Nein danke, ich möchte erst die Checkliste lesen
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── MAIN ─── */
export default function DankeCheckliste() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Minimal header */}
      <header className="bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#1a1a1a]/5 py-4">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src={IMAGES.logo} alt="Schluck.Impuls" className="h-9 w-9 rounded-lg" />
            <span className="font-serif font-bold text-[#1a1a1a] text-base tracking-tight">Schluck.Impuls</span>
          </Link>
        </div>
      </header>

      <Confirmation />
      <MandelUpsell />

      <footer className="bg-[#1a1a1a] py-8">
        <div className="container text-center">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Schluck.Impuls – Franziska Bures.{" "}
            <a href="/impressum" className="hover:text-white/60 transition-colors">Impressum</a>{" "}
            ·{" "}
            <a href="/datenschutz" className="hover:text-white/60 transition-colors">Datenschutz</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
