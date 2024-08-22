import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { fileURLToPath } from "url";

const isProduction = process.env.NODE_ENV == "production";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: "./src/client/app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].js",
    clean: false,
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 8000,
    historyApiFallback: true, // Important for SPAs
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/app/pages/home/home.ejs",
      filename: "index.html",
      hash: true,
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "./src/client/app/pages/contact/contact.ejs",
      filename: "contact.html",
      hash: true,
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "./src/client/app/pages/about/about.ejs",
      filename: "about.html",
      hash: true,
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "./src/client/app/pages/add/add.ejs",
      filename: "add.html",
      hash: true,
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "./src/client/app/pages/list/list.ejs",
      filename: "list.html",
      hash: true,
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "./src/client/app/pages/products/products.ejs",
      filename: "products.html",
      hash: true,
      inject: "body",
    }),

    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/i,
        type: "asset",
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset",
        generator: {
          filename: "img/[name][ext]",
        },
      },
      {
        test: /\.ejs$/,
        use: {
          loader: "ejs-compiled-loader",
          options: {
            htmlmin: true,
            htmlminOptions: {
              removeComments: true,
            },
          },
        },
      },
    ],
  },
};

export default () => {
  if (isProduction) {
    config.mode = "production";
    // config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
