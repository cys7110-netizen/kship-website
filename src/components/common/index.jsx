import React from 'react';
import { dotColors } from '../../config/constants';

// ═══ 彩色圓點 ═══
export function Dot({ id }) {
  return (
    <div style={{
      width: 10, height: 10, borderRadius: '50%',
      background: dotColors[id % dotColors.length],
      flexShrink: 0,
    }} />
  );
}

// ═══ 帶標籤的輸入框 ═══
export function Inp({ label, ...props }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13 }}>
      <span style={{ color: '#5a6a7e', fontWeight: 500 }}>{label}</span>
      <input
        style={{
          border: '1px solid #d0d7e0', borderRadius: 6, padding: '6px 10px',
          fontSize: 14, fontFamily: 'inherit', outline: 'none',
        }}
        {...props}
      />
    </label>
  );
}

// ═══ 行列顯示（左右對齊）═══
export function RR({ l, r, bold, c }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '4px 0',
      fontWeight: bold ? 600 : 400,
      color: c || 'inherit',
    }}>
      <span>{l}</span>
      <span>{r}</span>
    </div>
  );
}

// ═══ 開發中頁面佔位 ═══
export function Placeholder({ title }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '80px 20px', textAlign: 'center',
    }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#34537d', margin: '0 0 8px' }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, color: '#8a9ab0', margin: 0 }}>
        此功能開發中，敬請期待
      </p>
    </div>
  );
}
