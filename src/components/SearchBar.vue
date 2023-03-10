<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import IconsSearch from "./Icons/IconSearch.vue";
import IconHamburgerMenu from "./Icons/IconHamburgerMenu.vue";
import IconCross from "./Icons/IconCross.vue";

interface Props {
  isSpecificPages: boolean;
  isScrolled: boolean;
}
const props = defineProps<Props>();

interface Emits {
  (e: "closeSearchbar"): void;
  (e: "expandSearchbar"): void;
}
const emit = defineEmits<Emits>();

const isExpanded = ref(false);

function closeSearchbar() {
  isExpanded.value = false;
  emit("closeSearchbar");
}

function expandSearchbar() {
  isExpanded.value = true;
  emit("expandSearchbar");
}

function handleResize() {
  if (window.innerWidth > 640) {
    isExpanded.value = false;
    emit("closeSearchbar");
  }
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div
    class="w-full max-w-xl sm:ml-auto sm:pl-8"
    :class="isExpanded ? 'flex' : 'hidden sm:flex'"
  >
    <button
      @click="closeSearchbar"
      class="mr-4"
      :class="isExpanded ? '' : 'hidden'"
    >
      <IconCross
        class="h-6 w-6"
        :class="props.isScrolled || !props.isSpecificPages ? '' : 'text-white'"
      ></IconCross>
    </button>
    <input
      class="w-full rounded-l-lg border-2 bg-transparent py-1 px-4 focus:outline-none"
      :class="
        props.isScrolled || !props.isSpecificPages
          ? 'focus:border-black'
          : 'text-white'
      "
      placeholder="Search for a movie, serie or person ..."
      type="text"
    />
    <button class="items-stretch rounded-r-lg bg-red-700 px-2">
      <IconsSearch class="h-6 w-6 text-white"></IconsSearch>
    </button>
  </div>
  <div class="ml-auto flex items-center space-x-4 sm:hidden">
    <button
      @click="expandSearchbar"
      class="items-stretch rounded-full"
      :class="isExpanded ? 'hidden' : ''"
    >
      <IconsSearch
        class="h-6 w-6"
        :class="props.isScrolled || !props.isSpecificPages ? '' : 'text-white'"
      ></IconsSearch>
    </button>
    <button :class="isExpanded ? 'hidden' : ''">
      <IconHamburgerMenu
        class="h-6 w-6"
        :class="props.isScrolled || !props.isSpecificPages ? '' : 'text-white'"
      ></IconHamburgerMenu>
    </button>
  </div>
</template>
