<template>
  <v-container fluid class="pa-0">
    <!-- Hero Section -->
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-parallax 
          :src="`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`" 
          :height="$vuetify.display.mobile ? 350 : 500"
        >
          <v-container class="fill-height">
            <v-row align="end">
              <v-col cols="12" :class="$vuetify.display.mobile ? 'pb-4' : 'pb-8'">
                <h1 :class="$vuetify.display.mobile ? 'text-h4' : 'text-h2'" class="font-weight-bold text-white mb-4">
                  {{ movieDetails.title }}
                </h1>
                <div class="d-flex flex-wrap ga-2">
                  <v-chip 
                    v-for="(genre, index) in movieDetails.genres" 
                    :key="index" 
                    color="primary" 
                    variant="outlined"
                    :size="$vuetify.display.mobile ? 'small' : 'default'"
                  >
                    {{ genre.name }}
                  </v-chip>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-parallax>
      </v-col>
    </v-row>

    <v-container :class="$vuetify.display.mobile ? 'pa-4' : ''">
      <!-- Movie Info Section -->
      <v-row>
        <v-col cols="12" lg="8">
          <v-card elevation="0">
            <v-card-text :class="$vuetify.display.mobile ? 'pa-4' : ''">
              <!-- Rating and Info Row -->
              <v-row align="center" class="mb-4" no-gutters>
                <v-col cols="12" sm="auto" class="mb-2 mb-sm-0">
                  <div class="d-flex align-center ga-2">
                    <v-rating 
                      v-model="movieDetails.vote_average" 
                      color="amber" 
                      half-increments 
                      readonly 
                      :size="$vuetify.display.mobile ? 'x-small' : 'small'"
                    ></v-rating>
                    <span :class="$vuetify.display.mobile ? 'text-body-2' : 'text-subtitle-1'">
                      {{ movieDetails.vote_average }} / 10
                    </span>
                    <v-chip 
                      color="success" 
                      :size="$vuetify.display.mobile ? 'small' : 'default'"
                    >
                      PG-13
                    </v-chip>
                  </div>
                </v-col>
              </v-row>

              <p :class="$vuetify.display.mobile ? 'text-body-2' : 'text-body-1'" class="mb-4">
                {{ movieDetails.overview }}
              </p>
              
              <v-divider class="my-4"></v-divider>
              
              <!-- Movie Details Grid -->
              <v-row>
                <v-col cols="12" sm="4" class="mb-3 mb-sm-0">
                  <div :class="$vuetify.display.mobile ? 'text-body-1' : 'text-subtitle-1'" class="font-weight-bold">
                    Status
                  </div>
                  <div :class="$vuetify.display.mobile ? 'text-body-2' : 'text-body-1'">
                    {{ movieDetails.status }}
                  </div>
                </v-col>
                <v-col cols="12" sm="4" class="mb-3 mb-sm-0">
                  <div :class="$vuetify.display.mobile ? 'text-body-1' : 'text-subtitle-1'" class="font-weight-bold">
                    Runtime
                  </div>
                  <div :class="$vuetify.display.mobile ? 'text-body-2' : 'text-body-1'">
                    {{ movieDetails.runtime }}min
                  </div>
                </v-col>
                <v-col cols="12" sm="4">
                  <div :class="$vuetify.display.mobile ? 'text-body-1' : 'text-subtitle-1'" class="font-weight-bold">
                    Release Date
                  </div>
                  <div :class="$vuetify.display.mobile ? 'text-body-2' : 'text-body-1'">
                    {{ movieDetails.release_date }}
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Languages Section -->
        <v-col cols="12" lg="4">
          <v-card>
            <v-card-title :class="$vuetify.display.mobile ? 'text-subtitle-1' : 'text-h6'">
              Spoken Languages
            </v-card-title>
            <v-card-text :class="$vuetify.display.mobile ? 'pa-3' : ''">
              <v-list density="compact">
                <v-list-item 
                  v-for="(language, index) in movieDetails.spoken_languages" 
                  :key="index"
                  :class="$vuetify.display.mobile ? 'px-0' : ''"
                >
                  <v-list-item-title :class="$vuetify.display.mobile ? 'text-body-2' : ''">
                    {{ language.english_name }}
                  </v-list-item-title>
                  <template v-slot:append>
                    <v-chip 
                      color="primary" 
                      variant="outlined" 
                      size="small"
                    >
                      {{ language.name }}
                    </v-chip>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Related Movies Section -->
      <v-row class="mt-4">
        <v-col cols="12">
          <h2 
            :class="$vuetify.display.mobile ? 'text-h5' : 'text-h4'" 
            class="font-weight-bold mb-4 text-center" 
            style="color: #282654"
          >
            Related Movies
          </h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-slide-group 
            v-model="model" 
            :class="$vuetify.display.mobile ? 'pa-2' : 'pa-4'" 
            selected-class="bg-primary" 
            show-arrows
            mandatory
          >
            <v-slide-group-item 
              v-for="(related, index) in relatedMovies.results" 
              :key="index" 
              v-slot="{ isSelected, toggle }"
            >
              <v-card 
                :width="$vuetify.display.mobile ? 150 : 200" 
                :class="$vuetify.display.mobile ? 'ma-1' : 'ma-2'" 
                @click="toggle"
                hover
              >
                <v-img 
                  :src="`https://image.tmdb.org/t/p/original/${related.poster_path}`" 
                  :height="$vuetify.display.mobile ? 225 : 300" 
                  cover
                ></v-img>
                <v-card-title 
                  :class="$vuetify.display.mobile ? 'text-body-2 pa-2' : 'pa-3'"
                  style="line-height: 1.2;"
                >
                  {{ related.title }}
                </v-card-title>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-col>
      </v-row>

      <!-- Reviews Section -->
      <v-row class="mt-4">
        <v-col cols="12">
          <v-card :class="$vuetify.display.mobile ? 'h-250' : 'h-300'" class="overflow-y-auto">
            <v-card-title :class="$vuetify.display.mobile ? 'text-subtitle-1 pa-3' : 'text-h6'">
              Reviews
            </v-card-title>
            <v-card-text :class="$vuetify.display.mobile ? 'pa-2' : ''">
              <v-timeline 
                side="end" 
                :density="$vuetify.display.mobile ? 'compact' : 'default'"
              >
                <v-timeline-item 
                  v-for="(review, index) in movieReviews.results" 
                  :key="index" 
                  size="small"
                >
                  <template v-slot:opposite>
                    <div class="text-caption">{{ $timeAgo(review.created_at) }}</div>
                  </template>
                  <v-card elevation="1" :class="$vuetify.display.mobile ? 'mb-2' : ''">
                    <v-card-text :class="$vuetify.display.mobile ? 'pa-3' : ''">
                      <v-row align="center" no-gutters class="mb-2">
                        <v-col cols="auto" class="mr-2">
                          <v-avatar :size="$vuetify.display.mobile ? 28 : 36">
                            <v-img :src="`https://image.tmdb.org/t/p/original/${review.author_details.avatar_path}`"></v-img>
                          </v-avatar>
                        </v-col>
                        <v-col>
                          <div :class="$vuetify.display.mobile ? 'text-body-2' : 'text-body-1'" class="font-weight-bold">
                            {{ review.author_details.name }}
                          </div>
                          <v-rating 
                            v-model="review.author_details.rating" 
                            color="amber" 
                            readonly 
                            size="x-small"
                          ></v-rating>
                        </v-col>
                      </v-row>
                      <p 
                        :class="$vuetify.display.mobile ? 'text-caption' : 'text-body-2'" 
                        class="mb-0"
                        style="line-height: 1.4;"
                      >
                        {{ $vuetify.display.mobile && review.content.length > 150 
                          ? review.content.substring(0, 150) + '...' 
                          : review.content 
                        }}
                      </p>
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
</script>