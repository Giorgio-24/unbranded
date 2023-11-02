<template>
  <div class="flex min-w-0 transition bg-white/20 px-2 py-1 rounded-md" :class="classes">
    <MagnifyingGlassIcon class="w-8" :class="textWhite ? 'text-white' : 'text-gray-500'"/>
    <input :value="modelValue" @input="emitValue" :placeholder="placeholder"
           class="flex-1 min-w-0 !ring-0 !border-0 bg-transparent"
           :class="textWhite ? 'text-white placeholder-white' : 'text-gray-700 placeholder-gray-700'" @blur="blurInput"
           @focus="focusInput">
  </div>
</template>
<script setup lang="ts">
import {MagnifyingGlassIcon} from "@heroicons/vue/24/outline"

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '',
  },
  border: {
    type: Boolean,
    default: false
  },
  textWhite: {
    type: Boolean,
    default: false
  },
})

const emits = defineEmits<{ (e: 'update:modelValue', value: String): void }>()

const onFocus = ref(false)

const emitValue = (e: Event) => {
  emits('update:modelValue', (e.target as HTMLInputElement).value)
}

const blurInput = () => {
  onFocus.value = false
}
const focusInput = () => {
  onFocus.value = true
}

const classes = computed((): string => {
  let classes = onFocus.value ? 'border-blue-500' : 'border-gray-200'

  if (props.border) {
    classes += ' border'
  }

  return classes
})
</script>