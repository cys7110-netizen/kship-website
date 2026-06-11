// ═══ KST（韓國時區 UTC+9）工具函式 ═══

export function toKST() {
  return new Date(new Date().getTime() + 9 * 3600000);
}

export function getKSTTodayRange() {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 3600000);
  const startMs = Date.UTC(kst.getUTCFullYear(), kst.getUTCMonth(), kst.getUTCDate()) - 9 * 3600000;
  return { startMs, endMs: startMs + 86400000 };
}

export function getKSTDates() {
  const kst = new Date(new Date().getTime() + 9 * 3600000);
  const todayStr = kst.getUTCFullYear() + '-' +
    String(kst.getUTCMonth() + 1).padStart(2, '0') + '-' +
    String(kst.getUTCDate()).padStart(2, '0');
  const monthStr = kst.getUTCFullYear() + '-' +
    String(kst.getUTCMonth() + 1).padStart(2, '0');
  return { todayStr, monthStr };
}

export function isInRange(ts, startMs, endMs) {
  if (!ts) return false;
  const t = new Date(ts).getTime();
  return !isNaN(t) && t >= startMs && t < endMs;
}

export function pkgInRange(p, startMs, endMs) {
  return isInRange(p.scanned_at, startMs, endMs)
    || (!p.scanned_at && isInRange(p.created_at, startMs, endMs));
}

// ═══ 一般日期工具 ═══

export function getMonday(d) {
  const dt = new Date(d);
  const day = dt.getDay();
  const diff = dt.getDate() - day + (day === 0 ? -6 : 1);
  dt.setDate(diff);
  return dt.toISOString().slice(0, 10);
}

export function fmtDate(d) {
  return d.slice(0, 4) + '/' + d.slice(5, 7) + '/' + d.slice(8, 10);
}

export function weekLabel(mon) {
  const d = new Date(mon);
  const sun = new Date(d);
  sun.setDate(d.getDate() + 6);
  return (d.getMonth() + 1) + '/' + d.getDate() + ' ~ ' + (sun.getMonth() + 1) + '/' + sun.getDate();
}

export function dayLabels(mon) {
  const arr = [];
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  for (let i = 0; i < 7; i++) {
    const d = new Date(mon);
    d.setDate(d.getDate() + i);
    arr.push({
      d: d.toISOString().slice(0, 10),
      wd: weekDays[d.getDay()],
      dd: (d.getMonth() + 1) + '/' + d.getDate(),
    });
  }
  return arr;
}

export function daysLeft(d) {
  if (!d) return null;
  return Math.ceil((new Date(d) - new Date()) / 864e5);
}
