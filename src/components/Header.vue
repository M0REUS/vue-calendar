<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { getLocale } from '../helpers/calendarHelper';

defineProps<{
  currentMonth: number,
  currentYear: number
}>();

const locale = getLocale();

const date = ref<Date>(new Date());
const month = computed(() => date.value.toLocaleDateString(locale, {month: 'long'}));
const year = computed(() => date.value.getFullYear());

const changeMonth = (incrDecr: boolean) => date.value = new Date(date.value.setMonth(date.value.getMonth() + (incrDecr ? 1 : -1)))
const today = () => date.value = new Date();

const emits = defineEmits(['update:currentMonth', 'update:currentYear'])

watch(() => date.value.getMonth(), (currentMonth) => emits("update:currentMonth", currentMonth), {immediate: true});
watch(() => date.value.getFullYear(), (currentYear) => emits("update:currentYear", currentYear), {immediate: true});

</script>

<template>
  <header class="header">
    <h1 class="app-title">Vue Calendar</h1>
    <button class="today-btn" type="button" @click="today()">Today</button>
    <nav class="btn-group">
      <button class="btn btn-prev" type="button" title="previous month" @click="changeMonth(false)"></button>
      <button class="btn btn-next" type="button" title="next month" @click="changeMonth(true)"></button>
    </nav>
    <button class="select-month" type="button" title="select month">
      <span class="select-month_title">{{ month }} {{ year }}</span>
    </button>
  </header>
</template>

<style scoped lang="scss">
@import "../assets/scss/utils/index.scss";
.header {
  display: flex;
  align-items: center;
  gap: rem(20px);
  padding: rem(20px);
  & .app-title {
    font-size: rem(30px);
  }
  & button {
    cursor: pointer;
    font-size: rem(30px);
  }
  & .today-btn {
    font-size: rem(16px);
    padding: rem(6px) rem(18px);
    border: rem(1px) solid var(--light-bg-color);
  }

  & .btn {
    border: solid var(--light-bg-color);
    border-width: rem(3px) rem(3px) 0 0;
    aspect-ratio: 1/1;
    width: rem(10px);
    &-prev {
      rotate: -135deg;
      margin-right: rem(6px);
    }
    &-next {
      rotate: 45deg;
    }

  }

  & .select-month {
    &_title {
      text-transform: capitalize;
    }
  }
}
</style>