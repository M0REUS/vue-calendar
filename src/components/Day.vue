<script setup lang="ts">

defineProps<{
  dayNumber: number,
  dayName: string | null,
  isCurrentMonth: boolean
}>()

</script>

<template>
  <li class="calendar_item">
    <span class="day-name" v-if="!!dayName">{{ dayName }}</span>
    <span :class="`day-number ${!isCurrentMonth ? 'day-number-other-month' : ''}`" >{{ dayNumber }}</span>
  </li>
</template>

<style scoped lang="scss">
@import "../assets/scss/utils/index.scss";
.calendar_item {
    display: flex;
    flex-direction: column;
    gap: rem(10px);
    border: solid var(--light-bg-color);
    border-width: 0 0 rem(1px) rem(1px);
    padding: rem(10px);
}

.day {
  &-name {
    text-transform: capitalize;
    opacity: .6;
    font-size: rem(14px);
  }
  &-number-other-month {
    opacity: .6;
  }
}
</style>