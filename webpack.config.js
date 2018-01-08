const path = require('path')
const webpack = require('webpack')

const configMain = {
  entry: './src/translated.js',
  output: {
    filename: 'translated.js',
    path: path.resolve(__dirname, 'dist-modules')
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@actions': path.resolve(__dirname, 'src/actions'),
      '@reducers': path.resolve(__dirname, 'src/reducers'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react', '@babel/stage-3']
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = configMain
