<template>
    <v-container class="movie-details">
        <v-row>
            <!-- Movie Hero Section -->
            <v-col cols="12" class="pa-0">
                <v-parallax
                    src="https://img.freepik.com/premium-photo/couple-love-friends-watching-movie-with-popcorn-cinema_217333-2226.jpg"
                    height="500">
                    <div class="hero-overlay">
                        <h1 class="text-h2 font-weight-bold text-white mb-4">
                            The Chronicles of Hope
                        </h1>
                        <v-chip v-for="genre in genres" :key="genre" class="ma-1" color="primary" variant="outlined">
                            {{ genre }}
                        </v-chip>
                    </div>
                </v-parallax>
            </v-col>

            <!-- Movie Info Section -->
            <v-col cols="12" md="8" class="pt-6">
                <v-card elevation="0">
                    <v-card-text>
                        <div class="d-flex align-center mb-4">
                            <v-rating v-model="rating" color="amber" half-increments readonly size="small"></v-rating>
                            <span class="text-subtitle-1 ml-2">{{ rating }} / 5</span>
                            <v-chip class="ml-4" color="success">PG-13</v-chip>
                        </div>

                        <p class="text-body-1 mb-4">
                            A heartwarming tale of faith, redemption, and the power of belief.
                            Following the journey of Sarah Mitchell, a young missionary who discovers
                            her true calling while helping a remote village overcome their challenges.
                            Through divine intervention and unwavering faith, she brings hope and
                            healing to those in need.
                        </p>

                        <v-divider class="my-4"></v-divider>

                        <div class="d-flex flex-wrap">
                            <div class="mr-8 mb-4">
                                <div class="text-subtitle-1 font-weight-bold">Director</div>
                                <div class="text-body-1">Michael Anderson</div>
                            </div>
                            <div class="mr-8 mb-4">
                                <div class="text-subtitle-1 font-weight-bold">Runtime</div>
                                <div class="text-body-1">2h 15min</div>
                            </div>
                            <div class="mr-8 mb-4">
                                <div class="text-subtitle-1 font-weight-bold">Release Date</div>
                                <div class="text-body-1">December 25, 2024</div>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>

                <!-- Cast Section -->
                <v-card elevation="0" class="mt-6">
                    <v-card-title class="text-h5 font-weight-bold">Related Movies</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col v-for="actor in related" :key="actor.title" cols="12" sm="6" md="4">
                                <v-card>
                                    <v-img :src="actor.image" height="300" cover></v-img>
                                    <v-card-title>{{ actor.title }}</v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Sidebar -->
            <v-col cols="12" md="4" class="pt-6">
                <v-card class="mb-6">
                    <v-card-title class="text-h6">Showtimes</v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item v-for="time in showtimes" :key="time.id">
                                <v-list-item-title>
                                    {{ time.theater }}
                                </v-list-item-title>
                                <template v-slot:append>
                                    <v-chip v-for="slot in time.slots" :key="slot" class="ma-1" color="primary"
                                        variant="outlined" size="small">
                                        {{ slot }}
                                    </v-chip>
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>

                <v-card class="h-50 overflow-auto">
                    <v-card-title class="text-h6">Reviews</v-card-title>
                    <v-card-text>
                        <v-timeline side="end">
                            <v-timeline-item v-for="review in reviews" :key="review.id" size="small">
                                <template v-slot:opposite>
                                    <div class="text-caption">{{ review.date }}</div>
                                </template>
                                <v-card elevation="1">
                                    <v-card-text>
                                        <div class="d-flex align-center mb-2">
                                            <v-avatar size="36" class="mr-2">
                                                <v-img :src="review.avatar"></v-img>
                                            </v-avatar>
                                            <div>
                                                <div class="font-weight-bold">{{ review.name }}</div>
                                                <v-rating v-model="review.rating" color="amber" readonly
                                                    size="x-small"></v-rating>
                                            </div>
                                        </div>
                                        <p class="text-body-2 mb-0">{{ review.comment }}</p>
                                    </v-card-text>
                                </v-card>
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
const rating = ref(4.5);
const genres = ['Drama', 'Faith', 'Inspirational'];

const related = [
    {
        title: 'The River Flows',
        role: 'Sarah Mitchell',
        image: 'https://img.freepik.com/free-photo/curvy-narrow-muddy-road-dark-forest-surrounded-by-greenery-little-light-coming-from_181624-1825.jpg'
    },
    {
        title: 'John Davis Returns',
        role: 'Pastor James',
        image: 'https://img.freepik.com/free-photo/cute-girl-sitting-cinema-with-friends-looking-camera_7502-4608.jpg'
    },
    {
        title: 'Maria Garcia From the Aliens',
        role: 'Anna Thompson',
        image: 'https://img.freepik.com/premium-photo/lovely-girl-looking-camera-while-watching-movie-cinema_7502-6541.jpg'
    }
];

const showtimes = [
    {
        id: 1,
        theater: 'Cinema Paradise',
        slots: ['10:00 AM', '1:30 PM', '4:45 PM', '8:00 PM']
    },
    {
        id: 2,
        theater: 'Family Cinema',
        slots: ['11:15 AM', '2:45 PM', '6:15 PM', '9:30 PM']
    }
];

const reviews = [
    {
        id: 1,
        name: 'Robert Johnson',
        rating: 5,
        date: '2 days ago',
        avatar: 'https://img.freepik.com/free-photo/portrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg',
        comment: 'A powerful message of faith and hope. This movie touched my heart deeply.'
    },
    {
        id: 2,
        name: 'Lisa Chen',
        rating: 4,
        date: '5 days ago',
        avatar: 'https://img.freepik.com/free-photo/portrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg',
        comment: 'Beautiful storytelling with meaningful lessons about trust in God.'
    },
    {
        id: 3,
        name: 'Lisa Chen',
        rating: 2,
        date: '5 days ago',
        avatar: 'https://img.freepik.com/free-photo/portrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg',
        comment: 'Beautiful storytelling with meaningful lessons about trust in God.'
    },
    {
        id: 4,
        name: 'Lisa Chen',
        rating: 4,
        date: '5 days ago',
        avatar: 'https://img.freepik.com/free-photo/portrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg',
        comment: 'Beautiful storytelling with meaningful lessons about trust in God.'
    },
    {
        id: 5,
        name: 'Lisa Chen',
        rating: 5,
        date: '8 days ago',
        avatar: 'https://img.freepik.com/free-photo/portrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg',
        comment: 'Beautiful storytelling with meaningful lessons about trust in God.'
    }
];
</script>

<style scoped>
.hero-overlay {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem;
}

.movie-details {
    max-width: 1400px;
}
</style>