<script setup lang="ts">
import Calendar from './components/Calendar.vue'
import { ref } from 'vue'

const month = ref(new Date().getMonth());
const year = ref(new Date().getFullYear());

</script>

<template>
  <h2>{{ month }}</h2>
  <button @click="month++">+</button>
  <button @click="month--">-</button>
  <Calendar :month="month" :year="year" />
</template>

<style scoped></style>
