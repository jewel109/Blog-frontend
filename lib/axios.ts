import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000",

})

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'


export default axiosInstance
