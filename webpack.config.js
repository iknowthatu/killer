module.exports = {
  mode: 'development',
  entry: {
    content: './src/index.js'
  },
  output: {
    path: process.cwd(),
    filename: './dist/app/js/[name].js'
  },
  devtool: 'source-map',
  optimization: {
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=dist/app/css/[name].[ext]']
      }
    ]
  }
}
