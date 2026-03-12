<script setup lang="ts">
import { useItems } from "@/stores/storeItem";
import { useMeals } from "@/stores/storeMeals";
import { computed } from "vue";

const { items } = useItems();
const { meals } = useMeals();

// Count how many meals each item appears in
const itemUsage = computed(() => {
	const counts = new Map<string, { name: string; count: number; meals: string[] }>();

	for (const meal of meals.value) {
		for (const ingredient of meal.items) {
			const id = ingredient.item.id;
			if (!counts.has(id)) {
				counts.set(id, { name: ingredient.item.name, count: 0, meals: [] });
			}
			const entry = counts.get(id)!;
			entry.count++;
			entry.meals.push(meal.name);
		}
	}

	return [...counts.entries()]
		.sort((a, b) => b[1].count - a[1].count)
		.map(([id, data]) => ({ id, ...data }));
});

// Items that aren't used in any meal
const unusedItems = computed(() => {
	const usedIds = new Set(
		meals.value.flatMap((m) => m.items.map((i) => i.item.id))
	);
	return items.value.filter((item) => !usedIds.has(item.id));
});

// Meal summaries: ingredient count and total weight
const mealSummaries = computed(() => {
	return meals.value.map((meal) => {
		const ingredientCount = meal.items.length;
		const totalWeight = meal.items.reduce((sum, ing) => {
			return sum + (ing.weight ?? 0);
		}, 0);
		return {
			id: meal.id,
			name: meal.name,
			localName: meal.localName,
			ingredientCount,
			totalWeight,
		};
	});
});

// Average ingredients per meal
const avgIngredients = computed(() => {
	if (meals.value.length === 0) return 0;
	const total = meals.value.reduce((sum, m) => sum + m.items.length, 0);
	return (total / meals.value.length).toFixed(1);
});
</script>

<template>
	<div class="w-full h-fit p-6 gap-8 flex flex-col ">
		<h1 class="text-3xl font-bold">Stats</h1>

		<!-- Overview cards -->
		<div class="grid grid-cols-3 gap-4">
			<div class="bg-blue-50 rounded-2xl p-4 text-center">
				<p class="text-4xl font-bold text-blue-600">{{ items.length }}</p>
				<p class="text-sm text-gray-500 mt-1">Total Items</p>
			</div>
			<div class="bg-green-50 rounded-2xl p-4 text-center">
				<p class="text-4xl font-bold text-green-600">{{ meals.length }}</p>
				<p class="text-sm text-gray-500 mt-1">Total Meals</p>
			</div>
			<div class="bg-purple-50 rounded-2xl p-4 text-center">
				<p class="text-4xl font-bold text-purple-600">{{ avgIngredients }}</p>
				<p class="text-sm text-gray-500 mt-1">Avg Ingredients / Meal</p>
			</div>
		</div>

		<!-- Most used items -->
		<section class="flex flex-col h-[80vh] overflow-hidden shadow-lg p-4 rounded-lg">
			<h2 class="text-2xl font-semibold mb-3">Most Used Items</h2>
			<div class="flex flex-col grow gap-2 overflow-y-auto">
        <p v-if="itemUsage.length === 0" class="text-gray-400">No data yet.</p>
				<div
					v-for="(entry, index) in itemUsage"
					:key="entry.id"
					class="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm"
				>
					<span class="text-lg font-bold text-gray-400 w-8 text-right">{{ index + 1 }}</span>
					<div class="flex-1">
						<p class="font-semibold">{{ entry.name }}</p>
						<p class="text-sm text-gray-400">
							Used in: {{ entry.meals.join(", ") }}
						</p>
					</div>
					<span class="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold">
						{{ entry.count }} {{ entry.count === 1 ? "meal" : "meals" }}
					</span>
				</div>
			</div>
		</section>

		<!-- Meal summaries -->
		<section>
			<h2 class="text-2xl font-semibold mb-3">Meal Overview</h2>
			<p v-if="mealSummaries.length === 0" class="text-gray-400">No meals yet.</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-3" v-else>
				<div
					v-for="meal in mealSummaries"
					:key="meal.id"
					class="bg-white rounded-xl p-4 shadow-sm"
				>
					<p class="font-semibold text-lg">{{ meal.name }}</p>
					<p v-if="meal.localName" class="text-sm text-gray-400 italic">{{ meal.localName }}</p>
					<div class="flex gap-4 mt-2 text-sm">
						<span class="bg-green-100 text-green-700 rounded-full px-3 py-1 font-semibold">
							{{ meal.ingredientCount }} ingredients
						</span>
						<span
							v-if="meal.totalWeight > 0"
							class="bg-orange-100 text-orange-700 rounded-full px-3 py-1 font-semibold"
						>
							{{ meal.totalWeight }}g total
						</span>
					</div>
				</div>
			</div>
		</section>

		<!-- Unused items -->
		<section v-if="unusedItems.length > 0">
			<h2 class="text-2xl font-semibold mb-3">Unused Items</h2>
			<p class="text-sm text-gray-400 mb-2">These items aren't in any meal yet.</p>
			<div class="flex flex-wrap gap-2">
				<span
					v-for="item in unusedItems"
					:key="item.id"
					class="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-sm"
				>
					{{ item.name }}
				</span>
			</div>
		</section>
	</div>
</template>
