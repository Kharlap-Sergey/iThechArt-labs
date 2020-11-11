const path = require("path"); // use
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // plugin for autom. cleaning the dist
const CopyWebPackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  context: path.resolve(__dirname, "src"), // the file location for a building

  mode: "development",

  // startup file or files
  //entry: "./src/index.js",
  entry: {
    main: "./index.js",
  },

  //output (result fule)
  //that means create output file for webpack result as ./dist/bundle.js
  output: {
    //filename: "bundle.js",  // output file
    //filename: "[name].bundle.js", // [name] means for each [name].js form entry create own output [name].bundle.js
    filename: "[name].[contenthash].js", // [contenthash] instead of bundle use hashSum for name;
    path: path.resolve(__dirname, "dist"), // __distname = ./  a root catalog for webpack
  },

  //some extentials for workspace and flexibility
  resolve: {
    //for imports where didn"t explicit type of file
    extensions: [".js"],
    //here we can extend the derectory
    alias: {
      //instead of src/modules/... will be implemented @models/...
      "@models": path.resolve(__dirname, "src/modules"),
      //...
    },
  },

  optimization: {
    //to create new chunk for each modul is imports in some moduls
    splitChunks: {
      chunks: "all",
    },
  },

  //to start dev-server, port - 4200
  devServer: {
    port: 4200,
  },

  //some class(plugins) to use some function
  plugins: [
    //new StylelintPlugin(),

    //automat. generate index.html
    new HtmlWebpackPlugin({
      //title: "webpack", // to set the specific title
      template: "./index.html", // to use our html page as the frame
    }),

    //copy static sources
    new CopyWebPackPlugin({
      patterns: [
        {
          //copy element from ... to ... in builded vers
          from: path.resolve(__dirname, "src/imgs"),
          to: path.resolve(__dirname, "dist/imgs"),
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      //filename: "./styles/style.css",
      //chunkFilename: "[id].css",
    }),
    // plugin for autom. cleaning the dist
    new CleanWebpackPlugin(),
  ],

  //loaders to execute imports
  module: {
    rules: [
      //bable rull
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      //the rule for .css file
      {
        test: /\.css$/,
        use: [
          //"style-loader",
          //MiniCssExtractPlugin.loader,
          {
            loader: MiniCssExtractPlugin.loader,
          },
          //"style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
          },
        ],
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          {
            loader: "postcss-loader",
          },
          "sass-loader",
        ],
      },

      //the rule for images file
      {
        test: /\.(png|jpg)$/,
        use: ["file-loader"],
      },

      //the rule to render .ttf
      {
        test: /\.ttf$/,
        use: ["file-loader"],
      },

      //also here can be other loaders
    ],
  },
};
