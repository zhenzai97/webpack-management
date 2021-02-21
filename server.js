const { createProxyMiddleware } = require('http-proxy-middleware');
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

server.listen(3800, 'localhost', () => {

});



