var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/translated.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-3'],
            plugins: ['transform-es2015-destructuring', [
              'transform-react-remove-prop-types',
              {
                mode: 'wrap'
              }
            ],
            'add-module-exports',
            'transform-class-properties'
            ]
          }
        }
      }
    ]
  },
  externals: {
    'react': 'commonjs react'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ]
}
