<script setup lang="ts">
import {ref, onMounted, shallowRef} from "vue"
import OzonIcon from "~/components/icons/OzonIcon.vue";
import WildberriesIcon from "~/components/icons/WildberriesIcon.vue";
import YandexMarketIcon from "~/components/icons/YandexMarketIcon.vue";
import type {ServiceInterface} from "~/interfaces/models/ServiceInterface";

const services = ref<ServiceInterface[]|null>(null)

onMounted(() => {
  services.value = [
    {
      service: 'wb',
      icon: shallowRef(WildberriesIcon)
    },
    {
      service: 'oz',
      icon: shallowRef(OzonIcon)
    },
    // {
    //   service: 'ym',
    //   icon: shallowRef(YandexMarketIcon)
    // }
  ]
})

</script>

<template>
  <div class="flex items-center justify-center gap-x-8 w-full h-screen">
    <template v-for="service of services">
      <RouterLink :to="`/services/${service.service}`">
        <UCard :ui="{base: 'transition-all ease-in-out flex items-center justify-center w-[calc(50vw/3)] h-[128px] drop-shadow hover:drop-shadow-lg', ring: ''}">
          <template #default>
            <div class="flex justify-center items-center">
              <component :is="service.icon"></component>
            </div>
          </template>
        </UCard>
      </RouterLink>
    </template>
    <RouterLink to="/files">
    <UCard :ui="{base: 'transition-all ease-in-out flex items-center justify-center w-[calc(50vw/3)] h-[128px] drop-shadow hover:drop-shadow-lg', ring: ''}">
      <template #default>
        <div class="flex justify-center items-center gap-x-4">
          <UIcon name="i-heroicons-folder" class="text-2xl"></UIcon>
          <span>Ранее созданные файлы</span>
        </div>
      </template>
    </UCard>
    </RouterLink>
  </div>
</template>

<style scoped>

</style>