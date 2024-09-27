<script setup lang="ts">

import {useAppStore} from "~/store/useAppStore";
import {computed, reactive} from "vue";

import {type InferType, object, string} from "yup";
import {useApiService} from "~/services/useApiService";
import type {FormSubmitEvent} from "#ui/types";
const appStore = useAppStore()

const schema = object({
  email: string()
      .required('E-mail обязателен к заполнению')
      .email('E-mail должен быть валидным адресом'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined
})

const dialog = computed((): {show: boolean} => {
  return appStore.getDialog
})

const {passwordRecovery} = useApiService()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  await passwordRecovery(event.data).then(() => {
    appStore.setDialog({show: false})
  })
}
</script>

<template>
  <UModal v-model="dialog.show">
    <UForm class="w-full" :schema="schema" :state="state" @submit="onSubmit">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-vermilion-200">
              Восстановление пароля
            </h3>
          </div>
        </template>

        <div class="min-h-32">
          <div class="flex flex-col">
            <UFormGroup class="mb-4" name="email">
              <template #label>
                <label class="inline-block mb-4 dark:text-vermilion-200" for="email">
                  Введите e-mail, указанный при регистрации
                </label>
              </template>
              <template #default>
                <UInput id="email" type="email" size="xl" variant="outline"
                        placeholder="E-mail"
                        v-model="state.email"/>
              </template>
            </UFormGroup>
            <div class="flex gap-x-4 justify-end items-center">
              <UButton type="submit"
                       size="xl">
                Восстановить
              </UButton>
            </div>
          </div>
        </div>
      </UCard>
    </UForm>
  </UModal>
</template>

<style scoped lang="scss">

</style>