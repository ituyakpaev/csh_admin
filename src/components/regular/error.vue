<template>
    <div class="error">
        <div class="error-title">
            <div class="error__code">
                <span>:(</span>{{ error.code }}
            </div>
            <div class="error__text">
                {{ error.text || error.toString() }}
            </div>
        </div>
        <div class="error-description">
            {{ error.description }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "error",
        props: {
            error: {
                required: true
            }
        },
    }
</script>

<style lang="scss">
    .error {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        color: inherit!important;

        &-title {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
        }

        &__code {
            font-size: 72px;
            font-weight: 900;
            font-style: italic;
        }

        &__text {
            font-size: 48px;

        }
    }
</style>
