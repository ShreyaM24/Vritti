const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

router.post('/', async (req,res)=>{
  const { title, description, type, language, url, tags } = req.body;
  try {
    const r = await Resource.create({ title, description, type, language, url, tags });
    res.json(r);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

router.get('/', async (req,res)=>{
  const lang = req.query.lang || 'en';
  const q = { language: lang };
  if (req.query.type) q.type = req.query.type;
  const items = await Resource.find(q).sort({ createdAt: -1 });
  res.json(items);
});

module.exports = router;
