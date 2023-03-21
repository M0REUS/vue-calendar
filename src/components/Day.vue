<script setup lang="ts">

defineProps<{
  dayNumber: number,
  isCurrentMonth: boolean
}>()

</script>

<template>
  <li class="day">
    <span :class="`day_number ${!isCurrentMonth ? 'day_number-other-month' : ''}`">{{ dayNumber }}</span>
  </li>
</template>

<style scoped lang="scss">
@import "../assets/scss/utils/index.scss";

.day {
  display: flex;
  flex-direction: column;
  gap: rem(10px);
  border: solid var(--light-bg-color);
  border-width: 0 0 rem(1px) rem(1px);
  padding: rem(10px);
  text-align: center;
  cursor: pointer;
  transition: background-color 250ms ease-in-out, color 250ms ease-in-out;
  &:hover {
    background-color: var(--light-bg-color);
    color: var(--dark-text-color);
  }

  @media (max-width: $mobile) {
    justify-content: center;
    align-items: center;
    border-width: rem(1px) rem(1px) rem(1px) rem(1px);
    border-radius: 100%;
    aspect-ratio: 1/1;
    padding: rem(3px);
  }

  &_number-other-month {
    opacity: .6;
  }
}
</style>