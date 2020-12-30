import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  // baseURL: "http://125.64.98.21:8010/", // 线
  // baseURL: "http://192.168.4.20:8010/", // 罗
  // baseURL: "http://192.168.3.40:8010/", // 黄
  baseURL: "http://125.64.98.21:8010/", // 服务器
  // baseURL: "http://localhost:8010/",
  // baseURL: "/",
  timeout: 0, // request timeout
  //保持sessionKey
  withCredentials: true,
  crossDomain: true
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    let res = response.data;
    if (response.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
      // const res = response.data
      // if (res.success) {
      //   return res
      // }else {
      //   Message({
      //     message: res.message,
      //     type: 'info',
      //     duration: 5 * 1000
      //   })
      // }
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
