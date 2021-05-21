<template>
    <div class='amitcms'>
        <div class='amitcms__message error' v-if="errorLog.length > 0">
            <error :error="errorLog[0] || ''" />
        </div>
        <div class='amitcms__message' v-else-if="isLoading && !user_checked">
            Загрузка
        </div>
        <div class='amitcms__app' v-else>
            <Header />
            <Nav />
            <div class="amitcms__content container">
                <router-view :key="key" :class="{ 'auth': $router.currentRoute.name === 'auth' }"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Nav from '@/components/layouts/Nav.vue'
    import Header from '@/components/layouts/Header.vue'
    import {mapState} from 'vuex'
    import auth from "@/middleware/api/v1/requests/auth";
    import error from "./components/regular/error";

    export default {
        name: 'Home',
        components: {Header, Nav, error},
        data() {
            return {
                errorLog: [],
                user_checked: false
            }
        },
        computed: {
            key() {
                if (this.$route.meta && this.$route.meta.disableKey) {
                    return 'static'
                } else {
                    return `${ this.$route.fullPath }`
                }
            },
            ...mapState({
                isLoading: state => !state.COMMON_DATA_PLACED,
                auth: state => state.AUTH
            })
        },
        methods: {
            checkAuth: async function () {
                let token = localStorage.getItem('admin_session_id')

                if (!token) {
                    this.$store.commit('setAuth', { state: false })
                    return
                }

                await auth.testToken(token)
                    .then(res => {
                        this.$store.commit('setAuth', { state: true, token: localStorage.getItem('admin_session_id') })
                        this.$store.dispatch('getCommonInfo', res.data)
                    })
                    .catch(err => {
                        console.log(err)
                        if (err.code === 401 || err.code === 403) { // TODO: Если пользователь удален, а токен есть в кеше - дает ошибку
                            this.$store.commit('setAuth', { state: false })
                        } else {
                            this.errorLog.push(err)
                        }
                    })
            },
        },
        created: async function () {
            this.checkAuth()
                .finally(() => {
                    this.user_checked = true
                })
        },
    }
</script>

<style lang="scss">
    #auth {
        max-width: none;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0;
        padding: 0;
        z-index: 1000;
        background-color: #f4f6f8;
    }
</style>

