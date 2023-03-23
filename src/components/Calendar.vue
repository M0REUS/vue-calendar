<script setup lang="ts">
import Day from './Day.vue'
import { ref, watch, computed } from 'vue'
import { DaysList, getWeekDays, daysOfMonth } from '../helpers/calendarHelper'
import { useCalendarStore } from '../store/useCalendarStore'

const date = useCalendarStore();


const daysInThisMonth = ref<DaysList>([]);
watch(date, newDate => daysInThisMonth.value = daysOfMonth(newDate.year, newDate.month), { immediate: true })
const weekDays = getWeekDays();

function isSelectedDay(index: number, curMonth: boolean) {
  if (!curMonth && index > 15) {
    date.decrMonth();
  }
  if (!curMonth && index < 15) {
    date.incrMonth();
  }
  if (date.selectedDay === index) {
    date.selectedDay = -1;
  } else {
    date.selectedDay = index;
  }
}

const isCurrentDay = computed<{ day: number, date: boolean }>(() => {
  const currentDate = new Date();
  return { day: currentDate.getDate(), date: currentDate.getMonth() === date.month && currentDate.getFullYear() === date.year };
});

</script>

<template>
  <section class="calendar">
    <div class="wrapper">
      <ul class="day-name-list">
        <li class="day-name" v-for="name in weekDays">{{ name }}</li>
      </ul>
      <ul class="day-list">
        <Day v-for="({ value, currentMonth }, index) in daysInThisMonth" :dayNumber="value" :isCurrentMonth="currentMonth"
          :isCurrentDay="isCurrentDay.day === value && isCurrentDay.date && currentMonth"
          :isSelected="date.selectedDay === value && currentMonth" @click="isSelectedDay(value, currentMonth)" />
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "../assets/scss/utils/index.scss";

.wrapper {
  padding: rem(20px);
}

.day-name-list {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;
  padding-bottom: rem(10px);

  & .day-name {
    text-align: center;
    text-transform: capitalize;
    opacity: .6;
    font-size: rem(14px);

    @media (prefers-color-scheme: light) {
      opacity: .7;
    }
  }
}

.day-list {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;
  border: solid var(--invert-bg-color);
  border-width: rem(1px) rem(1px) 0 0;

  @media (max-width: $mobile) {
    border-width: rem(1px) 0 0 0;
    padding-top: rem(10px);
    gap: rem(10px);
  }

  @media (max-width: $small-mobile) {
    gap: rem(3px);
  }
}
</style>