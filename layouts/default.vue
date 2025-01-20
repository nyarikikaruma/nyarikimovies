<template>
    <div>
        <!-- Toolbar -->
        <v-toolbar extended style="background-color: #282654;">
            <v-row class="align-center">
                <!-- Left spacer -->
                <v-col cols="1" class="d-none d-md-flex" style="background-color: #282654;"></v-col>

                <!-- Toolbar content -->
                <v-col cols="10" class="d-flex align-center">
                    <NuxtLink to="/home" class="d-flex align-center text-decoration-none">
                        <v-icon class="text-white mr-4" size="x-large">mdi-movie-open</v-icon>
                        <v-toolbar-title class="text-white">Nyarikimovies</v-toolbar-title>
                    </NuxtLink>
                    <v-spacer></v-spacer>
                    <v-text-field class="mr-5" :loading="loading" append-inner-icon="mdi-magnify" density="compact"
                        placeholder="Find your movie" variant="solo" hide-details single-line
                        @click:append-inner="onClick"></v-text-field>
                    <v-avatar class="mr-4">
                        <v-img alt="Profile" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                    </v-avatar>
                    <v-btn class="text-white" icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
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
const loading = false;

function onClick() {
    console.log("Search clicked");
}
</script>

<style>
.v-toolbar {
    padding: 0;
    /* Remove default padding */
}

.v-toolbar-title {
    font-size: 1.5rem;
    /* Adjust title size */
}

.v-icon {
    cursor: pointer;
}

.v-text-field {
    max-width: 300px;
    /* Limit width for better alignment */
}
</style>