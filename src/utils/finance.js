// ═══ 稅金計算 ═══
export function calcTax(amount) {
  const incomeTax = Math.round(amount * 0.03);
  const localTax = Math.round(amount * 0.003);
  return {
    incomeTax,
    localTax,
    total: incomeTax + localTax,
    net: amount - incomeTax - localTax,
  };
}
