<script setup lang="ts">
import { sub, format, isSameDay, type Duration } from 'date-fns'
import DatePicker from "@/components/commons/DatePicker.vue";
import { ref, watch } from "vue"
import {ru} from "date-fns/locale";
const emits = defineEmits(['date-selected'])
const ranges = [
  { label: 'Последние 7 дней', duration: { days: 7 } },
  { label: 'Последние 14 дней', duration: { days: 14 } },
  { label: 'Последние 30 дней', duration: { days: 30 } },
  { label: 'Последние 3 месяца', duration: { months: 3 } },
  { label: 'Последние 6 месяцев', duration: { months: 6 } },
  { label: 'Последний год', duration: { years: 1 } }
]
const selected = ref({ start: sub(new Date(), { days: 14 }), end: new Date() })

function isRangeSelected (duration: Duration) {
  return isSameDay(selected.value.start, sub(new Date(), duration)) && isSameDay(selected.value.end, new Date())
}

function selectRange (duration: Duration) {
  selected.value = { start: sub(new Date(), duration), end: new Date() }
}
watch(selected, () => {
  emits('date-selected', selected.value)
}, {immediate: true})
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton color="indigo" icon="i-heroicons-calendar-days-20-solid">
      {{ format(selected.start, 'd MMM yyy', {locale: ru}) }} - {{ format(selected.end, 'd MMM yyy', {locale: ru}) }}
    </UButton>

    <template #panel="{ close }">
      <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
        <div class="hidden sm:flex flex-col py-4">
          <UButton
              v-for="(range, index) in ranges"
              :key="index"
              :label="range.label"
              color="gray"
              variant="ghost"
              class="rounded-none px-6"
              :class="[isRangeSelected(range.duration) ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50']"
              truncate
              @click="selectRange(range.duration)"
          />
        </div>

        <DatePicker v-model="selected" @close="close" />
      </div>
    </template>
  </UPopover>
</template>

