const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const devicesRouter = require('./routes/devices');
const tasksRouter = require('./routes/tasks');
const aiRouter = require('./routes/ai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/devices', devicesRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/ai', aiRouter);

app.get('/', (req, res) => res.send({ ok: true, name: 'campus-device-ops-backend' }));
const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log(`DeviceOps backend listening on ${PORT}`));
