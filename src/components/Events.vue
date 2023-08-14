<script setup lang="ts">
import { DayEvent } from '../helpers/eventsHelper';

defineProps<{
  dayEvent: DayEvent
}>()

</script>

<template>
  <li class="day_event">{{ dayEvent.event }}</li>
</template>

<style lang="scss" scoped>
@import "../assets/scss/utils/index.scss";
  .day_event {
    background-color: var(--primary-color);
    color: var(--main-text-color);
    border-radius: rem(4px);
    padding: 0 rem(6px);
  }
</style>