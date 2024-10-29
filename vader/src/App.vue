<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BurgerMenu from './components/icons/BurgerMenu.vue';
import { onMounted, ref } from 'vue';

onMounted(() => {
  let locations = JSON.parse(localStorage.getItem("locations"))
  if (!locations) {
    locations = [{name:"mariehamn", position:{lat: 60, long:20}, default:true}]
    localStorage.setItem("locations", JSON.stringify(locations))
  }
})

const menuActive = ref(false)
</script>

<template>
  <header>
    <BurgerMenu @toggle-menu="menuActive = !menuActive" :active="menuActive"/>
    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink to="/locations">Locations</RouterLink>
      </nav>
    </div>
    
  </header>
  <RouterView />
</template>

<style scoped>
</style>
