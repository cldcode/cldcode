const express = require('express');
const router = express.Router();

// 导出示例：返回模拟下载链接或 web 链接
router.post('/', (req, res) => {
  const { resourceId, format } = req.body;
  // 骨架：在真实实现中会调用导出 Worker 生成文件并上对象存储
  const link = `https://example.local/downloads/${resourceId || 'r-demo'}.${format || 'pdf'}`;
  res.send({ link, status: 'queued' });
});

module.exports = router;
