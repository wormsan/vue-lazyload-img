var path = require('path')
module.exports = {
    entry: './test/bundle.test.js',
    output: {
        path: path.resolve(__dirname, 'test'),
        filename: 'vue.lazyload.bundle.js',
        // libraryTarget: "umd",
        // library: "Lazyload"
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.min.js',
        },
    },
    // externals: {
        // 'vue': 'Vue',
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader']
            },
        ]
    },
}