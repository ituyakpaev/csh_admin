import user_rights from "@/plugins/mixins/user_rights";

export default {
    mixins: [user_rights],
    computed: {
        isNew() {
            return this.link < 0
        },

        link() {
            return this.$route.params.link
        },

        title() {
            if (this.errorLog.length > 0) {
                return this.errorLog[0].text
            } else {
                let title = ''
                if (this.model.title) {
                    title = this.model.title.value
                } else if (this.model.name) {
                    title = this.model.name.value
                } else {
                    title = ''
                }
                return title || (this.isNew ? (this.titles ? this.titles.new : 'Новый элемент') : '')
            }
        },
    }
}
