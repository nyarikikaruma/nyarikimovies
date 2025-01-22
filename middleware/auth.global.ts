export default defineNuxtRouteMiddleware((to) => {
    const authToken = useCookie('auth-token')
    
    const publicRoutes = ['/login', '/register']
    const isPublicRoute = publicRoutes.includes(to.path)
  
    if (!authToken.value && !isPublicRoute) {
      return navigateTo('/login')
    }
  
    if (authToken.value && isPublicRoute) {
      return navigateTo('/home')
    }
  })