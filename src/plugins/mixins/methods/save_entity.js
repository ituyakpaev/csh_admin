import validate from "./validate";

export default {
    mixins: [validate],
    methods: {
        saveData: async function () {
            if (this.validate()) {
                console.log(this.entity)
                this.isPerforming = true

                let promise = this.isNew ? this.api.create(this.entity) : this.api.update(this.link, this.entity)
                await promise
                    .then(res => {
                        let identifier = res.data.link || res.data.id
                        if ( identifier !== this.link || this.isNew) {
                            this.$router.push({
                                name: this.$route.name,
                                params: {
                                    link: res.data.link || res.data.id
                                }
                            })
                        }

                        this.entity = res.data
                    })
                    .catch(err => {
                        alert(`${ err.code }: ${ err.text }`)
                        console.error(err)
                    })

                this.isPerforming = false
            }
        }
    }
}
