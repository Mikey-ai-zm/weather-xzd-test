import axios from 'axios'
import { configProviderContextKey } from 'element-plus'

const instance =axios.create({
    baseURL:'https://restapi.amap.com/v3',
    timeout:5000,
})

instance.interceptors.response.use(
    response=>{return response.data},
    (error) => console.log(error)
)

export default instance