<template>
  <div class="mb-12 md:mb-36 px-4 md:p-0">
    <InputSearch v-model="search" border :placeholder="'Cerca viaggi in ' + continent.name" />
    <div class="grid gap-x-4 md:gap-x-16 gap-y-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 md:mt-12">
      <article class="md:border-0 border px-2 py-2 md:p-0 border-gray-200 rounded-lg cursor-pointer" v-for="trip in searchedDestinations.slice(0, 16)" :key="trip.slug" @click="$emit('destination', trip)">
        <h4 class="text-gray-800 text-lg mb-2">{{ trip.title.slice(0, 30) }} {{ trip.title.length > 30 ? '...' : '' }}</h4>
        <span class="text-gray-500 text-md">{{ trip.numberOfDays }} {{
            trip.numberOfDays == 1 ? 'giorno' : 'giorni'
          }}</span>
      </article>
    </div>
  </div>
</template>
<script setup lang="ts">
import {PropType} from "vue"
import Destination from "~/types/destination"
import Continent from "~/types/continent"

const props = defineProps({
  destinations: {
    type: Array as PropType<Destination[]>,
    required: true,
  },
  continent: {
    type: Object as PropType<Continent>,
    required: true,
  }
})

defineEmits<{(e: 'destination', destination: Destination): void}>()

const search = ref("")

const searchedDestinations = computed((): Destination[] => {
  if (search.value == null || search.value.trim() == '') {
    return props.destinations
  }

  return props.destinations?.filter(destination => {
    const nameCountry = destination.destinationLabel.toLowerCase()
    const title = destination.title.toLowerCase()
    const searched = search.value.toLowerCase()
    if (title.search(searched) != -1 || title.includes(searched) || title.match(searched)) {
      return true
    }

    return nameCountry.search(searched) != -1 || nameCountry.includes(searched) || nameCountry.match(searched)
  })
})
</script>