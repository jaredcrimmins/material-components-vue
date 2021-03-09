const {HotModuleReplacementPlugin} = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const base = require("./webpack.base.config.js");
const path = require("path");
const {merge} = require("webpack-merge");

const resolve = relativePath => path.resolve(__dirname, relativePath);
 
module.exports = env => {
  const isProduction = env.NODE_ENV === "production";
  const demoPath = path.resolve(process.cwd(), "demo");

  return merge(base(env), {
    devServer: {
      publicPath: "/",
      contentBase: ["./dist", "./public"],
      hot: true,
      historyApiFallback: true
    },
    devtool: isProduction ? false : "source-map",
    entry: {
      app: path.join(demoPath, "main.js")
    },
    output: {
      path: path.resolve(process.cwd(), "dist"),
      // publicPath: "/dist",
      filename: "[name].js",
      library: "MaterialComponentsVuejs",
      // libraryTarget: "umd",
      // sourceMapFilename: isProduction ? "[name].[hash].js.map" : "[name].js.map"
    },
    resolve: {
      extensions: [".js", ".ts", ".vue"]
    },
    module: {
      rules: [         
        {
          test: /\.css$/,
          use: [
            {
              loader: "vue-style-loader"
            },
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: !isProduction 
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "vue-style-loader"
            },
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: !isProduction
              }
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [autoprefixer]
                }
              }
            },
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  includePaths: [resolve("./../node_modules")],
                  indentedSyntax: false
                },
                implementation: require("sass")
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HotModuleReplacementPlugin(),
      new HTMLWebpackPlugin({
        template: path.join(demoPath, "template.html")
      })
    ]
  });
};