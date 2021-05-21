<template>
    <label class="select" :class="{readonly: readonly, disabled: disabled, error: error}">
        {{ error || label }}
        <div class="select__inner">
            <input class="select__input" type="hidden" :readonly="readonly" :disabled="disabled" v-model="valueMirror">
            <div class='select-control__open' @click.self="dropdownOpen">
                {{ valueTitle || placeholder }}
            </div> <!-- input imitator for select -->
            <div class="select-control">
                <div class="select-control__inner" v-show="opened">
                    <div class="select-control__search">
                        <input v-model="searchInSelect" class="select-control__search-input" placeholder="Найти">
                    </div>
                    <ul v-if="rows_loading" class="select-control__list">
                        <li v-for="i in 3" class="select-control__list-item" :key="i">
                            <div class="loading" style="height: 10px; width: 30px;" />
                        </li>
                    </ul>
                    <ul v-else class="select-control__list">
                        <checkbox class="select-control__list-item" v-for="item in rowsFilter" :key="item.key || item.value || item.title"
                                  :class="{selected: value === (item.value || item.title)}"
                                  :value="valueMirror.indexOf(item.value || item.title) !== -1" @change="select(item)">
                            {{ item.title }}
                        </checkbox>
                        <li v-if="rowsFilter.length === 0" class="select-control__list-item disabled">
                            {{ this.searchInSelect.length > 0 ? "Ничего не найдено" : empty_text }}
                        </li>
                    </ul>
                </div>
            </div> <!-- select list -->
        </div>
    </label>
</template>

<script>
    // if widget has no value option, then title is used instead
    /* SAMPLE of rows
        {
            title: 'HelloWorld', - name for client
            value: 'hw1' - v-model value
        }
     */
    import checkbox from "./checkbox";

    export default {
        name: "selectBox.vue",
        components: {checkbox},
        props: {
            rows: {
                type: Array
            },
            rows_loading: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: "Выбрать"
            },
            label: String,
            readonly: Boolean, //
            disabled: Boolean,
            error: String, // err?
            value: {
                required: true
            },
            empty_text: {
                type: String,
                default: "Нет значений, или все уже выбраны"
            }
        },
        data () {
            return {
                searchInSelect: '',
                opened: false
            }
        },
        computed: {
            valueMirror: {
                get: function() {
                    return this.value
                },
                set: function(value) {
                    this.$emit('input', value)
                    this.$emit('change', value)
                    return value
                }
            },

            valueTitle() {
                return this.valueMirror.map(value => {
                    let row = this.rows.find(row => (row.value || row.title) === value)
                    return row ? row.title : ''
                }).join(', ')
            },

            rowsFilter: function() {
                let s = this.searchInSelect.toLowerCase()
                return this.rows.filter(e => {
                    return e.title.toLowerCase().indexOf(s) !== -1
                })
            }
        },
        methods: {
            select(select_row) {
                let bufer = this.valueMirror

                if (this.value.indexOf(select_row.value || select_row.title) === -1) {
                    bufer = [ ...bufer, (select_row.value || select_row.title)  ]
                } else {
                    let index = this.valueMirror.findIndex(row => {
                        return (select_row.value || select_row.title) === row
                    })
                    bufer.splice(index, 1)
                }

                bufer.sort((a,b) => {
                    let a_index = this.rows.findIndex(row => ( row.value || row.title) === a),
                        b_index = this.rows.findIndex(row => ( row.value || row.title) === b)

                    return a_index - b_index
                })

                this.valueMirror = bufer
            },
            dropdownOpen() {
                this.opened = true
                this.$emit('open')
            }
        },
        created () {
            let self = this
            window.addEventListener('click', function(e) {
                if (!self.$el.contains(e.target)) {
                    self.opened = false
                }
            })
        }
    }
</script>
