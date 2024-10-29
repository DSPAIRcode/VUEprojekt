<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="start-sida">
    <h1 class="Text1">Välkommen till Sten, Sax, Påse!</h1>
      <RouterLink to="/classic" class="KnappSSP">Classic</RouterLink>
      <RouterLink to="/info" class="KnappSSP">Information</RouterLink>
      <br>
  </div>
  <RouterView />
</template>

<style scoped>
.Text1 {
  color: aliceblue;
  background-color: white;
}
.start-sida {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.KnappSSP {
  background-color: rgb(255, 255, 255);
  width: 130px;
  padding: 1.5rem;
  margin: 1rem;
  border: 2px solid #000000;
  border-radius: 8px;
  cursor: pointer;
}

.KnappSSP:hover {
  background-color: rgb(189, 255, 211);
}
</style>
