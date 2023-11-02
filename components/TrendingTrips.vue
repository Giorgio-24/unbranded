<template>
  <div class="px-6 md:px-0">
    <h3 class="text-gray-900 mb-6 md:mb-12 text-xl font-bold hidden md:block">Trending Trips</h3>
    <h3 class="text-gray-900 mb-6 md:mb-12 text-xl font-bold md:hidden">Trending tours in {{ continent.name }}</h3>
    <div class="grid repeat gap-10 overflow-x-auto scroll-smooth scroll-mr-12 pb-4 touch-auto">
      <article v-for="trip in data" :key="trip.slug" class="grid grid-cols-3 gap-x-4 cursor-pointer" @click="$emit('destination', trip)">
        <div class="h-24 rounded-lg w-24 overflow-hidden relative">
          <picture class="absolute top-0 bottom-0 left-1/2 -translate-x-1/2">
            <source media="(min-width:1024px)" :srcset="trip.thumbnailImage.desktop.thumbnailUrl ?? '/default.png'">
            <img :src="trip.thumbnailImage.mobile.thumbnailUrl ?? '/default.png'" :alt="trip.title" class="h-24 w-auto max-w-max">
          </picture>
        </div>
        <div class="grid col-span-2">
          <h4 class="text-gray-800 text-lg">{{ trip.title.slice(0, 30) }} {{ trip.title.length > 30 ? '...' : '' }}</h4>
          <span class="text-gray-500 text-md">{{ trip.numberOfDays }} {{ trip.numberOfDays == 1 ? 'giorno' : 'giorni' }}</span>
        </div>
      </article>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {PropType} from "vue"
import Destination from "~/types/destination"
import Continent from "~/types/continent";

defineProps({
  continent: {
    type: Object as PropType<Continent>,
    required: true
  },
  data: {
    type: Array as PropType<Destination[]>,
    required: true,
  }
})

defineEmits<{(e: 'destination', destination: Destination): void}>()
</script>
<style>
.repeat {
  grid-template-columns: repeat(4, minmax(320px, 350px));
}
</style>