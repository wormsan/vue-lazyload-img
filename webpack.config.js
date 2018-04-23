const path = require('path');
const webpack = require('webpack');
function build(name){
    const config = {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: name,
            libraryTarget: "umd",
            library: "Lazyload"
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".d.ts"],
        },
        module: {
            rules: [
                {
                    test: /\.js$/, 
                    loader: "babel-loader",
                },
                {
                    test: /\.ts$/, 
                    loader: "ts-loader",
                },
            ]
        },
        devtool: 'sourcemap',
        plugins: []
    }
    if(name.match(/\.min/)){
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: false,
                },
                sourceMap: true,
            })
        )
    }
    // config.externals = {
        // 'vue': 'Vue',
    // }
    return config
}

module.exports = [build('vue.lazyimg.js'), build('vue.lazyimg.min.js')]
