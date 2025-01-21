import { createFirebaseApp } from '~/firebase/config'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    
    const { app, auth } = createFirebaseApp(config.public)
    
    return {
        provide: {
            firebase: app,
            firebaseAuth: auth
        }
    }
})