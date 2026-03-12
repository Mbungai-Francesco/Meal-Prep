import type { Item, ItemDto } from "@/types";
import { useStorage } from "@vueuse/core";

export const useItems = () => {
	const items = useStorage<Item[]>("my-itemss", [], undefined, {
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

	const addItem = (val: ItemDto) => {
		const newId = val.name.split(" ").join("").toLowerCase();
		const res: Item = { ...val, id: newId };

		const ids = items.value.map((v) => v.id);
		if (ids.includes(res.id)) return false;
		items.value.push(res);
		return true;
	};

	const deleteItem = (item: Item) => {
		const index = items.value.indexOf(item);
		if (index === -1) return false;
		items.value.splice(index, 1);
		return true;
	};

	return {
		items,
		addItem,
		deleteItem,
	};
};
