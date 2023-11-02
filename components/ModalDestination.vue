<template>
  <teleport to="body">
    <div v-if="destination" class="fixed z-[100] inset-0 py-24 px-2">
      <!-- Back -->
      <div class="absolute inset-0 bg-gray-300/60 cursor-pointer" @click="$emit('close')"></div>

      <!-- Content -->
      <div class="absolute container z-10 w-full mx-auto bg-white left-1/2 -translate-x-1/2 px-5 pt-6 pb-12 rounded-lg">
        <!-- Head -->
        <div class="flex justify-between mb-6">
          <h3 class="text-gray-700 text-xl font-bold">{{ destination.title }}</h3>
          <div
              class="p-1 border border-gray-300 rounded-full group hover:bg-red-600 transition hover:border-white cursor-pointer">
            <XMarkIcon @click="$emit('close')" class="w-8 group-hover:text-white transition"/>
          </div>
        </div>
        <!-- Body -->
        <div class="flex gap-8 flex-col md:flex-row">
          <picture class="md:lg-1/2 lg:w-1/3">
            <source media="(min-width:1024px)"
                    :srcset="destination.thumbnailImage.desktop.thumbnailUrl ?? '/default.png'">
            <img :src="destination.thumbnailImage.mobile.thumbnailUrl ?? '/default.png'" :alt="destination.title"
                 class="w-full rounded-lg">
          </picture>
          <!-- Information -->
          <div class="text-gray-600 md:lg-1/2 lg:w-2/3">
            <div class="text-lg mb-4"><span class="text-gray-700 font-bold">Country:</span> {{ destination.destinationLabel }}</div>
            <div class="text-lg mb-4" v-show="destination.airports"><span class="text-gray-700 font-bold">Airport:</span> {{ destination.airports?.inboundDepartureCity }}</div>
            <div class="text-lg mb-4"><span class="text-gray-700 font-bold">Number of days:</span> {{ destination.numberOfDays }}</div>
            <div class="text-lg mb-4"><span class="text-gray-700 font-bold">Is bookable:</span> {{ destination.isBookable ? 'Yes' : 'No' }}</div>
            <div class="text-lg mb-4 flex" v-show="destination.feefoRating">
              <span class="mr-2 text-gray-700 font-bold">Rating from {{ destination.feefoRating?.count }} people: </span>
              <StarFullIcon class="w-6 text-yellow-600" v-for="i in stars" :key="i" />
              <StarIcon class="w-6 text-gray-700" v-for="i in (5 - stars)" :key="i"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import {PropType} from "vue"
import Destination from "~/types/destination"
import {XMarkIcon, StarIcon} from '@heroicons/vue/24/outline'
import {StarIcon as StarFullIcon} from '@heroicons/vue/24/solid'

const props = defineProps({
  destination: {
    type: Object as PropType<Destination | null>
  },
})

const stars = computed((): number => {
  return Math.round(props.destination?.feefoRating?.rating ?? 0)
})

defineEmits(['close'])
</script>