<template >
    <div id='auth' class='auth'>
        <modal :opened="modal">
        </modal>
        <h1 style="margin-bottom: 20px">Авторизуйтесь</h1>
        <form class="auth__login">
            <input-box v-bind="model.username" v-model="model.username.value" class="auth__field" />
            <input-box v-bind="model.password" v-model="model.password.value" class="auth__field" />
            {{ error }}
        </form>
        <button_box class='button' @click="login" :loading="isPerforming"> Войти </button_box>
    </div>
</template>

<script>
    import auth from "@/middleware/api/v1/requests/auth";
    import modal from "../components/regular/modal";

    export default {
        name: "Auth",
        components: {modal},
        data () {
            return {
                isPerforming: false,
                error: '',
                modal: false,
                model: {
                    username: {
                        label: '👤 Логин',
                        value: '',
                        error: '',
                        type: 'text'
                    },
                    password: {
                        label: '🔓 Пароль',
                        value: '',
                        error: '',
                        type: 'password'
                    }
                }
            }
        },
        computed: {
            entity() {
                let result = {}
                Object.keys(this.model).map(key => {
                    result[key] = this.model[key].value
                })
                return result
            }
        },
        methods: {
            validate: function() {
                let err = false
                Object.keys(this.model).map(key => {
                    if (this.model[key].value === '') {
                        err = true
                        this.model[key].error = 'Поле обязательно'
                    }
                })
                return !err
            },
            login: async function () {
                if (this.validate()) {
                    this.isPerforming = true

                    await auth.auth( this.entity.username, this.entity.password )
                        .then(res => {
                            this.$store.commit('setAuth', { state: true, token: `${ res.data.token_type } ${ res.data.access_token }` })
                            this.$store.dispatch('getCommonInfo')
                        })
                        .catch(err => {
                            if (err.status === 401) {
                                this.model.password.error = 'Неправильный пароль'
                            } else if (err.status === 404) {
                                this.model.username.error = 'Такого пользователя не существует'
                            } else if (err.status === 403) {
                                this.model.username.error = 'Ваш аккаунт не активирован'
                            } else {
                                this.model.username.error = `Произошла ошибка. Код #${ err.status } `
                            }
                        });

                    this.isPerforming = false
                }
            },
        }
    }
</script>
