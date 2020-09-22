const autoprefixer = require("autoprefixer");

module.exports = {
    css: {
        loaderOptions: {
            scss: {
                sassOptions: {
                    includePaths: ["./node_modules"],
                    indentedSyntax: false
                },
                implementation: require("sass")
            },
            postcss: {
                plugins: () => [autoprefixer()]
            }
        }
    },
    filenameHashing: false,
    productionSourceMap: false,
    runtimeCompiler: true,
    lintOnSave: "warning"
}