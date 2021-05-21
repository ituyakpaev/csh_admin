<template>
    <div class="panelbox" :class="{'pd': padding}">
        <div class="panelbox__heading" v-if="title">
            {{ title }}
            <div v-if="button" class="button-text" style="color: black; margin: 0; padding: 0;" @click="$emit('click')">
                {{ button_text }}
            </div>
        </div>
        <div class="panelbox__inner" :class="[inner_class]">
            <slot />
        </div>
    </div>
</template>

<script>
    export default {
        name: "panelbox",
        props: {
            padding: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                default: ''
            },
            inner_class: String,
            button: {
                type: Boolean,
                default: false
            },
            button_text: {
                type: String,
                default: 'Кнопка'
            }
        }
    }
</script>

<style lang="scss">
    .panelbox {
        position: relative;
        margin-bottom: 20px;
        background: white;
        box-sizing: border-box;
        border: 1px solid rgb(196, 196, 196);
        border-radius: 8px;
        padding: 0px;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
        width: 100%;
        overflow: hidden;
        &.pd {
            padding: 20px;

            .panelbox__heading {
                padding: 0 0 20px 0;
            }
        }

        &__inner, &__content {
            //padding: 0 30px 30px;
            display: flex;
            flex-direction: column;
            text-align: left;
        }

        &__heading {
            padding: 10px 30px 30px;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        & > div {
            //padding: 10px 20px;
        }

        & > div:last-child {
            //padding-top: 20px;
            //padding-bottom: 50px;
        }

    }
</style>
