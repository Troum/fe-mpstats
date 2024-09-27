<script setup lang="ts">
import Alert from "@/components/commons/Alert.vue";
import Header from "@/components/Header.vue"
import Confirmation from "~/components/modals/Confirmation.vue";
import AvailableFiltersModal from "~/components/modals/FiltersModal.vue";
</script>

<template>
  <Header />
  <UContainer class="h-screen mx-auto max-w-screen">
    <slot/>
    <Confirmation />
    <AvailableFiltersModal />
  </UContainer>
  <Alert />
</template>

<style scoped lang="scss">

</style>