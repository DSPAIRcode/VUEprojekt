<script setup>
import { inject, onMounted, ref } from 'vue';

const views = inject("HomeViews") 
  onMounted(() => {
  views.value++
})
const tid = ref(new Date().toLocaleString())
</script>

<template>
  <main>
    <p>
      när sidan laddades var klockan...
      {{ tid }}<br><br>

      denna sida har visats:
      <b>{{ views }}</b> gånger
    </p>
  </main>
</template>
