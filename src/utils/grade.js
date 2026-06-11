import { GRADES } from '../config/constants';

export function getGradeInfo(k) {
  return GRADES.find((g) => g.k === k) || GRADES[0];
}

export function calcGrade(monthlyKg) {
  let grade = GRADES[0];
  for (let i = GRADES.length - 1; i >= 0; i--) {
    if (monthlyKg >= GRADES[i].min) {
      grade = GRADES[i];
      break;
    }
  }
  return grade;
}
