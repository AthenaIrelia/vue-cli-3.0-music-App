import orginJSONP from 'jsonp'
export default function jsonp(url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)  //如果传入的url本来就有参数，那么就加&拼接符
    return new Promise((resolve, reject) => {
        orginJSONP(url, option, (err, data) => {
            if (!err) {   //取到数据，err为空
                resolve(data) //取到数据，promise的状态会变成resolve.，将data作为成功回调函数的参数
            } else {
                reject(err)   //失败
            }
        })
    })
}
function param(data) {
    let url = ''
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : ''//对value进行转义，避免value中包含特殊字符（= 、&），导致url解释出错
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''//url不为空，则去掉前面的拼接符号
}
