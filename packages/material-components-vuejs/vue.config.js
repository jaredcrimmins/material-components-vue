const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

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

  productionSourceMap: false,

  configureWebpack: () => {
    return {
      devtool: 'source-map',

      performance: {
        hints:false
      },

      target: 'web',

      resolve: {
        extensions: ['.js', '.vue'],

        /**
         * When enabled, symlinked resources are resolved to their real path,
         * not their symlinked location. Note that this may cause module
         * resolution to fail when using tools that symlink packages (like npm link).
         *
         * See {@link https://webpack.js.org/configuration/resolve/#resolvesymlinks}
         */
        symlinks: false
      },

      optimization: {
        mergeDuplicateChunks: true,
        minimize: false
      },

      plugins: [
        new HTMLWebpackPlugin({
          filename: path.join(process.cwd(), 'dist/index.html'),
          inject: true,
          template: 'dev/template.html'
        }),
      ]
    };
  }
}
