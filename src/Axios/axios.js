import axios from 'axios'
import {getUserType} from '../authUtils/authUtil'

const instance = axios.create({
    // baseURL:'http://localhost:3000'
    baseURL:'https://quickfixautos.shop/'
})

instance.interceptors.request.use(
    (config)=>{
        const userTypeObject = getUserType()

       if(userTypeObject&&userTypeObject.token){
        config.headers.Authorization = `Bearer ${userTypeObject.token}`
       }

  
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default instance