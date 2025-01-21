<template>
    <div>
        <!-- Toolbar -->
        <v-toolbar extended style="background-color: #282654;">
            <v-row class="align-center">
                <!-- Left spacer -->
                <v-col cols="1" class="d-none d-md-flex" style="background-color: #282654;"></v-col>

                <!-- Toolbar content -->
                <v-col cols="10" class="d-flex justify-center">
                    <NuxtLink to="/home" class="d-flex align-center text-decoration-none">
                        <v-icon class="text-white mr-4" size="x-large">mdi-movie-open</v-icon>
                        <v-toolbar-title class="text-white">Nyarikimovies</v-toolbar-title>
                    </NuxtLink>
                </v-col>

                <!-- Right spacer -->
                <v-col cols="1" class="d-none d-md-flex" style="background-color: #282654;"></v-col>
            </v-row>
        </v-toolbar>

        <!-- Main content -->
        <v-container fluid class="pa-0">
            <v-row>
                <!-- Left spacer -->
                <v-col cols="1" class="d-none d-md-flex" style="background-color: #282654;"></v-col>

                <!-- Main content area -->
                <v-col cols="10">
                    <slot></slot>
                </v-col>

                <!-- Right spacer -->
                <v-col cols="1" class="d-none d-md-flex" style="background-color: #282654;"></v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
// No additional setup needed for auth layout
</script>

<style>
.v-toolbar {
    padding: 0;
}

.v-toolbar-title {
    font-size: 1.5rem;
}

.v-icon {
    cursor: pointer;
}
</style>