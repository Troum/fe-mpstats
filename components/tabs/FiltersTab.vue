<script setup lang="ts">
import DateRangePicker from "~/components/commons/DateRangePicker.vue";
import NumberInput from "~/components/commons/NumberInput.vue";
import {computed, defineEmits, ref} from "vue";
import {useAppStore} from "~/store/useAppStore";
import type {FilterForInfoInterface} from "~/interfaces/filters/FilterForInfoInterface";
import {useConfirm} from "~/composables/useConfirm";
import dayjs from 'dayjs';
import qs from 'qs';
import _ from "lodash";
import type {FilterModelInterface} from "~/interfaces/filters/FilterModelInterface";
import {useApiService} from "~/services/useApiService";
import * as Yup from "yup";

const emits = defineEmits(['next-step'])
const props = defineProps({
  path: {
    type: String,
    default: null
  },
  service: String,
  default: null
})

const loading = ref<boolean>(false)
const {getCategory} = useApiService();
const startRow = ref<number>(0)
const endRow = ref<number>(0)
const d1 = ref<string>()
const d2 = ref<string>()
const fbs = ref<boolean>(false)

const appStore = useAppStore()

const savedFilters = ref<FilterForInfoInterface[]>(appStore.getFiltersForInfo)
const filterModel = ref<FilterModelInterface>(appStore.getFilterModel)

const isDateEmpty = computed((): any => {
  return _.isEmpty(d1.value) && _.isEmpty(d2.value)
})

const isFilterModelEmpty = computed((): any => {
  return _.isEmpty(filterModel.value)
})

const queryString = computed((): string => {
  return qs.stringify({
    service: props.service,
    path: props.path,
    fbs: fbs.value ? 1 : 0,
    d1: d1.value,
    d2: d2.value,
  })
})

const requestBody = computed((): { startRow: number, endRow: number, filterModel: FilterModelInterface } => {
  return {
    startRow: startRow.value,
    endRow: endRow.value,
    filterModel: filterModel.value
  }
})

function setDate(date: { start: string, end: string }) {
  d1.value = dayjs(date.start).format('YYYY-MM-DD')
  d2.value = dayjs(date.end).format('YYYY-MM-DD')
}

const dateRangeSchema = Yup.object({
  d1: Yup.string().required('Начальная дата обязательна к заполнению').nullable(),
  d2: Yup.string().required('Конечная дата обязательна к заполнению').nullable(),
});

const rowSchema = Yup.object({
  startRow: Yup.number().required('Номер строки начала получения данных обязательно'),
  endRow: Yup.number()
      .required('Номер строки конца получения данных обязательно')
      .moreThan(Yup.ref('startRow'), 'Номер строки конца получения данных должен быть больше номера строки начала')
});

const errors = ref({
  d1: '',
  d2: '',
  startRow: '',
  endRow: ''
});

async function validateFields() {
  errors.value = {d1: '', d2: '', startRow: '', endRow: ''};
  loading.value = true
  try {
    await dateRangeSchema.validate({d1: d1.value, d2: d2.value}, {abortEarly: false});
    await rowSchema.validate({startRow: startRow.value, endRow: endRow.value}, {abortEarly: false});
    await loadData();
  } catch (err: any) {
    if (err && err.inner) {
      err.inner?.forEach((error: any) => {
        if (error.path === 'd1') errors.value.d1 = error.message;
        if (error.path === 'd2') errors.value.d2 = error.message;
        if (error.path === 'startRow') errors.value.startRow = error.message;
        if (error.path === 'endRow') errors.value.endRow = error.message;
      });
    }
  }
}

function removeFromFilters(item: FilterForInfoInterface) {
  useConfirm()
      .confirm(
          'Удалить фильтр?',
          'Вы действительно хотите удалить этот фильтр?',
          'Удалить фильтр',
          () => {
            _.remove(savedFilters.value, {property: item.property})
            Reflect.deleteProperty(filterModel.value, `${item.property}`)

            appStore.setFilterModel(filterModel.value)
            appStore.setFiltersForInfo(savedFilters.value)
          }
      )
}

