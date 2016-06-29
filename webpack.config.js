var webpack = require('webpack')
module.exports = {
    entry: "./src/vue.lazyimg.js",
    output: {
        path: __dirname,
        filename: "./dist/vue.lazyimg.js",
        libraryTarget: 'umd',
    },
    externals: {
        'vue': 'Vue'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};
