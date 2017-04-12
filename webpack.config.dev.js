var path = require('path');
module.exports = {
    entry: './test/test.js',
    output: {
        path: path.resolve(__dirname, 'dev'),
        filename: 'build.js',
        // export itself to a global var
        libraryTarget: "umd",
        // name of the global var: "GomeUIKit"
        library: "Lazyload"
    },
    externals: {
        'vue': 'Vue',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
        ]
    },
    
}