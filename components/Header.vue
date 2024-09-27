<script setup lang="ts">
import {useLoggedIn} from "@/composables/useLoggedIn";
import {useApiService} from "@/services/useApiService";
import {useAppStore} from "@/store/useAppStore";
import {useRouter} from "vue-router";

const {signOut} = useApiService()
const isLoggedIn = useLoggedIn()
const appStore = useAppStore()
const router = useRouter()
async function logout() {
  await signOut()
      .then(() => {
        appStore.setToken(null)
      })
      .then(() => {
        appStore.setUser(null)
      })
      .then(() => {
        router.push({path: "/sign-in"})
      })
}

</script>

<template>
  <template v-if="isLoggedIn">
    <div class="flex p-6 gap-x-4 justify-end items-center fixed top-0 z-10 w-full bg-white">
      <UButton @click="logout()">Выйти</UButton>
    </div>
  </template>
</template>

<style scoped>

</style>