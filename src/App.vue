<script setup lang="ts">
import Navbar from './components/Navbar.vue';

</script>

<template>
  <div class="h-screen flex flex-col">
    <Navbar />
    <router-view class="grow p-4"/>
  </div>
</template>