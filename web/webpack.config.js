const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'server/static'),
  },

  // Define how different types of modules will be treated
  module: {
    rules: [
      {
        test: /\.js$/, // Rule for JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Using babel-loader for transpiling JavaScript
          options: {
            presets: ['@babel/preset-env'] // Preset used for modern JavaScript
          }
        }
      }
    ]
  },

  // Existing configuration options
  resolve: {
      fallback: {
          "buffer": require.resolve("buffer/")
      }
  }
};