import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    const ok = login(pw);
    if (!ok) setError(true);
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: 'linear-gradient(135deg, #34537d 0%, #1a2533 100%)',
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, padding: '40px 32px',
        width: 340, textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,.15)',
      }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>📦</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#34537d', margin: '0 0 4px' }}>
          韓集集運
        </h2>
        <p style={{ fontSize: 13, color: '#8a9ab0', margin: '0 0 24px' }}>
          管理系統登入
        </p>

        <input
          type="password"
          placeholder="請輸入管理密碼"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          style={{
            width: '100%', padding: '10px 14px', border: `1px solid ${error ? '#c0504d' : '#d0d7e0'}`,
            borderRadius: 8, fontSize: 14, fontFamily: 'inherit', outline: 'none',
            marginBottom: 12,
          }}
        />

        {error && (
          <p style={{ fontSize: 12, color: '#c0504d', margin: '0 0 8px' }}>
            密碼錯誤，請重新輸入
          </p>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: '100%', padding: '10px 0', background: '#34537d', color: '#fff',
            border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600,
            fontFamily: 'inherit', cursor: 'pointer',
          }}
        >
          登入
        </button>
      </div>
    </div>
  );
}
