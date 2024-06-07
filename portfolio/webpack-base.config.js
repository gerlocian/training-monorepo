const {resolve} = require('node:path');

module.exports = {
    entry: './src/index.mjs',
    output: {
        filename: 'index.js',
        path: resolve(__dirname, 'dist'),
    }
}
