# 智慧黑板备授课软件（smart-blackboard-lesson）

最小可运行骨架，包含：
- 后端：Node.js + Express（REST API：auth, resources, parse, export）
- 前端：React（简单管理界面）
- Agent（示例）：Python，用于设备模拟与文件上报（可扩展为设备边缘代理）
- AI 服务：Flask 示例（英文语法纠错 stub）
- docker-compose：一键启动后端、前端和 AI 服务（用于本地开发）

运行（需要 Docker）：
1. cd smart-blackboard-lesson
2. docker-compose up --build
3. 后端: http://localhost:4000
4. 前端: http://localhost:3000

这是骨架代码，目标是快速验证接口与流程，后续需扩展文件解析（pptx/word）、存储/索引（ES）、多终端兼容和完整的安全/鉴权、权限、配额逻辑.