import user_rights from "@/plugins/mixins/user_rights";

export default {
    mixins: [user_rights],
    data: function () {
        return {
            isNew: false,
            link: '',
        }
    },
    watch: {
        value: function(value) {
            this.isNew = value.link < 0
            this.link = value.link

            if (this.isNew) {
                let empty = {}
                if (this.empty_value || this.$settings.defaults[this.$options.name]) {
                    empty = this.empty_value || this.$settings.defaults[this.$options.name]
                } else {
                    Object.keys(this.entity).map(key => {
                        empty[key] = ''
                    })
                }
                this.entity = empty
            } else {
                this.entity = value
            }
        }
    }
}
