const express = require('express');
const router = express.Router();
const { verifyTokenMiddleware } = require('../utils/auth');

router.post('/', async (req,res)=>{
  const { message, language } = req.body;
  if (!message) return res.status(400).json({ message: 'Message required' });

  const crisisKeywords = ['suicide','kill myself','self harm','hurt myself','end my life','overdose'];
  const msgLower = message.toLowerCase();
  if (crisisKeywords.some(k => msgLower.includes(k))) {
    return res.json({
      type: 'crisis',
      text: 'I hear you’re in severe distress. If you are in immediate danger, please call your local emergency number or the campus helpline. Would you like me to connect you to a counsellor or show crisis resources?'
    });
  }

  if (process.env.OPENAI_API_KEY) {
    try {
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a supportive mental health first-aid assistant. Provide coping tips and suggest seeking professional help when appropriate. Keep answers concise.'},
            { role: 'user', content: message }
          ],
          max_tokens: 300
        })
      });
      const data = await resp.json();
      const reply = data?.choices?.[0]?.message?.content || 'Sorry, no reply';
      return res.json({ type:'ai', text: reply });
    } catch (err) {
      console.error('OpenAI forward error', err);
    }
  }

  const suggestions = [];
  if (msgLower.includes('anx') || msgLower.includes('panic') || msgLower.includes('nervous')) {
    suggestions.push('Try 4-4-4 breathing: inhale 4s, hold 4s, exhale 4s. Ground yourself by naming 5 things you see.');
  }
  if (msgLower.includes('sleep') || msgLower.includes('insomnia')) {
    suggestions.push('Limit screens before bed, keep a regular sleep schedule, and try a short relaxation audio.');
  }
  if (suggestions.length === 0) {
    suggestions.push(`I'm here for you. Can you say more about what's happening? If this is urgent, contact your campus helpline.`);
  }

  return res.json({ type: 'selfhelp', text: suggestions.join('\n\n'), suggestions });
});

module.exports = router;
