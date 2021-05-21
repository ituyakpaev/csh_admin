<template>
    <label class="select" :class="{readonly: readonly, disabled: disabled, error: error}">
        <div class="select__label" v-if="label">
            {{ label }}
        </div>
        <div class="select__inner">
            <input class="select__input" type="hidden" :readonly="readonly" :disabled="disabled" v-model="valueMirror">
            <div class='select-control__open' @click.self="dropdownOpen">
                {{ valueTitle || placeholder }}
            </div> <!-- input imitator for select -->
            <div class="select-control">
                <div class="select-control__inner" :readonly="readonly" :disabled="disabled" v-show="opened">
                    <div class="select-control__search">
                        <input v-model="searchInSelect" class="select-control__search-input" placeholder="Найти">
                    </div>
                    <ul v-if="rows_loading" class="select-control__list">
                        <li v-for="i in 3" class="select-control__list-item" :key="i">
                            <div class="loading" style="height: 10px; width: 30px;" />
                        </li>
                    </ul>
                    <ul class="select-control__list" v-else>
                        <li class="select-control__list-item" @click="removeValue" v-if="emptyRow">
                            ...
                        </li>
                        <li class="select-control__list-item" v-for="item in rowsFilter" :key="item.key || item.value || item.title"
                            :class="[{selected: value === (item.value || item.title), disabled: item.disable } ]" @click="addData(item)">
                            {{ item.title }}
                        </li>
                        <li v-if="rowsFilter.length === 0" class="select-control__list-item disabled">
                            {{ this.searchInSelect.length > 0 ? "Ничего не найдено" : empty_text }}
                        </li>
                    </ul>
                </div>
            </div> <!-- select list -->
        </div>
        <div class="input-box__error" v-if="error">
            {{ error }}
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

    export default {
        name: "selectBox.vue",
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
            emptyRow: {
                type: Boolean,
                default: true
            },
            empty_text: {
                type: String,
                default: 'Не значений'
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
                set: function(row) {
                    console.log(row)
                    if (!row.disable) {
                      this.$emit('input', (row.value || row.title ), row.added)
                      this.$emit('change', (row.value || row.title ), row.added)
                      return row
                    }
                }
            },

            valueTitle () {
                let q = this.rows.find((e) => {
                    return (e.value || e.title) === this.valueMirror
                })
                if (q) {
                    return q.title
                } else {
                    return null
                }
            },

            rowsFilter() {
                let s = this.searchInSelect.toLowerCase()
                if (s) {
                    return this.rows.filter(e => {
                        return e.title ? e.title.toLowerCase().indexOf(s) >= 0 : false
                    })
                } else {
                    return this.rows
                }
            }
        },
        methods: {
            removeValue () {
                this.valueMirror = ''
                this.opened = false
            },
            addData(value) {
                try {
                    this.valueMirror = value
                    this.opened = false
                } catch (err) {
                    console.log(err)
                }
            },
            dropdownOpen() {
                if (!this.readonly && !this.disabled) {
                    this.opened = true
                    this.$emit('open')
                }
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
