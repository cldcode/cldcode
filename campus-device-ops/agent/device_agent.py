#!/usr/bin/env python3
# 简易 Device Agent：向后台上报发现/心跳，并能接收简单任务（模拟）
import requests, time, os, uuid, threading

BACKEND = os.environ.get('BACKEND','http://localhost:4100')

device_id = 'agent-' + uuid.uuid4().hex[:6]

def report_loop():
    while True:
        try:
            r = requests.post(BACKEND + '/api/devices/report', json={"device_id":device_id, "ip":"192.168.1.100", "meta":{"model":"班班通X1"}})
            print('report', r.status_code)
        except Exception as e:
            print('err', e)
        time.sleep(10)

if __name__ == '__main__':
    t = threading.Thread(target=report_loop)
    t.start()
    while True:
        time.sleep(1)
