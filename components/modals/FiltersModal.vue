<script setup lang="ts">
import type {FilterModelInterface} from "~/interfaces/filters/FilterModelInterface";
import {useAppStore} from "~/store/useAppStore";
import type {TextFilterModelInterface} from "~/interfaces/filters/TextFilterModelInterface";
import type {NumberFilterModelInterface} from "~/interfaces/filters/NumberFilterModelInterface";
import _ from "lodash"
import type {FilterForInfoInterface} from "~/interfaces/filters/FilterForInfoInterface";

const appStore = useAppStore()
const from = ref<number>()
const to = ref<number>()
const filterQuery = ref<string | number | any>()
const selectedFilter = ref<{ label: string, property: string } | any>({})
const selectedOption = ref<{ label: string, value: string } | any>({})
const filterModel = ref<FilterModelInterface | any>(appStore.getFilterModel)
const filterForInfo = ref<FilterForInfoInterface[]>(appStore.getFiltersForInfo)


const availableFilters = [
  {label: 'ID', property: 'id'},
  {label: 'Название', property: 'name'},
  {label: 'Бренд', property: 'brand'},
  {label: 'Рейтинг', property: 'rating'},
  {label: 'Финальная цена', property: 'final_price'},
  {label: 'Максимальная финальная цена', property: 'final_price_max'},
  {label: 'Средняя финальная цена', property: 'final_price_average'},
  {label: 'Медианная финальная цена', property: 'final_price_median'},
  {label: 'Базовая скидка', property: 'basic_sale'},
  {label: 'Базовая цена', property: 'basic_price'},
  {label: 'Продажи', property: 'sales'},
  {label: 'Средние продажи в день', property: 'sales_per_day_average'},
  {label: 'Выручка', property: 'revenue'},
  {label: 'Потенциальная выручка', property: 'revenue_potential'},
  {label: 'Средняя выручка', property: 'revenue_average'},
  {label: 'Дни в наличии', property: 'days_in_stock'},
  {label: 'Дни с продажами', property: 'days_with_sales'},
  {label: 'FBS', property: 'is_fbs'},
  {label: 'Дни оборота', property: 'turnover_days'}
];
const filterOptions = [
  {label: 'Равно', value: 'equals'},
  {label: 'Не равно', value: 'notEqual'},
  {label: 'Содержит', value: 'contains'},
  {label: 'Не содержит', value: 'notContains'},
  {label: 'Начинается с', value: 'startsWith'},
  {label: 'Заканчивается', value: 'endsWith'},
  {label: 'Меньше, чем', value: 'lessThan'},
  {label: 'Меньше или равно', value: 'lessThanOrEqual'},
  {label: 'Больше чем', value: 'greaterThan'},
  {label: 'Больше или равно', value: 'greaterThanOrEqual'},
  {label: 'В диапазоне', value: 'inRange'}
];

const modal = computed((): { show: boolean, [key: string]: any } => {
  return appStore.getDialog
})

const filterOptionsDependsOnFilter = computed((): { label: string, value: string }[] => {
  switch (selectedFilter.value?.property) {
    case 'name':
    case 'brand':
      return filterOptions.slice(0, 5)
    default:
      return filterOptions.slice(0, 2).concat(filterOptions.slice(6))
  }
})

const isEmptyFilter = computed((): boolean => {
  return _.isEmpty(selectedFilter.value)
})

const isEmptyOption = computed((): boolean => {
  return _.isEmpty(selectedOption.value)
})

function selectFilter() {
  switch (selectedFilter.value?.property) {
    case 'name':
    case 'brand':
      const textValue = {
        filterType: 'text',
        type: selectedOption.value?.value,
        filter: filterQuery.value
      } as TextFilterModelInterface

      filterModel.value[selectedFilter.value.property] = textValue
      break;
    default:
      const numberValue = {
        filterType: 'number',
        type: selectedOption.value?.value,
        filter: filterQuery.value
      } as NumberFilterModelInterface

      if (selectedOption.value?.value === 'inRange') {
        numberValue.filter = from.value
        numberValue.filterTo = to.value
      }

      filterModel.value[selectedFilter.value.property] = numberValue
      break;
  }

  if (selectedOption.value?.value === 'inRange') {
    filterForInfo.value.push({
      filter: selectedFilter.value.label,
      operator: selectedOption.value.label,
      isValueObject: true,
      value: {
        from: from.value,
        to: to.value
      },
      property: selectedFilter.value.property
    })
  } else {
    filterForInfo.value.push({
      filter: selectedFilter.value.label,
      operator: selectedOption.value.label,
      isValueObject: false,
      value: filterQuery.value,
      property: selectedFilter.value.property
    })
  }

  selectedFilter.value = {}
  selectedOption.value = {}
  filterQuery.value = ''
}

function finishFiltering() {
  appStore.setFilterModel(filterModel.value)
  appStore.setFiltersForInfo(filterForInfo.value)
  appStore.setDialog({show: false})
}

</script>

<template>
  <UModal v-model="modal.show" :ui="{width: 'min-w-[55%]'}" prevent-close>
    <UCard :ui="{divide: ''}">
      <template #default>
        <div class="flex gap-x-4 justify-between">
          <USelectMenu color="indigo" class="grow" v-model="selectedFilter" placeholder="Выбрать фильтр"
                       :options="availableFilters"></USelectMenu>
          <USelectMenu color="indigo" class="grow" v-model="selectedOption" :disabled="isEmptyFilter" placeholder="Выбрать оператор"
                       :options="filterOptionsDependsOnFilter"></USelectMenu>
          <template v-if="selectedOption && selectedOption.value === 'inRange'">
            <UInput color="indigo" class="grow" :disabled="isEmptyOption" placeholder="Введите значение от" v-model="from"></UInput>
            <UInput color="indigo" class="grow" :disabled="isEmptyOption" placeholder="Введите значение до" v-model="to"></UInput>
          </template>
          <template v-else>
            <UInput color="indigo" class="grow" :disabled="isEmptyOption" placeholder="Введите искомое" v-model="filterQuery"></UInput>
          </template>
          <UButton @click="selectFilter" class="grow flex justify-center" label="Сохранить" color="indigo"></UButton>
          <UButton @click="finishFiltering" class="grow flex justify-center" label="Завершить" color="indigo" variant="outline"></UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<style scoped lang="scss">

</style>