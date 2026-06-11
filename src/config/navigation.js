// ═══ 導航結構 ═══
export const NAV = [
  {
    k: 'dashboard', l: '儀表板', sub: [
      { k: 'dash-ops', l: '營運總覽' },
      { k: 'dash-today', l: '今日數據' },
      { k: 'dash-month', l: '本月數據' },
      { k: 'dash-finance', l: '財務概況' },
      { k: 'dash-ai', l: 'AI營運摘要' },
    ],
  },
  {
    k: 'finance', l: '財務管理', sub: [
      { k: 'fin-dashboard', l: '財務儀表板' },
      { k: 'fin-monthly', l: '月報表' },
      { k: 'fin-yearly', l: '年報表' },
      { k: 'fin-revenue', l: '營收明細' },
      { k: 'fin-expense', l: '支出管理' },
      { k: 'fin-salary', l: '薪資支出' },
      { k: 'fin-collection', l: '收款紀錄' },
      { k: 'fin-shiplist', l: '出貨/付款' },
      { k: 'fin-profit', l: '利潤分析' },
      { k: 'fin-unpaid', l: '收款管理' },
    ],
  },
  {
    k: 'customers', l: '客戶管理', sub: [
      { k: 'cust-list', l: '客戶列表' },
      { k: 'cust-detail', l: '客戶資料' },
      { k: 'cust-vip', l: 'VIP客戶' },
      { k: 'cust-active', l: '活躍客戶' },
      { k: 'cust-inactive', l: '沉睡客戶' },
      { k: 'cust-unpaid', l: '未付款客戶' },
      { k: 'cust-ranking', l: '客戶消費排行' },
      { k: 'cust-analysis', l: '客戶分析' },
    ],
  },
  {
    k: 'hr', l: '人資管理', sub: [
      { k: 'hr-employees', l: '員工資料' },
      { k: 'hr-position', l: '職位管理' },
      { k: 'hr-attendance', l: '出勤管理' },
      { k: 'hr-schedule', l: '排班管理' },
      { k: 'hr-leave', l: '請假管理' },
      { k: 'hr-salary', l: '薪資管理' },
      { k: 'hr-visa', l: '簽證期限' },
      { k: 'hr-performance', l: '績效統計' },
    ],
  },
  {
    k: 'mgr-expense', l: '支出管理', sub: [
      { k: 'exp-meals', l: '每日餐費' },
      { k: 'exp-packing', l: '包材支出' },
    ],
  },
  {
    k: 'settings', l: '系統設定', sub: [
      { k: 'set-company', l: '公司資料設定' },
      { k: 'set-shipping', l: '運費設定' },
      { k: 'set-proxy', l: '代購服務費設定' },
      { k: 'set-tier', l: '客戶等級設定' },
      { k: 'set-permission', l: '權限管理' },
      { k: 'set-line', l: 'LINE通知設定' },
      { k: 'set-sms', l: '簡訊通知設定' },
      { k: 'set-api', l: 'API串接設定' },
    ],
  },
];

// 已完成的頁面
export const DONE_PAGES = [
  'hr-employees', 'hr-salary', 'hr-visa', 'hr-attendance', 'hr-schedule',
  'hr-performance', 'set-tier', 'set-shipping', 'cust-list', 'cust-detail',
  'cust-vip', 'cust-active', 'cust-inactive', 'cust-unpaid', 'cust-ranking',
  'cust-analysis', 'exp-meals', 'exp-packing',
];
