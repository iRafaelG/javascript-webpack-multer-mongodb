// import node modules
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// env
const env = process.env.NODE_ENV !== 'prod';

module.exports = {
    entry: './frontend/App.js',
    output: {
        path: path.join(__dirname, 'backend/public'),
        filename: 'js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    env ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'
        }),
        new HtmlWebpackPlugin({
            template: './frontend/index.html',
            minify: {
                collapseWhitespace: env ? false : true,
                removeComments: env ? false : true,
                removeRedundantAttributes: env ? false : true,
                removeScriptTypeAttributes: env ? false : true,
                removeStyleLinkTypeAttributes: env ? false : true,
                useShortDoctype: env ? false : true
            }
        })
    ],
    optimization: {
        minimizer: [
            new OptimizeCssWebpackPlugin({}),
            new TerserWebpackPlugin({})
        ]
    },
    devtool: 'source-map'
}