const AotPlugin = require("@ngtools/webpack").AngularCompilerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = [
  {
    cache: false,
    entry: {
      main: ["./src/main.single-spa.ts"],
      polyfills: ["./src/polyfills.ts"],
    },
    mode: "development",
    devtool: "source-map",

    optimization: {
      minimize: false,
    },

    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../dist/public/client/"),
    },

    resolve: {
      extensions: [".ts", ".js", ".json", ".scss", ".html", ".css"],
      mainFields: ["browser", "module", "main"],
    },

    module: {
      rules: [
        { test: /\.ts$/, loader: "@ngtools/webpack" },
        {
          test: /\.scss$/,
          exclude: /styles.scss/,
          use: ["raw-loader", "sass-loader"],
        },
        {
          test: /styles.scss/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        { test: /\.css$/, loader: "raw-loader" },
        { test: /\.html$/, loader: "raw-loader" },
        {
          test: /\.json$/,
          loader: "json-loader",
        },
      ],
    },
    externals: {
      "single-spa": "window singleSpa",
    },

    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "**/i18n/*.json" },
        ],
      }),
      new ModuleFederationPlugin({
        name: "spa",
        library: { type: "var", name: "spa" },
        filename: "remoteEntry.js",
        exposes: {
          "./AppModule": "./src/main.single-spa.ts",
        },
        remotes: {
          home: "home",
        },
      }),
      new AotPlugin({
        skipCodeGeneration: false,
        tsConfigPath: "./tsconfig.app.json",
        directTemplateLoading: false,
        entryModule: path.resolve(__dirname, "./src/app/app.module#AppModule"),
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
  },
];
