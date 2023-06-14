import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/web/Login.vue')
        },
        {
            path: '/rqlogin',
            name: 'rqlogin',
            component: () => import('@/views/web/rqLogin.vue')
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('@/views/web/User.vue')
        },
        {
            path: '/singer/:id',
            name: 'singer',
            component: () => import('@/views/web/singer/SingerDetail.vue')
        },
        {
            path: '/playlist/:id',
            name: 'playlist',
            component: () => import('@/views/web/playlist/PlayList.vue')
        },
        {
            path: '/playlist/detail',
            name: 'playlistDetail',
            component: () => import('@/views/web/playlist/Detail.vue')
        },
        {
            path: '/singer/category',
            name: 'singerCategory',
            component: () => import('@/views/web/singer/SingerCategory.vue')
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('@/views/web/Test.vue')
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     const token = JSON.parse(localStorage.getItem('token'))
//     if (!token && to.name !== 'home') {
//         router.push('/')
//     } else {
//         next()
//     }
// })


export default router;