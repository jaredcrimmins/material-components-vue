const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const autoprefixer = require("autoprefixer");
const base = require("./webpack.base.config.js");
const {merge} = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
 
module.exports = env => {
  const isProduction = env.NODE_ENV === "production";
  const srcPath = path.resolve(process.cwd(), "src");
  const nodeModulesPath = path.resolve(process.cwd(), "node_modules");
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
    }
  ];
  cssLoaders = baseStyleLoaders;
  scssLoaders = baseStyleLoaders.concat([
    {
      loader: "sass-loader",
      options: {
        sassOptions: {
          includePaths: ["./node_modules"],
          indentedSyntax: false
        },
        implementation: require("sass")
      }
    }
  ]);

  return merge(base(env), {
    devServer: {
      publicPath: "/",
      contentBase: ["./dist", "./public"],
      hot: true,
      historyApiFallback: true
    },
    devtool: isProduction ? false : "source-map",
    target: "web",
    entry: {
      app: path.join(srcPath, "client-entry.js")
    },
    output: {
      path: path.resolve(process.cwd(), "dist"),
      publicPath: "/",
      filename: isProduction ? "js/[name].[hash].js" : "js/[name].js",
      sourceMapFilename: isProduction ? "js/[name].[hash].js.map" : "js/[name].js.map"
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
            extractCSS: isProduction,
            prettify: !isProduction,
            productionMode: isProduction
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
      minimize: isProduction,
      minimizer: [
        new CSSMinimizerPlugin(),
        new TerserPlugin()
      ],
      usedExports: true,
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/].+.(js|vue)/,
            priority: -10,
            chunks: "initial"
          }
        }
      }
    },
  
    plugins: [
      ...(isProduction ? [
        new HTMLWebpackPlugin({
          filename: path.join(process.cwd(), "dist/template.html"),
          inject: false,
          template: "src/template.server.html",
          minify: {
            collapseWhitespace: true,
            removeComments: false,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            ignoreCustomFragments: [ /(?:{){2,3}(?:.)*(?:}){2,3}/gi ],
            minifyJS: true,
            useShortDoctype: true
          }
        })
      ] : [
        new HTMLWebpackPlugin({
          filename: path.join(process.cwd(), "dist/index.html"),
          inject: true,
          template: "src/template.client.html"
        }),
        new webpack.HotModuleReplacementPlugin()
      ]),
      new MiniCSSExtractPlugin({
        filename: isProduction ? "css/[name].[contenthash].css" : "css/[name].css"
      }),
      new webpack.ProgressPlugin({
        profile: false,
        modules: true,
        entries: false,
        activeModules: true
      }),
      new VueSSRClientPlugin()
    ]
  });
};