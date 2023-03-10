<script setup lang="ts">
import { getPopularMedia, getTrendingMedia } from "@/composables/tmdb";
import MediaCard from "@/components/MediaCard.vue";
import { RouterLink } from "vue-router";

const { data: trendingMedia } = getTrendingMedia("all", "week");
const { data: popularMovies } = getPopularMedia("movie");
const { data: popularSeries } = getPopularMedia("tv");
</script>

<template>
  <main>
    <section
      id="trending-media"
      class="main-scrollbar flex snap-x snap-mandatory overflow-auto"
    >
      <div
        v-for="media in trendingMedia?.results.slice(0, 7)"
        :key="media.id"
        class="relative h-[480px] w-full shrink-0 snap-start bg-black"
      >
        <img
          class="absolute top-0 right-0 h-[50%] w-full object-cover sm:h-full sm:w-[50%]"
          :src="`https://image.tmdb.org/t/p/w1280/${media.backdrop_path}`"
          alt=""
        />
        <div
          class="relative mx-auto h-full max-w-7xl bg-gradient-to-t from-black via-black to-transparent sm:bg-gradient-to-r"
        >
          <div
            class="flex h-full w-full flex-col justify-end space-y-8 px-4 pb-12 text-white sm:w-[50%] sm:justify-center"
          >
            <div
              v-if="media.media_type === 'movie'"
              class="text-2xl font-bold line-clamp-2"
            >
              {{ media.title }} ({{ media?.release_date?.split("-")[0] }})
            </div>
            <div v-else class="text-2xl font-bold">
              {{ media.name }} ({{ media?.first_air_date?.split("-")[0] }})
            </div>
            <div class="text-sm line-clamp-3">
              {{ media.overview }}
            </div>
            <RouterLink
              v-if="media.media_type === 'movie'"
              :to="`movies/${media.id}`"
              class="w-fit rounded-lg bg-rose-800 px-4 py-2 text-sm hover:bg-amber-500"
            >
              More details
            </RouterLink>
            <RouterLink
              v-else
              :to="`series/${media.id}`"
              class="w-fit rounded-lg bg-rose-800 px-4 py-2 text-sm hover:bg-amber-500"
            >
              More details
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
    <section id="popular-movies" class="mx-auto my-8 max-w-7xl px-4">
      <h1 class="text-2xl font-bold">Popular Movies</h1>
      <div class="main-scrollbar flex space-x-2 overflow-auto py-6 px-1">
        <MediaCard
          v-for="movie in popularMovies?.results.splice(0, 10)"
          :key="movie.id"
          :id="movie.id"
          :title="movie.title"
          :vote_average="movie.vote_average"
          :release_date="movie.release_date"
          :poster_path="movie.poster_path"
          media_type="movies"
        />
      </div>
    </section>
    <section id="popular-series" class="mx-auto my-8 max-w-7xl px-4">
      <h1 class="text-2xl font-bold">Popular Series</h1>
      <div class="main-scrollbar flex space-x-2 overflow-auto px-1 py-6">
        <MediaCard
          v-for="serie in popularSeries?.results.splice(0, 10)"
          :key="serie.id"
          :id="serie.id"
          :title="serie.name"
          :vote_average="serie.vote_average"
          :release_date="serie.first_air_date"
          :poster_path="serie.poster_path"
          media_type="series"
        />
      </div>
    </section>
  </main>
</template>
