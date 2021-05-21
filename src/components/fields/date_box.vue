<template>
    <div class="date-input">
        <div class="date-input__label" v-if="label">
            {{ label }}
        </div>
        <div>
            <v-date-picker v-model="date" v-bind="config"/>
        </div>
        <span class="input-box__error" v-if="error">
            {{ error }}
        </span>
    </div>
</template>

<script>

    export default {
        name: "date_box",
        components: {  },
        props: {
            label: String,
            value: {
                required: true
            },
            error: {
                type: String
            }
        },
        data() {
            return {
                config: {
                    'is-required': true,
                    mode: 'single'
                },
                time: '12:00',
                date: ''
            }
        },
        computed: {
            valueMirror: {
                set(date) {
                    this.$emit('input', date)
                },
                get() {
                    return this.value
                }
            },
        },
        watch: {
            date: function (date) {
                if (date) {
                    let data = [
                        date.getFullYear(),
                        date.getMonth().toString().padStart(2,0),
                        date.getDay().toString().padStart(2,0)
                    ]

                    this.valueMirror = `${ data.join('-') }T${ this.time }:00Z`
                } else {
                    this.valueMirror = ''
                }
            },
            value: function(value) {
                console.log(value)
                if (value) {
                    let date = value.split('Z')[0].split('T')
                    date = [
                        ...date[0].split('-'),
                        ...date[1].split('.')[0].split(':')
                    ]
                    date = date.map(n => Number(n))
                    this.date = new Date( ...date)
                }
            }
        },
        methods: {
            setTime(time) {
                this.time = time
            }
        }
    }
</script>

<style lang="scss">
</style>
