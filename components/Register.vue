<template>
    <div class="registration-container">
        <v-container class="fill-height">
            <v-row justify="center" align="center">
                <v-col cols="12" sm="8" md="6" lg="4">
                    <v-card class="registration-card elevation-8" rounded="lg">
                        <v-card-title class="text-center text-h5 mb-4">
                            Register
                        </v-card-title>

                        <v-card-text>
                            <v-alert
                                v-if="registerError"
                                type="error"
                                variant="tonal"
                                closable
                                class="mb-4"
                                @click:close="registerError = ''"
                            >
                                {{ registerError }}
                            </v-alert>

                            <form @submit.prevent="handleRegister">
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

                                <v-text-field
                                    v-model="form.confirmPassword"
                                    :error-messages="errors.confirmPassword"
                                    label="Confirm Password"
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
                                    class="mt-4"
                                >
                                    Register
                                </v-btn>

                                <div class="text-center mt-6">
                                    Already have an account?
                                    <NuxtLink to="/login" class="text-decoration-none ml-1">
                                        Login here
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
const auth = useAuthState();
const loading = ref(false);
const registerError = ref('');

const form = reactive({
    email: '',
    password: '',
    confirmPassword: ''
});

const errors = reactive({
    email: '',
    password: '',
    confirmPassword: ''
});

const validateForm = () => {
    let isValid = true;

    // Reset all errors
    errors.email = '';
    errors.password = '';
    errors.confirmPassword = '';
    registerError.value = '';

    // Email validation
    if (!form.email) {
        errors.email = 'Email is required';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Please enter a valid email';
        isValid = false;
    }

    // Password validation
    if (!form.password) {
        errors.password = 'Password is required';
        isValid = false;
    } else if (form.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
        isValid = false;
    }

    // Confirm password validation
    if (!form.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
        isValid = false;
    } else if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
        isValid = false;
    }

    return isValid;
};

const clearErrors = () => {
    errors.email = '';
    errors.password = '';
    errors.confirmPassword = '';
    registerError.value = '';
};

const handleRegister = async () => {
    if (!validateForm()) return;

    try {
        loading.value = true;
        registerError.value = '';
        const registered = await auth.signUp(form.email, form.password);
        
        if (registered) {
            navigateTo('/home');
        }
    } catch (error: any) {
        console.error('Registration error:', error);
        
        // Handle specific error cases
        if (error?.message?.includes('email-already-in-use')) {
            registerError.value = 'This email is already registered. Please use a different email or login to your existing account.';
        } else if (error?.message?.includes('invalid-email')) {
            registerError.value = 'Please enter a valid email address.';
        } else if (error?.message?.includes('weak-password')) {
            registerError.value = 'Please choose a stronger password. It should be at least 6 characters long.';
        } else {
            registerError.value = 'Registration failed. Please try again later.';
        }
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.registration-container {
    min-height: 100vh;
}

.registration-card {
    padding: 1.5rem;
}

@media (max-width: 600px) {
    .registration-card {
        padding: 1rem;
    }
}
</style>