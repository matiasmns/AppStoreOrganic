import { createRouter, createWebHistory } from 'vue-router'
import FoodMenu from '../components/FoodMenu.vue'
import RecipesPage from '../components/RecipesPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/foodmenu' // Redirect to FoodMenu
  },
  {
    path: '/foodmenu',
    name: 'FoodMenu',
    component: FoodMenu
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: RecipesPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router