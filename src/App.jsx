import { useState, useEffect, useRef } from 'react'

function Stars() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const NUM = 400
    const SPEED = 3
    function makeStar() {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 0.3
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.random() * 1000,
        px: 0,
        py: 0,
      }
    }
    const stars = Array.from({ length: NUM }, makeStar)
    let frame
    function draw() {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      ctx.fillStyle = 'rgba(0,0,0,0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.z -= SPEED
        if (s.z <= 0) {
          Object.assign(s, makeStar())
          s.z = 1000
        }
        const k = 600 / s.z
        const sx = cx + s.x * canvas.width * k
        const sy = cy + s.y * canvas.height * k
        const r = Math.max(0, (1 - s.z / 1000) * 2.5)
        const alpha = Math.min(1, (1 - s.z / 1000) * 1.5)
        if (s.px && s.py) {
          ctx.beginPath()
          ctx.moveTo(s.px, s.py)
          ctx.lineTo(sx, sy)
          ctx.strokeStyle = `rgba(180,200,255,${alpha * 0.6})`
          ctx.lineWidth = r * 0.6
          ctx.stroke()
        }
        ctx.beginPath()
        ctx.arc(sx, sy, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
        s.px = sx
        s.py = sy
      })
      frame = requestAnimationFrame(draw)
    }
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    draw()
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, canvas.width, canvas.height) }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0 }} />
}

const KUNDEN = [
  'Koller Formenbau GmbH',
  'Autohaus Klepmeir GmbH + Co. KG',
  'Mori Schöberl GmbH & Co. KG',
  'RGS Technischer Service GmbH',
  'SV-Haustechnik GmbH',
  'Lana Grossa GmbH',
  'Grundschule Münchsmünster',
  'EDS-Rücknahmesystem GmbH',
  'Abele Bau GmbH',
  'innovatek OS GmbH',
  'Sozialdienst kath. Frauen e.V.',
]

function randH() {
  return (Math.random() * 44.9 + 0.1).toFixed(1)
}

function getColor(val) {
  const n = parseFloat(val)
  if (n >= 30) return '#f87171'
  if (n >= 15) return '#fbbf24'
  return '#34d399'
}

const slogans = [
  'KI-optimierte Stundenverteilung. Galaktisch präzise.',
  'Neural Engine v7 hat gerechnet. Das Universum bestätigt.',
  'Über 3 Mrd. Neuronen validiert. Jeden Klick.',
  'ISO-9001 zertifizierte Zufälligkeit. Kein Zufall.',
  'Satellitengestützte Auswertung. DSGVO-konform.',
]

export default function App() {
  const [rows, setRows] = useState(null)
  const [loading, setLoading] = useState(false)
  const [slogan, setSlogan] = useState(slogans[0])
  const [flash, setFlash] = useState(false)

  function generate() {
    setLoading(true)
    setTimeout(() => {
      setRows(KUNDEN.map(k => ({ kunde: k, stunden: randH() })))
      setSlogan(slogans[Math.floor(Math.random() * slogans.length)])
      setLoading(false)
      setFlash(true)
      setTimeout(() => setFlash(false), 500)
    }, 600)
  }

  const total = rows ? rows.reduce((s, r) => s + parseFloat(r.stunden), 0).toFixed(1) : null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #000; }

        .badge {
          display: inline-block;
          background: linear-gradient(90deg, #7c3aed, #2563eb);
          color: #fff;
          font-size: 0.65rem;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.3rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 1rem;
        }

        .title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(1.8rem, 4vw, 3.2rem);
          font-weight: 900;
          background: linear-gradient(135deg, #c084fc, #60a5fa, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          line-height: 1.15;
        }

        .subtitle {
          font-family: 'Inter', sans-serif;
          color: rgba(255,255,255,0.45);
          font-size: 0.88rem;
          margin-top: 0.6rem;
          text-align: center;
          max-width: 520px;
        }

        .card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 2rem;
          width: 100%;
          max-width: 680px;
          box-shadow: 0 0 60px rgba(124,58,237,0.15);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Inter', sans-serif;
        }

        thead tr th {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          padding: 0.5rem 0.8rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          text-align: left;
        }
        thead tr th:last-child { text-align: right; }

        tbody tr {
          transition: background 0.2s;
        }
        tbody tr:hover { background: rgba(255,255,255,0.04); }

        tbody tr td {
          padding: 0.6rem 0.8rem;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.85);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        tbody tr:last-child td { border-bottom: none; }

        .stunden {
          text-align: right;
          font-family: 'Orbitron', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          transition: color 0.4s;
        }

        .total-row td {
          padding-top: 0.8rem;
          border-top: 1px solid rgba(255,255,255,0.15) !important;
          color: rgba(255,255,255,0.5);
          font-size: 0.8rem;
          font-family: 'Inter', sans-serif;
        }
        .total-val {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.1rem;
          font-weight: 900;
          background: linear-gradient(135deg, #f0abfc, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: right;
        }

        .flash td { animation: rowflash 0.4s ease; }
        @keyframes rowflash {
          0% { opacity: 0; transform: translateX(-4px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        .btn {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 0.85rem 2rem;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          color: #fff;
          box-shadow: 0 0 24px rgba(124,58,237,0.5);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .btn:hover { transform: scale(1.05); box-shadow: 0 0 36px rgba(124,58,237,0.7); }
        .btn:active { transform: scale(0.97); }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .spinner {
          display: inline-block;
          width: 13px; height: 13px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          vertical-align: middle;
          margin-right: 7px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .slogan {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.28);
          font-style: italic;
          text-align: center;
        }

        .features {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .feature {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 0.35rem 0.75rem;
        }

        .empty {
          text-align: center;
          color: rgba(255,255,255,0.2);
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          padding: 2rem 0;
        }
      `}</style>

      <Stars />

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        minHeight: '100vh', gap: '1.2rem', padding: '2.5rem 1.5rem',
      }}>
        <div className="badge">⚡ KI-gestützt · Next-Gen · Quantenvalidiert</div>

        <h1 className="title">QuantumAudit™ Pro<br />Stundenauswertung</h1>
        <p className="subtitle">
          Die weltweit führende KI-gestützte Auswertungsplattform für verbleibende Servicestunden —
          satellitenvalidiert, DSGVO-konform, galaktisch präzise.
        </p>

        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Kunde</th>
                <th style={{ textAlign: 'right' }}>Verbl. Stunden</th>
              </tr>
            </thead>
            <tbody>
              {rows ? rows.map((r, i) => (
                <tr key={i} className={flash ? 'flash' : ''}>
                  <td>{r.kunde}</td>
                  <td className="stunden" style={{ color: getColor(r.stunden) }}>
                    {r.stunden} h
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={2} className="empty">KI wartet auf Aktivierung…</td></tr>
              )}
              {rows && (
                <tr className="total-row">
                  <td>Gesamt</td>
                  <td className="total-val">{total} h</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button className="btn" onClick={generate} disabled={loading}>
          {loading && <span className="spinner" />}
          {loading ? 'KI analysiert…' : '🚀 Auswertung generieren'}
        </button>

        <div className="slogan">{slogan}</div>

        <div className="features">
          <span className="feature">🔒 256-bit Verschlüsselung</span>
          <span className="feature">🧠 Neural Engine v7</span>
          <span className="feature">🌍 DSGVO-konform</span>
          <span className="feature">⚡ &lt;0.3ms Latenz</span>
          <span className="feature">🛸 Satellitengestützt</span>
        </div>
      </div>
    </>
  )
}
