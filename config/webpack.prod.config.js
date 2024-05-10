const path = require('path')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackConfigBase = require('./webpack.base.config')

/**
 * css和js分离打包的作用：
 * 1.减少单个文件的体积，进而提升浏览器加载速度
 * 2.相互独立打包，在修改文件时不需要重新打包对应的未修改的css或js文件，加快打包速度
 * 3.css文件放在html文档顶部，让浏览器优先解析css
 */

const webpackConfigProd = {
    mode: 'production', // 打包模式
    plugins: [ // 插件
        new CleanWebpackPlugin({
            protectWebpackAssets: true,
        }),
        new MiniCssExtractPlugin({ // 用来进行打包时分割css和js文件的插件
            filename: '[name].[fullhash:4].css',
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            title: 'React App',
            filename: 'index.html',
            template: path.join(__dirname, '../src/index.html'),
        }),
    ],
}

// 将两个配置文件合并后导出
module.exports = merge(webpackConfigBase, webpackConfigProd)
