<template>
    <v-container fluid class="pa-0">
      <!-- Hero Section -->
      <v-row>
        <v-col cols="12" class="pa-0">
          <v-parallax :src="`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`" height="500">
            <v-container class="fill-height">
              <v-row align="end">
                <v-col cols="12" class="pb-8">
                  <h1 class="text-h2 font-weight-bold text-white mb-4">
                    {{ movieDetails.title }}
                  </h1>
                  <v-chip v-for="(genre, index) in movieDetails.genres" :key="index" class="ma-1" color="primary" variant="outlined">
                    {{ genre.name }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-container>
          </v-parallax>
        </v-col>
      </v-row>
  
      <v-container>
        <!-- Movie Info Section -->
        <v-row>
          <v-col cols="12" md="8">
            <v-card elevation="0">
              <v-card-text>
                <v-row align="center" class="mb-4">
                  <v-col cols="auto">
                    <v-rating v-model="movieDetails.vote_average" color="amber" half-increments readonly size="small"></v-rating>
                  </v-col>
                  <v-col cols="auto">
                    <span class="text-subtitle-1">{{ movieDetails.vote_average }} / 10</span>
                  </v-col>
                  <v-col cols="auto">
                    <v-chip color="success">PG-13</v-chip>
                  </v-col>
                </v-row>
  
                <p class="text-body-1 mb-4">{{ movieDetails.overview }}</p>
                
                <v-divider class="my-4"></v-divider>
                
                <v-row>
                  <v-col cols="12" sm="4">
                    <div class="text-subtitle-1 font-weight-bold">Status</div>
                    <div class="text-body-1">{{ movieDetails.status }}</div>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <div class="text-subtitle-1 font-weight-bold">Runtime</div>
                    <div class="text-body-1">{{ movieDetails.runtime }}min</div>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <div class="text-subtitle-1 font-weight-bold">Release Date</div>
                    <div class="text-body-1">{{ movieDetails.release_date }}</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
  
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title class="text-h6">Spoken Languages</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item v-for="(language, index) in movieDetails.spoken_languages" :key="index">
                    <v-list-item-title>{{ language.english_name }}</v-list-item-title>
                    <template v-slot:append>
                      <v-chip color="primary" variant="outlined" size="small">{{ language.name }}</v-chip>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
  
        <!-- Related Movies Section -->
        <v-row>
          <v-col cols="12">
            <h2 class="text-h4 font-weight-bold mt-4 text-center" style="color: #282654">
              Related Movies
            </h2>
          </v-col>
        </v-row>
  
        <v-row>
          <v-col cols="12">
            <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" mandatory>
              <v-slide-group-item v-for="(related, index) in relatedMovies.results" :key="index" v-slot="{ isSelected, toggle }">
                <v-card width="200" class="ma-2" @click="toggle">
                  <v-img :src="`https://image.tmdb.org/t/p/original/${related.poster_path}`" height="300" cover></v-img>
                  <v-card-title>{{ related.title }}</v-card-title>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-col>
        </v-row>
  
        <!-- Reviews Section -->
        <v-row>
          <v-col cols="12">
            <v-card class="h-300 overflow-y-auto">
              <v-card-title class="text-h6">Reviews</v-card-title>
              <v-card-text>
                <v-timeline side="end">
                  <v-timeline-item v-for="(review, index) in movieReviews.results" :key="index" size="small">
                    <template v-slot:opposite>
                      <div class="text-caption">{{ $timeAgo(review.created_at) }}</div>
                    </template>
                    <v-card elevation="1">
                      <v-card-text>
                        <v-row align="center" no-gutters class="mb-2">
                          <v-col cols="auto" class="mr-2">
                            <v-avatar size="36">
                              <v-img :src="`https://image.tmdb.org/t/p/original/${review.author_details.avatar_path}`"></v-img>
                            </v-avatar>
                          </v-col>
                          <v-col>
                            <div class="font-weight-bold">{{ review.author_details.name }}</div>
                            <v-rating v-model="review.author_details.rating" color="amber" readonly size="x-small"></v-rating>
                          </v-col>
                        </v-row>
                        <p class="text-body-2 mb-0">{{ review.content }}</p>
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </template>
  
  <script setup lang="ts">
  const model = ref(null)
  const props = defineProps({
    movieDetails: {
      type: Object,
      required: true,
    },
    movieReviews: {
      type: Object,
      required: true,
    },
    relatedMovies: {
      type: Object,
      required: true,
    }
  })
  
  const { movieDetails, movieReviews, relatedMovies } = props as { 
    movieDetails: MovieDetails, 
    movieReviews: MovieReviews, 
    relatedMovies: MovieData 
  }
  
  onMounted(() => {
    console.log('Details', movieDetails)
    console.log('Review', movieReviews)
    console.log('Related Movies', relatedMovies)
  })
  </script>