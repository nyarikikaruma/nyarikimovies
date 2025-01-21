// composables/useAuth.ts
import { ref, computed } from 'vue'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '~/firebase/config'

export const useAuth = () => {
    const user = ref<User | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const isAuthenticated = computed(() => !!user.value)

    // Initialize auth state
    onAuthStateChanged(auth, (_user) => {
        user.value = _user
    })

    const signUp = async (email: string, password: string) => {
        loading.value = true
        error.value = null
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            return userCredential.user
        } catch (e: any) {
            error.value = e.message
            throw e
        } finally {
            loading.value = false
        }
    }

    const signIn = async (email: string, password: string) => {
        loading.value = true
        error.value = null
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            return userCredential.user
        } catch (e: any) {
            error.value = e.message
            throw e
        } finally {
            loading.value = false
        }
    }

    const signOut = async () => {
        loading.value = true
        error.value = null
        try {
            await firebaseSignOut(auth)
        } catch (e: any) {
            error.value = e.message
            throw e
        } finally {
            loading.value = false
        }
    }

    return {
        user,
        loading,
        error,
        isAuthenticated,
        signUp,
        signIn,
        signOut
    }
}