import type { Ingredient, Meal, MealDto } from "@/types";
import { useStorage } from "@vueuse/core";
import type { Reactive } from "vue";

export const useMeals = () => {
	const meals = useStorage<Meal[]>("my-meals", [], undefined, {
		// Watch for deep changes in objects/arrays (default: true)
		deep: true,
		// Sync across tabs via storage events (default: true)
		listenToStorageChanges: true,
		// Write default value to storage if not present (default: true)
		writeDefaults: true,
		// Use shallowRef instead of ref (default: false)
		shallow: false,
		// Initialize only after component is mounted (default: false)
		initOnMounted: false,
		// Custom error handler (default: console.error)
		onError: (e) => console.error(e),
		// Watch flush timing (default: 'pre')
		flush: "pre",
	});

	const addMeal = (val: MealDto, selected : Reactive<Ingredient[]>) => {
		const newId = val.name.split(" ").join("").toLowerCase();
		const res: Meal = { ...val, id: newId, items: selected };

		const ids = meals.value.map((v) => v.id);
		if (ids.includes(res.id)) return false;
		meals.value.push(res);
		return true;
	};

	const updateMeal = (meal: Meal) => {
		const index = meals.value.findIndex((m) => m.id === meal.id);
		if (index === -1) return false;
		meals.value[index] = meal;
		return true;
	};

	const deleteMeal = (id : string) => {
		const res = meals.value.filter((v) => v.id !== id)
		meals.value = [...res]
	};

	return {
		meals,
		addMeal,
		deleteMeal,
		updateMeal,
	};
};
