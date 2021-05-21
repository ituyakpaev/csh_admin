<template>
    <div>
        <input-box v-if="field.type === 'text' || field.type === 'number'" v-bind="field" @input="$emit('input', $event)" />
        <select-box v-else-if="field.type === 'select'" v-bind="field" @input="$emit('input', $event)" />
        <multi-select v-else-if="field.type === 'multi_select'" v-bind="field" @input="$emit('input', $event)" />
        <checkbox v-else-if="field.type === 'bool'" v-bind="field" @input="$emit('input', $event)" />
    </div>
</template>

<script>
    export default {
        name: "universal_field",
        props: {
            field: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
