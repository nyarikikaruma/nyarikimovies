<template>
    <div>
        <MainMovie />
        <div>
            <v-row align="center" justify="center">
                <v-col>
                    <h1 style="color:  #282654;" class="text-h4 font-weight-bold mt-4">
                        Trending Movies
                    </h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-for="n in 12" :key="n" cols="12" sm="6" md="4" lg="3">
                    <MovieCard />
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script setup lang="ts">
const authToken = useCookie('auth-token')

onMounted(() => {
    console.log('authToken home', authToken.value)
}) 
</script>

<style scoped>
.text-h3 {
    background: linear-gradient(45deg, #1867c0, #5cbbf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>