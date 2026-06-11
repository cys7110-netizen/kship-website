import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider, useApp } from './contexts/AppContext';
import { useIsMobile } from './hooks/useIsMobile';
import { Placeholder } from './components/common';
import LoginScreen from './components/layout/LoginScreen';
import Sidebar from './components/layout/Sidebar';

// ═══ 頁面元件 ═══
// 把每個頁面從 pages/ 資料夾 import 進來
// 範例：import DashOps from './pages/dashboard/DashOps';
// 遷移時逐一加入，未遷移的先用 Placeholder

// ═══ 頁面路由 ═══
function PageRouter() {
  const { tab } = useApp();

  // 遷移時逐一替換 Placeholder 為實際的頁面元件
  // 例如：case 'dash-ops': return <DashOps />;
  switch (tab) {
    // 儀表板
    case 'dash-ops':    return <Placeholder title="營運總覽" />;
    case 'dash-today':  return <Placeholder title="今日數據" />;
    case 'dash-month':  return <Placeholder title="本月數據" />;
    case 'dash-finance': return <Placeholder title="財務概況" />;
    case 'dash-ai':     return <Placeholder title="AI營運摘要" />;

    // 財務管理
    case 'fin-dashboard': return <Placeholder title="財務儀表板" />;
    case 'fin-monthly':   return <Placeholder title="月報表" />;
    case 'fin-yearly':    return <Placeholder title="年報表" />;
    case 'fin-revenue':   return <Placeholder title="營收明細" />;
    case 'fin-expense':   return <Placeholder title="支出管理" />;
    case 'fin-salary':    return <Placeholder title="薪資支出" />;
    case 'fin-collection': return <Placeholder title="收款紀錄" />;
    case 'fin-shiplist':  return <Placeholder title="出貨/付款" />;
    case 'fin-profit':    return <Placeholder title="利潤分析" />;
    case 'fin-unpaid':    return <Placeholder title="收款管理" />;

    // 客戶管理
    case 'cust-list':     return <Placeholder title="客戶列表" />;
    case 'cust-detail':   return <Placeholder title="客戶資料" />;
    case 'cust-vip':      return <Placeholder title="VIP客戶" />;
    case 'cust-active':   return <Placeholder title="活躍客戶" />;
    case 'cust-inactive': return <Placeholder title="沉睡客戶" />;
    case 'cust-unpaid':   return <Placeholder title="未付款客戶" />;
    case 'cust-ranking':  return <Placeholder title="客戶消費排行" />;
    case 'cust-analysis': return <Placeholder title="客戶分析" />;

    // 人資管理
    case 'hr-employees':   return <Placeholder title="員工資料" />;
    case 'hr-position':    return <Placeholder title="職位管理" />;
    case 'hr-attendance':  return <Placeholder title="出勤管理" />;
    case 'hr-schedule':    return <Placeholder title="排班管理" />;
    case 'hr-leave':       return <Placeholder title="請假管理" />;
    case 'hr-salary':      return <Placeholder title="薪資管理" />;
    case 'hr-visa':        return <Placeholder title="簽證期限" />;
    case 'hr-performance': return <Placeholder title="績效統計" />;

    // 支出管理
    case 'exp-meals':   return <Placeholder title="每日餐費" />;
    case 'exp-packing': return <Placeholder title="包材支出" />;

    // 系統設定
    case 'set-company':    return <Placeholder title="公司資料設定" />;
    case 'set-shipping':   return <Placeholder title="運費設定" />;
    case 'set-proxy':      return <Placeholder title="代購服務費設定" />;
    case 'set-tier':       return <Placeholder title="客戶等級設定" />;
    case 'set-permission': return <Placeholder title="權限管理" />;
    case 'set-line':       return <Placeholder title="LINE通知設定" />;
    case 'set-sms':        return <Placeholder title="簡訊通知設定" />;
    case 'set-api':        return <Placeholder title="API串接設定" />;

    default:
      return <Placeholder title="頁面不存在" />;
  }
}

// ═══ 主版面 ═══
function MainLayout() {
  const mobile = useIsMobile();
  const { sideOpen, setSideOpen } = useApp();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* 側邊欄 */}
      <Sidebar />

      {/* 手機版側邊欄遮罩 */}
      {mobile && sideOpen && (
        <div
          onClick={() => setSideOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,.3)',
            zIndex: 998,
          }}
        />
      )}

      {/* 主內容區 */}
      <main style={{
        flex: 1,
        marginLeft: mobile ? 0 : 220,
        padding: mobile ? '16px 12px' : '24px 32px',
        minHeight: '100vh',
        transition: 'margin .2s',
      }}>
        <PageRouter />
      </main>
    </div>
  );
}

// ═══ App 根元件 ═══
function AppContent() {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <LoginScreen />;
  }

  return <MainLayout />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}
