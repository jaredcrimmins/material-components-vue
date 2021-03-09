const {VueLoaderPlugin} = require("vue-loader");
const path = require("path");

const srcPath = path.resolve(process.cwd(), "src");
 
module.exports = env => {
  return {
    mode: env.NODE_ENV || "production",
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          include: [srcPath],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  };
};