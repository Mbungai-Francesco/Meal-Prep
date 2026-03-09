import { createRouter, createWebHistory } from "vue-router"

import Meals from "../views/Meals.vue"

const routes = [
  {
    path: "/",
    name: "Meals",
    component: Meals
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router