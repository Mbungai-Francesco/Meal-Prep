<script setup lang="ts">
import type { Ingredient } from '@/types';

interface props{
  ingredient : Ingredient
}

const { ingredient } = defineProps<props>()
</script>

<template>
  <div
    class="flex grid-cols-1 gap-2 items-center bg-slate-100 rounded-2xl py-1 px-2"
  >
    <p class="">
      {{ ingredient.quantity > 0 ? ingredient.quantity : "" }}
      {{ ingredient.quantity > 1 && ingredient.weight ? "x" : "" }}
      {{ ingredient.weight && ingredient.weight > 0 ? ingredient.weight : ""
      }}{{ ingredient.unit }}
      {{ ingredient.item.name }}
    </p>
  </div>
</template>
