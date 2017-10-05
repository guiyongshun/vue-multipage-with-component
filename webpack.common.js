const path = require('path');
const url = require('url');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: path.join(__dirname,'src/script/app.js'),
        address: path.join(__dirname,'src/script/app2.js'),
        vendor: [
            'vue',
            'axios'
        ]
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: path.resolve(__dirname,'src'),
                exclude: path.resolve(__dirname,'node_modules')
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:6].[ext]',
                            outputPath: 'css/'
                        }
                    },
                    "extract-loader",
                    {
                        loader: "css-loader",
                        options: {

                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:6].[ext]',
                            outputPath: 'image/',
                            limit: 8192,
                            publicPath: url.format({
                                hostname:'localhost',
                                protocol:'http:',
                                port:8080,
                                pathname:'/dist/'
                            })  
                        }
                    },
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.json$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'date/'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src')
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src/html/cart.html'),
            filename: 'index.html',
            excludeChunks: ['address']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src/html/address.html'),
            filename: 'address.html',
            excludeChunks: ['app']           
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module){
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        })
    ]
};