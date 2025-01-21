// composables/useAuth.ts
import { ref, computed } from 'vue'
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut as firebaseSignOut, 
    onAuthStateChanged, 
    type User 
} from 'firebase/auth'

export const useAuthState = () => {
    const nuxtApp = useNuxtApp()
    const user = ref<User | null>(null)
    const loading = ref(true) // Start with loading true
    const error = ref<string | null>(null)


    const isAuthenticated = computed(() => !!user.value)
    console.log('User', user)
    // Only set up the auth listener once the auth instance is available
    if (nuxtApp.$firebaseAuth) {
        onAuthStateChanged(nuxtApp.$firebaseAuth, (_user) => {
            user.value = _user
            loading.value = false // Set loading to false once we have the initial auth state
        })
    }
    
    const signUp = async (email: string, password: string) => {
        if (!nuxtApp.$firebaseAuth) throw new Error('Auth is not initialized')
        
        loading.value = true
        error.value = null
        try {
            const userCredential = await createUserWithEmailAndPassword(nuxtApp.$firebaseAuth, email, password)
            return userCredential.user
        } catch (e: any) {
            error.value = e.message
            throw e
        } finally {
            loading.value = false
        }
    }
    
    const signIn = async (email: string, password: string) => {
        if (!nuxtApp.$firebaseAuth) throw new Error('Auth is not initialized')
        
        loading.value = true
        error.value = null
        try {
            const userCredential = await signInWithEmailAndPassword(nuxtApp.$firebaseAuth, email, password)
            return userCredential.user
        } catch (e: any) {
            error.value = e.message
            throw e
        } finally {
            loading.value = false
        }
    }
    
    const signOut = async () => {
        if (!nuxtApp.$firebaseAuth) throw new Error('Auth is not initialized')
        
        loading.value = true
        error.value = null
        try {
            await firebaseSignOut(nuxtApp.$firebaseAuth)
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