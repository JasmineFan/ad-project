// webpack 开发和生产环境下的相同配置项

const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 判断当前的打包环境是开发环境还是生产环境
const devMode = process.env.NODE_ENV !== 'production';

const webpackBaseConfig = {

    entry: path.join(__dirname, '../src/index.jsx'), // 打包文件入口
    output: { // 打包文件出口
        path: path.join(__dirname, '../dist'),
        filename: '[name].[fullhash:4].js', // 打包后名称使用hash后缀
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts'], // 以后再引入文件时，不需要引入后缀
        alias: {
            pages: path.join(__dirname, '../src/pages'), // 设置pages别名
            '@utils': path.join(__dirname, '../src/utils'),
            '@components': path.join(__dirname, '../src/components'),
            common: path.join(__dirname, '../src/common'),
            context: path.join(__dirname, '../src/context'),
        },
    },
    module: { // 处理模块
        rules: [
            {
                test: /\.jsx?$/, // 处理js/ jsx文件
                use: 'babel-loader',
            },
            {
                test: /\.(sc|c)ss/, // 处理scss / css文件
                // 如果是dev方式就使用style-loader否则就使用分离打包方式
                use: [
                    // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            // {
            //     test: /\.(jpg|png|jpe?g|gif|svg)(\?.*)?$/i,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 outputPath: 'images/', // 输出目录
            //                 name() { // 输出名称
            //                     if (process.env.NODE_ENV === 'development') {
            //                         return '[path][name].[ext]';
            //                     }
            //                     return '[fullhash].[ext]';
            //                 },
            //                 limit: 5 * 1024,
            //             },
            //         },
            //     ],
            // },
        ],
    },

};

module.exports = webpackBaseConfig;