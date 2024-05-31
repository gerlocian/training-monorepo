const { resolve } = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack-base.config');

module.exports = { 
    ...baseConfig,
    entry: './src/pages/index.js',
    devServer: { 
        hot: true,
        static: {
            directory: resolve(__dirname, 'src', 'pages'),
            publicPath: '/',
        },
        watchFiles: [
            './src/**/*.js',
            './src/**/*.css',
            './src/**/*.html',
        ],
     },
    devtool: 'source-map',
    plugins: [ new HtmlWebpackPlugin() ]
};
