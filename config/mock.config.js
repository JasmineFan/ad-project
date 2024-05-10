// 使用webpack devServer进行mock方案

const path = require('path')
const fs = require('fs')

function response(res, content, type = 'json') {
    res.type(type) // 相应类型
    res.write(content)
    res.end()
}

function mock(res, filePath) {
    fs.readFile(filePath, 'utf-8', (error, content) => {
        if (error) {
            response(res, error.message, 'html')
        } else {
            response(res, content)
        }
    })
}

// 定义mock中间件  函数里面返回一个函数， 外面的函数传config， 里面函数是node 对http 接口的回调函数
const mockMiddleware = (config) => (req, res, next) => {
    const { projectDir, mockDir } = config // 获取传入的参数

    const filePath = path.resolve(projectDir, `./${mockDir + req.path}.json`)

    // console.log(req.path);
    // console.log('filePath', filePath);
    // console.log(res);
    // 检查这个文件是不是能被系统解析
    return fs.stat(filePath, (error) => {
        if (error) {
            next() // 控制权交给到下一个中间件
        } else {
            mock(res, filePath) // 返回mock 数据的核心方法
        }
    })
}

module.exports = mockMiddleware
