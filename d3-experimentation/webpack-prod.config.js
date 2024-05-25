const { resolve } = require('node:path');
const baseConfig = require('./webpack-base.config');

module.exports = {
    ...baseConfig,
    entry: resolve(__dirname, 'src', 'components', 'index.js')
};
