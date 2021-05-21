<template>
    <modal :show="show">
        <div v-if="step === 1">
            {{ action }}

        </div>
        <div v-else-if="step === 2">

        </div>
    </modal>
</template>

<script>
    export default {
        name: "mass_actions",
        props: {
            show: {
                type: Boolean,
                default: false
            },
            action: {
                type: String
            },
            selected: Array,
            method: Function,
            data_changing: Object // the data that should be changed in request
        },
        data() {
            return {
                step: 1
            }
        }
    }
</script>
