<template>
    <div class="search-container">
      <v-text-field
        v-model="searchQuery"
        :loading="isLoading"
        density="compact"
        placeholder="Find your movie"
        variant="solo"
        hide-details
        append-inner-icon="mdi-magnify"
        single-line
        clearable
        @update:model-value="handleSearch"
        @click:clear="clearSearch"
        class="mr-5 search-field"
      >
        <template v-slot:append>
          <v-progress-circular
            v-if="isLoading"
            indeterminate
            size="20"
          ></v-progress-circular>
        </template>
      </v-text-field>
      <v-dialog
        v-model="showResults"
        max-width="1200px"
        scrollable
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar color="#282654" title="Search Results">
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" variant="text" @click="showResults = false"></v-btn>
          </v-toolbar>
  
          <v-card-text class="pa-4">
            <v-row v-if="movies.length > 0">
              <v-col v-for="movie in movies" :key="movie.id" cols="12" sm="6" md="4" lg="3">
                <v-card height="100%" class="d-flex flex-column">
                  <v-img
                    :src="movie.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/500x750?text=No+Image'"
                    height="375"
                    cover
                    class="align-end"
                  >
                    <v-card-title class="text-white bg-black bg-opacity-50 text-truncate">
                      {{ movie.title }}
                    </v-card-title>
                  </v-img>
                  
                  <v-card-text class="flex-grow-1">
                    <div class="d-flex align-center mb-2">
                      <v-rating
                        :model-value="movie.vote_average / 2"
                        color="amber"
                        density="compact"
                        half-increments
                        readonly
                        size="small"
                      ></v-rating>
                      <span class="ms-2 text-caption">{{ movie.vote_average.toFixed(1) }}/10</span>
                    </div>
                    <div class="text-caption text-medium-emphasis mb-2">
                      Release Date: {{ new Date(movie.release_date).toLocaleDateString() }}
                    </div>
                    <p class="text-caption text-medium-emphasis text-truncate-3">
                      {{ movie.overview }}
                    </p>
                  </v-card-text>
  
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      variant="tonal"
                      color="primary"
                      @click="showMovieDetails(movie)"
                    >
                      More Info
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
  
            <v-card v-else-if="hasSearched && !isLoading" class="mt-4 pa-4 text-center">
              <v-card-text>
                No movies found matching your search.
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import debounce from "lodash/debounce";
  const config = useRuntimeConfig();
  const token = config.public.tmdbToken;
  
  // State
  const searchQuery = ref('')
  const movies = ref<Movie[]>([])
  const isLoading = ref(false)
  const hasSearched = ref(false)
  const showResults = ref(false)
  
  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      clearSearch()
      return
    }
  
    try {
      isLoading.value = true
      const response = await $fetch<SearchResponse>(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      movies.value = response.results
      hasSearched.value = true
      showResults.value = true // Show dialog when results are available
    } catch (error) {
      console.error('Error searching movies:', error)
      movies.value = []
    } finally {
      isLoading.value = false
    }
  }
  
  const clearSearch = () => {
    movies.value = []
    hasSearched.value = false
    searchQuery.value = ''
    showResults.value = false
  }
  
  const handleSearch = debounce((value: string) => {
    searchMovies(value)
  }, 300)
  
  onBeforeUnmount(() => {
    handleSearch.cancel()
  })
  
  const showMovieDetails = (movie: Movie) => {
    console.log('Show details for movie:', movie)
    navigateTo(`/details/${movie.id}`)
    showResults.value = false
  }
  
  watch(searchQuery, (newValue) => {
    if (!newValue.trim()) {
      showResults.value = false
    }
  })
  </script>
  
  <style scoped>
  .search-container {
    position: relative;
    width: 300px;
  }
  
  /* Add these new styles for cursor visibility */
  :deep(.search-field) {
    .v-field__input {
      caret-color: currentColor !important;
      cursor: text !important;
    }
  
    .v-field--focused {
      .v-field__outline {
        --v-field-border-opacity: 1 !important;
      }
    }
  }
  
  .text-truncate-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .bg-opacity-50 {
    background-color: rgba(0, 0, 0, 0.5) !important;
  }
  
  :deep(.v-dialog > .v-card > .v-card-text) {
    padding-top: 16px;
  }
  </style>