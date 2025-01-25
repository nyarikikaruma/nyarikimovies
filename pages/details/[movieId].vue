<template>
    <div v-if="loading">
        <v-skeleton-loader class="mx-auto" elevation="2" max-width="700" type="card-avatar, article, actions"></v-skeleton-loader>
    </div>
    <div v-else>
            <DetailsCard v-if="movieReviews && moviesDetails" :relatedMovies="relatedMovies" :movieDetails = "moviesDetails" :movieReviews="movieReviews" />
    </div>
</template>

<script setup lang="ts">
const loading = ref<Boolean>(false)
const config = useRuntimeConfig();
const token = config.public.tmdbToken;
const route = useRoute()
const movieId = route.params.movieId
var moviesDetails = {}
var movieReviews = {}
var relatedMovies = {}


onMounted( async () =>  {
    await getMovieDetails()
})

const getMovieDetails = async () => {
    loading.value = true
    moviesDetails = await $fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      movieReviews = await $fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      relatedMovies = await $fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

    loading.value = false
}
</script>

<style scoped>
</style>