<template>
    <div>
        <div v-if="loading">
            <v-row>
                <v-col cols="12" md="12">
                    <v-skeleton-loader class="mx-auto border" max-width="1200"
                        type="image, article"></v-skeleton-loader>
                </v-col>
                <v-col cols="12" md="3" v-for="n in 12">
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
                            <v-pagination :length="nowPlaying.total_pages"
                                @update:model-value="(page) => goToNextPage('now_playing', page.toString())"
                                :total-visible="5"></v-pagination>
                        </v-col>
                    </v-row>
                    <v-sheet>
                        <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" mandatory>
                            <template v-if="loadingPlaying">
                                <SkeletonLoader/>

                            </template>
                            <v-slide-group-item v-else v-for="(movie, index) in nowPlaying?.results" :key="index"
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
                        <v-col cols="12" md="6">
                            <h1 style="color: #282654" class="text-h4 font-weight-bold mt-4">
                                Popular Movies
                            </h1>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-pagination :length="popularMovies?.total_pages"
                                @update:model-value="(page) => goToNextPage('popular', page.toString())"
                                :total-visible="5"></v-pagination>
                        </v-col>
                    </v-row>
                    <v-sheet>
                        <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" mandatory>
                            <template v-if="loadingPopular">
                                <SkeletonLoader/>
                            </template>
                            <v-slide-group-item v-else v-for="(movie, index) in popularMovies?.results" :key="index"
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
                        <v-col cols="12" md="6">
                            <h1 style="color: #282654" class="text-h4 font-weight-bold mt-4">
                                Top Rated
                            </h1>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-pagination :length="topRated?.total_pages"
                                @update:model-value="(page) => goToNextPage('top_rated', page.toString())"
                                :total-visible="5"></v-pagination>
                        </v-col>
                    </v-row>
                    <v-sheet>
                        <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" mandatory>
                            <template v-if="loadingTopRated">
                                <SkeletonLoader/>
                            </template>
                            <v-slide-group-item v-else v-for="(movie, index) in topRated?.results" :key="index"
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
                        <v-col cols="12" md="6">
                            <h1 style="color: #282654" class="text-h4 font-weight-bold mt-4">
                                Upcoming
                            </h1>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-pagination :length="upcoming?.total_pages"
                                @update:model-value="(page) => goToNextPage('upcoming', page.toString())"
                                :total-visible="5"></v-pagination>
                        </v-col>
                    </v-row>
                    <v-sheet>
                        <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" mandatory>
                            <template v-if="loadingUpcoming">
                                <SkeletonLoader/>

                            </template>
                            <v-slide-group-item v-else v-for="(movie, index) in upcoming?.results" :key="index"
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
import SkeletonLoader from '~/components/SkeletonLoader.vue';

const model = ref(null)
const config = useRuntimeConfig();
const token = config.public.tmdbToken;
var nowPlaying = ref<MovieData>();
var popularMovies = ref<MovieData>();
var topRated = ref<MovieData>();
var upcoming = ref<MovieData>();
const loading = ref<Boolean>(false)
const loadingPlaying = ref<Boolean>(false)
const loadingPopular = ref<Boolean>(false)
const loadingTopRated = ref<Boolean>(false)
const loadingUpcoming = ref<Boolean>(false)

onMounted(async () => {
    await getMovies()
});

async function goToNextPage(type: String, page: String) {
    // Common options for all requests
    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        // Enable caching
        cache: 'force-cache',
        // Cache for 5 minutes (adjust as needed)
        staleTime: 5 * 60 * 1000,
        // Key to ensure unique caching per type and page
        key: `movies-${type}-${page}`
    };

    const url = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page}`;

    try {
        // Set the appropriate loading state
        if (type === 'now_playing') loadingPlaying.value = true;
        else if (type === 'popular') loadingPopular.value = true;
        else if (type === 'top_rated') loadingTopRated.value = true;
        else if (type === 'upcoming') loadingUpcoming.value = true;

        // Make the cached request
        const { data, error } = await useFetch(url, options);

        if (error.value) {
            throw error.value;
        }

        // Update the appropriate data store
        switch (type) {
            case 'now_playing':
                nowPlaying = data.value;
                break;
            case 'popular':
                popularMovies = data.value;
                break;
            case 'top_rated':
                topRated = data.value;
                break;
            case 'upcoming':
                upcoming = data.value;
                break;
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Reset loading states
        if (type === 'now_playing') loadingPlaying.value = false;
        else if (type === 'popular') loadingPopular.value = false;
        else if (type === 'top_rated') loadingTopRated.value = false;
        else if (type === 'upcoming') loadingUpcoming.value = false;
    }
}
async function getMovies() {
    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        // Enable caching
        cache: 'force-cache',
        // Cache for 5 minutes (adjust as needed)
        staleTime: 5 * 60 * 1000,
    };

    try {
        loading.value = true;

        // Make all requests concurrently with caching
        const [
            { data: nowPlayingData },
            { data: popularData },
            { data: topRatedData },
            { data: upcomingData }
        ] = await Promise.all([
            useFetch(
                "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
                { ...options, key: 'movies-now-playing' }
            ),
            useFetch(
                "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
                { ...options, key: 'movies-popular' }
            ),
            useFetch(
                "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
                { ...options, key: 'movies-top-rated' }
            ),
            useFetch(
                "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
                { ...options, key: 'movies-upcoming' }
            )
        ]);

        // Update the data stores
        nowPlaying = nowPlayingData.value;
        popularMovies = popularData.value;
        topRated = topRatedData.value;
        upcoming = upcomingData.value;

    } catch (error) {
        console.error("Error:", error);
    } finally {
        loading.value = false;
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