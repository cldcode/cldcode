const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const resourcesRouter = require('./routes/resources');
const parseRouter = require('./routes/parse');
const exportRouter = require('./routes/export');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/parse', parseRouter);
app.use('/api/export', exportRouter);

app.get('/', (req, res) => res.send({ ok: true, name: 'smart-blackboard-backend' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
