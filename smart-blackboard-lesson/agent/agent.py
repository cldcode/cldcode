#!/usr/bin/env python3
# 简易 Agent 示例：模拟上传文件并心跳上报（用于开发调试）
import requests, time, os, uuid

BACKEND = os.environ.get('BACKEND','http://localhost:4000')

def heartbeat(device_id):
    return requests.post(BACKEND + '/api/devices/report', json={
        "device_id": device_id, "status": "online", "ts": int(time.time())
    }).status_code

if __name__ == '__main__':
    device_id = 'sim-device-' + uuid.uuid4().hex[:6]
    print('agent starting, device_id=', device_id)
    while True:
        try:
            print('heartbeat', heartbeat(device_id))
        except Exception as e:
            print('err', e)
        time.sleep(10)
