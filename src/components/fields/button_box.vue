<template>
    <button :class="{ 'button-loading': loading }" style="position: relative" @click="$emit('click')">
        <slot />
        <span class="loader_icon" v-if="loading" :style="{ backgroundImage: `url(${ $basePath }loader.svg)` }"/>
    </button>
</template>

<script>
    export default {
        name: "button_box",
        props: {
            loading: Boolean
        }
    }
</script>

<style scoped>
    .button-loading {
        color: transparent;
    }
    .loader_icon {
        display: block;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
        top: 10px;
        right: 0;
        left: 0;
        bottom: 10px;
    }
</style>
