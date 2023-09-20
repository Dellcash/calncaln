<script setup>
import { RouterView } from 'vue-router'
import TheCalendar from './components/TheCalendar.vue'
</script>

<template>
  <TheCalendar />
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />
  </header>

  <RouterView />
</template>