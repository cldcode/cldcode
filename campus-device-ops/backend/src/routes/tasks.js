const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// 简易任务存储
const tasks = {};

router.post('/dispatch', (req, res) => {
  const { targetDeviceIds, action, params } = req.body;
  const taskId = uuidv4();
  tasks[taskId] = { id: taskId, targets: targetDeviceIds, action, params, status: 'queued', createdAt: Date.now() };
  // 在真实系统应通过消息队列下发到 Agent
  res.send({ taskId, status: 'queued' });
});

router.get('/:id', (req, res) => {
  const t = tasks[req.params.id];
  if (!t) return res.status(404).send({ error: 'not found' });
  res.send(t);
});

router.get('/', (req, res) => res.send(Object.values(tasks)));

module.exports = router;
