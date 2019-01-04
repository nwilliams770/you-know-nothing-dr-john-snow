var path = require("path");

module.exports = {
    context: __dirname,
    entry: "./components/entry.jsx",
    mode: "development",
    output: {
        path: path.resolve(__dirname),
        filename: "bundle.js"
      },
      module: {
        rules: [
          { test: /\.scss$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" },
              { loader: "sass-loader" }
            ]
          },
         { test: /\.css$/,
           use: [
             { loader: "style-loader" },
             { loader: "css-loader" }
           ]
         },
         {
           test: /\.js$/,
           exclude: /node_modules/,
           use: "babel-loader"
         }, 
         {
           test: /\.jsx?$/,
           exclude: /node_modules/,
           use: "babel-loader"
         },
         {
          test: /\.json$/,
          loader: 'json-loader'
        }
       ],
      },
      resolve: {
        extensions: ['.js', '.jsx']
      },
      node: {
        fs: 'empty'
      }
};