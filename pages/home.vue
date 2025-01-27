<template>
    <div>
        <div v-if="loading">
            <v-row>
                <v-col cols="12" md="12">
                    <v-skeleton-loader class="mx-auto border" max-width="1200"
                        type="image, article"></v-skeleton-loader>
                </v-col>
                <v-col cols="12" md="3">
                    <v-skeleton-loader class="mx-auto border" max-width="300" type="image, article"></v-skeleton-loader>
                </v-col>
            </v-row>
        </div>
        <div v-else>
            <div v-if="nowPlaying">
                <MainMovie :nowPlaying="nowPlaying" />
                <div>
                    <v-row align="center" justify="center">
                        <v-col cols="12" md="6">
                            <h1 style="color: #282654" class="text-h4 font-weight-bold mt-4">
                                Now Playing
                            </h1>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-pagination :length="nowPlaying.total_pages" @update:model-value="goToNextPage('now_playing', nowPlaying.page.toString())" :total-visible="5"></v-pagination>
                        </v-col>
                    </v-row>
                    <v-sheet>
                        <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" mandatory>
                            <v-slide-group-item v-for="(movie, index) in nowPlaying?.results" :key="index" v-slot="{ isSelected, toggle }">
                                <div class="ma-2" width="200">
                                    <MovieCard :movie="movie" @click="toggle" />
                                </div>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-sheet>
                </div>
                <div>
                    <v-row align="center" justify="center">
                        <v-col>
                            <h1 style="color: #282654" class="text-h4 font-weight-bold mt-4">
                                Popular Movies
                            </h1>
                        </v-col>
                    </v-row>
                    <v-sheet>
                        <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" mandatory>
                            <v-slide-group-item v-for="(movie, index) in popularMovies?.results" :key="index"
                                v-slot="{ isSelected, toggle }">
                                <div class="ma-2" width="200">
                                    <MovieCard :movie="movie" @click="toggle" />
                                </div>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-sheet>
                </div>
                <div>
                    <v-row align="center" justify="center">
                        <v-col>
                            <h1 style="color: #282654" class="text-h4 font-weight-bold mt-4">
                                Top Rated
                            </h1>
                        </v-col>
                    </v-row>
                    <v-sheet>
                        <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" mandatory>
                            <v-slide-group-item v-for="(movie, index) in topRated?.results" :key="index"
                                v-slot="{ isSelected, toggle }">
                                <div class="ma-2" width="200">
                                    <MovieCard :movie="movie" @click="toggle" />
                                </div>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-sheet>
                </div>
                <div>
                    <v-row align="center" justify="center">
                        <v-col>
                            <h1 style="color: #282654" class="text-h4 font-weight-bold mt-4">
                                Upcoming
                            </h1>
                        </v-col>
                    </v-row>
                    <v-sheet>
                        <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" mandatory>
                            <v-slide-group-item v-for="(movie, index) in upcoming?.results" :key="index"
                                v-slot="{ isSelected, toggle }">
                                <div class="ma-2" width="200">
                                    <MovieCard :movie="movie" @click="toggle" />
                                </div>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-sheet>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { MovieData } from "~/utils/moviesList";
const model = ref(null)
const config = useRuntimeConfig();
const token = config.public.tmdbToken;
var nowPlaying = ref<MovieData>();
var popularMovies = ref<MovieData>();
var topRated = ref<MovieData>();
var upcoming = ref<MovieData>();
const loading = ref<Boolean>(false)

onMounted(async () => {
    await getMovies()
});

function goToNextPage(type:String, page:String) {
    console.log('fetch movies for: ', type, page)
}
async function getMovies() {
    try {
        loading.value = true
        nowPlaying = await $fetch(
            "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        popularMovies = await $fetch(
            "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        topRated = await $fetch(
            "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        upcoming = await $fetch(
            "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        loading.value = false

        console.log("data", nowPlaying);
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