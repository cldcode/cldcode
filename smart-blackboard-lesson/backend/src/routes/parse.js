const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// 简单模拟解析任务
const tasks = {};

router.post('/pptx', (req, res) => {
  // 在真实实现中：根据资源 id 拉取文件，使用 OpenXML/LibreOffice 等解析
  const taskId = uuidv4();
  tasks[taskId] = { id: taskId, type: 'parse_pptx', status: 'processing', progress: 0 };
  // 模拟异步处理
  setTimeout(() => {
    tasks[taskId].status = 'done';
    tasks[taskId].progress = 100;
  }, 1500);
  res.send({ taskId });
});

router.get('/tasks/:id', (req, res) => {
  const t = tasks[req.params.id];
  if (!t) return res.status(404).send({ error: 'not found' });
  res.send(t);
});

module.exports = router;
