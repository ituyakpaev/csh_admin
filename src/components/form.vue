<template>
    <div class="form-column" v-if="errorLog.length === 0">
        <div class="form__item" v-for="(item, key) in model" :key="key">
            <input-box v-if="item.type === 'input'" :label="item.label" :error="item.error || ''" v-model="item.value" />
            <checkbox v-if="item.type === 'checkbox'" :label="item.label" :error="item.error || ''" v-model="item.value" />
            <select-box v-if="item.type === 'select'" :rows="item.values" :label="item.label" :error="item.error || ''" v-model="item.value" />
        </div>
        <div class="form__footer">
            <button class="button" @click="$emit('save')">
                Сохранить
            </button>
            <button class="button-text red" @click="$emit('delete')" v-if="isNew">
                Удалить
            </button>
        </div>
    </div>
    <error :error="errorLog[0]" v-else />
</template>

<script>
    import Error from "@/components/regular/error";

    export default {
        name: "form",
        components: {Error},
        props: {
            model: {
                type: Object,
            },
            errorLog: {
                type: Array,
                default: () => []
            },
            isLoading: {
                type: Boolean,
                default: false
            },
            isPerforming: {
                type: Boolean,
                default: false
            },
            isNew: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
