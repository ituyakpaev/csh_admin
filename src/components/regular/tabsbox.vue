<template>
    <div>
        <div class="tabs__navigation swiper-container" v-swiper:Tabs="slider_options">
            <div class="swiper-wrapper">
                <div class='tabs__navigation-link swiper-slide' :class="{ active: active ? active === index : nav.to === $route.path }"
                             v-for="(nav, index) in nav" :key="index" @click="routePush(nav)">
                    {{ nav.title }}
                    <div class="tabs__navigation-counter" v-if="nav.count >= 0" >
                        {{ nav.count }}
                    </div>
                </div>
            </div>
        </div>
        <div class="tabs__content">
            <slot>
                <router-view />
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tabsbox",
        props: {
            nav: {
                type: Object,
                required: true
            },
            active: {
                default: false
            }
        },
        data() {
            return {
                slider_options: {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                    simulateTouch: false
                }
            }
        },
        methods: {
            routePush(nav) {
                if (!nav.to) {
                    this.$emit('nav', nav)
                } else if (nav.to !== this.$route.path) {
                    this.$router.push(nav.to)
                }
            }
        }
    }
</script>
