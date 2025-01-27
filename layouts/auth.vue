<template>
    <div class="layout-container">
        <!-- Toolbar -->
        <v-app-bar extended elevation="1" color="#282654" class="px-2">
            <v-container class="mx-auto px-0" :class="{ 'max-width-xl': $vuetify.display.lgAndUp }">
                <v-row align="center" no-gutters>
                    <v-col cols="12" class="d-flex justify-center justify-sm-start">
                        <NuxtLink to="/home" class="d-flex align-center text-decoration-none">
                            <v-icon color="white" class="mr-4" size="32">mdi-movie-open</v-icon>
                            <v-app-bar-title class="text-white text-h6">Nyarikimovies</v-app-bar-title>
                        </NuxtLink>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>

        <!-- Main content -->
        <v-main>
            <v-container class="mx-auto px-4" :class="{ 'max-width-xl': $vuetify.display.lgAndUp }">
                <slot></slot>
            </v-container>
        </v-main>
    </div>
</template>

<script setup lang="ts">
// Add any additional setup logic here
</script>

<style scoped>
.layout-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.max-width-xl {
    max-width: 1440px !important;
}

:deep(.v-toolbar-title) {
    font-size: clamp(1.25rem, 2vw, 1.5rem);
}
</style>