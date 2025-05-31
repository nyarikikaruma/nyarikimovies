<template>
    <v-slide-group-item v-for="n in 6" :key="n">
        <div class="ma-2">
            <v-skeleton-loader :loading="true" type="image, list-item-two-line, paragraph" class="mx-0" width="280"
                height="580">
                <template #image>
                    <v-skeleton-loader type="image" height="420" class="mb-0"></v-skeleton-loader>
                </template>
                <template #default>
                    <div class="pa-4">
                        <!-- Title skeleton -->
                        <v-skeleton-loader type="text" class="mb-2"></v-skeleton-loader>
                        <v-skeleton-loader type="text" class="mb-3" width="60%"></v-skeleton-loader>

                        <!-- Stats skeleton -->
                        <div class="d-flex align-center mb-3">
                            <v-skeleton-loader type="text" width="40px" class="mr-3"></v-skeleton-loader>
                            <v-skeleton-loader type="text" width="30px" class="mr-3"></v-skeleton-loader>
                            <v-skeleton-loader type="text" width="35px"></v-skeleton-loader>
                        </div>

                        <!-- Description skeleton -->
                        <v-skeleton-loader type="paragraph" class="mt-2"></v-skeleton-loader>
                    </div>
                </template>
            </v-skeleton-loader>
        </div>
    </v-slide-group-item>
</template>