const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const base = require("./webpack.base.config.js");
const {merge} = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
 
module.exports = env => {
  const devPath = path.resolve(process.cwd(), "dev");
  const componentsPath = path.resolve(process.cwd(), "components");
  let baseStyleLoaders = [];
  let cssLoaders = [];
  let scssLoaders = [];

  baseStyleLoaders = [
    {
      loader: MiniCSSExtractPlugin.loader,
      options: {
        publicPath: "/"
      }
    },
    {
      loader: "css-loader",
      options: {
        url: false,
        sourceMap: true
      }
    }
  ];
  cssLoaders = baseStyleLoaders;
  scssLoaders = baseStyleLoaders.concat([
    {
      loader: "sass-loader",
      options: {
        sassOptions: {
          includePaths: ["./node_modules", componentsPath],
          indentedSyntax: false
        },
        implementation: require("sass")
      }
    }
  ]);

  return merge(base(env), {
    devServer: {
      publicPath: "/",
      contentBase: ["./dist", path.join(process.cwd(), "dev/public")],
      hot: true,
      historyApiFallback: true,
      stats: "minimal"
    },
    devtool: "source-map",
    performance: {
      hints:false
    },
    target: "web",
    entry: {
      app: path.join(devPath, "client-entry.js")
    },
    output: {
      path: path.resolve(process.cwd(), "dist"),
      publicPath: "/",
      filename: "js/[name].js",
      sourceMapFilename: "js/[file].map[query]"
    },
    resolve: {
      extensions: [".js", ".vue"]
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: {
            loaders: {
              "scss": scssLoaders,
              "css": cssLoaders
            },
            extractCSS: false,
            prettify: true,
            productionMode: false
          }
        },
        {
          test: /\.css$/,
          use: cssLoaders
        },
        {
          test: /\.scss$/,
          use: scssLoaders
        }
      ]
    },
  
    optimization: {
      mergeDuplicateChunks: true,
      minimize: false
    },
  
    plugins: [
      new HTMLWebpackPlugin({
        filename: path.join(process.cwd(), "dist/index.html"),
        inject: true,
        template: "dev/template.html"
      }),
      new webpack.HotModuleReplacementPlugin(),
      new MiniCSSExtractPlugin({
        filename: "css/[name].css"
      }),
      new webpack.ProgressPlugin({
        profile: false,
        modules: true,
        entries: false,
        activeModules: true
      })
    ]
  });
};