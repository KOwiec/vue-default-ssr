import Home from '../views/HomeView.vue'
export const constantRoutes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue')
    }
]
