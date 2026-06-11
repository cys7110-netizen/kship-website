import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { sb } from '../config/supabase';
import { dbToLocal } from '../utils/employee';
import { getKSTTodayRange, toKST } from '../utils/date';
import { useAuth } from './AuthContext';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { loggedIn } = useAuth();

  // ═══ 當前分頁 ═══
  const [tab, setTab] = useState('dash-ops');
  const [expandedNav, setExpandedNav] = useState('dashboard');
  const [sideOpen, setSideOpen] = useState(false);

  // ═══ 員工資料（Supabase）═══
  const [emps, setEmps] = useState([]);
  const [empsLoading, setEmpsLoading] = useState(true);

  useEffect(() => {
    async function loadEmps() {
      try {
        const { data, error } = await sb.from('employees').select('*').order('emp_no');
        if (error) { console.error('載入員工失敗:', error); return; }
        if (data && data.length > 0) {
          setEmps(data.map(dbToLocal));
        }
      } catch (e) { console.error('Supabase 連線失敗:', e); }
      setEmpsLoading(false);
    }
    loadEmps();
  }, []);

  // ═══ 即時營運統計 ═══
  const [dailyStats, setDailyStats] = useState({
    inbound: '-', shipped: '-', pendingShip: '-', unclaimed: '-',
  });
  const [lastRefresh, setLastRefresh] = useState('');

  const refreshStats = useCallback(async () => {
    try {
      const range = getKSTTodayRange();
      const startISO = new Date(range.startMs).toISOString();
      const endISO = new Date(range.endMs).toISOString();

      // 今日入庫
      const { data: p1 } = await sb.from('packages').select('id').gte('scanned_at', startISO).lt('scanned_at', endISO);
      const { data: p2 } = await sb.from('packages').select('id').is('scanned_at', null).gte('created_at', startISO).lt('created_at', endISO);
      const inbound = (p1?.length || 0) + (p2?.length || 0);

      // 異常件
      const { data: pU } = await sb.from('packages').select('id').eq('status', 'unclaimed');
      const unclaimed = pU?.length || 0;

      // 今日出貨 + 待出貨
      const { data: tShipped } = await sb.from('tasks').select('id')
        .or('task_type.eq.ship,type.eq.ship')
        .in('status', ['completed', 'paid'])
        .gte('created_at', startISO).lt('created_at', endISO);
      const shipped = tShipped?.length || 0;

      const { data: tPending } = await sb.from('tasks').select('id')
        .or('task_type.eq.ship,type.eq.ship')
        .eq('status', 'pending');
      const pendingShip = tPending?.length || 0;

      setDailyStats({ inbound, shipped, pendingShip, unclaimed });

      const k = toKST();
      setLastRefresh(
        String(k.getUTCHours()).padStart(2, '0') + ':' +
        String(k.getUTCMinutes()).padStart(2, '0') + ':' +
        String(k.getUTCSeconds()).padStart(2, '0')
      );
    } catch (e) {
      console.error('loadDailyStats:', e);
    }
  }, []);

  // 登入後自動刷新，每 15 秒
  useEffect(() => {
    if (loggedIn) {
      refreshStats();
      const iv = setInterval(refreshStats, 15000);
      return () => clearInterval(iv);
    }
  }, [loggedIn, refreshStats]);

  return (
    <AppContext.Provider value={{
      // 導航
      tab, setTab,
      expandedNav, setExpandedNav,
      sideOpen, setSideOpen,
      // 員工
      emps, setEmps, empsLoading,
      // 營運統計
      dailyStats, lastRefresh, refreshStats,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp 必須在 AppProvider 內使用');
  return ctx;
}
