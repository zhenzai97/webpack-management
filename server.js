// const express = require('express');
// const webpack = require('webpack');
// const path = require('path');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const hotMiddleware = require('webpack-hot-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');
// const app = express();
// const config = require('./webpack.config.js');
// const compiler = webpack(config);
//
// app.use(
//     webpackDevMiddleware(compiler, {
//         publicPath: config.output.publicPath,
//     })
// );
//
// app.use('/api', createProxyMiddleware({
//     target: 'http://localhost:9000',
//     pathRewrite: {'^/api' : ''}
// }));
//
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });
//
// app.use(hotMiddleware(compiler));
// // 将文件 serve 到 port 3000。
// app.listen(3300, function () {
//     console.log('Listening at http://localhost:3300');
// });

//
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
    contentBase: './dist',
    hot: true,
    host: 'localhost',
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.use('/api',createProxyMiddleware({
    target: 'http://localhost:9000',
    pathRewrite: {'^/api' : ''}
}))

server.listen(3300, 'localhost', () => {

});

