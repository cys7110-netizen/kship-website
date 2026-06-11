import { getGradeInfo } from './grade';

// ═══ 預設運費費率 ═══
export const DEFAULT_SHIP_RATES = {
  transit: {
    label: '轉機', icon: '✈️🔄',
    cats: [
      {
        name: '不分貨',
        under5: { firstNTD: 325, nextNTD: 205, firstKRW: 14300, nextKRW: 9500 },
        over5: { perNTD: 205, perKRW: 9500 },
      },
      {
        name: '純衣服',
        under5: { firstNTD: 315, nextNTD: 195, firstKRW: 13800, nextKRW: 9000 },
        over5: { perNTD: 195, perKRW: 9000 },
      },
    ],
    boxFee: { ntd: 40, krw: 2000 },
    boxes: [
      { name: '1號箱', size: '80×50×63', volKg: 42, minKg: 38 },
      { name: '2號箱', size: '70×50×58', volKg: 34, minKg: 30 },
      { name: '3號箱', size: '60×45×53', volKg: 24, minKg: 20 },
    ],
    note: '1~3號箱有最低計費重量，3號箱以下依實際重量',
    rules: '帶電商品可寄送',
  },
  direct: {
    label: '直飛', icon: '✈️',
    cats: [
      {
        name: '不分貨',
        under5: { firstNTD: 335, nextNTD: 215, firstKRW: 14800, nextKRW: 10000 },
        over5: { perNTD: 215, perKRW: 10000 },
      },
    ],
    boxFee: { ntd: 40, krw: 2000 },
    boxes: [
      { name: '1號箱', size: '80×50×63', volKg: 42 },
      { name: '2號箱', size: '70×50×58', volKg: 34 },
      { name: '3號箱', size: '60×45×53', volKg: 24 },
      { name: '4號箱', size: '60×40×43', volKg: 17 },
      { name: '5號箱', size: '50×35×36', volKg: 11 },
      { name: '6號箱', size: '45×33×30', volKg: 7 },
    ],
    note: '一律依材積重量計算',
    rules: '帶電商品無法寄送',
  },
  sea: {
    label: '海運', icon: '🚢',
    cats: [
      {
        name: '一般貨物',
        under5: { firstNTD: 0, nextNTD: 0, firstKRW: 0, nextKRW: 0 },
        over5: { perNTD: 0, perKRW: 0 },
      },
    ],
    boxFee: { ntd: 0, krw: 0 },
    boxes: [],
    note: '尚未開放',
    rules: '',
  },
};

// ═══ 運費試算 ═══
export function calcShipCost(method, weightKg, grade, catIdx, ratesOverride) {
  const rates = ratesOverride || DEFAULT_SHIP_RATES;
  const r = rates[method];
  if (!r || !r.cats || r.cats.length === 0) return null;

  const cat = r.cats[catIdx || 0] || r.cats[0];
  const kg = Math.ceil(weightKg * 10) / 10;
  if (kg <= 0) return null;

  const gi = getGradeInfo(grade || '一般');

  let baseNTD = 0;
  let baseKRW = 0;

  if (kg < 5) {
    // 首重 + 續重 × (kg - 1)
    const extra = Math.max(0, Math.ceil(kg) - 1);
    baseNTD = (cat.under5.firstNTD || 0) + extra * (cat.under5.nextNTD || 0);
    baseKRW = (cat.under5.firstKRW || 0) + extra * (cat.under5.nextKRW || 0);
  } else {
    // 5kg 以上：每公斤
    baseNTD = Math.round((cat.over5.perNTD || 0) * kg);
    baseKRW = Math.round((cat.over5.perKRW || 0) * kg);
  }

  // VIP 折扣只套用 NT$
  const discNTD = Math.round(gi.discount * kg);
  const finalNTD = Math.max(0, baseNTD - discNTD);

  return {
    method: r.label,
    cat: cat.name,
    weightKg: kg,
    ntd: { base: baseNTD, discount: discNTD, final: finalNTD },
    krw: { base: baseKRW, final: baseKRW },
    gradeDiscount: gi.discount,
    isUnder5: kg < 5,
    pricing: kg < 5
      ? { firstNTD: cat.under5.firstNTD, nextNTD: cat.under5.nextNTD, firstKRW: cat.under5.firstKRW, nextKRW: cat.under5.nextKRW }
      : { perNTD: cat.over5.perNTD, perKRW: cat.over5.perKRW },
  };
}
