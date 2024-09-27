<script setup lang="ts">

const props = defineProps({
  modelValue: {
    default: 0
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 5000
  }
})

const emit = defineEmits(['update:model-value'])

const number = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:model-value', value)
  }
})
function plus() {
  number.value += 1
}
function minus() {
  if (number.value > props.min) {
    number.value -= 1
  }
}
</script>

<template>
  <UInput type="number" v-model="number" color="indigo"
          :ui="{icon: {leading: {pointer: 'pointer-events-auto', padding: {sm: 'px-0'}}, trailing: {pointer: 'pointer-events-auto', padding: {sm: 'px-0'}}}}">
    <template #leading>
      <UButton color="indigo" @click="minus" icon="i-heroicons-minus"></UButton>
    </template>
    <template #trailing>
      <UButton color="indigo" @click="plus" icon="i-heroicons-plus"></UButton>
    </template>
  </UInput>
</template>

<style scoped lang="scss">

</style>