export type DaysList = {
  value: number,
  currentMonth: boolean
}[];

export const getLocale = () => navigator.language; //gets browser language

export function daysOfMonth(year: number, month: number): DaysList {
  const startOfMonth = new Date(year, month);
  const endOfMonth = new Date(year, month + 1, 0);

  const daysInThisMonth: DaysList = [];

  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    daysInThisMonth.push({ value: i, currentMonth: true });
  }

  while (startOfMonth.getDay() != 1) {
    startOfMonth.setDate(startOfMonth.getDate() - 1);
    daysInThisMonth.unshift({ value: startOfMonth.getDate(), currentMonth: false })
  }

  while (endOfMonth.getDay() != 0) {
    endOfMonth.setDate(endOfMonth.getDate() + 1);
    daysInThisMonth.push({ value: endOfMonth.getDate(), currentMonth: false });
  }

  return daysInThisMonth;
}

export function getWeekDays(): string[] {
  const isMobile = window.matchMedia("(max-width: 767px)").matches; //checks if it is mobile or desktop
  const locale = getLocale();
  let baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
  let weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(baseDate.toLocaleDateString(locale, { weekday: isMobile ? 'short' : 'long' }));
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
}