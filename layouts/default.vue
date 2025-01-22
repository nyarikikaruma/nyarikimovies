<template>
    <div>
        <v-toolbar extended style="background-color: #282654;">
            <v-row class="align-center">
                <v-col cols="1" class="d-none d-md-flex" style="background-color: #282654;"></v-col>

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
                    <v-menu class="ma-0 pa-0">
                        <template v-slot:activator="{ props }">
                            <v-btn class="text-white" icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                        </template>

                        <v-list class="ma-0 pa-0">
                            <v-list-item class="ma-0">
                                <v-btn @click="logout()" class="ma-0 pa-0">Log out</v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>

                <v-col cols="1" class="d-none d-md-flex" style="background-color: #282654;"></v-col>
            </v-row>
        </v-toolbar>

        <v-container fluid class="pa-0">
            <v-row>
                <v-col cols="1" class="d-none d-md-flex" style="background-color: #282654;"></v-col>

                <v-col cols="10">
                    <slot></slot>
                </v-col>

                <v-col cols="1" class="d-none d-md-flex" style="background-color: #282654;"></v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
const authToken = useCookie('auth-token')

const loading = false;

function onClick() {
    console.log("Search clicked");
}
function logout() {
    console.log('authtoken', authToken)
    authToken.value = null
    navigateTo('/login')
}

onMounted(() => {
    console.log('authToke', authToken)
}) 
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

.v-text-field {
    max-width: 300px;
}
</style>