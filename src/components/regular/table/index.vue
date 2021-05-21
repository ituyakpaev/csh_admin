<template>
    <div class="table">
        <manage @add="$emit('add', $event )" @search="$emit('query:update', $event)"
                :meta="meta" :query="query" />
        <query_parse @cancel="$emit('query:update', $event)" v-if="query && query_parse" :query="query" />
        <div class="table__inner">
            <v_header @sort="$emit('sort', $event)" @select_all="all_is_selected = !!$event"/>
            <div class="table__row loading" v-if="isLoading && errorLog.length === 0">
                <div class="table__cell loading" :class="key" :style="{ width: item.width ? item.width + 'px' : '' }"
                     v-for="(item, key) in headers" :key="key" @click="$emit(`click:cell:${ key }`)">
                  <span class="loader">
                    {{ item.title }}
                  </span>
                </div>
            </div>
            <div class="table__body" v-if="!isLoading && errorLog.length === 0 && data.length > 0">
                <slot>
                    <row v-for="(row, index) in data" :key="row.link || row.id || index" @open='$emit("open", $event)' :row="row" :index="index" @select="selectRow" />
                </slot>
            </div>
            <div class="table__body-empty" v-if="!isLoading && (errorLog.length === 0) && data.length === 0">
                Таблица пуста.
            </div>
            <div class="table__body-empty-error" v-if="errorLog.length > 0">
                <span v-html="errorLog.map(error => `${ error.text } Код ошибки ${ error.code }` ).join(', ')"/>
            </div>
        </div>
        <pagination @paginate="$emit('query:update', $event)" :meta="meta" v-if="meta.count" />
    </div>
</template>

<script>
    import pagination from "./pagination";
    import manage from './manage'
    import v_header from './header'
    import row from './row'
    import query_parse from "./query_parse";

    export default {
        name: "tableBox",
        components: {manage, pagination, v_header, row,query_parse},
        props: {
            isLoading: Boolean,
            id: String,
            errorLog: {
                type: Array,
                default: () => {
                    return []
                }
            },
            headers: {
                type: Object,
                required: true
            },
            showHeader: {
                type: Boolean,
                default: true
            },
            rows_route_name: {
                type: String
            },
            query: {
                default: () => { return {} }
            },
            query_parse: Object,
            manage: {
                type: Array,
                default: () => null
            },
            data: {
                type: Array,
                required: true
            },
            cell_manage: {},

            meta: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            mass_action_enabled: {
                type: Boolean,
                default: false,
            },
            mass_actions: {
                type: Array,
                default: () => []
            },
        },
        data() {
            return {
                selected: [],
                all_is_selected: false,
            }
        },
        provide() {
            return {
                isLoading: this.isLoading,
                errorLog: this.errorLog,
                headers: this.headers,
                showHeader: this.showHeader,
                rows_route_name: this.rows_route_name,
                manage: this.manage,
                data: this.data,
                cell_manage: this.cell_manage, // depricated !
                mass_actions: this.mass_actions,
                mass_action_enabled: this.mass_action_enabled,
                selected: this.selected,
                all_is_selected: this.all_is_selected,
                query_parse: this.query_parse
            }
        },
        methods: {
            selectRow(row) {
                let index = this.selected.findIndex(r => r.link === row.link )
                if (index === -1) {
                    this.selected.push(row)
                } else {
                    let result = this.selected.splice(index, 1)
                    this.selected = result
                }
            }
        },
    }
</script>
