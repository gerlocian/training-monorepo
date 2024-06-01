const { resolve } = require('node:path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
    }
}
