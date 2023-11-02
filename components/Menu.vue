<template>
  <div class="h-[88px] lg:h-[104px] 2xl:h-[76px]">
    <div class="w-full py-4 top-0 z-50" ref="menu">
      <nav class="flex justify-between container mx-auto gap-x-4 px-4">
        <div class="flex text-white items-center">
          <h1 class="capitalize md:text-xl font-bold lg:text-3xl">UNBRANDED</h1>
          <!--  Desktop  -->
          <hr class="hidden lg:block h-6 bg-white w-px mx-4">
          <div class="lg:flex items-center hidden">
            <MagnifyingGlassIcon class="w-7 mr-4"/>
            <p class="text-xl">Cerca su Unbranded</p>
          </div>
          <!--  End  -->
        </div>
        <!--  Desktop  -->
        <div class="text-white text-lg items-center lg:flex gap-6 hidden">
          <a href="#" class="flex items-center">Viaggi
            <ChevronDownIcon class="w-4 stroke-[3] ml-2"/>
          </a>
          <a href="#" class="flex items-center">Come funziona</a>
          <a href="#" class="flex items-center">Fasce d'eta</a>
          <a href="#" class="flex items-center">Offerte</a>
          <button class="px-4 py-2 text-lg bg-white text-red-500 rounded-lg">Turni confermati</button>
          <a href="#" class="flex items-center">FAQ</a>
          <button class="flex h-[44px] items-center border-2 border-white px-[.35rem] py-1 rounded-full">
            <span class="rounded-full bg-gray-100 p-1 w-8 h-8"><UserIcon class="w-full text-gray-700"/></span>
            <ChevronDownIcon class="w-4 stroke-[3] ml-2"/>
          </button>
        </div>
        <!--  Mobile  -->
        <InputSearch class="lg:hidden flex-1" text-white placeholder="Cerca..."/>
        <div class="lg:hidden relative text-white cursor-pointer w-12">
          <MinusIcon class="absolute -translate-y-1.5 -translate-x-1.5" />
          <MinusIcon class="absolute translate-y-1.5 translate-x-1.5" />
        </div>
      </nav>
    </div>
  </div>
</template>
<script setup lang="ts">
import {MinusIcon, ChevronDownIcon, MagnifyingGlassIcon} from '@heroicons/vue/24/outline'
import {UserIcon} from '@heroicons/vue/24/solid'
import useScrollEvents from "~/composables/useScrollEvents"

const menu = ref<HTMLElement | null>(null)

const {scrollTop} = useScrollEvents()
const classes = 'fixed bg-[#1044ae]'.split(' ')

watch(scrollTop, (value) => {
  const containsClass = menu.value?.classList.contains('fixed')
  if (value > 50 && !containsClass) {
    menu.value?.classList.add(...classes)
  } else if (containsClass && value < 50) {
    menu.value?.classList.remove(...classes)
  }
})

</script>