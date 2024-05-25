const { resolve } = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.css$/i, use: ['style-loader', 'css-loader'] }
        ]
    }
};
