interface IParams {
    [propery: string]: string;
}
function getUrlParam(name:string) {
    // 如果传入了参数，就匹配当前参数并返回，否则返回一个对象，将所有参数返回
    const query = window.location.search.substring(1)
    const paramArr = query.split('&')
    const params = {} as IParams
    for (let i = 0; i < paramArr.length; i++) {
        const pair = paramArr[i].split('=')
        params[pair[0]] = pair[1]
        if (pair[0] === name) {
            return pair[1]
        }
    }
    if (name) {
        return false
    }
    return params
}

export default {
    getUrlParam,
}