function openAvailableFiltersModal() {
  appStore.setDialog({show: true})
}

async function loadData() {
  await getCategory(queryString.value, requestBody.value)
      .then((response: any) => {
        loading.value = false
        emits('next-step', {data: response.data, step: 2})
      })
}

</script>

<template>
  <div class="w-full py-4 max-w-screen">
    <div class="flex justify-between items-start">
      <!-- Date Range Picker -->
      <div class="flex flex-col gap-y-3">
        <UFormGroup label="Выберите период" :error="errors.d1 || errors.d2">
          <DateRangePicker @date-selected="setDate"/>
        </UFormGroup>
      </div>

      <!-- FBS Toggle -->
      <UIcon name="i-heroicons-arrow-long-right" class="self-center"></UIcon>
      <div class="flex items-center flex-col gap-y-3">
        <span class="text-gray-600">Учитывать FBS?</span>
        <UToggle
            color="indigo"
            on-icon="i-heroicons-check-20-solid"
            off-icon="i-heroicons-x-mark-20-solid"
            v-model="fbs"
        />
      </div>

      <!-- Start Row Input -->
      <UIcon name="i-heroicons-arrow-long-right" class="self-center"></UIcon>
      <div class="flex flex-col gap-y-3">
        <UFormGroup label="Номер строки начала получения данных" :error="errors.startRow">
          <NumberInput :disabled="isDateEmpty" v-model="<number>startRow" type="number"
                       placeholder="Номер строки начала получения данных"/>
        </UFormGroup>
      </div>

      <UIcon name="i-heroicons-arrow-long-right" class="self-center"></UIcon>
      <div class="flex flex-col gap-y-3">
        <UFormGroup label="Номер строки конца получения данных" :error="errors.endRow">
          <NumberInput :disabled="isDateEmpty" v-model="<number>endRow" type="number"
                       placeholder="Номер строки конца получения данных"/>
        </UFormGroup>
      </div>

      <UIcon name="i-heroicons-arrow-long-right" class="self-center"></UIcon>
      <div class="flex flex-col gap-y-3">
        <UFormGroup label="Настройте фильтры">
          <UButton :disabled="isDateEmpty" @click="openAvailableFiltersModal" color="indigo">Добавить фильтр</UButton>
        </UFormGroup>
      </div>

      <UIcon name="i-heroicons-arrow-long-right" class="self-center"></UIcon>
      <div class="flex flex-col">
        <span class="text-gray-600">Результат</span>
        <template v-if="_.isNull(path)">
          <UTooltip text="Вы не выбрали категорию: вернитесь на шаг 1" :popper="{ arrow: true }">
            <UButton :disabled="true" label="Получить данные" variant="outline" color="indigo"></UButton>
          </UTooltip>
        </template>
        <template v-else>
          <UButton :loading="loading" @click="validateFields" label="Получить данные" variant="outline"
                   color="indigo"></UButton>
        </template>
      </div>
    </div>

    <div class="flex justify-between items-center my-4">
      <template v-if="savedFilters.length">
        <div class="flex flex-col gap-y-2 my-8 w-full">
          <span class="text-2xl font-bold">Добавленные фильтры</span>
          <small class="text">Будут использованы при для фильтрации, пока не будут удалены</small>
          <template v-for="(item, index) of savedFilters">
            <div class="flex justify-start gap-x-2 items-center w-full">
              <span class="font-bold">{{ index + 1 }}.&nbsp;</span>
              <span class="font-bold">{{ item.filter }}</span>
              <span class="lowercase underline">{{ item.operator }}</span>
              <template v-if="item.isValueObject">
                <span>{{ item.value.from }} &mdash; {{ item.value.to }}</span>
              </template>
              <template v-else>
                <span>{{ item.value }}</span>
              </template>
              <UButton @click="removeFromFilters(item)" class="ml-auto" color="red" icon="i-heroicons-trash"/>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
