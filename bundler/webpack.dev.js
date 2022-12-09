const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')

module.exports = webpackMerge(
    commonConfiguration,
    {
        devtool: 'source-map',
        mode: 'development',
        devServer:
        {
            host: '0.0.0.0',
            contentBase: './dist',
            open: true,
            https: false,
            useLocalIp: true
        }
    }
)
