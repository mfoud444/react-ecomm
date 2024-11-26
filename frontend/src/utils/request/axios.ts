import axios, { type AxiosResponse } from 'axios'
export const baseURL = "https://canserai-artify.hf.space/api/v1/"

const service = axios.create({
  baseURL:baseURL,
})
service.interceptors.request.use(
  (config) => {
    const token = false//localStorage.getItem("token");
//#useAuthStore().token
    if (token)
      config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200)
      return response

    throw new Error(response.status.toString())
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default service
