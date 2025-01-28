<template>
    <div class="login-container">
        <v-container class="fill-height">
            <v-row justify="center" align="center">
                <v-col cols="12" sm="8" md="6" lg="4">
                    <v-card class="login-card elevation-8" rounded="lg">
                        <v-card-item>
                            <v-card-title class="text-center text-h5 mb-4">
                                Login
                            </v-card-title>
                        </v-card-item>

                        <v-card-text>
                            <v-alert v-if="loginError" type="error" variant="tonal" closable class="mb-4" @click:close="loginError = ''">
                                {{ loginError }}
                            </v-alert>

                            <form @submit.prevent="handleLogin">
                                <v-text-field
                                    v-model="form.email"
                                    :error-messages="errors.email"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    density="comfortable"
                                    bg-color="surface"
                                    required
                                    @input="clearErrors"
                                ></v-text-field>

                                <v-text-field
                                    v-model="form.password"
                                    :error-messages="errors.password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    density="comfortable"
                                    bg-color="surface"
                                    required
                                    @input="clearErrors"
                                ></v-text-field>

                                <v-btn
                                    block
                                    color="primary"
                                    size="large"
                                    type="submit"
                                    :loading="loading"
                                    class="mt-2"
                                >
                                    Login
                                </v-btn>

                                <div class="text-center mt-6">
                                    Don't have an account?
                                    <NuxtLink to="/register" class="text-decoration-none ml-1">
                                        Register here
                                    </NuxtLink>
                                </div>
                            </form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
const auth = useAuthState()
const loading = ref(false)
const loginError = ref('')

const form = reactive({
    email: '',
    password: ''
})

const errors = reactive({
    email: '',
    password: ''
})

const validateForm = () => {
    let isValid = true
    errors.email = ''
    errors.password = ''

    if (!form.email) {
        errors.email = 'Email is required'
        isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Please enter a valid email'
        isValid = false
    }

    if (!form.password) {
        errors.password = 'Password is required'
        isValid = false
    } else if (form.password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
        isValid = false
    }

    return isValid
}

const clearErrors = () => {
    errors.email = ''
    errors.password = ''
    loginError.value = ''
}

const handleLogin = async () => {
    if (!validateForm()) return

    try {
        loading.value = true
        loginError.value = ''
        const login = await auth.signIn(form.email, form.password)
        if (login) {
            navigateTo('/home')
        }
    } catch (error) {
        console.error('Login error:', error)
        loginError.value = 'Invalid email or password. Please try again or register for a new account.'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
}

.login-card {
    padding: 1.5rem;
}

@media (max-width: 600px) {
    .login-card {
        padding: 1rem;
    }
}
</style>