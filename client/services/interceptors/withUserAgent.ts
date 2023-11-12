import { AxiosInstance } from 'axios'

export const withUserAgent = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(request => {
    const userAgent = window?.navigator?.userAgent
    if (userAgent && request.url?.match(/login/) && request.data) {
      request.data.deviceBrand = userAgent
    }
    return request
  })
}