<template>
    <modal :show="show" @close="$emit('close')">
        <div class="form-column">
            <div class="form__item" v-for="(item, key) in model" :key="key">
                <input-box v-if="item.type === 'input'" :label="item.label" :error="item.error || ''" v-model="item.value" />
                <checkbox v-if="item.type === 'checkbox'" :label="item.label" :error="item.error || ''" v-model="item.value" />
                <select-box v-if="item.type === 'select'" :rows="item.values" :label="item.label" :error="item.error || ''" v-model="item.value" />
            </div>
            <div class="form__footer">
                <button class="button" @click="$emit('close', entity)">
                    Сохранить
                </button>
                <button class="button-text red" @click="deletePrice">
                    Удалить
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
    import modal from "./regular/modal";

    export default {
        name: "index",
        components: {
            modal
        },
        props: {
            item: {
                type: Object
            },
            show: {
                type: Boolean,
                default: false
            },
            model: {
                type: Object,
                required: true
            },
            entity_name: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                isLoading: true,
                isNew: false,
            }
        },
        computed: {
            entity: {
                get() {
                    let entity = {}

                    Object.keys(this.model).map(key => {
                        entity[key] = this.model[key].value
                    })

                    return entity
                },

                set(data) {
                    Object.keys(data).map(key => {
                        if (this.model[key]) {
                            this.model[key].value = data[key]
                        }
                    })
                }
            }
        },
        watch: {
            item: function (value) {
                if (value.link < 0) {
                    this.isNew = true
                    this.entity = this.$settings.defaults[this.entity_name]
                } else {
                    this.entity = value
                }
            }
        }
    }
</script>
