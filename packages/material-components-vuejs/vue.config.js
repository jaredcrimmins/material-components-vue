module.exports = {
  devServer: {
    contentBase: ['./dist', './public'],
    disableHostCheck: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
      }
    },
    stats: 'minimal'
  },

  css: {
    loaderOptions: {
      css: {
        url: false,
        sourceMap: true
      },
      sass: {
        sassOptions: {
          includePaths: ['./node_modules'],
          indentedSyntax: false
        },
        implementation: require('sass')
      }
    }
  },

  filenameHashing: false,

  outputDir: 'dist/',

  publicPath: '/',

  lintOnSave: 'warning',

  runtimeCompiler: true,

  productionSourceMap: false
}
