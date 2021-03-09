const TerserPlugin = require("terser-webpack-plugin");
const base = require("./webpack.base.config.js");
const {merge} = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const path = require("path");
const webpack = require("webpack");
 
module.exports = env => {
  const srcPath = path.resolve(process.cwd(), "src");

  return merge(base(env), {
    target: "web",

    entry: {
      "material-components-vuejs": path.join(srcPath, "index.js")
    },

    output: {
      path: path.resolve(process.cwd(), "dist"),
      publicPath: "/",
      filename: "[name].js",
      sourceMapFilename: "[name].js.map",
      library: "MaterialComponentsVuejs",
      libraryTarget: "umd"
    },

    resolve: {
      extensions: [".js", ".vue"]
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader"
        }
      ]
    },

    externals: [nodeExternals()],
  
    optimization: {
      mergeDuplicateChunks: true,
      minimize: true,
      minimizer: [new TerserPlugin()],
      usedExports: true
    },
  
    plugins: [
      new webpack.ProgressPlugin({
        profile: false,
        modules: true,
        entries: false,
        activeModules: true
      })
    ]
  });
};