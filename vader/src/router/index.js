import ForecastView from '@/views/ForecastView.vue'
import LocationView from '@/views/LocationView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ForecastView,
    },
    {
      path: "/locations",
      name: "locations",
      component: LocationView,
    }
  ],
})

export default router
