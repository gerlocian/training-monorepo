const {resolve} = require('node:path');

module.exports = {
    entry: './src/components/index.mjs',
    output: {
        filename: 'index.js',
        path: resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['css-loader'] },
            { test: /\.html$/, use: ['html-loader'] },
        ],
    },
}
