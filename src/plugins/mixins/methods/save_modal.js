import validate from "./validate";

export default {
    mixins: [validate],
    methods: {
        saveData: async function () {
            if (this.validate()) {
                console.log(this.entity)
                let promise = this.isNew ? this.api.create(this.entity) : this.api.update(this.link, this.entity)

                this.isPerforming = true

                await promise
                    .then(res => {
                        this.entity = res.data
                        this.isNew = false
                        this.link = res.data.link
                        this.$emit('update')
                    })
                    .catch(err => {
                        alert(`${ err.code }: ${ err.text }`)
                        console.log(err)
                    })

                this.isPerforming = false
            }
        }
    }
}
