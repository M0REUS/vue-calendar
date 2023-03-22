<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { getLocale } from '../helpers/calendarHelper';
import { getDate, setDate, incrMonth, decrMonth } from '../composables/useCalendar';

const locale = getLocale();

const date = getDate();
setDate(new Date());
const month = computed(() => new Date(date.year, date.month, date.day).toLocaleDateString(locale, { month: 'long' }));
const year = computed(() => date.year);

const changeMonth = (incrDecr: boolean) => incrDecr ? incrMonth() : decrMonth();
const today = () => {
  setDate(new Date());
  
};

</script>

<template>
  <header class="header">
    <h1 class="app-title">Vue Calendar</h1>
    <button class="today-btn" type="button" @click="today()">Today</button>
    <nav class="date-group">
      <button class="btn btn-prev" type="button" title="previous month" @click="changeMonth(false)"></button>
      <button class="select-month" type="button" title="select month">
        <span class="select-month_title">{{ month }} {{ year }}</span>
      </button>
      <button class="btn btn-next" type="button" title="next month" @click="changeMonth(true)"></button>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@import "../assets/scss/utils/index.scss";

.header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: rem(20px);
  padding: rem(20px);

  @media (max-width: $mobile) {
    padding-bottom: 0;
  }

  & .app-title {
    font-size: rem(30px);

    @media (max-width: $mobile) {
      font-size: rem(24px);
    }
  }

  & button {
    cursor: pointer;
  }

  & .today-btn {
    font-size: rem(16px);
    padding: rem(6px) rem(18px);
    border: rem(1px) solid var(--light-bg-color);
    transition: background-color 250ms ease-in-out, color 25ms ease-in-out;

    &:hover {
      background-color: var(--light-bg-color);
      color: var(--dark-text-color);
    }
  }

  & .date-group {
    display: flex;
    align-items: center;
    gap: rem(6px);

    @media (max-width: $mobile) {
      width: 100%;
      gap: rem(20px);
      justify-content: center;
    }
  }

  & .btn {
    border: solid var(--light-bg-color);
    border-width: rem(3px) rem(3px) 0 0;
    aspect-ratio: 1/1;
    width: rem(10px);
    transition: border-color 200ms ease-in-out;

    @media (max-width: $mobile) {
      width: rem(16px);
    }

    &:hover {
      border-color: var(--hover-primary-color);
    }

    &-prev {
      rotate: -135deg;
    }

    &-next {
      rotate: 45deg;
    }

  }

  & .select-month {
    min-width: rem(220px);

    @media (max-width: $mobile) {
      min-width: rem(180px);
    }

    &_title {
      text-transform: capitalize;
      font-size: rem(30px);

      @media (max-width: $mobile) {
        font-size: rem(24px);
      }
    }
  }
}</style>