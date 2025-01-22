import { ref } from 'vue'
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
    const loading = ref(true)
    const error = ref<string | null>(null)


    if (nuxtApp.$firebaseAuth) {
        onAuthStateChanged(nuxtApp.$firebaseAuth, (_user) => {
            user.value = _user
            loading.value = false 
        })
    }
    
    const signUp = async (email: string, password: string) => {
        if (!nuxtApp.$firebaseAuth) throw new Error('Auth is not initialized')
        
        loading.value = true
        error.value = null
        try {
            const userCredential = await createUserWithEmailAndPassword(nuxtApp.$firebaseAuth, email, password)
            const authToken = useCookie('auth-token', {
                maxAge: 60 * 60 * 24, 
                secure: true,
                sameSite: 'strict'
            })
            authToken.value = 'userLoggedIn'
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
            const authToken = useCookie('auth-token', {
                maxAge: 60 * 60 * 24, 
                secure: true,
                sameSite: 'strict'
            })
            authToken.value = 'userLoggedIn'
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
            const token = useCookie('auth-token')
            token.value = null
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
        signUp,
        signIn,
        signOut
    }
}