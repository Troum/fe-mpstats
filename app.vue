<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();

useSeoMeta({
  title: 'Emall: MPSTATS',
  ogTitle: 'Emall: MPSTATS',
  description: 'Сервис для получения статистических данных',
  ogDescription: 'Сервис для получения статистических данных',
  ogImage: 'https://api-preprod.emall.by/storage/admin/images/2Ndf4o1cG2umQSgVOpE1wAKtgvtiAhCdjNre291A.svg',
})
</script>
<template>
  <NuxtLayout>
    <NuxtPage :key="route.fullPath"/>
  </NuxtLayout>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>