<template>
    <label class="checkbox" :class="{ disabled: disabled, readonly: readonly, error: error}">
        <div class="checkbox-input" :class="{ loading: loading, disabled: disabled }" >
            <input class="checkbox-input__input" type="checkbox" v-model="valueMirror" :disabled="disabled">
            <div class="checkbox-input__emit"></div>
        </div>
        <div class="checkbox-label">
            <slot>
                {{ label }}
            </slot>
        </div>
    </label>
</template>

<script>
    export default {
        name: "checkboxBox",
        props: {
            label: String, // label
            loading: Boolean,
            readonly: Boolean, // can redact?
            disabled: Boolean,
            error: String, // err?
            value: {
                required: true
            }
        },
        computed: {
            valueMirror: {
                get: function() {
                    return this.value
                },
                set: function(val) {
                    this.$emit('input', val)
                    this.$emit('change', val)
                    return val
                }
            }
        }
    }
</script>
