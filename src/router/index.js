import { createRouter, createWebHistory } from 'vue-router'
import CharactersView from '../views/CharactersView.vue'
import CharacterView from '../views/CharacterView.vue'

const routes = [
  {
    path: '/',
    component: CharactersView,
  },
  {
    path: '/characters/:pageNumber',
    name: 'characters',
    component: CharactersView,
    props: route => ({
      pageNumber: parseInt(route.params.pageNumber),
    }),  
  },
  {
    path: '/favorites',
    name: 'favorites',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "favorites" */ '../views/FavoritesView.vue')
  },
  {
    path: '/character/:id',
    name: 'character',
    component: CharacterView,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
