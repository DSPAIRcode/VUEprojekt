import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Använd BASE_URL från Vite
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../App.vue') // Startsidan
    },
    {
        path: '/info',
        name: 'info',
        component: () => import('../Views/InfoSida.vue') // infosida
      },
    {
      path: '/classic',
      name: 'classic',
      component: () => import('../Views/SpelSida.vue'), // Dynamisk import för spelet
      meta: { title: 'Classic Sten, Sax, Påse' } // Lägg till titel för spelet
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../components/NoShow.vue'), // En vy för ogiltiga vägar om det behövs
      meta: { title: 'Page Not Found' }
    }
  ]
});

// Dynamiskt ändra sidtiteln baserat på routens meta-data
router.beforeEach((to) => {
  document.title = to.meta?.title ?? "Sten, Sax, Påse"; // Standardtitel
});

export default router;
