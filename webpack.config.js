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
        module: {
            rules: [
                {
                    test: /\.js$/, 
                    loader: "babel-loader"
                }
            ]
        },
        plugins: []
    }
    if(name.match(/\.min/)){
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: false,
                }
            })
        )
    }
    if(name.match(/\.bundle/)){
        config.resolve = {
            alias: {
                'vue': 'vue/dist/vue.min.js'
            }
        }
        config.entry =  './test/bundle.test.js'
        config.output = {
            path: path.resolve(__dirname, 'test'),
            filename: name,
        }
    }else{
        config.externals = {
            'vue': 'Vue',
        }
    }
    return config
}

module.exports = [build('vue.lazyimg.js'),build('vue.lazyload.bundle.js'), build('vue.lazyimg.min.js')]
