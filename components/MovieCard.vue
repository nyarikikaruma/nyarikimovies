<template>
    <v-card width="280" class="d-flex flex-column" :to="`/details/${movie.id}/`" hover elevation="2">
        <v-img 
            :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" 
            :aspect-ratio="2 / 3" 
            cover
            class="align-end"
            height="420"
        >
            <v-chip 
                color="rgba(0,0,0,0.8)" 
                text-color="white" 
                variant="elevated" 
                class="ma-3" 
                location="end top"
                size="small"
            >
                <v-icon start size="small" color="yellow">mdi-star</v-icon>
                {{ movie.vote_average.toFixed(1) }}
            </v-chip>
        </v-img>
        
        <v-card-title class="pa-4 pb-2">
            <div class="text-subtitle-1 font-weight-bold text-truncate mb-1">
                {{ movie.title }}
            </div>
            <div class="text-caption text-medium-emphasis text-truncate">
                {{ movie.original_title }}
            </div>
        </v-card-title>
        
        <v-card-subtitle class="pa-4 pt-0 pb-2">
            <v-row align="center" no-gutters dense>
                <v-col cols="auto" class="d-flex align-center">
                    <v-icon color="text-medium-emphasis" size="16">mdi-thumb-up</v-icon>
                    <span class="text-caption ml-1">{{ movie.vote_count.toLocaleString() }}</span>
                </v-col>
                <v-divider vertical class="mx-3" style="height: 12px;"></v-divider>
                <v-col cols="auto" class="d-flex align-center">
                    <v-icon color="text-medium-emphasis" size="16">mdi-fire</v-icon>
                    <span class="text-caption ml-1">{{ Math.round(movie.popularity) }}</span>
                </v-col>
                <v-divider vertical class="mx-3" style="height: 12px;"></v-divider>
                <v-col cols="auto" class="d-flex align-center">
                    <v-icon color="text-medium-emphasis" size="16">mdi-calendar</v-icon>
                    <span class="text-caption ml-1">{{ movie.release_date.split('-')[0] }}</span>
                </v-col>
            </v-row>
        </v-card-subtitle>
        
        <v-card-text class="pa-4 pt-0 flex-grow-1 d-flex flex-column">
            <div class="text-caption text-medium-emphasis line-height-sm">
                {{ truncatedText }}
                <span 
                    v-if="needsTruncation && !isExpanded" 
                    @click.prevent="toggleExpanded"
                    class="text-caption font-weight-medium text-primary cursor-pointer ml-1"
                    role="button"
                >
                    Read more
                </span>
                <span 
                    v-if="isExpanded && needsTruncation" 
                    @click.prevent="toggleExpanded"
                    class="text-caption font-weight-medium text-primary cursor-pointer ml-1"
                    role="button"
                >
                    Show less
                </span>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import type { Movie } from "~/utils/moviesList";

const maxLength: number = 120
const isExpanded = ref<boolean>(false)

const props = defineProps({
    movie: {
        type: Object,
        required: true,
    }
})

const { movie } = props as { movie: Movie }

const needsTruncation = computed(() => movie.overview.length > maxLength)

const truncatedText = computed(() => {
    if (isExpanded.value || !needsTruncation.value) return movie.overview
    return movie.overview.slice(0, maxLength) + '...'
})

const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.cursor-pointer {
    cursor: pointer;
}

.line-height-sm {
    line-height: 1.3;
}
</style>