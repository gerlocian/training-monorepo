const { resolve } = require('node:path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.css$/i, use: ['css-loader'] },
            { test: /\.html$/i, use: ['html-loader'] },
        ]
    }
}
