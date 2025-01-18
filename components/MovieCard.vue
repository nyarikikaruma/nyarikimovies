<template>
    <v-card class="mx-auto" max-width="344">
        <!-- Movie Poster with Rating Overlay -->
        <v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover class="position-relative">
            <v-chip color="white" text-color="yellow" class="position-absolute font-weight-bold ma-2"
                style="right: 0; opacity: 0.9;">
                8.5/10
            </v-chip>
        </v-img>

        <!-- Movie Title and Genres -->
        <v-card-title class="text-h6 font-weight-bold">
            The Jungle Book
            <div class="text-subtitle-2 text-grey">Adventure, Family, Fantasy</div>
        </v-card-title>

        <!-- Movie Stats -->
        <v-card-subtitle>
            <v-row align="center" class="mx-0 py-2">
                <v-col cols="auto" class="pa-1">
                    <v-icon color="yellow-darken-2" size="small">mdi-star</v-icon>
                    <span class="ml-1">12K</span>
                </v-col>
                <v-divider vertical class="mx-2"></v-divider>
                <v-col cols="auto" class="pa-1">
                    <v-icon size="small">mdi-clock-outline</v-icon>
                    <span class="ml-1">106min</span>
                </v-col>
                <v-divider vertical class="mx-2"></v-divider>
                <v-col cols="auto" class="pa-1">
                    <v-icon size="small">mdi-calendar</v-icon>
                    <span class="ml-1">2012</span>
                </v-col>
            </v-row>
        </v-card-subtitle>

        <!-- Movie Description -->
        <v-card-text >
            An orphan boy is raised in the jungle with the help of a pack of wolves, a bear, and a black panther.
            This live-action adaptation of Rudyard Kipling's classic brings the jungle to life with stunning
            visuals and memorable characters.
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
// You can add component logic here if needed
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>