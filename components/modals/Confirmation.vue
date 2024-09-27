<script lang="ts" setup>
import { useConfirm } from "@/composables/useConfirm";
import {sleep} from "@antfu/utils";

const { confirming, params } = useConfirm()
async function doAction () {
  params.value.action()
  await sleep(150)
  confirming.value = false
}

</script>

<template>
  <UModal v-model="confirming">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-base font-semibold leading-6 text-gray-900">{{ params.title }}</span>
          <UButton variant="link" icon="i-heroicons-x-mark" size="sm" @click="confirming = false"/>
        </div>
      </template>
      <template #default>
        <div class="flex justify-start items-center gap-x-4">
          <UIcon class="text-red-600" name="i-mdi-alert-circle-outline"/>
          <span>{{ params.message }}</span>
        </div>
      </template>
      <template #footer>
        <div class="flex items-center justify-end gap-x-4">
          <UButton color="red" size="sm" @click="doAction">{{ params.label }}</UButton>
          <UButton color="indigo" size="sm" @click="confirming = false">Отменить</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>