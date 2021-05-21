export default [
    {
        path: '/',
        name: 'home',
        component: () => import('../../views/index')
    },
    {
        path: '/auth',
        name: 'auth',
        component: () => import('../../views/auth'),
        meta: {
            title: 'Авторизация',
            section: 'auth'
        }
    },
    {
        path: '/certname',
        name: 'certname',
        component: () => import('../../views/certificate_name')
    },
    {
        path: '/users',
        name: 'users',
        component: () => import('../../views/users/index'),
        meta: {
            title: 'Пользователи',
            section: 'users'
        }
    },
    {
        path: '/*',
        name: '404',
        component: () => import('../../views/page404')
    },

]
