<template>
    <div id="header">
        <div class="header">
            <div class="header__burger" @click='$store.commit("menu", !$store.state.MENU.show)' >
                <span />
                <span />
                <span />
            </div>
            <div class="header__site-name">
                Cake-school
            </div>
            <div class="header-right">
                <div class="header-account__wrapper">
                    <router-link tag="div" :to="`/`" class="header-account" style="cursor:pointer;">
                        <div>
                            <span v-text="user.name" class="header-account__name" />
                            <span v-text="user.last_name" class="header-account__last-name" />
                        </div>
                        <div title="Фото профиля" class="header-account__pic loading">
                            <img v-if="user.picture" :src="user.picture">
                            <span v-else> {{ user.full_name[0] }} </span>
                        </div>
                    </router-link>
                    <div class="header-account__exit">
                        <div @click="exit">
                            Выйти
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "Header",
        computed: {
            ...mapState({
                user: state => state.USER
            })
        },
        methods: {
            exit() {
                this.$store.dispatch('exit')
            }
        }
    }
</script>

<style lang="scss">
    #header {
        height: 54px
    }
    .header {
        z-index: 100;
        padding: 0 16px;
        height: 54px;
        background: #1c2260;
        position: fixed;
        left: 0;
        color: white;
        right: 0;
        align-items: center;
        top: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        &__burger {
            display: none;

            @include media(medium) {
                height: 25px;
                width: 30px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                span {
                    width: 30px;
                    height: 2px;
                    background-color: #fff;
                    content: '';
                    border-right: 5px;
                }
            }
        }

        &__site-name {
            max-width: 240px;
        }

        &-right {
            display: flex;
            justify-content: flex-end;
        }

        &-language {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            &__select {
                outline: none;
                background: transparent;
                border: none;
                color: white;
                font-size: 14px;
                margin-right: 20px;
                cursor: pointer;
            }
        }

        &-account {
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 1;

            &__wrapper {
                position: relative;

                &:hover .header-account__exit,
                .header-account__exit:hover {
                    height: auto;
                    padding: 10px;
                }
            }

            &__pic {
                width: 35px;
                height: 35px;
                background: orange;
                border-radius: 50%;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 10px;

                img {
                    object-fit: cover;
                }
            }

            &__exit {
                cursor: pointer;
                box-sizing: border-box;
                display: flex;
                position: absolute;
                top: 120%;
                color: black;
                background: white;
                overflow: hidden;
                padding: 0 10px;
                transition: all .2s;
                height: 0;
                right: 0;
            }
        }
    }
</style>
