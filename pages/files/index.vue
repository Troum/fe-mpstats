<script setup lang="ts">
import {useApiService} from "~/services/useApiService";

const columns = [
  {
    label: 'Название файла',
    key: 'file_name'
  },
  {
    label: 'Ссылка на скачивание',
    key: 'url'
  },
  {
    label: 'Сервис',
    key: 'service'
  },
  {
    label: 'Дата создания',
    key: 'created_at'
  }
]
const {getFiles} = useApiService();
const {data: rows}: { data: any } = await getFiles();
function downloadExcel(url: string) {
  window.open(url, '_self', 'download')
}
</script>

<template>
  <div class="flex py-16 items-start justify-center h-screen w-full">
    <UTable :columns="columns" :rows="rows.files" class="w-screen">
      <template #url-data="{ row }">
        <UButton @click="downloadExcel(row.url)" target="_blank" color="indigo" label="Скачать"></UButton>
      </template>
      <template #empty-state>
        <div class="flex items-center justify-center py-12 gap-3">
          <UIcon name="i-heroicons-circle-stack" class="text-red-600"></UIcon>
          <span class="text-sm text-red-600">Данные отсутствуют</span>
        </div>
      </template>
    </UTable>
  </div>
</template>

<style scoped lang="scss">

</style>