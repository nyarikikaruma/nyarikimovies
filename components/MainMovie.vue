<template>
    <div class="relative">
        <v-img cover height="500"
            src="https://img.freepik.com/free-photo/lion-lying-ground-sunlight-with-blurry-surface_181624-48519.jpg"
            class="movie-banner">
            <!-- Overlay gradient for better text visibility -->
            <div class="overlay"></div>

            <!-- Content overlay -->
            <div class="content-wrapper">
                <h1 class="text-h3 font-weight-bold mb-4">Now Showing</h1>
                <h2 class="text-h4 mb-6">The Lion King: Mufasa and His Brothers are back</h2>
                <v-rating v-model="rating" color="orange-lighten-1" active-color="orange"></v-rating>
                <v-row align="center">
                    <div class="d-flex align-center">
                        Play
                        <v-icon size="x-large" class="ml-2 text-red">mdi-play-box</v-icon>
                    </div>
                </v-row>
            </div>
        </v-img>
    </div>
</template>

<script setup lang="ts">
const rating = ref(3)
</script>

<style scoped>
.movie-banner {
    position: relative;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
}

.content-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    z-index: 1;
}
</style>