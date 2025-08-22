const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// 简化示例：内存用户
const users = [
  { id: 'u1', username: 'teacher1', password: 'pass', name: 'Teacher One' }
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const u = users.find(x => x.username === username && x.password === password);
  if (!u) return res.status(401).send({ error: 'invalid credentials' });
  // 返回简单 token（示例）
  const token = 'token-' + uuidv4();
  return res.send({ token, user: { id: u.id, name: u.name, username: u.username } });
});

module.exports = router;
