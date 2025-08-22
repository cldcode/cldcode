const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const storeFile = path.join(dataDir, 'store.json');

function ensureStore() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(storeFile)) {
    const initial = { devices: {}, tasks: {} };
    fs.writeFileSync(storeFile, JSON.stringify(initial, null, 2));
  }
}

function readStore() {
  ensureStore();
  try {
    const raw = fs.readFileSync(storeFile, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { devices: {}, tasks: {} };
  }
}

function writeStore(store) {
  ensureStore();
  fs.writeFileSync(storeFile, JSON.stringify(store, null, 2));
}

module.exports = {
  getDevices() {
    const s = readStore();
    return Object.values(s.devices);
  },
  upsertDevice(device) {
    const s = readStore();
    s.devices[device.id] = Object.assign({}, s.devices[device.id] || {}, device, { lastSeen: Date.now() });
    writeStore(s);
    return s.devices[device.id];
  },
  getDevice(id) {
    const s = readStore();
    return s.devices[id] || null;
  },
  createTask(task) {
    const s = readStore();
    s.tasks[task.id] = task;
    writeStore(s);
    return s.tasks[task.id];
  },
  getTask(id) {
    const s = readStore();
    return s.tasks[id] || null;
  },
  listTasks() {
    const s = readStore();
    return Object.values(s.tasks);
  },
  findNextTaskForDevice(deviceId) {
    const s = readStore();
    // find first queued task that targets the device (or targets is empty meaning any)
    const tasks = Object.values(s.tasks).filter(t => t.status === 'queued' && (!t.targets || t.targets.length === 0 || t.targets.includes(deviceId)));
    if (tasks.length === 0) return null;
    // pick oldest by createdAt
    tasks.sort((a,b)=> (a.createdAt||0)-(b.createdAt||0));
    const t = tasks[0];
    // assign
    t.status = 'assigned';
    t.assignedTo = deviceId;
    t.assignedAt = Date.now();
    s.tasks[t.id] = t;
    writeStore(s);
    return t;
  },
  markTaskComplete(taskId, deviceId, result) {
    const s = readStore();
    const t = s.tasks[taskId];
    if (!t) return null;
    t.status = 'done';
    t.completedAt = Date.now();
    t.result = result;
    t.completedBy = deviceId;
    s.tasks[taskId] = t;
    writeStore(s);
    return t;
  }
};
