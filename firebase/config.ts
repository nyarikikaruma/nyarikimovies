// firebase/config.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
const runtimeConfig = useRuntimeConfig()


const firebaseConfig = {
    firebaseApiKey: runtimeConfig.public.firebaseApiKey,
    firebaseAuthDomain: runtimeConfig.public.firebaseAuthDomain,
    firebaseProjectId: runtimeConfig.public.firebaseProjectId,
    firebaseStorageBucket: runtimeConfig.public.firebaseStorageBucket,
    firebaseMessagingSenderId: runtimeConfig.public.firebaseMessagingSenderId,
    firebaseAppId: runtimeConfig.public.firebaseAppId
}
console.log('apiKey', firebaseConfig.apiKey)
export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)