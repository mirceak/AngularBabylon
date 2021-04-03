const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const webpack = require("webpack");

module.exports = [
  {
    cache: false,
    entry: {
      main: ["./src/main.ts"],
    },
    mode: "development",
    devtool: "source-map",

    optimization: {
      minimize: false,
    },

    target: "web",
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../../dist/public/chat/"),
    },

    resolve: {
      extensions: [".vue", ".jsx", ".js", ".json"],
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          use: "vue-loader",
        },
        {
          test: /\.png$/,
          use: {
            loader: "url-loader",
            options: { limit: 8192 },
          },
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        },  
        { test: /\.html$/, loader: "raw-loader" },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false
      }),
      new ModuleFederationPlugin({
        name: "chat",
        library: { type: "var", name: "chat" },
        filename: "remoteEntry.js",
        exposes: {
          "./AppModule": "./src/main.ts",
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new VueLoaderPlugin(),
    ],
  },
];
