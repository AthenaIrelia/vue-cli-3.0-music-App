// import jsonp from 'common/js/jsonp.js'
import {
    commonParams,
    // option
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
                    "sin": 80, 
                    "cur_page": 2
                }
            }
        }),
        // loginUin: 0,
        // hostUin: 0,
        // platform: 'yqq',
        // needNewCode: 0,
        // data: {
        //     "comm": {
        //         "ct": 24,
        //         "cv": 10000
        //     },
        //     "singerList": {
        //         "module": "Music.SingerListServer",
        //         "method": "get_singer_list",
        //         "param": {
        //             "area": -100,
        //             "sex": -100,
        //             "genre": -100,
        //             "index": -100,
        //             "sin": 800,
        //             "cur_page": 2
        //         }
        //     }
        // }
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}