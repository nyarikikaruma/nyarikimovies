<template>
    <div>
      <v-toolbar extended color="#282654">
        <v-container fluid class="pa-0">
          <v-row no-gutters align="center">
            <v-col cols="0" md="1"></v-col>
            <v-col cols="12" md="10">
              <v-row no-gutters align="center">
                <v-col cols="auto">
                  <NuxtLink to="/home" class="d-flex align-center text-decoration-none">
                    <v-icon color="white" size="x-large" class="mr-4">mdi-movie-open</v-icon>
                    <v-toolbar-title class="text-white text-body-1 text-md-h6">
                      Nyarikimovies
                    </v-toolbar-title>
                  </NuxtLink>
                </v-col>
                <v-col cols="auto" class="flex-grow-1"></v-col>
                <v-col cols="auto" class="d-sm-flex">
                  <Search></Search>
                </v-col>
                <v-col cols="auto" class="d-flex align-center">
                  <v-avatar size="40" class="mx-4">
                    <v-img alt="Profile" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                  </v-avatar>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        color="white"
                        icon="mdi-dots-vertical"
                        variant="text"
                        v-bind="props"
                      ></v-btn>
                    </template>
                    <v-list density="compact">
                      <v-list-item @click="logout()">
                        <v-list-item-title>Log out</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="0" md="1"></v-col>
          </v-row>
        </v-container>
      </v-toolbar>
      <v-container fluid class="pa-0">
        <v-row no-gutters>
          <v-col cols="0" md="1" style="background-color: #282654;"></v-col>
          <v-col cols="12" md="10">
            <slot></slot>
          </v-col>
          <v-col cols="0" md="1" style="background-color: #282654;"></v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script setup lang="ts">
  import Search from '~/components/Search.vue';
  
  const authToken = useCookie('auth-token')
  
  function logout() {
    authToken.value = null
    navigateTo('/login')
  }
  
  onMounted(() => {
    console.log('authToken', authToken)
  })
  </script>