<template>
    <v-card width="300" class="d-flex flex-column" :to="`/details/${movie.id}/`" hover>
        <v-img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" :aspect-ratio="2 / 3" cover
            class="align-end">
            <v-chip color="white" text-color="yellow" variant="elevated" class="ma-2" location="end top">
                {{ movie.vote_average }}/10
            </v-chip>
        </v-img>
        <v-card-title class="pa-3">
            <div class="text-subtitle-1 font-weight-bold text-truncate">{{ movie.title }}</div>
            <div class="text-caption text-grey text-truncate">{{ movie.original_title }}</div>
        </v-card-title>
        <v-card-subtitle class="pa-3 pt-0">
            <v-row align="center" no-gutters>
                <v-col cols="auto" class="d-flex align-center">
                    <v-icon color="yellow-darken-2" size="small">mdi-star</v-icon>
                    <span class="text-caption ml-1">{{ movie.vote_count }}</span>
                </v-col>
                <v-divider vertical class="mx-2"></v-divider>
                <v-col cols="auto" class="d-flex align-center">
                    <v-icon size="small">mdi-clock-outline</v-icon>
                    <span class="text-caption ml-1">{{ movie.popularity }}</span>
                </v-col>
                <v-divider vertical class="mx-2"></v-divider>
                <v-col cols="auto" class="d-flex align-center">
                    <v-icon size="small">mdi-calendar</v-icon>
                    <span class="text-caption ml-1">{{ movie.release_date.split('-')[0] }}</span>
                </v-col>
            </v-row>
        </v-card-subtitle>
        <v-card-text class="pa-3 pt-0">
            <div class="text-caption">
                {{ truncatedText }}
                <span v-if="needsTruncation" class="text-caption font-weight-medium text-primary" role="button">
                </span>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import type { Movie } from "~/utils/moviesList";
const maxLength: number = 150
const isExpanded = ref<Boolean>(false)

const props = defineProps({
    movie: {
        type: Object,
        required: true,
    }
})
const { movie } = props as { movie: Movie }
const needsTruncation = computed(() => movie.overview.length > maxLength)

const truncatedText = computed(() => {
    if (isExpanded.value) return movie.overview
    return movie.overview.slice(0, maxLength) + '...'
})

</script>


<style scoped></style>