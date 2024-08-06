import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/register-vue",
        name: 'register',
        component: () => import("./components/Register.vue"),
        meta: { public: true }
    },
    {
        path: "/login-vue",
        name: 'login',
        component: () => import("./components/Login.vue"),
        meta: { public: true }
    },
    {
        path: "/dashboard",
        name: 'dashboard',
        component: () => import("./components/Dashboard.vue"),
        meta: { public: false }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // Check if the user is authenticated (e.g., check if a token is stored)
    const isAuthenticated = !!localStorage.getItem('token');
    
    
    if (!to.meta.public && !isAuthenticated) {
    // If the route is not public and the user is not authenticated, redirect to login
    next({ name: 'login' });
    } else {
    // Otherwise, allow navigation
    next();
    }
});

export default router;