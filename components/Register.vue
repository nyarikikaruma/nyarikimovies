<template>
    <v-card class="mx-auto pa-6" max-width="400">
        <v-card-title class="text-center text-h5 mb-4">
            Register
        </v-card-title>

        <form @submit.prevent="handleRegister">
            <v-text-field variant="solo-filled" v-model="form.email" :error-messages="errors.email" label="Email" type="email" required
                @input="clearError('email')"></v-text-field>

            <v-text-field variant="solo-filled" v-model="form.password" :error-messages="errors.password" label="Password" type="password"
                required @input="clearError('password')"></v-text-field>

            <v-text-field variant="solo-filled" v-model="form.confirmPassword" :error-messages="errors.confirmPassword"
                label="Confirm Password" type="password" required @input="clearError('confirmPassword')"></v-text-field>

            <v-btn block color="primary" class="mt-4" type="submit" :loading="loading">
                Register
            </v-btn>

            <div class="text-center mt-4">
                Already have an account?
                <NuxtLink to="/login" class="text-decoration-none">
                    Login here
                </NuxtLink>
            </div>
        </form>
    </v-card>
</template>
<script setup lang="ts">
const { $auth } = useNuxtApp()
const loading = ref(false)
const form = reactive({
    email: '',
    password: '',
    confirmPassword: ''
})

const errors = reactive({
    email: '',
    password: '',
    confirmPassword: ''
})

const validateForm = () => {
    let isValid = true

    // Reset errors
    errors.email = ''
    errors.password = ''
    errors.confirmPassword = ''

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

    if (!form.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password'
        isValid = false
    } else if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
        isValid = false
    }

    return isValid
}

const clearError = (field) => {
    errors[field] = ''
}

const handleRegister = async () => {
    if (!validateForm()) return

    try {
        loading.value = true
        const registered = await $auth.signUp(form.email, form.password)
        if (registered) {
            navigateTo('/home')
        }
    } catch (error) {
        console.error('Registration error:', error)
    } finally {
        loading.value = false
    }
}
</script>