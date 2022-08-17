<script setup lang="ts">
import { NDivider } from "naive-ui";
import About from '../components/About.vue'
import Intro from '../components/Intro.vue'
</script>

<template>
  <main style="max-width: 50vw; margin:auto;">
    <About />
    <n-divider />
    <Intro id="faq" />
  </main>
</template>
