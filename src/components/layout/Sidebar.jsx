import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { useIsMobile } from '../../hooks/useIsMobile';
import { DONE_PAGES } from '../../config/navigation';

export default function Sidebar() {
  const mobile = useIsMobile();
  const { filteredNav, logout } = useAuth();
  const { tab, setTab, expandedNav, setExpandedNav, sideOpen, setSideOpen } = useApp();

  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    left: mobile ? (sideOpen ? 0 : -260) : 0,
    width: 220,
    height: '100vh',
    background: '#1a2533',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    transition: 'left .2s',
    zIndex: 999,
    overflowY: 'auto',
  };

  return (
    <aside style={sidebarStyle}>
      {/* Logo */}
      <div style={{
        padding: '20px 16px 12px',
        borderBottom: '1px solid rgba(255,255,255,.08)',
      }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>📦 韓集集運</div>
        <div style={{ fontSize: 11, color: '#8aa4c4', marginTop: 2 }}>管理系統</div>
      </div>

      {/* 導航選單 */}
      <nav style={{ flex: 1, padding: '8px 0' }}>
        {filteredNav.map((n) => {
          const isExpanded = expandedNav === n.k;
          const isActive = tab === n.k || n.sub?.some((s) => s.k === tab);

          return (
            <div key={n.k}>
              {/* 主項目 */}
              <button
                onClick={() => {
                  setExpandedNav(isExpanded ? null : n.k);
                  if (n.sub && n.sub.length > 0) {
                    setTab(n.sub[0].k);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '8px 16px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  background: isActive ? 'rgba(255,255,255,.12)' : 'transparent',
                  color: isActive ? '#fff' : '#8aa4c4',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontSize: 8,
                  color: isActive ? '#fff' : '#8aa4c4',
                }}>●</span>
                {n.l}
              </button>

              {/* 子選單 */}
              {isExpanded && n.sub?.map((s) => (
                <button
                  key={s.k}
                  onClick={() => {
                    setTab(s.k);
                    if (mobile) setSideOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '6px 16px 6px 36px',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 12,
                    fontWeight: tab === s.k ? 600 : 400,
                    background: tab === s.k ? 'rgba(255,255,255,.1)' : 'transparent',
                    color: tab === s.k ? '#fff' : '#8aa4c4',
                    textAlign: 'left',
                  }}
                >
                  {s.l}
                  {!DONE_PAGES.includes(s.k) && (
                    <span style={{ fontSize: 10, marginLeft: 4, opacity: 0.5 }}>🚧</span>
                  )}
                </button>
              ))}
            </div>
          );
        })}
      </nav>

      {/* 底部登出 */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,.08)' }}>
        <button
          onClick={logout}
          style={{
            width: '100%',
            padding: '8px 0',
            background: 'rgba(255,255,255,.06)',
            color: '#8aa4c4',
            border: '1px solid rgba(255,255,255,.1)',
            borderRadius: 6,
            fontSize: 12,
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          登出
        </button>
      </div>
    </aside>
  );
}
