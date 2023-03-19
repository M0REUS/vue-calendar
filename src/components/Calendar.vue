<script setup lang="ts">
import Day from './Day.vue'
import { daysOfMonth } from '../helpers/calendarHelper'
import { ref, watch } from 'vue'

const props = defineProps<{
  month: number,
  year: number
}>()

const daysInThisMonth = ref<Array<{value: number, currentMonth: boolean}>>([]);
watch(props, newProps => daysInThisMonth.value = daysOfMonth(newProps.year, newProps.month), {immediate: true})

function getWeekDays(locale: string)
{
  let baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
  let weekDays = [];
  for(let i = 0; i < 7; i++)
  {
      weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'long' }));
      baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
}

const weekDays = getWeekDays('uk');

</script>

<template>
  <section class="calendar">
    <div class="wrapper">
      <ul class="list">
        <Day v-for="({value, currentMonth}, index) in daysInThisMonth" :dayNumber="value" :dayName="index <= 6 ? weekDays[index] : null" :isCurrentMonth="currentMonth" />
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "../assets/scss/utils/index.scss";

.wrapper {
  padding: rem(20px);
}
.list {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 1fr;
    border: solid var(--light-bg-color);
    border-width: rem(1px) rem(1px) 0 0;
}
</style>