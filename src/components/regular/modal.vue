<template>
    <transition name="opacity" >
        <div class="modal" v-show="show">
            <div class="modal__overlay" v-show="show"/>
            <transition name="modal">
                <div class="modal__wrapper" v-show="show" :style="{ width: `${ width }px`}">
                    <div class="modal__header">
                        <div class="modal__header-title">
                            {{ header }}
                        </div>
                        <div class="modal__header-close" @click="$emit('close')">
                        </div>
                    </div>
                    <div class="modal__inner">
                        <slot />
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "modal",
        props: {
            show: {
                type: Boolean,
                default: false
            },
            header: {
                type: String,
                default: ''
            },
            width: {}
        },
        mounted() {
            document.addEventListener('keyup', (e) => {
                if (e.keyCode === 27) {
                    this.$emit('close')
                }
            });
        }
    }
</script>

<style lang="scss">
    .modal {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        position: fixed;
        z-index: 200;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: scroll;

        &__overlay {
            backdrop-filter: blur(2px);
            position: fixed;
            background-color: rgba(0,0,0,.2);
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            z-index: 1000;
        }

        &__wrapper {
            background-color: white;
            border-radius: 5px;
            width: 600px;
            z-index: 1001;
            border: 1px solid #c4cdd5;
            will-change: transform;
            margin: 75px 0;
        }

        &__header {
            border-bottom: 1px solid #c4cdd5;
            height: 50px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 0 20px;
            align-items: center;

            &-title {

            }

            &-close {
                height: 20px;
                width: 20px;
                position: relative;
                cursor: pointer;

                &:hover::after,
                &:hover::before {
                    background-color: #222c95;
                }

                &::after, &::before {
                    transition: background-color .1s;
                    content: '';
                    display: block;
                    background-color: #c4cdd5;
                    position: absolute;
                    margin: auto 0;
                    top: 8px;
                }

                &::after {
                    height: 2px;
                    width: 20px;
                    transform: rotate(45deg);
                }

                &::before {
                    height: 2px;
                    width: 20px;
                    transform: rotate(-45deg);
                }
            }
        }

        &__inner {
            padding: 20px;
        }
    }

    .modal {
        &-enter-active {
            animation: ModalShow .1s ease-in forwards;
        }

        &-leave-active {
            animation: ModalShow .1s ease-out reverse;
        }
    }
</style>
