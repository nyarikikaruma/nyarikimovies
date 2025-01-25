<template>
    <div class="movie-banner">
        <v-img :src="`https://image.tmdb.org/t/p/original/${mainMovie.poster_path}`" height="600" cover class="movie-banner__image">
            <!-- Gradient overlay -->
            <div class="movie-banner__overlay"></div>

            <!-- Content -->
            <v-container class="movie-banner__content fill-height">
                <v-row align="end" class="fill-height pb-12">
                    <v-col cols="12" md="8">
                        <!-- Movie Meta -->
                        <div class="d-flex align-center mb-4">
                            <v-chip color="error" class="mr-2">NOW SHOWING</v-chip>
                            <v-chip variant="outlined" color="white">
                                <v-icon start icon="mdi-clock-outline"></v-icon>
                                {{ mainMovie.popularity }}
                            </v-chip>
                        </div>

                        <!-- Title and Rating -->
                        <h1 class="text-h2 font-weight-bold mb-4 text-white">
                            {{ mainMovie.title }}
                        </h1>
                        <v-rating v-model="mainMovie.vote_average" color="amber" half-increments hover size="small"
                            class="mb-4"></v-rating>

                        <!-- Description -->
                        <p class="text-white text-body-1 mb-6 movie-banner__description">
                            {{ mainMovie.overview }}
                        </p>

                        <!-- Action Buttons -->
                        <div class="d-flex gap-4">
                            <v-btn color="error" size="large" prepend-icon="mdi-play" class="text-none">
                                Watch Trailer
                            </v-btn>
                            <v-btn variant="outlined" color="white" size="large" prepend-icon="mdi-information"
                                class="text-none">
                                More Info
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-img>
    </div>
</template>

<script setup lang="ts">
import type { MovieData } from "~/utils/moviesList";
const props = defineProps({
    nowPlaying: {
        type: Object,
        required: true,
    }
})
const { nowPlaying } = props as { nowPlaying: MovieData }
onMounted(() => {
    mainMovie
})

const mainMovie = computed(() => {
    return nowPlaying.results[0]
}) 

</script>

<style scoped>
.movie-banner {
    position: relative;
}

.movie-banner__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.6) 50%,
            rgba(0, 0, 0, 0.3) 100%);
}

.movie-banner__content {
    position: relative;
    z-index: 1;
}

.movie-banner__description {
    max-width: 600px;
    line-height: 1.6;
}

@media (max-width: 600px) {
    .movie-banner__content {
        padding-top: 60px;
    }
}
</style>