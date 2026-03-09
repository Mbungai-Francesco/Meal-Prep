import { createRouter, createWebHistory } from "vue-router";

import Meals from "../views/Meals.vue";
import Items from "../views/Items.vue";
import Meal from "@/views/Meal.vue";

const routes = [
	{
		path: "/",
		name: "Meals",
		component: Meals,
	},
	{
		path: "/Items",
		name: "Items",
		component: Items,
	},
	{
		path: "/:id",
		component: Meal,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
