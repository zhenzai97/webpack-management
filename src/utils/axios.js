// 引入模块
import axios from 'axios'
import { formatUrl } from './tools'

const AXIOS = (option = {}) => {
  option.headers = option.headers || {}
  const url = option.url || ''
  const m = (option.method || '').toLocaleLowerCase()
  const paramData = option.body

  // 对非get类请求头和请求体做处理
  if (m === 'post' || m === 'put' || m === 'delete') {
    option.headers['content-Type'] = option.headers['content-Type'] || 'application/x-www-form-urlencoded'// 'application/json';
    if (option.headers['content-Type'].indexOf('application/json') !== -1) {
      return new Promise((resolve, reject) => {
        axios.post(url, paramData, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(response => {
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        })
      })
    }

    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        headers: option.headers,
        params: paramData
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  if (m === 'get') {
    return new Promise((resolve, reject) => {
      axios({// 格式a
        method: 'get',
        url: url + formatUrl(paramData)
      }).then(function(resp) {
        resolve(resp.data)
      }).catch(resp => {
        reject(resp.statusText)
      })
    })
  }
}
export default AXIOS
