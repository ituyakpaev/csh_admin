export default {
    computed: {
        user_rights() {
            let entity_name = this.entity_id || this.$options.name,
                default_rights = {
                    get: true,
                    update: true,
                    create: true,
                    delete: true
                }
            return this.$store.state.USER.rights[entity_name] || default_rights
        }
    }
}
