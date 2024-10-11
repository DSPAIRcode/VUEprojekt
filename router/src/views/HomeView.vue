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
    <ul>
        två till synes lika länkar som fungerar på olika sätt:
        <li>
          <a href="/my">My view</a>
        </li>
        <li>
          <RouterLink to="/my">My view</RouterLink>
        </li>
      </ul>
  </main>
</template>
