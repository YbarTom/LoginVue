// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/store/app';

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/components/Login.vue'),
    
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/components/Dashboard.vue'),
    props: {},
    beforeEnter: (to, from, next) => {
      const store = useAppStore();

      // Verificar si el usuario está autenticado
      if (store.isLoggedIn()) {
        next(); // El usuario está autenticado, permitir el acceso
      } else {
        next('/'); // El usuario no está autenticado, redirigir a la página de inicio de sesión
      }
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})



export default router
