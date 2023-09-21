import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory
} from 'vue-router'

// table of routes (static)
//import { constantRoutes } from './routes'

/**
  Auto generates routes by vite from vue files under ./views
const pages = {
  '../views/HomeView.vue': () => import('../views/HomeView.vue'),
  '../views /AboutView.vue': () => import('../views/AboutView.vue'),
}
 https://vitejs.dev/guide/features.html#glob-import
 **/
const pages = import.meta.glob('../views/*.vue')
const Routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/views(.*)\.vue$/)[1].toLowerCase()
  //console.log("name", name)
  return {
    path: name === '/homeview' ? '/' : name,
    component: pages[path]                    // () => import('../views/*.vue')
  }
})
export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: Routes     //constantRoutes
  })
}



