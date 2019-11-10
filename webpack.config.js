const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new FixStyleOnlyEntriesPlugin(),
        new OptimizeCssAssetsPlugin({}),
        new CopyWebpackPlugin([{
            from: './src/assets/images',
            to: 'assets/images'
        }])
    ],

    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: {// Babel setup ===========================
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'babel-preset-env'
                        ]
                    } 
                }
            },
            {
                test: /.css$|.scss$/,                
                use:[// SASS -> CSS -> Autoprefixer setup ========                    
                MiniCssExtractPlugin.loader,                  
                'css-loader',
                'sass-loader',
                'postcss-loader'
                ]
            },
            {   // Handle Loading of Static Resources =============
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name:'[name].[ext]',
                            outputPath: 'assets/images'
                        }
                    }
                ]
            }
        ]
    }
};