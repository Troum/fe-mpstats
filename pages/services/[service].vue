<script setup lang="ts">
import {useRoute} from "vue-router";
import {useApiService} from "~/services/useApiService";
import {ref, watch} from "vue";
import CatalogueTab from "~/components/tabs/CatalogueTab.vue";
import LoadingIcon from "~/components/icons/LoadingIcon.vue";
import FiltersTab from "~/components/tabs/FiltersTab.vue"
import ResultTab from "~/components/tabs/ResultTab.vue";
import {useResultStore} from "~/store/useResultStore";

const resultStore = useResultStore()
const route = useRoute();
const {getCategories} = useApiService();

const {data: categories, error}: {
  data: any,
  error: any
} = await getCategories(<string>route.params.service);
const step = ref<number>(0)
const path = ref<string>('')

const steps = [
  {
    label: 'Найдите и выберите категорию',
    icon: 'i-heroicons-information-circle',
    slot: 'catalogue'
  },
  {
    label: 'Настройте фильтры',
    icon: 'i-heroicons-funnel',
    slot: 'filters'
  },
  {
    label: 'Результат',
    icon: 'i-heroicons-presentation-chart-line',
    slot: 'results'
  }
];
const pending = ref<boolean>(true)

function nextStep(object: { data: any, step: number }) {
  switch (object.step) {
    case 1:
      step.value = object.step
      path.value = object.data
      console.log('step 1')
      break
    case 2:
      console.log('step 2')
      resultStore.setRows(object.data?.value?.category)
      resultStore.setUrl(object.data?.value?.url)
      step.value = object.step
      break
  }
}

watch(() => categories, () => {
  setTimeout(() => pending.value = false, 1500)
}, {immediate: true})

</script>

<template>
  <template v-if="pending">
    <div class="flex items-center justify-center min-h-screen w-[100%]">
      <LoadingIcon/>
    </div>
  </template>
  <template v-else-if="error">
    <div class="flex items-center justify-center min-h-screen w-[100%]">
      <span class="text-5xl">Что-то пошло не так</span>
    </div>
  </template>
  <template v-else>
    <div class="flex items-start justify-center min-h-screen w-[100%] py-4 mx-auto">
      <UTabs :ui="{list: {height: 'h-12', tab: {padding: 'px-4', height: 'h-10'}}}" v-model="step" :items="steps"
             class="w-full">
        <template #catalogue="{ item }">
          <CatalogueTab :categories="categories.categories" @next-step="nextStep"/>
        </template>
        <template #filters="{ item }">
          <FiltersTab :path="path" :service="<string>route.params.service" @next-step="nextStep"/>
        </template>
        <template #results="{ item }">
          <ResultTab/>
        </template>
      </UTabs>
    </div>
  </template>
</template>

<style scoped lang="scss">

</style>