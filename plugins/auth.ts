export default defineNuxtPlugin(() => {
    const authState = useAuthState()
    
    return {
        provide: {
            auth: authState
        }
    }
})