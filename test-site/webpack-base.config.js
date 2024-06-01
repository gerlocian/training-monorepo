const { resolve } = require('node:path');

module.exports = {
    entry: './src/pages/index.js',
    output: {
        filename: 'index.js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['css-loader'] },
            { test: /\.html$/, use: ['html-loader'] },
        ],
    }
}
