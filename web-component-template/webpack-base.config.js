const { resolve } = require('node:path');

module.exports = {
    entry: './src/index.js',
    output: {
        library: 'l',
        filename: 'index.js',
        path: resolve(__dirname, 'dist')
    }
}
