// ═══ Supabase ↔ React 格式轉換 ═══

export function dbToLocal(row) {
  return {
    id: row.id,
    empNo: row.emp_no || '',
    name: row.name || '',
    type: row.emp_type || '正職員工',
    visa: row.visa_expiry || '',
    visaType: row.visa_type || '',
    rate: row.hourly_rate || 0,
    msalary: row.monthly_salary || 0,
    startDate: row.start_date || '',
    resigned: !!row.resigned,
    resignDate: row.resign_date || '',
    password: row.password || row.emp_no || '',
  };
}

export function localToDb(emp) {
  return {
    emp_no: emp.empNo,
    name: emp.name,
    emp_type: emp.type,
    visa_expiry: emp.visa || null,
    visa_type: emp.visaType || null,
    hourly_rate: Number(emp.rate) || 0,
    monthly_salary: Number(emp.msalary) || 0,
    start_date: emp.startDate || null,
    resigned: !!emp.resigned,
    resign_date: emp.resignDate || null,
    password: emp.password || emp.empNo || null,
  };
}

// ═══ 員工計算 ═══

export function tenure(startDate) {
  if (!startDate) return '';
  const s = new Date(startDate);
  const n = new Date();
  let y = n.getFullYear() - s.getFullYear();
  let m = n.getMonth() - s.getMonth();
  if (n.getDate() < s.getDate()) m--;
  if (m < 0) { y--; m += 12; }
  if (y > 0 && m > 0) return `${y}年${m}個月`;
  if (y > 0) return `${y}年`;
  if (m > 0) return `${m}個月`;
  return '未滿1個月';
}

export function monthsDiff(dateStr) {
  if (!dateStr) return 0;
  const d = new Date(dateStr);
  const n = new Date();
  return (n.getFullYear() - d.getFullYear()) * 12 + n.getMonth() - d.getMonth();
}

export function calcWorkHours(clockIn, clockOut) {
  if (!clockIn || !clockOut) return 0;
  const [h1, m1] = clockIn.split(':').map(Number);
  const [h2, m2] = clockOut.split(':').map(Number);
  let mins = (h2 * 60 + m2) - (h1 * 60 + m1);
  if (mins < 0) mins += 24 * 60; // 跨日
  return Math.round((mins / 60) * 10) / 10;
}
