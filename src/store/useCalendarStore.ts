import { defineStore } from 'pinia';

export const useCalendarStore = defineStore('calendarStore', {
  state() {
    return {
      year: 0,
      month: 0,
      day: 0,
      selectedDay: -1
    }
  },
  getters: {
    getDate(state) {
      return new Date(state.year, state.month, state.day);
    }
  },
  actions: {
    incrMonth() {
      const newDate = new Date(this.year, this.month, this.day);
      newDate.setMonth(newDate.getMonth() + 1);
      this.setDate(newDate);
    },
    decrMonth() {
      const newDate = new Date(this.year, this.month, this.day);
      newDate.setMonth(newDate.getMonth() - 1);
      this.setDate(newDate);
    },
    incrYear() {
      const newDate = new Date(this.year, this.month, this.day);
      newDate.setFullYear(newDate.getFullYear() + 1);
      this.setDate(newDate);
    },
    decrYear() {
      const newDate = new Date(this.year, this.month, this.day);
      newDate.setFullYear(newDate.getFullYear() - 1);
      this.setDate(newDate);
    },
    setDate(date: Date) {
      this.day = date.getDate();
      this.month = date.getMonth();
      this.year = date.getFullYear();
    },
    setToday() {
      this.setDate(new Date());
    },
    setMonth(month: number) {
      this.setDate(new Date(this.year, month, this.day));
    },
    setYear(year: number) {
      this.setDate(new Date(year, this.month, this.day));
    }
  }
})