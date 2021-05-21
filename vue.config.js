module.exports = {
    publicPath: '/admin/',
    css: {
        //requireModuleExtension: false,
        loaderOptions: {
            sass: {
                data: `@import "@/assets/css/_variables.scss";`
            }
        },
    },
}
