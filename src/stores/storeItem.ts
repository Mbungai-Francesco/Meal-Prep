import type { Item } from "@/types";
import { useStorage } from "@vueuse/core";

export const useMeals = () => {
	const storeItems = useStorage<Item[]>(
		"my-itemss",
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

  const addItem =  (val : Item) =>{
    const ids = storeItems.value.map(v => v.id)
    if(ids.includes(val.id)) return false
    storeItems.value.push(val)
    return true
  }

  const deleteItem = (item: Item) =>{
    const index = storeItems.value.indexOf(item)
    if(index === -1) return false
    storeItems.value.splice(index, 1)
    return true
  }

  return {
    storeItems,
    addItem,
    deleteItem
  }
};
