<template>
    <v-container class="movie-details">
        <v-row>
            <!-- Movie Hero Section -->
            <v-col cols="12" class="pa-0">
                <v-parallax
                    :src="`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`"
                    height="500">
                    <div class="hero-overlay">
                        <h1 class="text-h2 font-weight-bold text-white mb-4">
                            {{movieDetails.title}}
                        </h1>
                        <v-chip v-for="(genre, index) in movieDetails.genres" :key="index" class="ma-1" color="primary" variant="outlined">
                            {{ genre.name }}
                        </v-chip>
                    </div>
                </v-parallax>
            </v-col>

            <!-- Movie Info Section -->
            <v-col cols="12" md="8" class="pt-6">
                <v-card elevation="0">
                    <v-card-text>
                        <div class="d-flex align-center mb-4">
                            <v-rating v-model="movieDetails.vote_average" color="amber" half-increments readonly size="small"></v-rating>
                            <span class="text-subtitle-1 ml-2">{{ movieDetails.vote_average }} / 10</span>
                            <v-chip class="ml-4" color="success">PG-13</v-chip>
                        </div>

                        <p class="text-body-1 mb-4">
                           {{movieDetails.overview}}
                        </p>

                        <v-divider class="my-4"></v-divider>

                        <div class="d-flex flex-wrap">
                            <div class="mr-8 mb-4">
                                <div class="text-subtitle-1 font-weight-bold">Status</div>
                                <div class="text-body-1">{{movieDetails.status}}</div>
                            </div>
                            <div class="mr-8 mb-4">
                                <div class="text-subtitle-1 font-weight-bold">Runtime</div>
                                <div class="text-body-1">{{movieDetails.runtime}}min</div>
                            </div>
                            <div class="mr-8 mb-4">
                                <div class="text-subtitle-1 font-weight-bold">Release Date</div>
                                <div class="text-body-1">{{movieDetails.release_date}}</div>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>

                <!-- Cast Section -->
                <v-card elevation="0" class="mt-6">
                    <v-card-title class="text-h5 font-weight-bold">Related Movies</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col v-for="(related, index) in relatedMovies.results" :key="index" cols="12" sm="6" md="4">
                                <v-card>
                                    <v-img :src="`https://image.tmdb.org/t/p/original/${related.poster_path}`" height="300" cover></v-img>
                                    <v-card-title>{{ related.title }}</v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Sidebar -->
            <v-col cols="12" md="4" class="pt-6">
                <v-card class="mb-6">
                    <v-card-title class="text-h6">Spoken Languanges</v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item v-for="(languange, index) in movieDetails.spoken_languages" :key="index">
                                <v-list-item-title>
                                    {{ languange.english_name }}
                                </v-list-item-title>
                                <template v-slot:append>
                                    <v-chip  class="ma-1" color="primary"
                                        variant="outlined" size="small">
                                        {{ languange.name }}
                                    </v-chip>
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>

                <v-card class="h-50 overflow-y-auto">
                    <v-card-title class="text-h6">Reviews</v-card-title>
                    <v-card-text>
                        <v-timeline side="end">
                            <v-timeline-item v-for="(review, index) in movieReviews.results" :key="index" size="small">
                                <template v-slot:opposite>
                                    <div class="text-caption">{{ $timeAgo(review.created_at) }}</div>
                                </template>
                                <v-card elevation="1">
                                    <v-card-text>
                                        <div class="d-flex align-center mb-2">
                                            <v-avatar size="36" class="mr-2">
                                                <v-img :src="`https://image.tmdb.org/t/p/original/${review.author_details.avatar_path}`"></v-img>
                                            </v-avatar>
                                            <div>
                                                <div class="font-weight-bold">{{ review.author_details.name }}</div>
                                                <v-rating v-model="review.author_details.rating" color="amber" readonly
                                                    size="x-small"></v-rating>
                                            </div>
                                        </div>
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
</template>

<script setup lang="ts">
const loading = ref<Boolean>(false)
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
const { movieDetails, movieReviews, relatedMovies  } = props as { movieDetails: MovieDetails, movieReviews: MovieReviews, relatedMovies: MovieData }

onMounted(async () => {
    console.log('Details', movieDetails)
    console.log('Review', movieReviews)
    console.log('Related Movies', relatedMovies)
})

</script>

<style scoped>
.hero-overlay {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem;
}

.movie-details {
    max-width: 1400px;
}
</style>