export default function DankeLeitfaden() {
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
          Dein Leitfaden ist da!
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '17px', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto' }}>
          Schön, dass du dabei bist. Du hast gerade den ersten Schritt gemacht — und das zählt.
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
            Dein Download
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px', color: '#1a1a1a' }}>
            Myofunktioneller Eltern-Leitfaden<br />2,5 bis 5 Jahre
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginBottom: '20px', lineHeight: 1.55 }}>
            PDF, 15 Seiten — Übungen, Trainingstools, Schleimhautpflege &amp; ganzheitliche Impulse für deinen Alltag.
          </p>
          {/* Hier deine Alfima-Download-URL eintragen */}
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
            ↓ Leitfaden herunterladen
          </a>
        </div>

        {/* Steps */}
        <p style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px', color: '#1a1a1a' }}>
          So geht's am besten weiter
        </p>
        <ul style={{ listStyle: 'none', marginBottom: '48px', padding: 0 }}>
          <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '18px' }}>
            <div
              style={{
                background: '#C5C9A4',
                color: '#2c2c2c',
                fontSize: '14px',
                fontWeight: 800,
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              1
            </div>
            <div>
              <strong style={{ display: 'block', fontWeight: 700, fontSize: '16px', marginBottom: '3px', color: '#1a1a1a' }}>
                Lies Seite 3 zuerst
              </strong>
              <span style={{ fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
                „Warum dieses Alter so entscheidend ist" — das gibt dir das große Bild, bevor du anfängst.
              </span>
            </div>
          </li>
          <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '18px' }}>
            <div
              style={{
                background: '#C5C9A4',
                color: '#2c2c2c',
                fontSize: '14px',
                fontWeight: 800,
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              2
            </div>
            <div>
              <strong style={{ display: 'block', fontWeight: 700, fontSize: '16px', marginBottom: '3px', color: '#1a1a1a' }}>
                Such dir 2–3 Übungen raus
              </strong>
              <span style={{ fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
                Starte klein. 5 Minuten täglich schlagen 30 Minuten einmal pro Woche.
              </span>
            </div>
          </li>
          <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '18px' }}>
            <div
              style={{
                background: '#C5C9A4',
                color: '#2c2c2c',
                fontSize: '14px',
                fontWeight: 800,
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              3
            </div>
            <div>
              <strong style={{ display: 'block', fontWeight: 700, fontSize: '16px', marginBottom: '3px', color: '#1a1a1a' }}>
                Schau heute Abend hin
              </strong>
              <span style={{ fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
                Schläft dein Kind mit offenem oder geschlossenem Mund? Das ist dein Startpunkt.
              </span>
            </div>
          </li>
        </ul>

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
              Nächster Schritt
            </div>
            <h3 style={{ color: '#fff', fontSize: '19px', fontWeight: 800, lineHeight: 1.3 }}>
              Vergrößerte Mandeln &amp; Adenoide — was du in der Wartezeit wirklich tun kannst
            </h3>
          </div>
          <div style={{ padding: '20px 24px 24px' }}>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.6, marginBottom: '18px' }}>
              Du willst nicht nur abwarten? In meinem Mini-Kurs zeige ich dir, was zwischen Cortison-Spray und OP-Entscheidung noch alles möglich ist — strukturiert, verständlich, ganzheitlich.
            </p>
            <ul style={{ listStyle: 'none', marginBottom: '24px', padding: 0 }}>
              {[
                'Warum Mandeln und Adenoide überhaupt wachsen',
                'Was du täglich tun kannst, um den Teufelskreis zu unterbrechen',
                'Welche Tools wirklich helfen — und welche du dir sparen kannst',
                'Wann eine OP sinnvoll ist — und wann nicht',
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '14px', color: '#333', padding: '6px 0', paddingLeft: '22px', position: 'relative', lineHeight: 1.45 }}>
                  <span style={{ position: 'absolute', left: 0, color: '#D9651F', fontWeight: 700 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            {/* Hier deinen Alfima-Kurs-Link eintragen */}
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
              Zum Mandel-Kurs →
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
            Folg mir auf Instagram für tägliche Impulse, Übungs-Videos und den direkten Draht zu mir — dort bist du als Erste informiert, wenn neue Inhalte kommen.
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
          Dieses Dokument dient der Orientierung. Es ersetzt nicht die individuelle Diagnostik oder Therapie.
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
