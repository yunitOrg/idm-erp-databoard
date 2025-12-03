export function getCurrentWeekNumber(startDate='2025-11-24') {
  const start = new Date(startDate);
  const now = new Date();
  
  // 清空时间部分，只比较日期
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  // 计算天数差
  const timeDiff = now.getTime() - start.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
  // 计算周数（第一周是0-6天，第二周是7-13天，以此类推）
  const weekNumber = Math.floor(dayDiff / 7) + 1;
  return weekNumber;
}
export function getProcessColor(value) {
  let color = ['#EF4444', '#00B78E'];
  if(!value || value == '%') {
    return color[0];
  }
  if(parseFloat(value) >= 100) {
    return color[1];
  } else {
    return color[0];
  }
}
export function getGapValueColor(value) {
  let color = ['#EF4444', '#00B78E'];
  if(!value) {
    return color[1]
  }
  if(Number(value) > 0) {
    return color[1];
  } else {
    return color[0];
  }
}