import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'admin',
      component:AdminView,
    },
    {
      path:'/weather/:id?',
      name:'city',
      component:()=>import('@/views/SingleCity.vue')
    }
  ]
})

export default router
