<template>
    <panelbox title="Дополнительные поля">
        <div class="fields__list">
            <div class='fields__field' v-for="(field, index) in value.value"
                 :key="field.id + field.title" >
                <select-box v-if="field.type === 'select'" :value="field.value" :label='field.name || field.title'
                            :rows="value.select_values[field.link].rows"
                            :rows_loading="value.select_values[field.link].loading"
                            @input="updateValue(index, $event)" @open="getFieldValues(field.link)"/>

                <multi-select v-else-if="field.type === 'multi_select'" :value="field.value" :label="field.name || field.title"
                              :rows_loading="value.select_values[field.link].loading"
                              :rows="value.select_values[field.link].rows"
                              @input="updateValue(index, $event)" @open="getFieldValues(field.link)" />

                <input-box v-else-if="field.type === 'text'" :value="field.value" :label='field.name || field.title'
                           :locale="true" @input="updateValue(index, $event)"/>
                <checkbox v-else-if="field.type === 'bool'" :value="field.value" :label='field.name || field.title'
                          @input="updateValue(index, $event)"/>
                <icon name="delete" class="fields__field-delete" @click.native="deleteField(index, field.id)" />
            </div>
        </div>
        <div class="fields__add">
            <div class="fields__add-step" v-if="step === 1">
                <button class="button-text" @click="step = 2">
                    Добавить поле
                </button>
            </div>
            <div class="fields__add-step" v-else-if="step === 2">
                <select-box v-bind="model.id" :rows="unused_fields"
                            @open="getFields" @change="addField"/>
            </div>
        </div>
    </panelbox>
</template>

<script>export default {
        name: "fields",
        components: {},
        props: {
            value: {
                type: Object,
                required: true
            },
            apiGetFields: {
                type: Function,
                required: true
            },
            apiGetFieldValues: {
                type: Function,
                required: true
            }
        },
        data() {
            return {
                select_values: {},
                step: 1,
                model: {
                    id: {
                        value: '',
                        label: 'Выберите поле',
                        rows: [],
                        emptyRow: false,
                        empty_text: 'Нет полей. или все уже выбраны',
                        rows_loading: true
                    },
                    value: {
                        value: ''
                    }
                },
            }
        },
        computed: {
            unused_fields() {
                let used = this.value.value.map(v => v.id)
                return this.model.id.rows.filter(row => used.indexOf(row.value) < 0)
            }
        },
        methods: {
            addField(field) {
                console.log(field)
                field = this.model.id.rows.find(r => r.value === field).additional
                console.log(field)
                let value = ''
                if (field.type_field === 'multi_select') {
                    value = []
                }
                this.$set(this.value.select_values, field.link, {
                    loading: true,
                    rows: [],
                    meta: null
                })
                this.value.value.push({
                    id: field.id,
                    name: field.name || field.title,
                    type: field.type_field,
                    link: field.link,
                    value: value
                })
                this.step = 1
            },

            updateValue(index, value) {
                this.value.value[index].value = value
            },

            deleteField(index, id) {
                this.value.value.splice(index,1)
                if (id) {
                    this.value.delete.push(id)
                }
            },

            getFields: async function () {
                if (this.model.id.rows.length === 0) {
                    this.model.id.rows_loading = true

                    let values = []

                    await this.apiGetFields({ limit: 1000 })
                        .then(res => {
                            console.log(res)
                            values = res.data.rows.map(row => {
                                return {
                                    title: row.name || row.title,
                                    value: row.id,
                                    additional: row
                                }
                            })
                        })
                        .catch(err => {
                            values.push({
                                title: 'Ошибка',
                                value: 'ERR#',
                                disabled: true
                            })
                            alert(`${ err.code }: ${ err.text }`)
                        })

                    this.model.id.rows = values

                    this.model.id.rows_loading = false
                }
            },

            getFieldValues: async function (link) {
                this.value.select_values.loading = true
                let values = []

                await this.apiGetFieldValues(link, { limit: 1000 })
                    .then(res => {
                        console.log(res.data)
                        values = res.data.rows.map(row => {
                            return {
                                title: row.name || row.title,
                                value: row.id
                            }
                        })
                    })
                    .catch(() => {
                        values = [
                            {
                                title: 'Ошибка получения значений',
                                value: 'ERR#',
                                disabled: true
                            }
                        ]
                    })

                this.value.select_values[link].rows = values
                this.value.select_values[link].loading = false
            },
        },
    }
</script>

<style scoped lang="scss">
    .fields {
        &__list {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }

        &__add-step {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
        }

        &__field {
            flex-basis: 50%;
            display: flex;

            &:hover &-delete {
                opacity: .6;
            }

            &-delete {
                cursor: pointer;
                margin-top: 32px;
                margin-left: 5px;
                transition: opacity .2s;
                opacity: 0;
            }
        }
    }
</style>
