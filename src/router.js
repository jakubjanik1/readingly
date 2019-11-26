import VueRouter from 'vue-router'
import Vue from 'vue'
import Library from '@/pages/Library'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Library
        }
    ]
})