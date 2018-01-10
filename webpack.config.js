var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/translated.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
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
    'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ]
}
