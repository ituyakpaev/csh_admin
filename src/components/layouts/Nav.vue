<template>
    <div class="nav">
        <div class="nav__overlay" :class="{ opened: show }" @click="close" />
        <div class="nav__inner" :class="{ opened: showMenu }">
            <div class="nav__group" v-for="group in navigation" :key="group.title">
                <router-link :to="group.link" class="nav__link">
                    {{ group.title }}
                </router-link>
                <transition name="opacity">
                    <div class="nav__submenu" v-if="group.submenu"
                         v-show="$route.path === group.link || group.submenu.map(link => link.link).indexOf($route.path) !== -1">
                        <router-link class="nav__sublink" v-for="sublink in group.submenu" :key="sublink.title + 'sub'"
                                     :to="sublink.link">
                            {{ sublink.title }}
                        </router-link>
                    </div>
                </transition>
            </div>
            <div class="platforms" v-if="false">
                <div class="platforms__header">
                    Площадки
                </div>
                <div class="platforms__list">
                    <router-link to="/themes" class="platforms__link">
                        Интернет магазин
                    </router-link>
                </div>
            </div>
            <div class="nav__bottom nav__group" v-if="false">
                <router-link to="/settings" class="nav__link">
                    Настройки
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "Nav.vue",
        data() {
            return {
                navigation: [
                    {
                        title: 'Главная',
                        link: '/'
                    },
                    {
                        title: 'Пользователи',
                        link: '/users',
                        submenu: [
                            {
                                title: 'Кураторы',
                                link: '/users?curator'
                            },
                            {
                                title: 'Клиенты',
                                link: '/users?clients'
                            }
                        ]
                    },
                ]
            }
        },
        computed: {
            ...mapState({
                show: state => state.MENU.show
            }),
            showMenu() {
                return this.$breakPoint.current === 'exwd' || this.$breakPoint.current === 'wd' || this.$breakPoint.current === 'lg' || this.show
            }
        },
        methods: {
            close() {
                console.log('vvfd')
                this.$store.commit("menu", false)
            }
        }
    }
</script>

<style scoped lang="scss">

    .nav {
        &-enter-active {
            transition: transform .2s ease-in;
        }

        &-leave-active {
            transition: transform .2s ease-out;
        }

        &-enter,
        &-leave-to /* .fade-leave-active до версии 2.1.8 */
        {
            transform: translateX(-200px);
        }
    }

    .nav {
        &__inner {
            background-color: $background;
            z-index: 5;
            border-right: 1px solid black;
            padding: 16px 8px;
            width: 200px;
            box-sizing: border-box;
            height: calc(100vh - 54px);
            display: flex;
            flex-direction: column;
            position: fixed;
            left: 0;
            top: 54px;
            bottom: 0;
            border-right: 1px solid #dfe3e8;

            @include media(medium) {
                will-change: transform;
                max-width: 200px;
                height: 100vh;
                z-index: 101;
                left: -200px;
                top: 0;
                bottom: 0;
                transition: left .3s;

                &.opened {
                    left: 0;
                }
            }
        }

        &__overlay {
            all: unset;
            position: fixed;
            opacity: 0;
            top: 0;
            right: 0;
            pointer-events: none;
            left: 0;
            bottom: 0;
            z-index: 100;
            background-color: rgba(0,0,0,.3);
            backdrop-filter: blur(5px);

            &.opened {
                opacity: 1;
                pointer-events: all;
            }
        }

        &__group {
        }

        &__link {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-weight: bold;
            color: #2c3e50;
            height: 32px;
            padding: 0 8px;
            text-align: left;
            vertical-align: middle;
            text-decoration: none;

            &:hover {
                background-color: rgba(223, 227, 232, .3)
            }

            &.exact-active {
                background-color: rgba(223, 227, 232, .3);
                color: #42b983;
            }
        }

        &__submenu {
            margin: 0px 0 10px 0;
        }

        &__sublink {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-weight: 500;
            color: #2c3e50;
            height: 25px;
            border-radius: 5px;
            padding: 0 8px;
            box-sizing: border-box;
            margin-left: 25px;
            width: calc(100% - 25px);
            text-align: left;
            vertical-align: middle;
            text-decoration: none;

            &:hover,
            &.exact-active {
                background-color: rgba(62, 73, 193, 0.05);
            }
        }

        &__bottom {
            position: absolute;
            bottom: 16px;
            width: calc(100% - 16px);
        }
    }

    .platforms {
        margin-top: 20px;

        &__header {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-weight: bold;
            color: #6d6d6d;
            height: 32px;
            padding: 0 8px;
            text-align: left;
            vertical-align: middle;
            text-decoration: none;
            border-top: 1px solid #DFE3E8;
        }

        &__link {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-weight: bold;
            color: #2c3e50;
            height: 32px;
            padding: 0 8px;
            text-align: left;
            vertical-align: middle;
            text-decoration: none;

            &:hover {
                background-color: rgba(223, 227, 232, .3)
            }

            &.active {
                background-color: rgba(223, 227, 232, .3);
                color: #42b983;
            }
        }
    }

    .opacity {
        &-enter-active, &-leave-active {
            transition: all .1s;
            will-change: transform;
        }

        &-enter, &-leave-to /* .fade-leave-active до версии 2.1.8 */
        {
            opacity: 0;
            transform: translate3d(0, 50px, 0);
        }
    }
</style>
