<script setup lang="ts">
import Day from './Day.vue';
import { ref, watch, computed, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { DaysList, getWeekDays, daysOfMonth } from '../helpers/calendarHelper';
import { useCalendarStore } from '../store/useCalendarStore';
import { DayEvent, fetchEvents } from '../helpers/eventsHelper';

const calendarStore = useCalendarStore();
const { month, year, selectedDay } = storeToRefs(calendarStore);
const { incrMonth, decrMonth } = calendarStore;

const daysInThisMonth = ref<DaysList>([]);
watch(calendarStore, newDate => daysInThisMonth.value = daysOfMonth(newDate.year, newDate.month), { immediate: true })
const weekDays = getWeekDays();

const dayEvents = ref<DayEvent[]>([]);

function isSelectedDay(index: number, curMonth: boolean) {
  if (!curMonth && index > 15) {
    decrMonth();
  }
  if (!curMonth && index < 15) {
    incrMonth();
  }
  if (selectedDay.value === index) {
    selectedDay.value = -1;
  } else {
    selectedDay.value = index;
  }
}

const isCurrentDay = computed<{ day: number, date: boolean }>(() => {
  const currentDate = new Date();
  return { day: currentDate.getDate(), date: currentDate.getMonth() === month.value && currentDate.getFullYear() === year.value };
});

const tName = ref('')

watch([year, month], ([newYear, newMonth], [oldYear, oldMonth]) => {
  /* used nested If
  if(newYear != oldYear) {
    if(newYear > oldYear) {
      tName.value = 'lslide';
    } else {
      tName.value = 'rslide';
    }
  } else {
    if(newMonth > oldMonth) {
      tName.value = 'lslide';
    } else {
      tName.value = 'rslide';
    }
  }
  */
  if (newYear < oldYear) {
    return tName.value = 'rslide';
  }
  if (newYear > oldYear || newMonth > oldMonth) {
    return tName.value = 'lslide';
  } else {
    return tName.value = 'rslide';
  }
})

watchEffect(() => {
  fetchEvents(year.value, month.value).then((events) => dayEvents.value = events);
})

function filterDayEvents(day: number, isCurrentMonth: boolean) {
  // const eventDay = dayEvents.date
  if (!isCurrentMonth) return [];
  console.log(day);
  console.log("dayEvents", dayEvents.value);
  const filteredEvents = dayEvents.value
    .filter((event) => (new Date(event.date)).getDate() === day)
    .sort((a, b) => new Date(a.date + " " + a.time).valueOf() - new Date(b.date + " " + b.time).valueOf());
  console.log(filteredEvents);
  return filteredEvents;
}
</script>

<template>
  <section class="calendar">
    <div class="wrapper">
      <ul class="day-name-list">
        <li class="day-name" v-for="name in weekDays">{{ name }}</li>
      </ul>
      <div class="slide-container">
        <Transition :name="tName">
          <ul :key="month + '.' + year" class="day-list">
            <Day v-for="({ value, currentMonth }, index) in daysInThisMonth" :dayNumber="value"
              :isCurrentMonth="currentMonth"
              :isCurrentDay="isCurrentDay.day === value && isCurrentDay.date && currentMonth"
              :isSelected="selectedDay === value && currentMonth"
              v-memo="[selectedDay === value && currentMonth, month, year, dayEvents]"
              :dayEvents="filterDayEvents(value, currentMonth)" @click="isSelectedDay(value, currentMonth)" />
          </ul>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "../assets/scss/utils/index.scss";

.calendar {
  height: 100%;

}

.wrapper {
  height: 100%;
  // min-height: rem(581px);
  padding: rem(20px) rem(20px) rem(40px);
  display: flex;
  flex-direction: column;
}

.slide-container {
  height: 100%;
  overflow-x: clip;
  position: relative;
}

.day-name-list {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;
  padding-bottom: rem(10px);
  flex-grow: 0;

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
  height: 100%;
  min-height: rem(510px);
  max-height: calc(100dvh - rem(176px));
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(rem(100px), 1fr);
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