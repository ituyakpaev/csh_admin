<template>
    <div :style="{ backgroundImage: `url(${ $basePath }svg/${ icon })` }" class="icon"/>
</template>

<script>
    export default {
        name: "icon.vue",
        props: {
            name: {
                required: true,
                type: String
            }
        },
        computed: {
            icon() {
                return `${ this.name }.svg`
            }
        }
    }
</script>

<style lang="scss">
    .icon {
        width: 15px;
        height: 15px;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>
