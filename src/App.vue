<script setup lang="ts">
import Header from './components/Header.vue'
import Calendar from './components/Calendar.vue'
import { ref } from 'vue'

const month = ref(0);
const year = ref(0);

</script>

<template>
  <Header v-model:currentMonth="month" v-model:currentYear="year" />
  <Calendar :month="month" :year="year" />
</template>

<style scoped></style>
