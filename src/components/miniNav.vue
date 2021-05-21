<template>
    <div class="mini-nav">
        <div class="mini-nav__left">
            <div @click="backGo" class="mini-nav__back">
                <span />
                Назад
            </div>
            <h1 class="mini-nav__title">{{ title }}</h1>
        </div>
        <div class="right">
            <button_box v-if='button' class="button" @click="$emit('save')" :loading="loading">
                Сохранить
            </button_box>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MiniNav.vue",
        components: {},
        props: {
            back: String,
            title: String,
            loading: {
                type: Boolean,
                default: false
            },
            button: {
                type: Boolean,
                default: false
            },
            buttonText: {
                type: String,
                default: 'Сохранить'
            },
            backLink: String
        },
        methods: {
            backGo() {
                this.backLink ? this.$router.push(this.backLink) : this.$emit('back')
            }
        }
    }
</script>

<style scoped lang="scss">
    .mini-nav {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 20px;

        &__left {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            h1 {
                font-size: 24px;
                letter-spacing: .3px;
            }
        }

        &__title {
            margin: 0 0 0 0;
        }


        &__back {
            text-decoration: none;
            color: rgb(44,62,80);
            opacity: .7;
            font-size: 16px;
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            span {
                display: block;
                height: 6px;
                width: 6px;
                border-top: 2px solid rgb(44,62,80);
                opacity:.7;
                border-left: 2px solid rgb(44,62,80);
                transform: rotate(-45deg) translate(-1px, -2px);
            }
        }

    }

</style>
