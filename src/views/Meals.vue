<script setup lang="ts">
import {
	Units,
	type Ingredient,
	type Item,
	type ItemDto,
	type Meal,
	type MealDto,
} from "@/types";
import { computed, reactive, ref } from "vue";
import { X } from "lucide-vue-next";
import { useMeals } from "@/stores/storeMeals";
import { useItems } from "@/stores/storeItem";

const { meals, addMeal } = useMeals()
const { items, addItem } = useItems()

const selectedItem = ref<Item>();
const ingre = ref<Ingredient>({
	quantity: 0,
	item: { id: "", name: "" },
	// weight: 0,
});
const newItem = ref<ItemDto>({
	name: "",
});
const meal = reactive<MealDto>({
	name: "",
	localName: "",
	items: [],
});
const selected = reactive<Array<Ingredient>>([
	// {
	// 	quantity: 2,
	// 	weight: 200,
	// 	unit: Units.GRAMS,
	// 	item: { id: "618f2302-ee66-42a0-b040-355ce01e7afg", name: "Lentil" },
	// },
	// {
	// 	quantity: 3,
	// 	unit: Units.TBSP,
	// 	item: { id: "618f2302-ee66-42a0-b040-355ce01e7afh", name: "Wine Vinegar" },
	// },
	// {
	// 	quantity: 1,
	// 	item: { id: "618f2302-ee66-42a0-b040-355ce01e7aff", name: "Red Onion" },
	// },
]);

// const items = reactive<Array<Item>>([
// 	{ id: "0c65aab2-39a1-4045-9160-bf1eeaba840c", name: "a" },
// 	{ id: "e7af018c-3a1f-4e91-bdcc-65a6b8a819ea", name: "b" },
// 	{ id: "286657b9-5703-4753-a393-036a74a08b41", name: "c" },
// 	{ id: "9f8ef973-7908-4d26-9d1e-4f5dbf23694d", name: "d" },
// 	{ id: "618f2302-ee66-42a0-b040-355ce01e7af7", name: "e" },
// ]);

// const meals = reactive<Array<Meal>>([]);

const addToSelected = (id: string) => {
	const inItems = filtered.value
	const num = inItems.findIndex((v) => v.id === id);
	const val = inItems[num] ? inItems[num] : null;

	if (val) {
		// inItems.splice(num, 1);
		selected.push({ ...ingre.value, item: val });

		selectedItem.value = undefined;
		ingre.value = {
			quantity: 0,
			weight: 0,
			item: { id: "", name: "" },
		};
	}
};

const removeApp = (id: string) => {
	const num = selected.findIndex((v) => v.item.id === id);
	const ingredient = selected[num] ? selected[num] : null;

	if (ingredient) {
		selected.splice(num, 1);
		// items.push(ingredient.item);
	}
};

const filtered = computed(() => {
	const arr: Array<Item> = [];
	const idList = selected.map((v) => v.item.id);
	items.value.forEach((element) => {
		!idList.includes(element.id) && arr.push(element);
	});

	return arr;
});

const createItem = () => {
	// items.push(val);
	addItem(newItem.value)
	newItem.value = {
		name: "",
		nutriens: "",
	};
};

const createMeal = () => {
	// meals.value.push(val);
	addMeal(meal, selected)
	Object.assign(meal, {
		name: "",
		localName: "",
		items: [],
	});
};
</script>

<template>
	<div class="h-full flex">
		<div class="w-1/2 border">

			<form class="p-2 flex flex-col gap-2" @submit.prevent="createMeal">
				<h3 class="font-semibold text-2xl">Meal form</h3>
				<label class="label" for="">
					Name :
					<input type="text" placeholder="Eru" v-model="meal.name" />
				</label>
				<label class="label" for="">
					Local Name :
					<input type="text" placeholder="Eru" v-model="meal.localName" />
				</label>
				<label class="label select" for="">
					<p>Items :</p>
					<div class="flex flex-wrap gap-4">
						<div
							class="flex grid-cols-1 gap-2 items-center bg-slate-100 rounded-2xl py-1 px-2"
							v-for="ingredient in selected"
						>
							<p class="">
								{{ ingredient.quantity > 0 ? ingredient.quantity : "" }}
								{{ ingredient.quantity > 1 && ingredient.weight ? "x" : "" }}
								{{
									ingredient.weight && ingredient.weight > 0
										? ingredient.weight
										: ""
								}}{{ ingredient.unit }}
								{{ ingredient.item.name }}
							</p>
							<div @click="removeApp(ingredient.item.id)">
								<X :size="17" />
							</div>
						</div>
					</div>
					<select class="" v-model="selectedItem">
						<option value="">Select item</option>
						<option v-for="item of filtered" :value="item">
							{{ item.name }}
						</option>
					</select>
				</label>

				<button
					type="submit"
					class="w-full bg-blue-300 p-2 rounded-2xl cursor-pointer font-semibold disabled:bg-sky-100"
					:disabled="!meal.name || selected.length < 4"
				>
					Create recipe
				</button>
			</form>

			<br />
			<form
				v-if="selectedItem"
				class="p-2 flex flex-col gap-2"
				@submit.prevent="addToSelected(selectedItem?.id)"
			>
				<h3 class="font-semibold text-2xl">
					Ingredient: {{ selectedItem?.name }}
				</h3>
				<label class="label" for="">
					Quantity :
					<input type="number" placeholder="3" v-model="ingre.quantity" />
				</label>
				<label class="label" for="">
					Weight :
					<input type="number" placeholder="3" v-model="ingre.weight" />
				</label>
				<label for="" class="label select">
					<p>Units :</p>
					<select v-model="ingre.unit">
						<option value="">Select unit</option>
						<option v-for="(item, key) of Units" :value="item">
							{{ key }}
						</option>
					</select>
				</label>
				<button
					type="submit"
					class="w-full bg-blue-300 p-2 rounded-2xl cursor-pointer font-semibold disabled:bg-sky-100"
					:disabled="!ingre.unit"
				>
					Add
				</button>
			</form>

			<br />
			<form class="p-2 flex flex-col gap-2" @submit.prevent="createItem">
				<h3 class="font-semibold text-2xl">New Item</h3>
				<label class="label" for="">
					Name :
					<input type="text" placeholder="garlics" v-model="newItem.name" />
				</label>
				<button
					:disabled="newItem.name == '' || newItem.name.length < 3"
					type="submit"
					class="w-full bg-blue-300 p-2 rounded-2xl cursor-pointer font-semibold disabled:bg-sky-100"
				>
					Create item
				</button>
			</form>
		</div>
		<div class="w-1/2 border px-7 py-4 bg-pink-400">
      <ul>
        <li class="list-disc" v-for="val in meals" :key="val.id" >
          {{ val.name }}
        </li>
      </ul>
    </div>
	</div>
</template>
