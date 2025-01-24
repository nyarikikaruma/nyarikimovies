<template>
    <v-card class="mx-auto" max-width="344">
        <!-- Movie Poster with Rating Overlay -->
        <v-img height="200px" :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" cover class="position-relative">
            <v-chip color="white" text-color="yellow" class="position-absolute font-weight-bold ma-2"
                style="right: 0; opacity: 0.9;">
                {{ movie.vote_average }}/10
            </v-chip>
        </v-img>

        <!-- Movie Title and Genres -->
        <v-card-title class="text-h6 font-weight-bold">
            {{movie.title}}
            <div class="text-subtitle-2 text-grey">{{ movie.original_title }}</div>
        </v-card-title>

        <!-- Movie Stats -->
        <v-card-subtitle>
            <v-row align="center" class="mx-0 py-2">
                <v-col cols="auto" class="pa-1">
                    <v-icon color="yellow-darken-2" size="small">mdi-star</v-icon>
                    <span class="ml-1">{{ movie.vote_count }}</span>
                </v-col>
                <v-divider vertical class="mx-2"></v-divider>
                <v-col cols="auto" class="pa-1">
                    <v-icon size="small">mdi-clock-outline</v-icon>
                    <span class="ml-1">{{movie.popularity}}</span>
                </v-col>
                <v-divider vertical class="mx-2"></v-divider>
                <v-col cols="auto" class="pa-1">
                    <v-icon size="small">mdi-calendar</v-icon>
                    <span class="ml-1">{{movie.release_date}}</span>
                </v-col>
            </v-row>
        </v-card-subtitle>

        <!-- Movie Description -->
        <v-card-text >
            {{movie.overview}}
        </v-card-text>

        <!-- Action Buttons -->
        <v-card-actions>
            <v-row class="px-2 pb-2">
                <v-col cols="8" class="pr-1">
                    <v-btn to="/details" class="text-white" block style="background-color:  #282654;" variant="elevated">
                        View More
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import type { Movie } from "~/utils/moviesList";
const props = defineProps({
    movie: {
        type: Object,
        required: true,
    }
})
const { movie } = props as { movie: Movie }


</script>


<style scoped>
/* Add any custom styles here if needed */
</style>