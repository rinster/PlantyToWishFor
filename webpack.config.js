const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill','./src/js/index.js'],
    output: { 
        path: path.resolve(__dirname, 'dist'), 
        filename: 'js/bundle.js'
    },
    devServer: { 
        contentBase: './dist' 
    },
    plugins: [ 
        new HtmlWebpackPlugin({
           title: 'Planty to Wish App',
           filename: 'index.html',
           template: './src/index.html',
           inject: true,
           minify: {
               removeComments: true,
               collapseWhitespace: false
           }  
        })
    ],
    // Babel setup ===========================
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'babel-preset-env'
                        ]
                    } 
                }
            }
        ]
    }
};