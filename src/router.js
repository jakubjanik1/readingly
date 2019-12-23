import VueRouter from 'vue-router'
import Vue from 'vue'
import Library from '@/pages/Library'
import Reader from '@/pages/Reader'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'library',
            component: Library
        },
        {
            path: '/reader/:book',
            name: 'reader',
            component: Reader
        },
        {
            path: '*',
            beforeEnter(to, from, next) {
                next({ name: 'library' })
            }
        }
    ]
})