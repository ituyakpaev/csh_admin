<template>
    <div class="home">
        <h1>
            Это главная страница вашего магазина
        </h1>
    </div>
</template>

<script>

export default {
    name: 'Home',
    components: {},
    data() {
        return {
            value: '',
            rows: [
                {
                    title: 'value 1',
                    value: 'value_1'
                },
                {
                    title: 'value 2',
                    value: 'value_2'
                },
                {
                    title: 'value 3',
                    value: 'value_3'
                },
                {
                    title: 'value 4',
                    value: 'value_4'
                }

            ]
        }
    },
    computed: {},
    mounted() {
    }
}
</script>
