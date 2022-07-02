const webpack = require("webpack");

module.exports = {
    configureWebpack: {
        devtool: 'source-map',
        plugins: [
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: true,
                __VUE_PROD_DEVTOOLS__: false
            })]
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/8-puzzle/'
        : '/'
}
