var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
  devtool: 'source-map',

  entry: ['babel-polyfill', './src/index'],

  output: {
    path: __dirname + '/build/',
    filename: 'app.js?[hash]',
  },

  plugins: [
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css'),
    //new ExtractTextPlugin('app.css?[hash]', { allChunks: true }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // The notation here is somewhat confusing.
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader normally turns CSS into JS modules injecting <style>,
      // but unlike in development configuration, we do something different.
      // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
      // (second argument), then grabs the result CSS and puts it into a
      // separate file in our build process. This way we actually ship
      // a single CSS file in production instead of JS code injecting <style>
      // tags. If you use code splitting, however, any async bundles will still
      // use the "style" loader inside the async code so CSS from them won't be
      // in the main CSS file.
      {
        test: /\.css$/,
        // "?-autoprefixer" disables autoprefixer in css-loader itself:
        // https://github.com/webpack/css-loader/issues/281
        // We already have it thanks to postcss. We only pass this flag in
        // production because "css" loader only enables autoprefixer-powered
        // removal of unnecessary prefixes when Uglify plugin is enabled.
        // Webpack 1.x uses Uglify plugin as a signal to minify *all* the assets
        // including CSS. This is confusing and will be removed in Webpack 2:
        // https://github.com/webpack/webpack/issues/283
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1&-autoprefixer!postcss')
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      },
      // auth0 lock
      {
        test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
        loaders: [
          'transform-loader/cacheable?brfs',
          'transform-loader/cacheable?packageify',
        ],
      },
      {
        test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
        loader: 'transform-loader/cacheable?ejsify',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },

  postcss: [
    require('autoprefixer'),
    require('postcss-nested'),
  ],
};
