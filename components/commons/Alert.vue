<script setup lang="ts">
import {computed} from "vue";
import {useAlertStore} from "~/store/useAlertStore";

const alertStore = useAlertStore()
const alert = computed({
  get () {
    return alertStore.getAlert
  },
  set(value: {[key: string]: any }) {
    alertStore.setAlert(value)
  }
})
function closeAlert () {
  alert.value = {show: false}
}
</script>

<template>
  <template v-if="alert.show">
    <UAlert
        class="fixed bottom-0 left-0 z-[99] rounded-none"
        @close="closeAlert()"
        :close-button="{icon: 'i-heroicons-x-mark-20-solid', color: 'white', variant: 'link', padded: false}"
        v-model="alert.show"
        :icon="alert.icon"
        :color="alert.color"
        variant="solid"
    >
      <template #description>
        <span class="inline-block w-full">{{ alert.message }}</span>
      </template>
    </UAlert>
  </template>
</template>

<style scoped lang="scss">

</style>