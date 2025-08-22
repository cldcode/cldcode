const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: '/tmp/uploads' });
const { v4: uuidv4 } = require('uuid');

// 内存资源仓库示例
const resources = {};

router.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const id = uuidv4();
  resources[id] = {
    id, originalname: file.originalname, path: file.path, createdAt: Date.now(), status: 'uploaded'
  };
  res.send({ id, name: file.originalname });
});

router.get('/:id', (req, res) => {
  const r = resources[req.params.id];
  if (!r) return res.status(404).send({ error: 'not found' });
  res.send(r);
});

router.get('/', (req, res) => {
  res.send(Object.values(resources));
});

module.exports = router;
