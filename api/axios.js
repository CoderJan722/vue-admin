import axios from 'axios'
import config from '../config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  
  getInsideConfig() {
    return {
      baseUrl: this.baseUrl,
      header: {}
    }
  }
  
  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      config => config,
      error => Promise.reject(error)
    )
    // 添加响应拦截器
    instance.interceptors.response.use(
      response => response,
      error => {
        console.log(error, 'error')
        return Promise.reject(error)
      }
    )
  }
  
  request(options) {
    const instance = axios.create()
    options = { ...this.getInsideConfig(), ...options }
    this.interceptors(instance)
    return instance(options)
  }
}

export default new HttpRequest(baseUrl)
