export default {
    computed: {
        entity: {
            get() {
                let result = {}
                Object.keys(this.model).map(key => {
                    if (key === 'seo') {
                        Object.keys(this.model[key]).map(seo => {
                            result[`seo_${ seo }`] = this.model[key][seo]
                        })
                    } else if (key === 'media' && this.model[key].is_collection !== false) {
                        result[key] = this.model[key].value.map((media, index) => {
                            return { ...media, position: index }
                        })
                    } else if ( (key !== 'id' || key === 'id' && !this.isNew) && !this.model[key].ignore ) {
                        result[key] = this.model[key].value
                    }
                })
                return result
            },
            set(data) {
                console.log(data)
                let result = this.model
                Object.keys(data).map(key => {
                    if (result[key] && result[key].error) {
                        result[key].error = ""
                    }
                    if (!result[key]) {
                        return
                    }
                    if (key === 'link' && this.model.link) {
                        result[key].value = data[key] === -1 ? '' : data[key]
                    } else if (key === 'fields') {
                        result[key].delete = []
                        result[key].value = data[key].map(field => {
                            // each field
                            if (field.type === 'select' || field.type === 'multi_select') {
                                let select_values = field.value.map(value => {
                                    return { title: value.name || value.title, value: value.id }
                                })

                                if (!result[key].select_values[field.link]) {
                                    this.$set(result[key].select_values, field.link, {
                                        loading: true,
                                        rows: select_values,
                                        meta: null
                                    })
                                }
                                // TODO: Если у поля подгружено 1000 значений, но его значение - не из этой 1000, сломается

                                field.value = field.value.map(value => value.id)
                            }
                            return field
                        })
                    } else if (key === 'media' && result[key].is_collection !== false) {
                        result[key].delete = []
                        result[key].value = data[key].sort((media1,media2) => media1.position - media2.position)
                    } else if (key === 'seo_title' || key === 'seo_description' || key === 'seo_keywords') {
                        result.seo[key.replace('seo_','')] = data[key] || ""
                    } else if (result[key]) {
                        result[key].value = data[key]
                    }


                })
                this.model = result
            }
        }
    }
}
