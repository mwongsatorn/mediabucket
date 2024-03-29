<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
import IconChevronLeft from "./Icons/IconChevronLeft.vue";
import IconChevronRight from "./Icons/IconChevronRight.vue";

interface Props {
  name: string;
  title: string;
  to?: string;
}

type Position = "START" | "END" | "NEITHER";

const props = defineProps<Props>();

const scroll = ref<HTMLElement | null>(null);
const scrollPos = ref<Position>("START");
const isScrollable = ref<boolean>(false);

const observer = new ResizeObserver((entries) => {
  const entry = entries[0];
  if (entry.target.clientWidth === entry.target.scrollWidth)
    isScrollable.value = false;
  else isScrollable.value = true;
});

function scrollHorizontally(dir: 1 | -1) {
  const scrollElement = scroll.value;
  if (!scrollElement) return;
  const scrollWidth = scrollElement.clientWidth;
  const scrollAmount = scrollWidth * dir;

  scrollElement.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
}

function handleCarouselScroll() {
  const scrollElement = scroll.value;
  if (!scrollElement) return;
  const isAtStart = scrollElement.scrollLeft === 0;
  const isAtEnd =
    scrollElement.scrollWidth -
      scrollElement.scrollLeft -
      scrollElement.clientWidth <
    1;
  const isBetweenStartAndEnd = !isAtStart && !isAtEnd;

  if (isAtStart) scrollPos.value = "START";
  if (isAtEnd) scrollPos.value = "END";
  if (isBetweenStartAndEnd) scrollPos.value = "NEITHER";
}

onMounted(() => {
  observer.observe(scroll.value!);
  scroll.value?.addEventListener("scroll", handleCarouselScroll);
});

onUnmounted(() => {
  observer.disconnect();
  scroll.value?.removeEventListener("scroll", handleCarouselScroll);
});
</script>

<template>
  <section :id="props.name" class="my-8 px-4">
    <div class="relative mx-auto max-w-7xl">
      <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h1 class="text-xl font-bold capitalize sm:text-2xl">
          {{ props.title }}
        </h1>
        <RouterLink
          class="text-sm font-bold text-rose-800 hover:text-rose-900"
          v-if="props.to"
          :to="props.to"
        >
          View more
        </RouterLink>
        <slot name="button"></slot>
      </div>
      <div class="relative @container">
        <div
          ref="scroll"
          class="main-scrollbar flex snap-x snap-mandatory gap-x-2 overflow-x-auto scroll-smooth py-4 childs:w-[45%] @md:childs:w-[30%] @2xl:childs:w-[22.5%] @5xl:childs:w-[18%]"
        >
          <slot name="cards"></slot>
        </div>
        <button
          @click="scrollHorizontally(-1)"
          class="absolute left-0 top-4 h-[calc(100%-2.5rem)] w-[calc(10%-1rem)] items-center justify-center bg-gradient-to-r from-black to-transparent text-white opacity-40 duration-300 hover:opacity-80 @md:w-[calc(10%-1.5rem)] @2xl:w-[calc(10%-2rem)] @5xl:w-[calc(10%-2.5rem)]"
          :class="[
            scrollPos === 'START' || !isScrollable
              ? 'hidden'
              : 'hidden sm:flex',
          ]"
        >
          <IconChevronLeft class="h-6 w-6" />
        </button>
        <button
          @click="scrollHorizontally(1)"
          class="absolute right-0 top-4 h-[calc(100%-2.5rem)] w-[calc(10%-1rem)] items-center justify-center bg-gradient-to-l from-black to-transparent text-white opacity-40 duration-300 hover:opacity-80 @md:w-[calc(10%-1.5rem)] @2xl:w-[calc(10%-2rem)] @5xl:w-[calc(10%-2.5rem)]"
          :class="[
            scrollPos === 'END' || !isScrollable ? 'hidden' : 'hidden sm:flex',
          ]"
        >
          <IconChevronRight class="h-6 w-6" />
        </button>
      </div>
    </div>
  </section>
</template>
