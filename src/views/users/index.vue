<template>
    <div>
        <mini-nav title="Пользователи" back-link="/" />
        <panelbox >
            <modal>
                njk
            </modal>
            <table_box v-bind="table" :query="$route.query" @query:update="queryUpdate($event)" @open="authByUser" />
        </panelbox>
    </div>
</template>

<script>
    import table_box from "@/components/regular/table/index";
    import users from "@/middleware/api/v1/requests/users";
    import { DOMAIN } from "@/middleware/helpers";

    export default {
        name: "index.vue",
        components: {table_box},
        data() {
            return {
                table: {
                    isLoading: true,
                    errorLog: [],
                    modal: {
                        show: false,
                        model: {
                            id: {
                                value: '',
                                label: 'Ид пользователя'
                            },
                            password: {
                                value: '',
                                label: 'Новый пароль'
                            }
                        }
                    },
                    headers: {
                        name: {
                            title: 'Имя'
                        },
                        last_name: {
                            title: 'Фамилия'
                        },
                        email: {
                            title: 'Почта'
                        },
                        id: {
                            title: 'id'
                        }
                    },
                    query_parse: {
                        q: {
                            title: 'Поиск'
                        }
                    },
                    data: [],
                    meta: {}
                }
            }
        },
        methods: {
            getData: async function () {
                this.table.isLoading = true

                await users.getUsers(this.$route.query)
                    .then(res => {
                        console.log(res)
                        this.table.data = res.data.rows
                        this.table.meta = res.data.meta
                    })
                    .catch(err => {
                        this.table.errorLog.push(err)
                    })

                this.table.isLoading = false
            },
            queryUpdate(e) {
                console.log(e)
                this.$router.push({
                    ...this.$route,
                    query: e
                })
            },
            authByUser(user) {
                users.getToken(user.id)
                    .then(res => {
                        window.open(`${ DOMAIN }?set_token=${ res.data.access_token }&token_type=bearer`)
                    })
            }
        },
        created() {
            this.getData()
        }
    }
</script>
