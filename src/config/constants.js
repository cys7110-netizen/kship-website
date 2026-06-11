// ═══ 員工類型 ═══
export const TYPES = ['正職員工', '兼職人員', '實習生', '約聘人員'];

// ═══ 班次 ═══
export const SHIFTS = [
  { k: 'A', l: '12-18', t: '12:00~18:00', h: 6, c: '#34537d', bg: '#dce8f4' },
  { k: 'B', l: '15-21', t: '15:00~21:00', h: 6, c: '#5b9e6f', bg: '#ddf0e0' },
  { k: 'C', l: '17-23', t: '17:00~23:00', h: 6, c: '#c4953a', bg: '#f5ead4' },
  { k: 'D', l: '18-00', t: '18:00~00:00', h: 6, c: '#7b6ba5', bg: '#eae4f4' },
  { k: 'E', l: '20-02', t: '20:00~02:00', h: 6, c: '#c0504d', bg: '#f4dede' },
  { k: 'F', l: '全天', t: '17:00~03:00', h: 10, c: '#d4761c', bg: '#fde8cc' },
  { k: '休', l: '休假', t: '休假', h: 0, c: '#8a9ab0', bg: '#eef0f2' },
];
export const SHIFT_KEYS = SHIFTS.map((s) => s.k);

// ═══ 出勤狀態 ═══
export const ATT_STATUS = [
  { k: '出勤', c: '#5b9e6f' },
  { k: '請假', c: '#c4953a' },
  { k: '遲到', c: '#c0504d' },
  { k: '未到', c: '#8a9ab0' },
];

// ═══ 會員等級 ═══
export const GRADES = [
  { k: 'normal', l: '一般會員', min: 0, discount: 0, c: '#8a9ab0' },
  { k: 'silver', l: '銀卡會員', min: 30, discount: 3, c: '#a0aec0' },
  { k: 'gold', l: '金卡會員', min: 60, discount: 5, c: '#d4953a' },
  { k: 'platinum', l: '白金會員', min: 100, discount: 8, c: '#6b5ce7' },
  { k: 'diamond', l: '鑽石會員', min: 200, discount: 10, c: '#38bdf8' },
  { k: 'vvip', l: 'VVIP', min: 500, discount: 12, c: '#ef4444' },
];

// ═══ 登入密碼（正式環境應移至後端）═══
export const PASSWORDS = {
  'hanji2020/': 'boss',
  '0000': 'manager',
  '1111': 'staff',
};

// ═══ 角色權限 ═══
export const STAFF_HR_PAGES = ['hr-attendance', 'hr-schedule', 'hr-leave', 'hr-visa'];
export const STAFF_DASH_HIDE = ['dash-finance', 'dash-month'];

// ═══ UI 顏色 ═══
export const dotColors = [
  '#5b8fb9', '#b85c5c', '#6b9e7a', '#c4953a',
  '#7b6ba5', '#4e8e8e', '#c47a5a', '#5c7eba',
];

// ═══ 預設員工資料 ═══
export function generateDefaultEmployees() {
  const list = [];
  for (let i = 1; i <= 100; i++) {
    const num = String(i).padStart(4, '0');
    list.push({
      id: i,
      empNo: 'A' + num,
      name: '員工 A' + num,
      type: '正職員工',
      visa: '',
      visaType: '',
      rate: 0,
      msalary: 0,
      startDate: '2026-01-01',
      resigned: false,
      resignDate: '',
      password: 'A' + num,
    });
  }
  return list;
}

// ═══ 通用格式化 ═══
export const w = (n) => '₩ ' + (Number(n) || 0).toLocaleString();
