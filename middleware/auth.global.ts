export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = useAuth()
    
    console.log('isAuthenticated', isAuthenticated)
    
    const publicRoutes = ['/login', '/register']
    
    if (!isAuthenticated.value && !publicRoutes.includes(to.path)) {
      return navigateTo('/login')
    }
    
    if (isAuthenticated.value && publicRoutes.includes(to.path)) {
      return navigateTo('/')
    }
  })