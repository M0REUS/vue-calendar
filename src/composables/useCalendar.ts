/*
  This component doesn't use in code, this is just reference for replacement state managment in small projects
*/

import { reactive } from "vue";

const date = reactive({
  day: 0,
  month: 0,
  year: 0
})

export function setDate(newDate: Date): Date {
  date.day = newDate.getDate();
  date.month = newDate.getMonth();
  date.year = newDate.getFullYear();
  return newDate;
}

export function getDate() {
  return date;
}

export function getDateObj() {
  return new Date(date.year, date.month, date.day)
}

export function incrMonth() {
  const newDate = new Date(date.year, date.month, date.day);
  newDate.setMonth(newDate.getMonth() + 1);
  return setDate(newDate);
}

export function decrMonth() {
  const newDate = new Date(date.year, date.month, date.day);
  newDate.setMonth(newDate.getMonth() - 1);
  return setDate(newDate);
}

export function incrYear() {
  const newDate = new Date(date.year, date.month, date.day);
  newDate.setFullYear(newDate.getFullYear() + 1);
  return setDate(newDate);
}

export function decrYear() {
  const newDate = new Date(date.year, date.month, date.day);
  newDate.setFullYear(newDate.getFullYear() - 1);
  return setDate(newDate);
}