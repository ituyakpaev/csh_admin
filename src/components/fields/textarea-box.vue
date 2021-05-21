<template>
    <div class="textarea__wrapper">
        <div class="textarea__label">
            <slot>
                {{ label }}
            </slot>
        </div>
        <textarea :style="{ width: width }" class="textarea" v-model="valueMirror" :readonly="readonly" :disabled="disabled" />
    </div>
</template>

<script>
    export default {
        name: "textarea-box",
        props: {
            label: String,
            value: {
                required:  true
            },
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            width: {
                type: Number,
            }
        },
        computed: {
            valueMirror: {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .textarea {
        &__wrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
