const express = require('express')
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const path = require('path');
const compiler = webpack(config);
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'data')));

// app.use(express.static('data'));

// line to serve favicon
// app.use(favicon(path.join(__dirname, "public", "favicon.ico")))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname+'/index.html'));
});

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));


app.listen(port, () => {
  console.log(`listening on port ${port}!`)
});