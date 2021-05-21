<template>
    <div class="seo-settings">
        <div class="seo-settings__header">
            <div class="seo-settings__label">
                {{ label }}
            </div>
            <div class="seo-settings__label-sub" v-if="sub_label">
                {{ sub_label }}
            </div>
        </div>
        <div class="seo-settings__form">
            <input-box label="Тег title" v-if="value.hasOwnProperty('title')" :disabled="disabled" :value="value.title" @input="input('title', $event)" >
                <div style="display: flex">
                    Тег title
                    <span :class="{'red': value.title.length > 70}"> ({{ value.title.length }} /70) </span> :
                </div>
            </input-box>
            <textarea-box v-if="value.hasOwnProperty('description')" :disabled="disabled" :value="value.description" @input="input('description', $event)">
                <div style="display: flex">
                    Тег description
                    <span :class="{'red': value.description.length > 150}"> ({{ value.description.length }} /150) </span> :
                </div>
            </textarea-box>
        </div>
    </div>
</template>

<script>
    export default {
        name: "seo_fields",
        props: {
            value: {
                type: Object,
                required: true
            },
            label: {
                type: String,
                default: 'Сео-настройки'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            sub_label: {
                type: String,
                default: ''
            }
        },
        computed: {
            valueMirror: {
                get() {
                    return this.value
                },
                set() {
                    this.$emit('input', this.value)
                }
            }
        },
        methods: {
            input(key, value) {
                let bufer = this.valueMirror
                bufer[key] = value
                this.valueMirror = bufer
            }
        }
    }
</script>

<style lang="scss">
    .seo-settings {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        &__label {
            font-size: 22px;
            font-weight: bold;
            text-align: left;

            &-sub {
                text-align: left;
            }
        }

        &__header {
            margin-bottom: 10px;
        }
        .textarea {
                width: 500px;
                height: 100px;
        }


        .input-box__input {
            width: 500px;
        }

        .red {
            color: red
        }
    }
</style>
