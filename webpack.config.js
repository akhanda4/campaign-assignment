// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "deploy"),
//   },
//   optimization: {
//     minimize: true,
//     splitChunks: {
//       chunks: "all",
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: [
//               "@babel/preset-env",
//               [
//                 "@babel/preset-react",
//                 {
//                   runtime: "automatic",
//                 },
//               ],
//             ],
//           },
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"],
//       },
//     ],
//   },
//   resolve: {
//     extensions: [".js", ".jsx"],
//     alias: {
//       components: path.resolve(__dirname, "src/components/"),
//       images: path.resolve(__dirname, "src/images/"),
//       common: path.resolve(__dirname, "src/common/"),
//     },
//   },
//   devServer: {
//     static: path.join(__dirname, "dist"),
//     compress: true,
//     port: 3000,
//     open: true,
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./public/index.html",
//     }),
//   ],
// };

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production", // Explicitly set mode
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "build"),
    clean: true, // Clean the output dir automatically
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(), // JS minimization
      new CssMinimizerPlugin(), // CSS minimization
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    runtimeChunk: "single", // Better long-term caching
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Extract CSS
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      images: path.resolve(__dirname, "src/images/"),
      common: path.resolve(__dirname, "src/common/"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
};
