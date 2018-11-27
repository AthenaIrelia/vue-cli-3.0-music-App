import jsonp from 'common/js/jsonp.js'
import {
    commonParams,
    option
} from './config.js'
import axios from 'axios'



export function getSingerList() {
    const url = '/api/getSingerList'
    const data = Object.assign({}, commonParams, {
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        data: JSON.stringify({
            "comm": {
                "ct": 24,
                "cv": 10000
            },
            "singerList": {
                "module": "Music.SingerListServer",
                "method": "get_singer_list",
                "param": {
                    "area": -100,
                    "sex": -100,
                    "genre": -100,
                    "index": -100,
                    "sin": 0,
                    "cur_page": 1
                }
            }
        }),
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function getSingerDetail(singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    const data = Object.assign({}, commonParams, {
        g_tk: 1929707432,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        order: 'listen',
        begin: 0,
        num: 100,
        songstatus: 1,
        singermid: singerId
    })
    return jsonp(url, data, option)
}