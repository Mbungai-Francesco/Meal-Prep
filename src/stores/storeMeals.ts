import type { Meal } from "@/types";
import { useStorage } from "@vueuse/core";

export const useMeals = () => {
	const storeMeals = useStorage<Meal[]>(
		"my-meals",
    [],
		undefined,
		{
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
		},
	);

  const addMeal =  (val : Meal) =>{
    const ids = storeMeals.value.map(v => v.id)
    if(ids.includes(val.id)) return false
    storeMeals.value.push(val)
    return true
  }

  const deleteMeal = (meal: Meal) =>{
    const index = storeMeals.value.indexOf(meal)
    if(index === -1) return false
    storeMeals.value.splice(index, 1)
    return true
  }

  return {
    storeMeals,
    addMeal,
    deleteMeal
  }
};
