<template>
  <div class="mt-2 lg:mt-10">
    <div class="h-[80px]">
      <div ref="continent" class="relative w-full container z-50 bg-white pt-6 flex gap-2 justify-between text-xl border-b-1 overflow-x-auto touch-auto">
        <button v-for="continent in continents" :key="continent.slug" @click="chooseContinent(continent)">
          <span :class="isSelected(continent) ? 'text-black' : 'text-gray-400'" class="px-4">{{ continent.name }}</span>
          <span class="h-[3px] inline-block mt-4 rounded-lg w-full bg-red-600 z-10 relative transition"
                :class="isSelected(continent) ? 'opacity-100' : 'opacity-0'"/>
        </button>
        <div class="h-px bg-gray-300 absolute bottom-2 left-0 right-0"/>
      </div>
    </div>
    <div class="my-8 flex gap-4 md:gap-20 px-4 md:px-0">
      <div>
        <div class="bg-sky-200 rounded-full p-2 w-20">
          <img :src="'/images/' + modelValue.code + '.svg'" class="w-full" :alt="modelValue.name">
        </div>
        <p class="hidden md:flex mt-6 text-slate-500 whitespace-nowrap">Vedi tutti i viaggi in {{ modelValue.name }}
          <ChevronRightIcon class="w-4"/>
        </p>
      </div>
      <!--  Desktop  -->
      <p class="text-gray-700 flex-1 hidden md:block">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, est nemo. A deleniti eum minima perspiciatis
        praesentium similique suscipit unde veniam! Ab autem esse quo voluptates. Amet libero ratione repellat.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, est nemo. A deleniti eum minima perspiciatis
        praesentium similique suscipit unde veniam! Ab autem esse quo voluptates. Amet libero ratione repellat.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, est nemo. A deleniti eum minima perspiciatis
        praesentium similique suscipit unde veniam! Ab autem esse quo voluptates. Amet libero ratione repellat.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, est nemo. A deleniti eum minima perspiciatis
        praesentium similique suscipit unde veniam! Ab autem esse quo voluptates. Amet libero ratione repellat.
      </p>
      <!--  Mobile  -->
      <div class="flex-1 md:hidden">
        <p class="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, est nemo ...
        </p>
        <p class="flex text-sky-800 items-center">Leggi di piu <ChevronDownIcon class="w-4 ml-1" /></p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {PropType} from "vue"
import Continent from "~/types/continent"
import {ChevronRightIcon, ChevronDownIcon} from '@heroicons/vue/24/outline'
import useScrollEvents from "~/composables/useScrollEvents"

const props = defineProps({
  continents: {
    required: true,
    type: Object as PropType<Continent[]>
  },
  modelValue: {
    required: true,
    type: Object as PropType<Continent>,
  }
})

const emits = defineEmits<{ (e: 'update:modelValue', continent: Continent): void }>()

const {scrollTop} = useScrollEvents()
// this make reference to element marked by ref with the same name
const continent = ref<HTMLElement | null>(null)
const heightForSticky = ref(900)

const isSelected = (continent: Continent): boolean => props.modelValue && props.modelValue?.slug === continent?.slug

const chooseContinent = (continent: Continent) => {
  emits('update:modelValue', continent)
}

const calcHeightForSticky = () => {
  if (window.innerWidth <= 1024 && heightForSticky.value != 350) {
    heightForSticky.value = 350
  } else if(heightForSticky.value != 850 && window.innerWidth > 1024) {
    heightForSticky.value = 850
  }
}

onMounted(() => {
  calcHeightForSticky()
  document.addEventListener("resize", calcHeightForSticky)
})

onBeforeUnmount(() => {
  document.removeEventListener("resize", calcHeightForSticky)
})

const classes = '!fixed bg-white top-[80px] lg:top-[104px] 2xl:top-[76px] px-8 left-1/2 -translate-x-1/2'.split(' ')

watch(scrollTop, (value) => {
  const containsClass = continent.value?.classList.contains('!fixed')
  if (value > heightForSticky.value && !containsClass) {
    continent.value?.classList.add(...classes)
  } else if (containsClass && value < heightForSticky.value) {
    continent.value?.classList.remove(...classes)
  }
})
</script>