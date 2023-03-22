<script setup lang="ts">

defineProps<{
  dayNumber: number,
  isCurrentDay: boolean,
  isCurrentMonth: boolean,
  isSelected: boolean
}>()

</script>

<template>
  <li :class="{ 'day': true, 'day-selected': isSelected }">
    <span
      :class="{ 'day_number': true, 'day_number-other-month': !isCurrentMonth, 'day_number-current': isCurrentDay }">{{
        dayNumber }}</span>
  </li>
</template>

<style scoped lang="scss">
@import "../assets/scss/utils/index.scss";

.day {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: rem(10px);
  border: solid var(--light-bg-color);
  border-width: 0 0 rem(1px) rem(1px);
  padding: rem(10px);
  text-align: center;
  cursor: pointer;
  transition: background-color 250ms ease-in-out, color 25ms ease-in-out;

  &:hover,
  &-selected {
    background-color: var(--light-bg-color);
    color: var(--dark-text-color);

    & .day_number-current {
      color: var(--main-text-color);

      @media (prefers-color-scheme: light) {
        color: var(--ligth-text-color);
      }
    }
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

    @media (prefers-color-scheme: light) {
      opacity: .7;
    }
  }

  &_number {
    width: fit-content;
    padding: rem(3px);
    aspect-ratio: 1/1;
    border-radius: 100%;
    transition: background-color 250ms ease-in-out, color 250ms ease-in-out;

    @media (max-width: $small-mobile) {
      padding: rem(1px);
    }

    &-current {
      background-color: var(--primary-color);

      @media (prefers-color-scheme: light) {
        color: var(--dark-text-color);
      }
    }
  }
}
</style>