<template>
    <div>
        <!-- Enhanced App Bar -->
        <v-app-bar color="#282654" elevation="4" density="comfortable" app>
            <v-container fluid class="px-2 px-md-6">
                <v-row align="center" no-gutters>
                    <!-- Logo and Title -->
                    <v-col cols="auto">
                        <NuxtLink to="/home" class="d-flex align-center text-decoration-none">
                            <v-icon color="white" :size="$vuetify.display.xs ? 'default' : 'large'"
                                class="mr-2 mr-md-3">
                                mdi-movie-open
                            </v-icon>
                            <v-toolbar-title class="text-white font-weight-bold">
                                <span class="d-none d-sm-inline text-h6">Nyarikimovies</span>
                                <span class="d-sm-none text-body-1">Movies</span>
                            </v-toolbar-title>
                        </NuxtLink>
                    </v-col>

                    <v-spacer></v-spacer>

                    <!-- Search Component - Desktop -->
                    <v-col cols="auto" class="d-none d-md-flex mr-4">
                        <div class="search-wrapper">
                            <Search></Search>
                        </div>
                    </v-col>

                    <!-- User Profile Section -->
                    <v-col cols="auto" class="d-flex align-center">
                        <v-avatar :size="$vuetify.display.xs ? '32' : '40'" class="mr-2">
                            <v-img alt="Profile" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                        </v-avatar>

                        <!-- Profile Menu -->
                        <v-menu location="bottom end" offset="8">
                            <template v-slot:activator="{ props }">
                                <v-btn color="white"
                                    :icon="$vuetify.display.xs ? 'mdi-dots-vertical' : 'mdi-chevron-down'"
                                    variant="text" :size="$vuetify.display.xs ? 'small' : 'default'"
                                    v-bind="props"></v-btn>
                            </template>
                            <v-card min-width="180" elevation="8">
                                <v-list density="compact" nav>
                                    <v-list-item prepend-icon="mdi-account-circle" title="My Profile" value="profile"
                                        class="py-2"></v-list-item>
                                    <v-list-item prepend-icon="mdi-cog" title="Settings" value="settings"
                                        class="py-2"></v-list-item>
                                    <v-list-item prepend-icon="mdi-help-circle" title="Help" value="help"
                                        class="py-2"></v-list-item>
                                    <v-divider class="my-1"></v-divider>
                                    <v-list-item prepend-icon="mdi-logout" title="Log out" value="logout" class="py-2"
                                        @click="logout()"></v-list-item>
                                </v-list>
                            </v-card>
                        </v-menu>
                    </v-col>

                    <!-- Mobile Menu Button -->
                    <v-col cols="auto" class="d-md-none ml-1">
                        <v-btn color="white" icon="mdi-menu" variant="text" size="small"
                            @click="mobileDrawer = !mobileDrawer"></v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>

        <!-- Mobile Search Drawer -->
        <v-navigation-drawer v-model="mobileDrawer" temporary location="right" width="300" class="d-md-none">
            <v-card flat height="100%">
                <v-card-title class="d-flex align-center pa-4" style="background-color: #282654;">
                    <v-icon color="white" class="mr-2">mdi-magnify</v-icon>
                    <span class="text-white">Search Movies</span>
                    <v-spacer></v-spacer>
                    <v-btn icon="mdi-close" variant="text" color="white" size="small"
                        @click="mobileDrawer = false"></v-btn>
                </v-card-title>

                <v-card-text class="pa-4">
                    <Search></Search>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-text class="pa-4">
                    <v-list nav density="comfortable">
                        <v-list-subheader class="text-uppercase text-caption font-weight-bold">
                            Quick Links
                        </v-list-subheader>
                        <v-list-item prepend-icon="mdi-home" title="Home" value="home" class="mb-1"></v-list-item>
                        <v-list-item prepend-icon="mdi-movie" title="Movies" value="movies" class="mb-1"></v-list-item>
                        <v-list-item prepend-icon="mdi-television" title="TV Shows" value="tv"
                            class="mb-1"></v-list-item>
                        <v-list-item prepend-icon="mdi-bookmark" title="My Watchlist" value="watchlist"
                            class="mb-1"></v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-navigation-drawer>

        <!-- Main Content Container -->
        <v-container fluid class="pa-0 main-content">
            <v-row no-gutters class="min-height-screen">
                <!-- Left Decorative Sidebar (Desktop) -->
                <v-col cols="0" xl="1" lg="1" class="d-none d-lg-block sidebar-left">
                    <div class="sidebar-gradient h-100"></div>
                </v-col>

                <!-- Main Content Area -->
                <v-col cols="12" xl="10" lg="10" class="content-wrapper">
                    <v-container fluid class="pa-2 pa-md-4 pa-lg-6">
                        <!-- Content Slot -->
                        <slot></slot>
                    </v-container>
                </v-col>

                <!-- Right Decorative Sidebar (Desktop) -->
                <v-col cols="0" xl="1" lg="1" class="d-none d-lg-block sidebar-right">
                    <div class="sidebar-gradient h-100"></div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import Search from '~/components/Search.vue';

// Reactive state
const mobileDrawer = ref(false)

// Auth functionality
const authToken = useCookie('auth-token')

function logout() {
    authToken.value = null
    navigateTo('/login')
}

onMounted(() => {
    console.log('authToken', authToken)
})
</script>

<style scoped>
.sidebar-gradient {
    background: linear-gradient(135deg, #282654 0%, #1a1a3a 100%);
}

.main-content {
    background: linear-gradient(to bottom, #fafafa 0%, #f5f5f5 100%);
}

.content-wrapper {
    background: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    min-height: calc(100vh - 64px);
}

.search-wrapper {
    min-width: 300px;
}

.min-height-screen {
    min-height: calc(100vh - 64px);
}

@media (max-width: 960px) {
    .content-wrapper {
        box-shadow: none;
    }

    .main-content {
        background: white;
    }
}
</style>