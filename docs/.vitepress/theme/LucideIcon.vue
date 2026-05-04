<script setup>
import { computed, shallowRef, watchEffect } from 'vue'
import * as icons from 'lucide-vue-next'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
  color: { type: String, default: 'currentColor' },
})

const iconComponent = shallowRef(null)

watchEffect(() => {
  // Convert kebab-case to PascalCase (e.g. "folder-open" -> "FolderOpen")
  const pascalName = props.name
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')

  iconComponent.value = icons[pascalName] || null
})
</script>

<template>
  <component :is="iconComponent" v-if="iconComponent" :size="props.size" :color="props.color"
    style="display: inline-block; vertical-align: middle;" />
  <span v-else>{{ props.name }}</span>
</template>
