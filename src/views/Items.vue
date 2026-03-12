<script setup lang="ts">
import { useItems } from "@/stores/storeItem";
import type { Item, ItemDto } from "@/types";
import { Trash } from "lucide-vue-next";
import { computed, reactive, ref } from "vue";

const { items, addItem, deleteItem } = useItems();
const emptyItem: Item = { id: "", name: "" };
const newItem = ref<ItemDto>({
	name: "",
});
const selected = reactive<Item>({...emptyItem});

const createItem = () => {
	// items.push(val);
	addItem({...newItem.value});
	newItem.value = {
		name: "",
		nutriens: "",
	};
};

const remove = () => {
	deleteItem(selected.id);
  Object.assign(selected,emptyItem)
};

const filtered = computed(()=>{
  return items.value.sort((a, b) => a.name.localeCompare(b.name))
})
</script>

<template>
	<div class="w-full h-screen flex overflow-hidden">
		<div class="w-1/2 border">
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
		<div class="w-1/2 border p-4 flex flex-col">
			<p class="text-2xl">Items</p>
			<ul class="px-4 flex flex-col gap-2 grow overflow-y-auto">
				<li
					class="font-semibold list-decimal flex gap-2 items-center"
					v-for="value in filtered"
				>
					<p>{{ value.name }}</p>
					<Trash
						v-if="selected.id !== value.id"
						class="text-red-300 cursor-pointer"
						@click="Object.assign(selected, value)"
					/>
					<div class="flex gap-2" v-if="selected.id === value.id">
						<button
							@click="remove"
							class="rounded-lg cursor-pointer bg-red-700 text-white font-semibold py-1 px-2"
						>
							Yes
						</button>
						<button
							@click="
								() => {
									Object.assign(selected, emptyItem);                  
								}
							"
							class="rounded-lg cursor-pointer bg-green-800 text-white font-semibold py-1 px-2"
						>
							No
						</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
