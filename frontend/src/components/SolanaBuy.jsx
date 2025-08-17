import { useEffect, useState } from 'react';

const DEMO_MODE = String(import.meta.env.VITE_DEMO_MODE || '').toLowerCase() === 'true';
/*
// a simple inline “QR” placeholder (svg data url)
const DUMMY_QR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <rect width="200" height="200" fill="#fff"/>
      <rect x="10" y="10" width="180" height="180" fill="#000"/>
      <rect x="20" y="20" width="160" height="160" fill="#fff"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
            font-family="monospace" font-size="14">QR (demo)</text>
    </svg>`
  );
*/
export default function SolanaBuy({ userAddress }) {
  const [amt, setAmt] = useState('10');
  const [intent, setIntent] = useState(null);    // { id, solanaPayUrl, qrPngData }
  const [status, setStatus] = useState('idle');  // idle|pending|created|confirmed|failed
  const [error, setError] = useState('');
/*
  const createIntent = async () => {
    if (!userAddress) {
      setError('Connect your EVM wallet first.');
      return;
    }

    setError('');

    if (DEMO_MODE) {
      // --- DEMO: fake server response ---
      const fakeId = `pi_demo_${Date.now()}`;
      setIntent({
        id: fakeId,
        solanaPayUrl: `solana:demo-intent?amount=${encodeURIComponent(amt)}`,
        qrPngData: DUMMY_QR.split(',')[1], // not used; we’ll use full data url below
      });
      setStatus('created');

      // auto-advance status like a real flow
      // created → pending → confirmed
      setTimeout(() => setStatus('pending'), 2000);
      setTimeout(() => setStatus('confirmed'), 8000);
      return;
    }

    // --- REAL (when backend is ready) ---
    try {
      setStatus('pending');
      const res = await fetch('/api/solana/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amt, evmAddress: userAddress }),
      });
      if (!res.ok) throw new Error('Failed to create intent');
      const data = await res.json(); // {id, solanaPayUrl, qrPngData?}
      setIntent(data);
      setStatus('created');
    } catch (e) {
      setError(e.message || 'Could not create payment intent');
      setStatus('failed');
    }
  };
*/
  // REAL polling (ignored in demo because we auto-advance)
  useEffect(() => {
    if (DEMO_MODE) return;
    if (!intent?.id || (status !== 'created' && status !== 'pending')) return;

    const iv = setInterval(async () => {
      try {
        const res = await fetch(`/api/solana/payment-status?id=${encodeURIComponent(intent.id)}`);
        if (!res.ok) throw new Error('Status check failed');
        const data = await res.json(); // {status:'pending'|'confirmed'|'failed'}
        if (data.status === 'confirmed') {
          setStatus('confirmed');
          clearInterval(iv);
        } else if (data.status === 'failed') {
          setStatus('failed');
          clearInterval(iv);
        } else {
          setStatus('pending');
        }
      } catch {
        // keep polling quietly
      }
    }, 4000);

    return () => clearInterval(iv);
  }, [intent?.id, status]);

  return (
    <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
      <h4 style={{ marginTop: 0 }}>Buy with Solana (devnet)</h4>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <input
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
          placeholder="Amount (e.g., 10)"
          style={{ padding: '6px 8px' }}
        />
        <button onClick={createIntent} disabled={!userAddress || status === 'pending'}>
          Create Intent
        </button>
      </div>

      {intent && (
        <div style={{ marginTop: 10 }}>
          <p style={{ margin: '6px 0' }}>Scan with Phantom (devnet) or open link:</p>
          {/* In demo we show the inline SVG “QR”; in real mode prefer server-provided png */}
          <img
            src={DEMO_MODE ? DUMMY_QR : (intent.qrPngData ? `data:image/png;base64,${intent.qrPngData}` : DUMMY_QR)}
            alt="Solana Pay QR"
            style={{ width: 180, background: '#fff', padding: 8, borderRadius: 8 }}
          />
          <div style={{ marginTop: 8 }}>
            <a href={intent.solanaPayUrl} target="_blank" rel="noreferrer">
              Open Solana Pay Link
            </a>
          </div>
        </div>
      )}

      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.85 }}>
        Status: {status}
        {status === 'confirmed' && ' — Payment detected (demo). HNY minted to your EVM wallet.'}
        {error && <div style={{ color: 'tomato', marginTop: 6 }}>{error}</div>}
      </div>

      {DEMO_MODE && (
        <div style={{ marginTop: 8, fontSize: 12, opacity: 0.6 }}>
          Demo mode is ON — no real network calls are made.
        </div>
      )}
    </div>
  );
}
