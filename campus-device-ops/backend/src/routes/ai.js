const express = require('express');
const router = express.Router();

// 简易弹窗判定 API stub
router.post('/popup-check', (req, res) => {
  const { text } = req.body;
  // stub 规则：包含敏感词即为不良弹窗（示例）
  const badWords = ['广告','推广','赌博'];
  const found = badWords.find(w => text && text.includes(w));
  const verdict = found ? 'bad' : 'good';
  res.send({ verdict, confidence: found ? 0.98 : 0.5, matched: found || null });
});

module.exports = router;
