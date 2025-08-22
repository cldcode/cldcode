const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// 内存设备表
const devices = {};

// Agent 上报心跳/注册
router.post('/report', (req, res) => {
  const { device_id, ip, meta } = req.body;
  const id = device_id || uuidv4();
  devices[id] = {
    id, ip, meta: meta || {}, lastSeen: Date.now(), status: 'online'
  };
  res.send({ id, status: 'ok' });
});

// 获取设备列表
router.get('/', (req, res) => {
  res.send(Object.values(devices));
});

// 批量关联发现清单（Agent 报送）
router.post('/discover', (req, res) => {
  const list = req.body.devices || [];
  const bound = [];
  list.forEach(d => {
    const id = d.device_id || uuidv4();
    devices[id] = { id, ip: d.ip, meta: d.meta || {}, discovered: true, lastSeen: Date.now() };
    bound.push(id);
  });
  res.send({ bound });
});

module.exports = router;
