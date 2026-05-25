export default function DankeUebungsliste() {
  return (
    <div
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', background: '#faf9f6', color: '#2c2c2c', minHeight: '100vh', margin: 0, padding: 0 }}
    >
      {/* Header */}
      <div style={{ background: '#D9651F', padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
          schluck.<span style={{ fontWeight: 300 }}>impuls</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: '#D9651F', padding: '40px 24px 56px', textAlign: 'center', position: 'relative' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            background: '#fff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '36px',
          }}
        >
          🎉
        </div>
        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 800, lineHeight: 1.25, marginBottom: '10px' }}>
          Deine Übungsliste ist da!
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '17px', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto' }}>
          Willkommen in der Welt von schluck.impuls — schön, dass du deinen Weg hierher gefunden hast.
        </p>
        {/* Curved bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '-28px',
            left: 0,
            right: 0,
            height: '56px',
            background: '#faf9f6',
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          }}
        />
      </div>

      {/* Content */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '56px 24px 60px' }}>
        {/* Download Box */}
        <div
          style={{
            background: '#fff',
            border: '2px solid #D9651F',
            borderRadius: '16px',
            padding: '28px 24px',
            textAlign: 'center',
            marginBottom: '40px',
            boxShadow: '0 4px 20px rgba(217,101,31,0.10)',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#D9651F', marginBottom: '8px' }}>
            Dein kostenloser Download
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px', color: '#1a1a1a' }}>
            Übungsliste Orofaciale Myofunktion<br />18 bis 30 Monate
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginBottom: '20px', lineHeight: 1.55 }}>
            Spielerische Reize für den Alltag — Kauen, Saugen, Pusten, Zunge, Nasenatmung. Alles ohne Therapie-Setting umsetzbar.
          </p>
          {/* Hier deinen Alfima-Download-Link eintragen */}
          <a
            href="#"
            style={{
              display: 'inline-block',
              background: '#D9651F',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 700,
              padding: '14px 32px',
              borderRadius: '50px',
              textDecoration: 'none',
            }}
          >
            ↓ Übungsliste herunterladen
          </a>
        </div>

        {/* Start hier */}
        <div
          style={{
            background: '#fff8f4',
            borderLeft: '4px solid #D9651F',
            borderRadius: '0 12px 12px 0',
            padding: '22px 22px 22px 24px',
            marginBottom: '40px',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#D9651F', marginBottom: '12px' }}>
            Start hier — die 3 wichtigsten für den Anfang
          </div>
          <ol style={{ paddingLeft: '20px' }}>
            <li style={{ fontSize: '15px', color: '#333', lineHeight: 1.6, marginBottom: '8px' }}>
              <strong style={{ color: '#1a1a1a' }}>Kauen, kauen, kauen</strong> — bei jeder Mahlzeit etwas Festes oder Faseriges anbieten.
            </li>
            <li style={{ fontSize: '15px', color: '#333', lineHeight: 1.6, marginBottom: '8px' }}>
              <strong style={{ color: '#1a1a1a' }}>Partytröte &amp; Seifenblasen</strong> — einmal täglich gemeinsam, 5 Minuten reichen.
            </li>
            <li style={{ fontSize: '15px', color: '#333', lineHeight: 1.6, marginBottom: '8px' }}>
              <strong style={{ color: '#1a1a1a' }}>Saugen</strong> — dünner Silikon-Saugschlauch oder Strohhalm mit Stopper, eine kleine Einheit pro Tag.
            </li>
          </ol>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e5e0d8', margin: '0 0 40px' }} />

        {/* Merkzettel */}
        <p style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px', color: '#1a1a1a' }}>
          Das nimm dir mit
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '18px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '24px', flexShrink: 0, marginTop: '2px' }}>⚡</div>
            <div>
              <strong style={{ display: 'block', fontSize: '15px', fontWeight: 700, marginBottom: '3px', color: '#1a1a1a' }}>
                Weniger ist mehr
              </strong>
              <span style={{ fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
                3 Übungen täglich konsequent schlagen 20 sporadisch. Starte klein.
              </span>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '18px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '24px', flexShrink: 0, marginTop: '2px' }}>🪞</div>
            <div>
              <strong style={{ display: 'block', fontSize: '15px', fontWeight: 700, marginBottom: '3px', color: '#1a1a1a' }}>
                Du bist das Modell
              </strong>
              <span style={{ fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
                Dein Kind lernt nicht durch Erklärung — sondern durch das, was es jeden Tag bei dir sieht. Dein Mund ist sein Lehrer.
              </span>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '18px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '24px', flexShrink: 0, marginTop: '2px' }}>🌱</div>
            <div>
              <strong style={{ display: 'block', fontSize: '15px', fontWeight: 700, marginBottom: '3px', color: '#1a1a1a' }}>
                Geduld zahlt sich aus
              </strong>
              <span style={{ fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
                Mundmotorik ist langsame Entwicklung. Nach 4–6 Wochen siehst du erste Veränderungen.
              </span>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e5e0d8', margin: '0 0 40px' }} />

        {/* Upsell Card */}
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            marginBottom: '40px',
          }}
        >
          <div style={{ background: '#2c2c2c', padding: '20px 24px 16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#C5C9A4', marginBottom: '6px' }}>
              Wenn dein Kind größer wird
            </div>
            <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 800, lineHeight: 1.3 }}>
              Myofunktioneller Eltern-Leitfaden — 2,5 bis 5 Jahre
            </h3>
          </div>
          <div style={{ padding: '20px 24px 24px' }}>
            <div style={{ display: 'inline-block', background: '#C5C9A4', color: '#2c2c2c', fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '50px', marginBottom: '14px' }}>
              für 2,5 bis 5 Jahre
            </div>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.6, marginBottom: '18px' }}>
              Dein Kind wächst — und mit ihm die Möglichkeiten. Ab 2,5 Jahren öffnet sich ein entscheidendes Entwicklungsfenster für Kiefer, Zunge und Atemwege. Mein Leitfaden zeigt dir Schritt für Schritt, was du jetzt tun kannst.
            </p>
            <ul style={{ listStyle: 'none', marginBottom: '24px', padding: 0 }}>
              {[
                '18 Kapitel — von Kauen bis Schlafposition',
                'Trainingstools erklärt: welche, wann, wie',
                'Schleimhautpflege, Nährstoffe & Gemmomazerate',
                'Tagesplan als Orientierungshilfe',
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '14px', color: '#333', padding: '6px 0', paddingLeft: '22px', position: 'relative', lineHeight: 1.45 }}>
                  <span style={{ position: 'absolute', left: 0, color: '#D9651F', fontWeight: 700 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            {/* Hier deinen Alfima-Link zum Leitfaden eintragen */}
            <a
              href="#"
              style={{
                display: 'inline-block',
                background: '#D9651F',
                color: '#fff',
                fontSize: '15px',
                fontWeight: 700,
                padding: '13px 28px',
                borderRadius: '50px',
                textDecoration: 'none',
                width: '100%',
                textAlign: 'center',
                boxSizing: 'border-box',
              }}
            >
              Zum Eltern-Leitfaden →
            </a>
          </div>
        </div>

        {/* Instagram */}
        <div
          style={{
            background: '#C5C9A4',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          <p style={{ fontSize: '15px', color: '#2c2c2c', lineHeight: 1.6, marginBottom: '14px' }}>
            Täglich neue Impulse, Übungs-Videos und der direkte Draht zu mir — folg mir auf Instagram und du bist immer als Erste dabei.
          </p>
          <a
            href="https://www.instagram.com/schluck.impuls"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#2c2c2c',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 700,
              padding: '11px 24px',
              borderRadius: '50px',
              textDecoration: 'none',
            }}
          >
            @schluck.impuls auf Instagram
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#2c2c2c', padding: '24px', textAlign: 'center', color: '#999', fontSize: '13px', lineHeight: 1.6 }}>
        <p>
          <strong style={{ color: '#fff' }}>Franziska Bures</strong> · Logopädin &amp; Dentosophin · schluck.impuls
        </p>
        <p style={{ marginTop: '6px' }}>
          Diese Übungsliste ersetzt keine ärztliche oder logopädische Diagnostik und Behandlung.
        </p>
        <p style={{ marginTop: '10px' }}>
          <a href="https://www.instagram.com/schluck.impuls" style={{ color: '#C5C9A4', textDecoration: 'none' }}>
            Instagram
          </a>
        </p>
      </footer>
    </div>
  );
}
