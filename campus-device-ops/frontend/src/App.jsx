import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function App(){
  const [devices, setDevices] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:4100/api/devices').then(r=>setDevices(r.data)).catch(()=>{});
  },[]);
  return (
    <div style={{padding:20}}>
      <h2>校园设备运维管理平台（Demo）</h2>
      <h3>设备列表</h3>
      <ul>
        {devices.map(d=> <li key={d.id}>{d.id} - {d.ip || 'n/a'} - {d.status || d.discovered ? 'online' : 'unknown'}</li>)}
      </ul>
      <p>可扩展为实时画面、多路布局、巡检与通知模块。</p>
    </div>
  );
}
