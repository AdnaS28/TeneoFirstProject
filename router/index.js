import { createRouter, createWebHistory } from 'vue-router'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../Views/Forecast.vue')
  },
  
  {
    path: '/login',
    name: 'Login ',
    component: () => import('../Views/Login.vue')
  },
  
  {
    path: '/register',
    name: 'Register ',
    component: () => import('../Views/Register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})


export default router

