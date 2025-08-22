import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App(){
  const [resources, setResources] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/api/resources').then(r => setResources(r.data)).catch(()=>{});
  }, []);
  return (
    <div style={{padding:20}}>
      <h2>智慧黑板备授课 软件（Demo）</h2>
      <p>示例资源列表：</p>
      <ul>
        {resources.map(r=> <li key={r.id}>{r.originalname} - {r.status}</li>)}</ul>
      <p>更多功能请查看后端 / 前端 源码，按需扩展解析与 AI 模块。</p>
    </div>
  );
}
