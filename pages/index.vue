<template>
  <div>
    <Header></Header>
    <div class="container mx-auto">
      <Continents :continents="continents" v-model="selectedContinent"/>
      <hr class="hidden md:block w-full mb-12">
      <TrendingTrips @destination="setDestination" :data="economicDestinations" :continent="selectedContinent"/>
      <hr class="hidden md:block w-full my-12">
      <Destinations @destination="setDestination" class="mt-10" :destinations="destinationsOfContinent"
                    :continent="selectedContinent"/>
    </div>
    <ModalDestination @close="setDestination(null)" :destination="selectedDestination"/>
  </div>
</template>
<script setup lang="ts">
import useDestination from '~/composables/useDestination'
import Destination from "~/types/destination";
 
const {continents, destinations} = useDestination()

const selectedContinent = ref(continents[0])
const selectedDestination = ref<Destination | null>(null)

useHead({
  title: 'Unbranded',
  meta: [
    {name: 'description', content: 'My amazing site.'}
  ],
})

const setDestination = (destination: Destination | null) => {
  selectedDestination.value = destination
}

let destinationsOfContinent = computed((): Destination[] => {
  return destinations.filter(destination => destination.primaryDestination.primaryContinent.slug == selectedContinent.value.slug)
})

let economicDestinations = computed((): Destination[] => {
  return destinations.filter(destination => destination.bestTour && destination.primaryDestination.primaryContinent.slug == selectedContinent.value.slug)
      .sort((a, b) => {
        if (a.bestTour.price < b.bestTour.price)
          return -1
        if (a.bestTour.price > b.bestTour.price)
          return 1
        return 0
      })
      .slice(0, 8)
})
</script>
