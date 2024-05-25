const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack-base.config');

module.exports = { 
    ...baseConfig,
    devServer: { static: './dist' },
    plugins: [ new HtmlWebpackPlugin() ]
};
