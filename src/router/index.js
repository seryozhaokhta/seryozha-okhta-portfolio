// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CVPage from '@/views/CVPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/cv',
        name: 'CVPage',
        component: CVPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
