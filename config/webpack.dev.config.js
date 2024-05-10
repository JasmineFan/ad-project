const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const OpenBrowserPlugin = require('open-browser-webpack4-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const webpackConfigBase = require('./webpack.base.config')
const mockMiddleware = require('./mock.config')

const smp = new SpeedMeasurePlugin()
const PORT = 8080 // 项目启动端口号

const webpackConfigDev = {
    mode: 'development', // 打包模式
    plugins: [ // 插件
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
        new HtmlWebpackPlugin({
            inject: 'body',
            title: 'React App',
            filename: 'index.html',
            template: path.join(__dirname, '../src/index.html'),
        }),
        new OpenBrowserPlugin({ // 浏览器启动项
            url: `http://localhost:${PORT}/#/`,
        }),
    ],
    devtool: 'eval-source-map', // 控制是否生成，以及如何生成 source map 这里这种方式是生产 原始源代码
    devServer: {
        // 远程的mock 要在这里面配置proxy
        // proxy:{
        //     '/':'http://127.'
        // },
        contentBase: path.join(__dirname, '../src'),
        historyApiFallback: false,
        hot: false,
        port: PORT,
        host: '0.0.0.0',
        before(app) {
            const projectDir = path.resolve()
            const mockDir = './mock'
            app.use(mockMiddleware({ projectDir, mockDir }))
        },
    },
}

// 将两个配置文件合并后导出
module.exports = smp.wrap(merge(webpackConfigBase, webpackConfigDev))
