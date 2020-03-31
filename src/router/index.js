import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    //mode: 'history',
    routes: [{
        path: '/',
        redirect: 'main'
    }, {
        path: '/errorbox',
        name: 'errorbox',
        component: resolve =>
            require(['@/components/newpage/error.vue'], resolve)
    }, {
        path: '/main',
        name: 'main',
        component: resolve => require(['@/components/main.vue'], resolve),
        redirect: {
            name: 'dynamicprocess'
        },
        children: [{
            path: '/dynamicprocess',
            name: 'dynamicprocess',
            component: resolve => require(['@/components/newpage/dynamicprocess.vue'], resolve)
        }, {
            path: '/dynamicpresslist',
            name: 'dynamicpresslist',
            component: resolve => require(['@/components/newpage/dynamicprocesslist.vue'], resolve)
        }]
    }, {
        path: '/*',
        name: 'error',
        component: resolve => require(['@/components/common/RouteError.vue'], resolve)
    }]
})
export default router