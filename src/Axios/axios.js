import axios from 'axios'
import {getUserType} from '../authUtils/authUtil'

const instance = axios.create({
    baseURL:'http://localhost:3000'
})

instance.interceptors.request.use(
    (config)=>{
        const userType = getUserType()

        const token = localStorage.getItem(`${userType}Token`)

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default instance