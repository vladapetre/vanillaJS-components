var glob = require("glob");
var path = require("path");
var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
     js: glob.sync("./src/js/*.js"),  
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'jsPlugin.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          use: "css-loader",
        }),
      },
    ],
  },
  plugins: [new ExtractTextWebpackPlugin("jsPlugin.css")],
  watch: true,
  mode: "none"
}