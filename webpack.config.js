const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        build: ['@babel/polyfill', './source/_javascript/main.js']
    },
    output: {
        path: path.resolve(__dirname, 'source', 'js'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            header: path.resolve(__dirname, 'source', '_javascript', 'header'),
            navigation: path.resolve(__dirname, 'source', '_javascript', 'navigation'),
            helpers: path.resolve(__dirname, 'source', '_javascript', 'helpers'),
            vendor: path.resolve(__dirname, 'source', '_javascript', 'vendor')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ]
};