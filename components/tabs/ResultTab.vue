<script setup lang="ts">
import {useResultStore} from "~/store/useResultStore";
import _ from "lodash"

const resultStore = useResultStore()
const rows = computed((): any[] => {
  return resultStore.getRows
})
const url = computed((): string => {
  return resultStore.getUrl
})

const columns = [
  {label: 'ID', key: 'id', sortable: true},
  {label: 'Название', key: 'name', sortable: true},
  {label: 'Бренд', key: 'brand', sortable: true, class: 'text-center', rowClass: 'text-center'},
  {label: 'Рейтинг', key: 'rating', sortable: true, class: 'text-center', rowClass: 'text-center'},
  {label: 'Финальная цена', key: 'final_price', sortable: true},
  {label: 'Максимальная финальная цена', key: 'final_price_max', sortable: true},
  {label: 'Средняя финальная цена', key: 'final_price_average', sortable: true},
  {label: 'Медианная финальная цена', key: 'final_price_median', sortable: true},
  {label: 'Базовая скидка', key: 'basic_sale', sortable: true},
  {label: 'Базовая цена', key: 'basic_price', sortable: true},
  {label: 'Продажи', key: 'sales', sortable: true, class: 'text-center', rowClass: 'text-center'},
  {label: 'Средние продажи в день', key: 'sales_per_day_average', sortable: true},
  {label: 'Выручка', key: 'revenue', sortable: true, class: 'text-center', rowClass: 'text-center'},
  {label: 'Потенциальная выручка', key: 'revenue_potential', sortable: true},
  {label: 'Средняя выручка', key: 'revenue_average', sortable: true},
  {label: 'Дни в наличии', key: 'days_in_stock', sortable: true},
  {label: 'Дни с продажами', key: 'days_with_sales', sortable: true},
  {label: 'FBS', key: 'is_fbs', sortable: true},
  {label: 'Дни оборота', key: 'turnover_days', sortable: true}
];

const selectedColumns = ref<{label: string, key: string}[]>([columns[0],columns[1],columns[2],columns[3],columns[9],columns[10],columns[12]])
function downloadExcel() {
  window.open(url.value, '_self', 'download')
}

</script>

<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex justify-between items-center py-4">
      <USelectMenu color="indigo" class="max-w-[17.5%]"
                   multiple v-model="selectedColumns"
                   placeholder="Выбрать колонки для отображения"
                   :options="columns">
        <template #label>
          <span class="truncate">Выбрано {{ selectedColumns.length }} колонок</span>
        </template>
      </USelectMenu>
      <template v-if="!_.isNull(url)">
        <UButton @click="downloadExcel" target="_blank" variant="outline" color="indigo" label="Скачать excel по текущей выборке"></UButton>
      </template>
    </div>
    <UTable :columns="selectedColumns" :rows="rows">
      <template #empty-state>
        <div class="flex items-center justify-center py-12 gap-3">
          <UIcon name="i-heroicons-circle-stack" class="text-red-600"></UIcon>
          <span class="text-sm text-red-600">Данные по указанному запросу отсутствуют</span>
        </div>
      </template>
    </UTable>
  </div>
</template>

<style scoped lang="scss">

</style>