<template>
    <div>
        <v-toolbar extended style="background-color: #282654;">
            <v-icon to="/home" class="text-white " size="x-large">mdi-movie-open</v-icon>
            <v-toolbar-title class="text-white">Nyarikimovies</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field class="mr-5" :loading="loading" append-inner-icon="mdi-magnify" density="compact"
                placeholder="Find your movie" variant="solo" hide-details single-line
                @click:append-inner="onClick"></v-text-field>
            <v-avatar>
                <v-img alt="Profile" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
            </v-avatar>
            <v-btn class="text-white" icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-toolbar>
            <v-row>
                <v-col cols="1" style="background-color: #282654;"></v-col>

                <v-col cols="10">
                    <slot></slot>
                </v-col>
                <v-col cols="1" style="background-color: #282654;"></v-col>
            </v-row>
    </div>
</template>

<script setup lang="ts">

</script>

<style></style>