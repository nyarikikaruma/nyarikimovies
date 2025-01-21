<template>
    <div>
        <v-card class="mx-auto pa-6" max-width="400">
            <v-card-title class="text-center text-h5 mb-4">
                Login
            </v-card-title>

            <form @submit.prevent="handleLogin">
                <v-text-field variant="solo-filled" v-model="form.email" :error-messages="errors.email" label="Email" type="email" required
                    @input="clearError('email')"></v-text-field>

                <v-text-field variant="solo-filled" v-model="form.password" :error-messages="errors.password" label="Password" type="password"
                    required @input="clearError('password')"></v-text-field>

                <v-btn block color="primary" class="mt-4" type="submit" :loading="loading">
                    Login
                </v-btn>

                <div class="text-center mt-4">
                    Don't have an account?
                    <NuxtLink to="/register" class="text-decoration-none">
                        Register here
                    </NuxtLink>
                </div>
            </form>
        </v-card>
    </div>
</template>
<script setup lang="ts">
const loading = ref(false)
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

    // Reset errors
    errors.email = ''
    errors.password = ''

    // Email validation
    if (!form.email) {
        errors.email = 'Email is required'
        isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Please enter a valid email'
        isValid = false
    }

    // Password validation
    if (!form.password) {
        errors.password = 'Password is required'
        isValid = false
    } else if (form.password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
        isValid = false
    }

    return isValid
}

const clearError = (field) => {
    errors[field] = ''
}

const handleLogin = async () => {
    if (!validateForm()) return

    try {
        loading.value = true
        // Add your login logic here
        console.log('Login form:', form)

        // Example navigation after successful login
        // await navigateTo('/dashboard')
    } catch (error) {
        console.error('Login error:', error)
    } finally {
        loading.value = false
    }
}
</script>