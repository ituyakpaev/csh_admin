export default {
    namespaced: true,
    state: {
        is_admin: true,
        is_superuser: false,
        is_active: false,
        picture: '',
        full_name: '',
        email: '',
        phone: '',
        id: '',
        rights: {
            product: { // added tested
                get: true,
                create: true,
                update: true,
                delete: false
            },
            product_field: { // added
                get: true,
                create: true,
                update: true,
                delete: false
            },
            variant: {
                get: true,
                create: true,
                update: true,
                delete: false
            }, // added
            product_option: { // added
                get: true,
                create: true,
                update: true,
                delete: false
            },
            type_price: { // added
                get: true,
                create: true,
                update: true,
                delete: false
            },
            currency: {
                get: true,
                create: true,
                update: true,
                delete: false
            }, // added
            collection: { // added
                get: true,
                create: true,
                update: true,
                delete: false
            },
            settings: {
                get: true,
                update: false
            }, // added
            analytics: {
                get: true,
                update: false
            }, // added
            seo_templates:{
                get: true,
                update: false // admin || super_admin
            }, // added
            gpb_item: {
                create: true,
                update: true,
                delete: false,
                get: true
            },
            gpb_category: {
                create: true,
                update: true,
                delete: false,
                get: true
            }

        }
    },
    mutations: {
        setUser(state, user) {
            state.id = user.id
            state.is_admin = user.is_admin
            state.is_superuser = user.id === 1
            state.is_active = user.is_active || false
            state.picture = user.picture
            state.full_name = `${ user.name } ${ user.last_name }`
            state.email = user.email || 'email not found'
        },
        setRights(state,user) {
            Object.keys(state.rights).map(key => {
                state.rights[key].delete = user.is_admin || user.id === 1
            })
            state.rights.settings.update = user.is_admin || user.id === 1
            state.rights.seo_templates.update = user.is_admin || user.id === 1
            state.rights.analytics.update = user.is_admin || user.id === 1
        }
    }
}
