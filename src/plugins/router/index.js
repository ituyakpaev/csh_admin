import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "@/plugins/router/routes";

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: 'history',
    base: '/admin/',
    linkExactActiveClass: 'exact-active',
    linkActiveClass: 'active'
})

router.afterEach(to => {
    if (to.meta.title) {
        document.title = `${ to.meta.title } | Cake-school CMS`
    } else {
        document.title = 'Cake-school CMS'
    }
})

export default router
