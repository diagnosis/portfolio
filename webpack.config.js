const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = (env, argv) => ({
  entry: './src/script.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: argv.mode || 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
  },
  module: {
    rules:  [
  // Remove the .js rule
  {
    test: /\.css$/i,
    use: [
      argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
    ],
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name][ext][query]',
    },
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/[name][ext][query]',
    },
  },
],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),
    new webpack.ProvidePlugin({
      bootstrap: 'bootstrap',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        SANITY_PROJECT_ID: JSON.stringify(process.env.SANITY_PROJECT_ID),
        SANITY_TOKEN: JSON.stringify(process.env.SANITY_TOKEN),
      },
    }),
  ],
  optimization: {
    minimize: argv.mode === 'production',
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
  },
});