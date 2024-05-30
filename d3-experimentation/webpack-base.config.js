const { resolve } = require('path');

module.exports = {
    entry: './src/index.js',
    target: 'es6',
    output: {
        filename: 'index.js',
        chunkFormat: 'commonjs',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.css$/i, use: ['style-loader', 'css-loader'] }
        ]
    }
};
