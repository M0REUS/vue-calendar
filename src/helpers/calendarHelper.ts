export type DaysList = {
  value: number,
  currentMonth: boolean
}[];

export function daysOfMonth (year: number, month:number): DaysList {
  const startOfMonth = new Date(year, month);
  const endOfMonth = new Date(year, month + 1, 0);

  console.log(startOfMonth);
  console.log(endOfMonth);

  const daysInThisMonth: DaysList = [];

  for(let i = 1; i <= endOfMonth.getDate(); i++) {
    daysInThisMonth.push({value: i, currentMonth: true});
  }

  while(startOfMonth.getDay() != 1) {
    startOfMonth.setDate(startOfMonth.getDate() - 1);
    daysInThisMonth.unshift({value: startOfMonth.getDate(), currentMonth: false})
  }

  while(endOfMonth.getDay() != 0) {
    endOfMonth.setDate(endOfMonth.getDate() + 1);
    daysInThisMonth.push({value: endOfMonth.getDate(), currentMonth: false});
  }

  return daysInThisMonth;
}