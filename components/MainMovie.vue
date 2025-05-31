<template>
    <div>
        <v-parallax
        class="position-relative" max-height="75vh" cover :src="`https://image.tmdb.org/t/p/original/${mainMovie.poster_path}`" >
        <!-- Gradient overlay using Vuetify classes -->
        <div class="bg-gradient-to-top from-black to-transparent position-absolute h-100 w-100"></div>
  
        <v-container class="h-100">
          <v-row class="h-100 align-end pb-4 pb-sm-12">
            <v-col cols="12" sm="10" md="8" lg="6">
              <!-- Movie Meta -->
              <div class="d-flex flex-wrap gap-2 mb-4">
                <v-chip color="error" size="small">NOW SHOWING</v-chip>
                <v-chip variant="outlined" color="white" size="small">
                  <v-icon start icon="mdi-clock-outline" size="small"></v-icon>
                  {{ mainMovie.popularity }}
                </v-chip>
              </div>
  
              <!-- Title and Rating -->
              <h1 class="text-h3 text-sm-h2 font-weight-bold mb-4 text-white">
                {{ mainMovie.title }}
              </h1>
              
              <v-rating
                v-model="mainMovie.vote_average"
                color="amber"
                half-increments
                hover
                :size="$vuetify.display.smAndDown ? 'x-small' : 'small'"
                class="mb-4"
              ></v-rating>
  
              <!-- Description -->
              <p class="text-white text-body-2 text-sm-body-1 mb-6">
                {{ mainMovie.overview }}
              </p>
  
              <!-- Action Buttons -->
              <div class="d-flex flex-wrap gap-4">
                <v-btn
                  color="error"
                  :size="$vuetify.display.smAndDown ? 'small' : 'large'"
                  prepend-icon="mdi-play"
                  class="text-none"
                >
                  Watch Trailer
                </v-btn>
                <v-btn
                  variant="outlined"
                  color="white"
                  :size="$vuetify.display.smAndDown ? 'small' : 'large'"
                  prepend-icon="mdi-information"
                  class="text-none"
                >
                  More Info
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { MovieData } from "~/utils/moviesList";
  
  const props = defineProps({
    nowPlaying: {
      type: Object,
      required: true,
    }
  });
  
  const { nowPlaying } = props as { nowPlaying: MovieData };
  
  const mainMovie = computed(() => {
    return nowPlaying.results[0];
  });
  </script>