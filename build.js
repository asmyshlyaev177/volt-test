const webpack = require('webpack');
const config = require('./webpack.config.js');
webpack(config, (err, stats) => console.log(err || stats.hasErrors() ? err : stats));



