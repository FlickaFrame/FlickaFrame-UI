export default defineNuxtRouteMiddleware((from, to) => {
  console.log('Route transition', from.meta.pageTransition, to)
})
