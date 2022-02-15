const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const autoprefixer = require("autoprefixer");
const base = require("./webpack.base.config");
const {merge} = require("webpack-merge");
const path = require("path");
 
module.exports = env => {
  const isProduction = env.NODE_ENV === "production";
  const srcPath = path.resolve(process.cwd(), "src");
  const nodeModulesPath = path.resolve(process.cwd(), "node_modules");
  let cssLoaders = [];
  let scssLoaders = [];

  cssLoaders = [
    {
      loader: MiniCssExtractPlugin.loader,
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
    }
  ];

  scssLoaders = cssLoaders.concat([
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
          includePaths: ["./node_modules"],
          indentedSyntax: false
        },
        implementation: require("sass")
      }
    }
  ]);

  return merge(base(env), {
    entry: path.join(srcPath, "server-entry.js"),
    target: "node",
    // This tells the server bundle to use Node-style exports
    output: {
      libraryTarget: "commonjs2"
    },

    resolve: {
      extensions: [".js", ".vue"]
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
          include: [srcPath, nodeModulesPath],
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
  
    // externals: nodeExternals({
    //     // do not externalize dependencies that need to be processed by webpack.
    //     // you can add more file types here e.g. raw *.vue files
    //     // you should also whitelist deps that modifies `global` (e.g. polyfills)
    //     whitelist: /\.(css|scss|vue)$/
    // }),

    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].css"
      }),
      // This is a plugin that turns the entire output of the server build
      // into a single JSON file. The default file name will be
      // `vue-ssr-server-bundle.json`
      new VueSSRServerPlugin()
    ]
  });
};