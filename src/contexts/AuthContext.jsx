import React, { createContext, useContext, useState, useCallback } from 'react';
import { PASSWORDS, STAFF_HR_PAGES, STAFF_DASH_HIDE } from '../config/constants';
import { NAV } from '../config/navigation';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(() => {
    try { return localStorage.getItem('hj_admin_logged') === 'true'; }
    catch { return false; }
  });
  const [userRole, setUserRole] = useState(() => {
    try { return localStorage.getItem('hj_admin_role') || ''; }
    catch { return ''; }
  });

  const login = useCallback((password) => {
    const role = PASSWORDS[password];
    if (role) {
      setLoggedIn(true);
      setUserRole(role);
      try {
        localStorage.setItem('hj_admin_logged', 'true');
        localStorage.setItem('hj_admin_role', role);
      } catch {}
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setLoggedIn(false);
    setUserRole('');
    try {
      localStorage.removeItem('hj_admin_logged');
      localStorage.removeItem('hj_admin_role');
    } catch {}
  }, []);

  // 根據角色過濾導航選單
  const filterNavByRole = useCallback((items) => {
    if (userRole === 'boss') return items;

    if (userRole === 'manager') {
      return items
        .filter((n) => n.k !== 'settings' && n.k !== 'mgr-expense')
        .map((n) => {
          if (n.k === 'dashboard') return { ...n, sub: n.sub?.filter((s) => s.k !== 'dash-finance') };
          if (n.k === 'hr') return { ...n, sub: n.sub?.filter((s) => STAFF_HR_PAGES.includes(s.k)) };
          if (n.k === 'finance') return { ...n, sub: n.sub?.filter((s) => s.k === 'fin-shiplist') };
          return n;
        });
    }

    if (userRole === 'staff') {
      return items
        .filter((n) => n.k === 'dashboard' || n.k === 'hr' || n.k === 'mgr-expense')
        .map((n) => {
          if (n.k === 'dashboard') return { ...n, sub: n.sub?.filter((s) => !STAFF_DASH_HIDE.includes(s.k)) };
          if (n.k === 'hr') return { ...n, sub: n.sub?.filter((s) => STAFF_HR_PAGES.includes(s.k)) };
          return n;
        });
    }

    return items;
  }, [userRole]);

  const filteredNav = filterNavByRole(NAV);

  return (
    <AuthContext.Provider value={{ loggedIn, userRole, login, logout, filteredNav }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth 必須在 AuthProvider 內使用');
  return ctx;
}
