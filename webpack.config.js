module.exports = {
  entry: './components/App.js',
  output: {
  	path: './public/build',
    filename: 'bundle.js'       
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  }
};