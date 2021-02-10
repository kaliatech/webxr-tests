import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './views/HomeView.vue'
import Test01View from './views/Test01View.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/test01',
    name: 'Test01',
    component: Test01View,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
