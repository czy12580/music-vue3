import axios from '../utils/axios'



// 公共请求方法
export function get(url) {
    return axios.get(url)
}

export function post(url, params) {
    return axios.post(url, params)
}


//歌单接口
/* 参数
 order: 
 cat:
 limit:
 offset:
*/
export function playlist(params) {
    return axios.post('/top/playlist', params)
}

// 热门歌手
export function artists(params) {
    return axios.post('/top/artists', params)
}

//歌手详情
export function artistsDetail(params) {
    return axios.post('/artists/detail', params)
}

//mv排行
export function topmv() {
    return axios.get('/top/mv?limit=10')
}

//歌手粉丝数量
export function fan(params) {
    return axios.post('/artist/follow/count', params)
}

//歌手描述
export function artistDesc(params) {
    return axios.post('/artist/desc', params)
}

//歌手单曲
export function artistSongs(params) {
    return axios.post('/artists', params)
}

//歌手分类列表
export function getArtistCategory(params) {
    return axios.get('/artist/list?type=' + params.type + '&area=' + params.area + '&initail=' + params.initail)
}

//搜索
export function search(params) {
    return axios.post('/search', params)
}

//获取音乐url
export function getSongUrl(params) {
    return axios.get('/song/url?id=' + params.id)
}
