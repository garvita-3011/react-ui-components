const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader'
        },
      },
    ],
  },
  mode: 'development',
  optimization: {
    usedExports: true
  }
  // plugins: [
  //   new BundleAnalyzerPlugin()
  // ]
};