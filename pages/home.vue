<template>
  <div>
    <button @click="getMovies()">Fetch data:</button>
    <div v-if="loading">
      <v-row>
        <v-col cols="12" md="12">
          <v-skeleton-loader
            class="mx-auto border"
            max-width="1200"
            type="image, article"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
    <div v-else>
    <MainMovie :movieData="movies" />
    </div>
    <div>
      <v-row align="center" justify="center">
        <v-col>
          <h1 style="color: #282654" class="text-h4 font-weight-bold mt-4">
            Trending Movies
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="n in 12" :key="n" cols="12" sm="6" md="4" lg="3">
          <MovieCard />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MovieData } from "~/utils/moviesList";
const config = useRuntimeConfig();
const token = config.public.tmdbToken;
var movies = ref<MovieData>();
const loading = ref<Boolean>(false)

onMounted(async () => {
  // const { data, error } = await useAuthFetch('/authentication');
});

async function getMovies() {
  try {
    loading.value = true
    movies = await $fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    loading.value = false

    console.log("data", movies);
  } catch (error) {
    console.log("error", error);
  }
}
</script>

<style scoped>
.text-h3 {
  background: linear-gradient(45deg, #1867c0, #5cbbf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>