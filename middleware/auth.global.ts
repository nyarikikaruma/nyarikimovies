export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuthState(); 
    const userValue = auth.user.value
    console.log('auth', auth.user.value)
    console.log('userValue', userValue)
    if (!auth.isAuthenticated.value && !['/login', '/register'].includes(to.path)) {
        return navigateTo('/login');
    }

    if (auth.isAuthenticated.value && ['/login', '/register'].includes(to.path)) {
        return navigateTo('/home');
    }
});
