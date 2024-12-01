import axios from 'axios'
import { handleUnauthorized } from '../auth'

const service = axios.create({
  baseURL: "https://canserai-artify.hf.space/api/v1/",
})

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token)
      config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

service.interceptors.response.use(
  (response) => {
    if (response.status === 200)
      return response

    throw new Error(response.status.toString())
  },
  (error) => {
    if (error.response?.status === 401) {
      handleUnauthorized();
      return Promise.reject(new Error('Unauthorized access. Please login again.'));
    }
    return Promise.reject(error)
  },
)

export default service
