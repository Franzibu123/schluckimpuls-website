import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 py-20">
      <img
        src="/manus-storage/2005_c8546e59.png"
        alt="Schluck.Impuls Logo"
        className="w-40 h-40 mb-12 rounded-2xl shadow-lg"
      />
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-statement-black text-center mb-4">
        Schluck.Impuls
      </h1>
      <p className="text-lg text-muted-foreground text-center max-w-xl mb-12 font-sans">
        Ganzheitliche Myofunktion & Mundraumgesundheit für Kinder – Wähle eine Design-Variante für die Startseite:
      </p>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          href="/variante-a"
          className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white bg-terrakotta rounded-lg transition-all duration-200 hover:bg-terrakotta-dark active:scale-[0.97] shadow-lg hover:shadow-xl"
        >
          <span className="mr-3 text-2xl">A</span>
          <span>
            <span className="block font-bold">Volle Wucht</span>
            <span className="block text-sm opacity-80 font-normal">Orange dominant, maximale Brand-Wucht</span>
          </span>
        </Link>
        <Link
          href="/variante-c"
          className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white bg-tuerkis rounded-lg transition-all duration-200 hover:bg-tuerkis-light active:scale-[0.97] shadow-lg hover:shadow-xl"
        >
          <span className="mr-3 text-2xl">C</span>
          <span>
            <span className="block font-bold">Stylisch mit Türkis</span>
            <span className="block text-sm opacity-80 font-normal">Modern, kuratiert, Orange + Türkis</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
