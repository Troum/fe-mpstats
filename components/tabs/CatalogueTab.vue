<script setup lang="ts">
import {computed, defineProps, ref, watch} from 'vue'

const emits = defineEmits(['next-step'])
const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
})

interface Category {
  url: string,
  name: string,
  path: string
}

const structuredCategories = ref<any[]>([])
const searchQuery = ref<string>('')

function createCategoryStructure(categories: Category[]) {
  const categoryMap = new Map()

  categories.forEach(category => {
    const pathParts = category.path.split('/')

    if (!categoryMap.has(pathParts[0])) {
      categoryMap.set(pathParts[0], {name: pathParts[0], children: [], path: category.path})
    }

    let parent = categoryMap.get(pathParts[0])
    for (let i = 1; i < pathParts.length; i++) {
      let child = parent.children.find((child: any) => child.name === pathParts[i])
      if (!child) {
        child = {name: pathParts[i], children: [], path: category.path}
        parent.children.push(child)
      }
      parent = child
    }
  })

  return Array.from(categoryMap.values())
}

function buildPath(path: string) {
  emits('next-step', {data: path, step: 1})
}

watch(() => props.categories, (newCategories: any) => {
  structuredCategories.value = createCategoryStructure(newCategories)
}, {immediate: true})

const filteredCategories = computed(() => {
  if (!searchQuery.value) {
    return structuredCategories.value
  }

  function filterCategories(categories: any[], query: string) {
    return categories
        .map(category => {
          const match = category.name.toLowerCase().includes(query.toLowerCase())

          if (match) {
            return category
          }

          const filteredChildren: any = filterCategories(category.children || [], query)

          if (filteredChildren.length) {
            return {
              ...category,
              children: filteredChildren
            }
          }

          return null
        })
        .filter(Boolean)
  }

  return filterCategories(structuredCategories.value, searchQuery.value)
})
</script>
<template>
  <div class="w-full">
    <div class="mb-4 py-4">
      <UInput
          v-model="searchQuery"
          type="text"
          color="violet" variant="outline"
          placeholder="Найти и выбрать категорию..."
      />
    </div>

    <ul class="flex flex-wrap" v-if="filteredCategories.length">
      <li class="my-2" v-for="(category, index) in filteredCategories" :key="index">
        <UBadge class="transition cursor-pointer hover:bg-violet-600 hover:text-white" @click="buildPath(category.path)"
                variant="outline" color="violet" :label="category.name"></UBadge>
        <ul class="pl-4" v-if="category.children.length">
          <li class="my-2" v-for="(subCategory, subIndex) in category.children" :key="subIndex">
            <UBadge class="transition cursor-pointer hover:bg-indigo-600 hover:text-white"
                    @click="buildPath(subCategory.path)" variant="outline" color="indigo"
                    :label="subCategory.name"></UBadge>
            <ul class="pl-4" v-if="subCategory.children.length">
              <li class="my-2" v-for="(nestedCategory, nestedIndex) in subCategory.children" :key="nestedIndex">
                <UBadge class="transition cursor-pointer hover:bg-purple-600 hover:text-white"
                        @click="buildPath(nestedCategory.path)" variant="outline" color="purple"
                        :label="nestedCategory.name"></UBadge>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <div v-else>
      <p>Категорий нет.</p>
    </div>
  </div>
</template>

<style scoped>
</style>
