import Vue from 'vue'

export default () => {
    Vue.prototype.$breakPoint = new Vue({
        name: 'breakPoint',
        data() {
            return {
                current: "",
                width: [
                    {
                        key: 'exsm',
                        width: 576
                    },
                    {
                        key: 'sm',
                        width: 767
                    },
                    {
                        key: 'md',
                        width: 992
                    },
                    {
                        key: 'lg',
                        width: 1200
                    },
                    {
                        key: 'wd',
                        width: 1300
                    },
                    {
                        key: 'exwd',
                        width: 999000
                    }
                ]
            }
        },
        methods: {
            reload() {
                if (typeof window !== "undefined") {
                    let w = window.screen.width

                    let getStrap = w => {
                        let r = null
                        this.width.map((point) => {
                            if (w < point.width && !r) {
                                r = point
                            }
                        })
                        return r
                    }

                    this.current = getStrap(w).key
                } else {
                    return false
                }
            }
        },
        created() {
            if (typeof window !== "undefined") {
                this.reload()

                window.addEventListener('resize', () => {
                    this.reload()
                })
            }
        }
    })
}
